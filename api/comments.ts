import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase.js";
import { sendEmail } from "./_lib/email.js";
import { commentNotificationTemplate } from "./_lib/templates.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    try {
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
        console.error("Comments fetch error:", JSON.stringify(error));
        return res.status(500).json({
          error: "Failed to fetch comments.",
          detail: error.message,
          code: error.code,
          hint: error.hint,
        });
      }

      return res.status(200).json(data || []);
    } catch (err) {
      console.error("GET comments error:", err);
      return res.status(500).json({ error: "Failed to fetch comments.", detail: String(err) });
    }
  }

  if (req.method === "POST") {
    try {
      const {
        postSlug,
        authorName,
        authorEmail,
        authorWebsite,
        comment,
        articleTitle,
      } = req.body ?? {};

      if (!postSlug || !authorName || !authorEmail || !comment) {
        return res.status(400).json({ error: "Name, email, comment, and article slug are required." });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
        return res.status(400).json({ error: "A valid email address is required." });
      }

      const { error: dbError } = await supabase.from("blog_comments").insert({
        post_slug: postSlug,
        author_name: authorName,
        author_email: authorEmail,
        author_website: authorWebsite || null,
        comment,
      });

      if (dbError) {
        console.error("Supabase insert error:", JSON.stringify(dbError));
        return res.status(500).json({
          error: "Failed to save comment.",
          detail: dbError.message,
          code: dbError.code,
          hint: dbError.hint,
        });
      }

      try {
        const title = articleTitle || postSlug;
        await sendEmail({
          to: process.env.EMAIL_USER!,
          subject: `New Blog Comment on: ${title}`,
          html: commentNotificationTemplate({
            authorName,
            authorEmail,
            authorWebsite,
            comment,
            articleTitle: title,
            articleSlug: postSlug,
          }),
        });
      } catch (emailErr) {
        console.error("Comment notification email failed (data was saved):", emailErr);
      }

      return res.status(200).json({ success: true, message: "Comment posted successfully." });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Comments POST error:", err);
      return res.status(500).json({ error: "Internal server error.", detail: msg });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
