import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";
import { verifyToken } from "../_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  // Verify admin auth
  if (!verifyToken(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // GET — List all blog posts (including unpublished)
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    // POST — Create new blog post
    if (req.method === "POST") {
      const {
        slug, title, excerpt, category, author_name, author_role,
        image, read_time, tags, featured, content, is_published,
      } = req.body;

      if (!slug || !title || !excerpt || !category || !author_name || !content) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const { data, error } = await supabase.from("blog_posts").insert({
        slug,
        title,
        excerpt,
        category,
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

    // PUT — Update blog post
    if (req.method === "PUT") {
      const { id, ...updates } = req.body;

      if (!id) return res.status(400).json({ error: "Post ID is required." });

      updates.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from("blog_posts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    // DELETE — Delete blog post
    if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) return res.status(400).json({ error: "Post ID is required." });

      const { error } = await supabase.from("blog_posts").delete().eq("id", id);

      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Admin blogs error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
