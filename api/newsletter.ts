import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase.js";
import { sendEmail } from "./_lib/email.js";
import { welcomeSubscriberTemplate, newsletterNotificationTemplate } from "./_lib/templates.js";
import crypto from "crypto";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, is_active, unsubscribe_token")
      .eq("email", email.toLowerCase())
      .single();

    let unsubscribeToken: string;

    if (existing) {
      if (!existing.is_active) {
        unsubscribeToken = existing.unsubscribe_token || crypto.randomUUID();
        await supabase
          .from("subscribers")
          .update({
            is_active: true,
            subscribed_at: new Date().toISOString(),
            unsubscribe_token: unsubscribeToken,
          })
          .eq("id", existing.id);
      } else {
        return res.status(200).json({ success: true, message: "You're already subscribed!" });
      }
    } else {
      unsubscribeToken = crypto.randomUUID();
      const { error: dbError } = await supabase.from("subscribers").insert({
        email: email.toLowerCase(),
        unsubscribe_token: unsubscribeToken,
      });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        return res.status(500).json({ error: "Failed to subscribe." });
      }
    }

    try {
      await Promise.all([
        sendEmail({
          to: email,
          subject: "Welcome to PhysicianMeds Newsletter! 🎉",
          html: welcomeSubscriberTemplate(unsubscribeToken),
        }),
        sendEmail({
          to: process.env.EMAIL_USER!,
          subject: "New Newsletter Subscriber",
          html: newsletterNotificationTemplate(email),
        }),
      ]);
    } catch (emailError) {
      console.error("Welcome email failed (subscription saved):", emailError);
    }

    return res.status(200).json({ success: true, message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
