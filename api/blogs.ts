import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { slug, category } = req.query;

    // If slug provided, return single blog post
    if (slug && typeof slug === "string") {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: "Blog post not found." });
      }

      return res.status(200).json(data);
    }

    // Otherwise, return all published posts
    let query = supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: false });

    // Filter by category if provided
    if (category && typeof category === "string" && category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Blog fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch blogs." });
    }

    return res.status(200).json(data || []);
  } catch (error) {
    console.error("Blogs API error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
