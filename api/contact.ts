import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase";
import { sendEmail } from "./_lib/email";
import { contactNotificationTemplate } from "./_lib/templates";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Name, email, subject, and message are required." });
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from("contacts").insert({
      name,
      email,
      phone: phone || null,
      subject,
      message,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return res.status(500).json({ error: "Failed to save submission." });
    }

    // Send email notification to team
    await sendEmail({
      to: process.env.EMAIL_USER!,
      subject: `New Contact: ${subject}`,
      html: contactNotificationTemplate({ name, email, phone, subject, message }),
    });

    return res.status(200).json({ success: true, message: "Contact form submitted successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
