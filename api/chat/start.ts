import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const { data, error } = await supabase
      .from("chat_sessions")
      .insert({ name, email, phone: phone || null, status: 'active' })
      .select()
      .single();

    if (error) {
      console.error("Chat session insert error:", error);
      return res.status(500).json({ error: "Failed to create chat session." });
    }

    return res.status(200).json({ session_id: data.id });
  } catch (error) {
    console.error("Chat start error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
