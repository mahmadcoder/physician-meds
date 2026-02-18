import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase";
import { verifyToken } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (!verifyToken(req)) return res.status(401).json({ error: "Unauthorized" });

  try {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    // Remove subscriber
    if (req.method === "DELETE") {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "ID is required." });

      const { error } = await supabase
        .from("subscribers")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Admin subscribers error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
