import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";
import { verifyToken } from "../_lib/auth.js";
import { sendEmail } from "../_lib/email.js";
import {
  newsletterCampaignTemplate,
  campaignSentTeamNotificationTemplate,
} from "../_lib/templates.js";

const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 500;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function sendCampaignEmails(campaignId: string) {
  const { data: campaign, error: campErr } = await supabase
    .from("newsletter_campaigns")
    .select("*")
    .eq("id", campaignId)
    .single();

  if (campErr || !campaign) throw new Error("Campaign not found");

  await supabase
    .from("newsletter_campaigns")
    .update({ status: "sending", updated_at: new Date().toISOString() })
    .eq("id", campaignId);

  let subscriberQuery = supabase
    .from("subscribers")
    .select("id, email, unsubscribe_token")
    .eq("is_active", true);

  if (campaign.recipient_type === "selected" && campaign.recipient_ids?.length > 0) {
    subscriberQuery = subscriberQuery.in("id", campaign.recipient_ids);
  }

  const { data: subscribers, error: subErr } = await subscriberQuery;

  if (subErr || !subscribers) {
    await supabase
      .from("newsletter_campaigns")
      .update({ status: "failed", updated_at: new Date().toISOString() })
      .eq("id", campaignId);
    throw new Error("Failed to fetch subscribers");
  }

  let sentCount = 0;
  let failedCount = 0;

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map((sub) =>
        sendEmail({
          to: sub.email,
          subject: campaign.subject,
          html: newsletterCampaignTemplate({
            templateId: campaign.template_id,
            heading: campaign.heading,
            body: campaign.body,
            ctaText: campaign.cta_text,
            ctaUrl: campaign.cta_url,
            unsubscribeToken: sub.unsubscribe_token,
          }),
        })
      )
    );

    results.forEach((r) => {
      if (r.status === "fulfilled") sentCount++;
      else failedCount++;
    });

    if (i + BATCH_SIZE < subscribers.length) await sleep(BATCH_DELAY_MS);
  }

  const finalStatus = failedCount === subscribers.length ? "failed" : "sent";

  await supabase
    .from("newsletter_campaigns")
    .update({
      status: finalStatus,
      sent_count: sentCount,
      failed_count: failedCount,
      recipient_count: subscribers.length,
      sent_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", campaignId);

  try {
    await sendEmail({
      to: process.env.EMAIL_USER!,
      subject: `Newsletter Sent: ${campaign.subject}`,
      html: campaignSentTeamNotificationTemplate({
        subject: campaign.subject,
        templateId: campaign.template_id,
        recipientCount: subscribers.length,
        sentCount,
        failedCount,
      }),
    });
  } catch (e) {
    console.error("Team notification failed:", e);
  }

  return { sentCount, failedCount, recipientCount: subscribers.length };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (!verifyToken(req)) return res.status(401).json({ error: "Unauthorized" });

  try {
    // ─── GET: List campaigns ─────────────────────────
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("newsletter_campaigns")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    // ─── POST: Create + optionally send/schedule ─────
    if (req.method === "POST") {
      const {
        subject, template_id, heading, body, cta_text, cta_url,
        recipient_type, recipient_ids, action, scheduled_at,
      } = req.body;

      if (!subject || !template_id || !heading || !body) {
        return res.status(400).json({ error: "Missing required fields: subject, template_id, heading, body" });
      }

      const status =
        action === "send" ? "sending" :
        action === "schedule" ? "scheduled" :
        "draft";

      const { data: campaign, error: insertErr } = await supabase
        .from("newsletter_campaigns")
        .insert({
          subject,
          template_id,
          heading,
          body,
          cta_text: cta_text || null,
          cta_url: cta_url || null,
          status,
          recipient_type: recipient_type || "all",
          recipient_ids: recipient_ids || [],
          scheduled_at: action === "schedule" ? scheduled_at : null,
        })
        .select()
        .single();

      if (insertErr) throw insertErr;

      if (action === "send") {
        try {
          const result = await sendCampaignEmails(campaign.id);
          const { data: updated } = await supabase
            .from("newsletter_campaigns")
            .select("*")
            .eq("id", campaign.id)
            .single();
          return res.status(201).json({ ...updated, sendResult: result });
        } catch (sendErr) {
          console.error("Campaign send error:", sendErr);
          return res.status(201).json({ ...campaign, status: "failed", sendError: String(sendErr) });
        }
      }

      return res.status(201).json(campaign);
    }

    // ─── PUT: Update campaign or trigger send ────────
    if (req.method === "PUT") {
      const { id, action, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: "Campaign ID is required." });

      if (action === "send") {
        try {
          const result = await sendCampaignEmails(id);
          const { data: updated } = await supabase
            .from("newsletter_campaigns")
            .select("*")
            .eq("id", id)
            .single();
          return res.status(200).json({ ...updated, sendResult: result });
        } catch (sendErr) {
          console.error("Campaign send error:", sendErr);
          return res.status(500).json({ error: "Failed to send campaign." });
        }
      }

      updates.updated_at = new Date().toISOString();
      const { data, error } = await supabase
        .from("newsletter_campaigns")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    // ─── DELETE: Remove campaign ─────────────────────
    if (req.method === "DELETE") {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "Campaign ID is required." });
      const { error } = await supabase.from("newsletter_campaigns").delete().eq("id", id);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Newsletter admin API error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
