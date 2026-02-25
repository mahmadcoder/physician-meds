import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";
import { sendEmail } from "../_lib/email.js";
import { shouldEmailClient } from "../_lib/chatbot-knowledge.js";
import {
  chatTeamNotificationTemplate,
  chatClientFollowUpTemplate,
} from "../_lib/templates.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({ error: "session_id is required." });
    }

    // Fetch session
    const { data: session, error: sessionError } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("id", session_id)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: "Chat session not found." });
    }

    if (session.status !== "active") {
      return res.status(200).json({ success: true, message: "Session already ended." });
    }

    // Fetch all messages
    const { data: messages } = await supabase
      .from("chat_messages")
      .select("role, content, created_at")
      .eq("session_id", session_id)
      .order("created_at", { ascending: true });

    const chatMessages = messages || [];

    // Mark session as ended
    await supabase
      .from("chat_sessions")
      .update({
        status: "ended",
        ended_at: new Date().toISOString(),
        message_count: chatMessages.length,
      })
      .eq("id", session_id);

    // Smart email decisions
    let emailSentToTeam = false;
    let emailSentToClient = false;

    // Always email the team if there were meaningful messages (more than just greeting)
    if (chatMessages.length >= 2) {
      try {
        await sendEmail({
          to: process.env.EMAIL_USER!,
          subject: `Chat Session: ${session.name} (${session.email})`,
          html: chatTeamNotificationTemplate({
            name: session.name,
            email: session.email,
            phone: session.phone,
            messages: chatMessages,
            startedAt: session.started_at,
          }),
        });
        emailSentToTeam = true;
      } catch (e) {
        console.error("Team email failed:", e);
      }
    }

    // Email client only if they showed service interest
    if (shouldEmailClient(chatMessages)) {
      try {
        await sendEmail({
          to: session.email,
          subject: "Thank you for chatting with PhysicianMeds!",
          html: chatClientFollowUpTemplate({ name: session.name }),
        });
        emailSentToClient = true;
      } catch (e) {
        console.error("Client email failed:", e);
      }
    }

    // Update email flags
    await supabase
      .from("chat_sessions")
      .update({ email_sent_to_team: emailSentToTeam, email_sent_to_client: emailSentToClient })
      .eq("id", session_id);

    return res.status(200).json({ success: true, emailSentToTeam, emailSentToClient });
  } catch (error) {
    console.error("Chat end error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
