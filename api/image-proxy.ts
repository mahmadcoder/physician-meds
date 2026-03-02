import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_HOST = "vjfzreaqjiztfmmlsskc.supabase.co";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=86400");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const url = req.query.url as string;
  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(url);
  } catch {
    return res.status(400).json({ error: "Invalid url" });
  }

  if (!decoded.startsWith("https://")) {
    return res.status(400).json({ error: "Invalid url scheme" });
  }

  let parsed: URL;
  try {
    parsed = new URL(decoded);
  } catch {
    return res.status(400).json({ error: "Invalid url" });
  }

  if (parsed.hostname !== ALLOWED_HOST || !parsed.pathname.includes("/storage/")) {
    return res.status(403).json({ error: "URL not allowed" });
  }

  try {
    const imgRes = await fetch(decoded, {
      headers: { "User-Agent": "PhysicianMeds-ImageProxy/1.0" },
    });

    if (!imgRes.ok) {
      return res.status(imgRes.status).json({ error: "Failed to fetch image" });
    }

    const contentType = imgRes.headers.get("content-type") || "image/jpeg";
    res.setHeader("Content-Type", contentType);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    return res.send(buffer);
  } catch (err) {
    console.error("Image proxy error:", err);
    return res.status(502).json({ error: "Failed to fetch image" });
  }
}
