import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";
import { verifyToken, verifyAdminPassword, generateToken } from "../_lib/auth.js";
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

// ─── All admin endpoints in one dynamic route ───────────────────
// /api/admin/login, /api/admin/contacts, /api/admin/consultations,
// /api/admin/subscribers, /api/admin/blogs, /api/admin/comments,
// /api/admin/cta-inquiries, /api/admin/chat-sessions, /api/admin/chat-messages,
// /api/admin/newsletter

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const resource = req.query.resource as string;

  // ─── External cron: process scheduled newsletters (no auth, uses CRON_SECRET) ──
  if (resource === "newsletter" && req.method === "GET") {
    const processScheduled = req.query.process_scheduled === "1";
    const cronSecret = req.query.secret as string;
    if (processScheduled && cronSecret === process.env.CRON_SECRET) {
      try {
        const now = new Date().toISOString();
        const { data: campaigns, error: fetchErr } = await supabase
          .from("newsletter_campaigns")
          .select("*")
          .eq("status", "scheduled")
          .lte("scheduled_at", now);

        if (fetchErr) return res.status(500).json({ error: "Failed to fetch campaigns" });
        if (!campaigns?.length) return res.status(200).json({ message: "No campaigns to send", processed: 0 });

        const results: { campaignId: string; sentCount?: number; failedCount?: number; error?: string }[] = [];

        for (const campaign of campaigns) {
          try {
            const result = await sendCampaignEmails(campaign.id);
            results.push({ campaignId: campaign.id, sentCount: result.sentCount, failedCount: result.failedCount });
          } catch (e) {
            results.push({ campaignId: campaign.id, error: String(e) });
          }
        }

        return res.status(200).json({ message: "Campaigns processed", processed: campaigns.length, results });
      } catch (err) {
        console.error("Scheduled newsletter error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  // ─── Login (no auth required) ─────────────────────────
  if (resource === "login") {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    try {
      const { password } = req.body;
      if (!password || !verifyAdminPassword(password)) {
        return res.status(401).json({ error: "Invalid password." });
      }
      const token = generateToken();
      return res.status(200).json({ success: true, token });
    } catch (error) {
      console.error("Admin login error:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  // ─── All other endpoints require auth ─────────────────
  if (!verifyToken(req)) return res.status(401).json({ error: "Unauthorized" });

  try {
    switch (resource) {
      // ─── Contacts ───────────────────────────────────────
      case "contacts": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("contacts")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase
            .from("contacts")
            .update({ is_read: is_read !== undefined ? is_read : true })
            .eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Consultations ─────────────────────────────────
      case "consultations": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("consultations")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read, status } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const updates: Record<string, unknown> = {};
          if (is_read !== undefined) updates.is_read = is_read;
          if (status) updates.status = status;
          const { error } = await supabase.from("consultations").update(updates).eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Subscribers ───────────────────────────────────
      case "subscribers": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("subscribers")
            .select("*")
            .order("subscribed_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "DELETE") {
          const { id } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase.from("subscribers").update({ is_active: false }).eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Blogs ─────────────────────────────────────────
      case "blogs": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("blog_posts")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "POST") {
          const {
            slug, title, excerpt, category, author_name, author_role,
            image, read_time, tags, featured, content, is_published,
          } = req.body;
          if (!slug || !title || !excerpt || !category || !author_name || !content) {
            return res.status(400).json({ error: "Missing required fields." });
          }
          const { data, error } = await supabase.from("blog_posts").insert({
            slug, title, excerpt, category,
            date: new Date().toISOString(),
            author_name,
            author_role: author_role || "",
            image: image || null,
            read_time: read_time || null,
            tags: tags || [],
            featured: featured || false,
            content,
            is_published: is_published !== undefined ? is_published : true,
          }).select().single();
          if (error) {
            if (error.code === "23505") {
              return res.status(400).json({ error: "A blog post with this slug already exists." });
            }
            throw error;
          }
          return res.status(201).json(data);
        }
        if (req.method === "PUT") {
          const { id, ...updates } = req.body;
          if (!id) return res.status(400).json({ error: "Post ID is required." });
          updates.updated_at = new Date().toISOString();
          const { data, error } = await supabase
            .from("blog_posts").update(updates).eq("id", id).select().single();
          if (error) throw error;
          return res.status(200).json(data);
        }
        if (req.method === "DELETE") {
          const { id } = req.body;
          if (!id) return res.status(400).json({ error: "Post ID is required." });
          const { error } = await supabase.from("blog_posts").delete().eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Comments ──────────────────────────────────────
      case "comments": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("blog_comments")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase
            .from("blog_comments")
            .update({ is_read: is_read !== undefined ? is_read : true })
            .eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        if (req.method === "DELETE") {
          const { id } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase.from("blog_comments").delete().eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── CTA Inquiries ────────────────────────────────
      case "cta-inquiries": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("cta_inquiries")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read, status } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const updates: Record<string, unknown> = {};
          if (is_read !== undefined) updates.is_read = is_read;
          if (status) updates.status = status;
          const { error } = await supabase.from("cta_inquiries").update(updates).eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Chat Sessions ────────────────────────────────
      case "chat-sessions": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("chat_sessions")
            .select("*")
            .order("started_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read, status } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const updates: Record<string, unknown> = {};
          if (is_read !== undefined) updates.is_read = is_read;
          if (status) updates.status = status;
          console.log("Chat session update:", { id, updates });
          const { error } = await supabase.from("chat_sessions").update(updates).eq("id", id);
          if (error) {
            console.error("Chat session update error:", error);
            throw error;
          }
          return res.status(200).json({ success: true });
        }
        if (req.method === "DELETE") {
          const { id } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase.from("chat_sessions").delete().eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Chat Messages (read-only for admin) ──────────
      case "chat-messages": {
        if (req.method === "GET") {
          const sessionId = req.query.session_id as string;
          if (!sessionId) return res.status(400).json({ error: "session_id query param required." });
          const { data, error } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("session_id", sessionId)
            .order("created_at", { ascending: true });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Newsletter campaigns ─────────────────────────
      case "newsletter": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("newsletter_campaigns")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
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
        if (req.method === "DELETE") {
          const { id } = req.body;
          if (!id) return res.status(400).json({ error: "Campaign ID is required." });
          const { error } = await supabase.from("newsletter_campaigns").delete().eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      default:
        return res.status(404).json({ error: "Unknown resource." });
    }
  } catch (error) {
    console.error(`Admin ${resource} error:`, error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
