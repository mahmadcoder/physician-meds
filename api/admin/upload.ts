import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";
import { verifyToken } from "../_lib/auth.js";

const BUCKET = "blog-images";
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!verifyToken(req)) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { fileName, contentType, data } = req.body;

    if (!fileName || !contentType || !data) {
      return res.status(400).json({ error: "fileName, contentType, and data (base64) are required." });
    }

    const buffer = Buffer.from(data, "base64");

    if (buffer.length > MAX_SIZE) {
      return res.status(400).json({ error: "File too large. Maximum size is 5 MB." });
    }

    const ext = fileName.split(".").pop() || "jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { data: existing } = await supabase.storage.getBucket(BUCKET);
    if (!existing) {
      await supabase.storage.createBucket(BUCKET, { public: true });
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(safeName, buffer, {
        contentType,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return res.status(500).json({ error: "Failed to upload image." });
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(uploadData.path);

    return res.status(200).json({ url: urlData.publicUrl });
  } catch (error) {
    console.error("Upload handler error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
