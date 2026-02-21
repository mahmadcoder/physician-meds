import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase.js";
import { sendEmail } from "./_lib/email.js";
import { commentNotificationTemplate } from "./_lib/templates.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // GET — fetch comments for a specific article
    if (req.method === "GET") {
      const { slug } = req.query;

      if (!slug || typeof slug !== "string") {
        return res.status(400).json({ error: "Article slug is required." });
      }

      const { data, error } = await supabase
        .from("blog_comments")
        .select("id, author_name, author_website, comment, created_at")
        .eq("post_slug", slug)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Comments fetch error:", error);
        return res.status(500).json({ error: "Failed to fetch comments." });
      }

      return res.status(200).json(data || []);
    }

    // POST — submit a new comment
    if (req.method === "POST") {
      const body = req.body || {};
      const { postSlug, authorName, authorEmail, authorWebsite, comment, articleTitle } = body;

      // Validation
      if (!postSlug || !authorName || !authorEmail || !comment) {
        return res.status(400).json({ error: "Name, email, comment, and article slug are required." });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
        return res.status(400).json({ error: "A valid email address is required." });
      }

      // Save to Supabase
      const { error: dbError } = await supabase.from("blog_comments").insert({
        post_slug: postSlug,
        author_name: authorName,
        author_email: authorEmail,
        author_website: authorWebsite || null,
        comment: comment,
      });

      if (dbError) {
        console.error("Supabase insert error:", JSON.stringify(dbError));
        return res.status(500).json({ error: "Failed to save comment.", detail: dbError.message });
      }

      // Send notification email to team (non-blocking)
      try {
        const emailHtml = commentNotificationTemplate({
          authorName,
          authorEmail,
          authorWebsite: authorWebsite || undefined,
          comment,
          articleTitle: articleTitle || postSlug,
          articleSlug: postSlug,
        });

        await sendEmail({
          to: process.env.EMAIL_USER!,
          subject: `New Blog Comment on: ${articleTitle || postSlug}`,
          html: emailHtml,
        });
      } catch (emailError) {
        console.error("Comment notification email failed (data was saved):", emailError);
      }

      return res.status(200).json({ success: true, message: "Comment posted successfully." });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Comments API error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
