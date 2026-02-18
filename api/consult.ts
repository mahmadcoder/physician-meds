import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase.js";
import { sendEmail } from "./_lib/email.js";
import {
  consultNotificationTemplate,
  consultConfirmationTemplate,
} from "./_lib/templates.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone, practiceName, specialty, message } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from("consultations").insert({
      name,
      email,
      phone,
      practice_name: practiceName || null,
      specialty: specialty || null,
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
          subject: `New Consultation Request from ${name}`,
          html: consultNotificationTemplate({ name, email, phone, practiceName, specialty, message }),
        }),
        sendEmail({
          to: email,
          subject: "Your Consultation Request — PhysicianMeds",
          html: consultConfirmationTemplate({ name }),
        }),
      ]);
    } catch (emailError) {
      console.error("Email send failed (data was saved):", emailError);
    }

    return res.status(200).json({ success: true, message: "Consultation request submitted successfully." });
  } catch (error) {
    console.error("Consult API error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
