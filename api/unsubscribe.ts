import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase.js";
import { sendEmail } from "./_lib/email.js";
import {
  unsubscribeConfirmationTemplate,
  unsubscribeTeamNotificationTemplate,
} from "./_lib/templates.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const token = (req.query.token as string) || req.body?.token;

  if (!token) {
    return res.status(400).json({ error: "Unsubscribe token is required." });
  }

  try {
    const { data: subscriber, error: lookupError } = await supabase
      .from("subscribers")
      .select("id, email, is_active")
      .eq("unsubscribe_token", token)
      .single();

    if (lookupError || !subscriber) {
      return res.status(404).json({ error: "Invalid or expired unsubscribe link." });
    }

    if (!subscriber.is_active) {
      return res.status(200).json({ success: true, message: "You are already unsubscribed.", email: subscriber.email });
    }

    // GET = verify token is valid (for the frontend page)
    if (req.method === "GET") {
      return res.status(200).json({ success: true, email: subscriber.email });
    }

    // POST = actually unsubscribe
    if (req.method === "POST") {
      const { error: updateError } = await supabase
        .from("subscribers")
        .update({ is_active: false })
        .eq("id", subscriber.id);

      if (updateError) {
        console.error("Unsubscribe update error:", updateError);
        return res.status(500).json({ error: "Failed to unsubscribe." });
      }

      try {
        await Promise.all([
          sendEmail({
            to: subscriber.email,
            subject: "You've Been Unsubscribed — PhysicianMeds",
            html: unsubscribeConfirmationTemplate(),
          }),
          sendEmail({
            to: process.env.EMAIL_USER!,
            subject: "Newsletter Unsubscribe",
            html: unsubscribeTeamNotificationTemplate(subscriber.email),
          }),
        ]);
      } catch (emailError) {
        console.error("Unsubscribe notification emails failed:", emailError);
      }

      await supabase.from("admin_notifications").insert({
        type: "unsubscribed",
        title: "User unsubscribed",
        message: `${subscriber.email} unsubscribed from the newsletter.`,
      });

      return res.status(200).json({ success: true, message: "Successfully unsubscribed.", email: subscriber.email });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Unsubscribe API error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
