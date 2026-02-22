import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase.js";
import { sendEmail } from "./_lib/email.js";
import {
  ctaNotificationTemplate,
  ctaConfirmationTemplate,
} from "./_lib/templates.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone, practiceName, monthlyCollection, totalAR, message } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from("cta_inquiries").insert({
      name,
      email,
      phone: phone || null,
      practice_name: practiceName || null,
      monthly_collection: monthlyCollection || null,
      total_ar: totalAR || null,
      message: message || null,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return res.status(500).json({ error: "Failed to save submission." });
    }

    // Send emails (don't block the response if they fail)
    try {
      await Promise.all([
        sendEmail({
          to: process.env.EMAIL_USER!,
          subject: `Practice Assessment Request from ${name}`,
          html: ctaNotificationTemplate({ name, email, phone, practiceName, monthlyCollection, totalAR, message }),
        }),
        sendEmail({
          to: email,
          subject: "We've Received Your Practice Details — PhysicianMeds",
          html: ctaConfirmationTemplate({ name, practiceName, monthlyCollection, totalAR }),
        }),
      ]);
    } catch (emailError) {
      console.error("Email send failed (data was saved):", emailError);
    }

    return res.status(200).json({ success: true, message: "Inquiry submitted successfully." });
  } catch (error) {
    console.error("CTA API error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
