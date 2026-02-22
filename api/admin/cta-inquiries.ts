import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";
import { verifyToken } from "../_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (!verifyToken(req)) return res.status(401).json({ error: "Unauthorized" });

  try {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("cta_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    // Update status or mark as read
    if (req.method === "PUT") {
      const { id, is_read, status } = req.body;
      if (!id) return res.status(400).json({ error: "ID is required." });

      const updates: Record<string, unknown> = {};
      if (is_read !== undefined) updates.is_read = is_read;
      if (status) updates.status = status;

      const { error } = await supabase
        .from("cta_inquiries")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Admin CTA inquiries error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
