import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_lib/supabase.js";
import { verifyToken, verifyAdminPassword, generateToken } from "../_lib/auth.js";

// ─── All admin endpoints in one dynamic route ───────────────────
// /api/admin/login, /api/admin/contacts, /api/admin/consultations,
// /api/admin/subscribers, /api/admin/blogs, /api/admin/comments,
// /api/admin/cta-inquiries, /api/admin/chat-sessions, /api/admin/chat-messages

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const resource = req.query.resource as string;

  // ─── Login (no auth required) ─────────────────────────
  if (resource === "login") {
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

  // ─── All other endpoints require auth ─────────────────
  if (!verifyToken(req)) return res.status(401).json({ error: "Unauthorized" });

  try {
    switch (resource) {
      // ─── Contacts ───────────────────────────────────────
      case "contacts": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("contacts")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase
            .from("contacts")
            .update({ is_read: is_read !== undefined ? is_read : true })
            .eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Consultations ─────────────────────────────────
      case "consultations": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("consultations")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read, status } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const updates: Record<string, unknown> = {};
          if (is_read !== undefined) updates.is_read = is_read;
          if (status) updates.status = status;
          const { error } = await supabase.from("consultations").update(updates).eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Subscribers ───────────────────────────────────
      case "subscribers": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("subscribers")
            .select("*")
            .order("subscribed_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "DELETE") {
          const { id } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase.from("subscribers").update({ is_active: false }).eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Blogs ─────────────────────────────────────────
      case "blogs": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("blog_posts")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "POST") {
          const {
            slug, title, excerpt, category, author_name, author_role,
            image, read_time, tags, featured, content, is_published,
          } = req.body;
          if (!slug || !title || !excerpt || !category || !author_name || !content) {
            return res.status(400).json({ error: "Missing required fields." });
          }
          const { data, error } = await supabase.from("blog_posts").insert({
            slug, title, excerpt, category,
            date: new Date().toISOString(),
            author_name,
            author_role: author_role || "",
            image: image || null,
            read_time: read_time || null,
            tags: tags || [],
            featured: featured || false,
            content,
            is_published: is_published !== undefined ? is_published : true,
          }).select().single();
          if (error) {
            if (error.code === "23505") {
              return res.status(400).json({ error: "A blog post with this slug already exists." });
            }
            throw error;
          }
          return res.status(201).json(data);
        }
        if (req.method === "PUT") {
          const { id, ...updates } = req.body;
          if (!id) return res.status(400).json({ error: "Post ID is required." });
          updates.updated_at = new Date().toISOString();
          const { data, error } = await supabase
            .from("blog_posts").update(updates).eq("id", id).select().single();
          if (error) throw error;
          return res.status(200).json(data);
        }
        if (req.method === "DELETE") {
          const { id } = req.body;
          if (!id) return res.status(400).json({ error: "Post ID is required." });
          const { error } = await supabase.from("blog_posts").delete().eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Comments ──────────────────────────────────────
      case "comments": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("blog_comments")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase
            .from("blog_comments")
            .update({ is_read: is_read !== undefined ? is_read : true })
            .eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        if (req.method === "DELETE") {
          const { id } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase.from("blog_comments").delete().eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── CTA Inquiries ────────────────────────────────
      case "cta-inquiries": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("cta_inquiries")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read, status } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const updates: Record<string, unknown> = {};
          if (is_read !== undefined) updates.is_read = is_read;
          if (status) updates.status = status;
          const { error } = await supabase.from("cta_inquiries").update(updates).eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Chat Sessions ────────────────────────────────
      case "chat-sessions": {
        if (req.method === "GET") {
          const { data, error } = await supabase
            .from("chat_sessions")
            .select("*")
            .order("started_at", { ascending: false });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        if (req.method === "PUT") {
          const { id, is_read, status } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const updates: Record<string, unknown> = {};
          if (is_read !== undefined) updates.is_read = is_read;
          if (status) updates.status = status;
          const { error } = await supabase.from("chat_sessions").update(updates).eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        if (req.method === "DELETE") {
          const { id } = req.body;
          if (!id) return res.status(400).json({ error: "ID is required." });
          const { error } = await supabase.from("chat_sessions").delete().eq("id", id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      // ─── Chat Messages (read-only for admin) ──────────
      case "chat-messages": {
        if (req.method === "GET") {
          const sessionId = req.query.session_id as string;
          if (!sessionId) return res.status(400).json({ error: "session_id query param required." });
          const { data, error } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("session_id", sessionId)
            .order("created_at", { ascending: true });
          if (error) throw error;
          return res.status(200).json(data || []);
        }
        return res.status(405).json({ error: "Method not allowed" });
      }

      default:
        return res.status(404).json({ error: "Unknown resource." });
    }
  } catch (error) {
    console.error(`Admin ${resource} error:`, error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
