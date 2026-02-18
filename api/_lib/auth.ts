import jwt from "jsonwebtoken";
import type { VercelRequest } from "@vercel/node";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "fallback_secret";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateToken(): string {
  return jwt.sign({ role: "admin" }, ADMIN_SECRET, { expiresIn: "7d" });
}

export function verifyToken(req: VercelRequest): boolean {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
    const token = authHeader.split(" ")[1];
    jwt.verify(token, ADMIN_SECRET);
    return true;
  } catch {
    return false;
  }
}
