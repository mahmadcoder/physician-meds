import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";
import { sendEmail } from "../_lib/email.js";
import {
  newsletterCampaignTemplate,
  campaignSentTeamNotificationTemplate,
} from "../_lib/templates.js";

const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 500;
const CRON_SECRET = process.env.CRON_SECRET;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (CRON_SECRET && req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const now = new Date().toISOString();

    const { data: campaigns, error: fetchErr } = await supabase
      .from("newsletter_campaigns")
      .select("*")
      .eq("status", "scheduled")
      .lte("scheduled_at", now);

    if (fetchErr) throw fetchErr;
    if (!campaigns || campaigns.length === 0) {
      return res.status(200).json({ message: "No campaigns to send.", processed: 0 });
    }

    const results: { campaignId: string; sentCount?: number; failedCount?: number; error?: string }[] = [];

    for (const campaign of campaigns) {
      await supabase
        .from("newsletter_campaigns")
        .update({ status: "sending", updated_at: now })
        .eq("id", campaign.id);

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
          .eq("id", campaign.id);
        results.push({ campaignId: campaign.id, error: "Failed to fetch subscribers" });
        continue;
      }

      let sentCount = 0;
      let failedCount = 0;

      for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
        const batch = subscribers.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.allSettled(
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

        batchResults.forEach((r) => {
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
        .eq("id", campaign.id);

      try {
        await sendEmail({
          to: process.env.EMAIL_USER!,
          subject: `Scheduled Newsletter Sent: ${campaign.subject}`,
          html: campaignSentTeamNotificationTemplate({
            subject: campaign.subject,
            templateId: campaign.template_id,
            recipientCount: subscribers.length,
            sentCount,
            failedCount,
            scheduledTime: campaign.scheduled_at,
          }),
        });
      } catch (e) {
        console.error("Team notification failed:", e);
      }

      results.push({ campaignId: campaign.id, sentCount, failedCount });
    }

    return res.status(200).json({ message: "Campaigns processed.", processed: campaigns.length, results });
  } catch (error) {
    console.error("Cron send-scheduled error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

// end