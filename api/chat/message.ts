import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";
import { generateReply } from "../_lib/chatbot-engine.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { session_id, message } = req.body;

    if (!session_id || !message) {
      return res.status(400).json({ error: "session_id and message are required." });
    }

    // Fetch session info
    const { data: session, error: sessionError } = await supabase
      .from("chat_sessions")
      .select("id, name, status, message_count")
      .eq("id", session_id)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: "Chat session not found." });
    }

    if (session.status !== "active") {
      return res.status(400).json({ error: "Chat session has ended." });
    }

    // Store user message
    await supabase.from("chat_messages").insert({
      session_id,
      role: "user",
      content: message,
    });

    // Generate rule-based reply (no API key needed)
    const reply = generateReply(message, session.name);

    // Store assistant response
    await supabase.from("chat_messages").insert({
      session_id,
      role: "assistant",
      content: reply,
    });

    // Update message count
    const newCount = (session.message_count || 0) + 2;
    await supabase
      .from("chat_sessions")
      .update({ message_count: newCount })
      .eq("id", session_id);

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat message error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
