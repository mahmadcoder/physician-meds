import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAdminPassword, generateToken } from "../_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { password } = req.body;

    if (!password || !verifyAdminPassword(password)) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const token = generateToken();
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
