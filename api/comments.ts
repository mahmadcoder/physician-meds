import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase.js";
import { sendEmail } from "./_lib/email.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // GET — fetch comments for a specific article
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
        console.error("Comments fetch error:", error);
        return res.status(500).json({ error: "Failed to fetch comments." });
      }

      return res.status(200).json(data || []);
    } catch (err) {
      console.error("GET comments error:", err);
      return res.status(500).json({ error: "Failed to fetch comments.", detail: String(err) });
    }
  }

  // POST — submit a new comment
  if (req.method === "POST") {
    let step = "parsing body";
    try {
      const {
        postSlug,
        authorName,
        authorEmail,
        authorWebsite,
        comment,
        articleTitle,
      } = req.body ?? {};

      step = "validating fields";
      if (!postSlug || !authorName || !authorEmail || !comment) {
        return res.status(400).json({ error: "Name, email, comment, and article slug are required." });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
        return res.status(400).json({ error: "A valid email address is required." });
      }

      step = "inserting into database";
      const { error: dbError } = await supabase.from("blog_comments").insert({
        post_slug: postSlug,
        author_name: authorName,
        author_email: authorEmail,
        author_website: authorWebsite || null,
        comment,
      });

      if (dbError) {
        console.error("Supabase insert error:", JSON.stringify(dbError));
        return res.status(500).json({ error: "Failed to save comment.", detail: dbError.message });
      }

      step = "sending notification email";
      try {
        const title = articleTitle || postSlug;
        const articleUrl = `https://www.physicianmeds.com/blogs/${postSlug}`;

        const emailHtml = `
        <div style="max-width:600px;margin:0 auto;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
          <div style="background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">
            <div style="padding:24px;text-align:center;border-bottom:1px solid #e2e8f0;">
              <h2 style="margin:0;color:#1a1a2e;">Physician<span style="color:#2563eb;">Meds</span></h2>
            </div>
            <div style="padding:24px;">
              <p style="background:#faf5ff;display:inline-block;padding:6px 14px;border-radius:8px;font-weight:700;color:#7c3aed;font-size:15px;">&#128172; New Blog Comment</p>
              <p style="color:#64748b;font-size:14px;">Someone left a comment on your blog article.</p>
              <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;margin-top:16px;">
                <tr><td style="padding:10px 14px;font-weight:600;color:#475569;font-size:13px;border-bottom:1px solid #f1f5f9;">Article</td><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;"><a href="${articleUrl}" style="color:#2563eb;text-decoration:none;font-size:14px;">${title}</a></td></tr>
                <tr style="background:#f8fafc;"><td style="padding:10px 14px;font-weight:600;color:#475569;font-size:13px;border-bottom:1px solid #f1f5f9;">Name</td><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#1e293b;">${authorName}</td></tr>
                <tr><td style="padding:10px 14px;font-weight:600;color:#475569;font-size:13px;border-bottom:1px solid #f1f5f9;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;"><a href="mailto:${authorEmail}" style="color:#2563eb;text-decoration:none;font-size:14px;">${authorEmail}</a></td></tr>
                <tr style="background:#f8fafc;"><td style="padding:10px 14px;font-weight:600;color:#475569;font-size:13px;border-bottom:1px solid #f1f5f9;">Website</td><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#1e293b;">${authorWebsite || "Not provided"}</td></tr>
              </table>
              <div style="margin-top:20px;padding:16px;background:#faf5ff;border-radius:10px;border-left:4px solid #7c3aed;">
                <p style="margin:0 0 6px 0;font-weight:700;color:#7c3aed;font-size:12px;text-transform:uppercase;">Comment</p>
                <p style="margin:0;color:#334155;line-height:1.7;font-size:14px;white-space:pre-wrap;">${comment}</p>
              </div>
              <div style="text-align:center;margin-top:20px;">
                <a href="${articleUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">View Article &rarr;</a>
              </div>
            </div>
          </div>
        </div>`;

        await sendEmail({
          to: process.env.EMAIL_USER!,
          subject: `New Blog Comment on: ${title}`,
          html: emailHtml,
        });
      } catch (emailErr) {
        console.error("Comment notification email failed (data was saved):", emailErr);
      }

      return res.status(200).json({ success: true, message: "Comment posted successfully." });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Comments POST error at step [${step}]:`, err);
      return res.status(500).json({ error: "Internal server error.", step, detail: msg });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
