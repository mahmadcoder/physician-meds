import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase";
import { sendEmail } from "./_lib/email";
import { welcomeSubscriberTemplate } from "./_lib/templates";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email } = req.body;

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    // Check for duplicate
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, is_active")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      if (!existing.is_active) {
        // Re-activate unsubscribed user
        await supabase
          .from("subscribers")
          .update({ is_active: true, subscribed_at: new Date().toISOString() })
          .eq("id", existing.id);
      } else {
        return res.status(200).json({ success: true, message: "You're already subscribed!" });
      }
    } else {
      // New subscriber
      const { error: dbError } = await supabase.from("subscribers").insert({
        email: email.toLowerCase(),
      });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        return res.status(500).json({ error: "Failed to subscribe." });
      }
    }

    // Send welcome email
    await sendEmail({
      to: email,
      subject: "Welcome to PhysicianMeds Newsletter! 🎉",
      html: welcomeSubscriberTemplate(),
    });

    return res.status(200).json({ success: true, message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
