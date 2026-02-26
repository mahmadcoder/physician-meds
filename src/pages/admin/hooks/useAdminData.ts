import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type {
  Tab,
  Contact,
  Consultation,
  Subscriber,
  BlogPost,
  Comment,
  CtaInquiry,
  ChatSession,
} from "../types";

const ADMIN_LOGIN_PATH = "/pm-portal-x9k2";
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour
const SESSION_CHECK_INTERVAL = 60 * 1000; // 1 minute

const API_ENDPOINTS: Record<Exclude<Tab, "overview">, string> = {
  contacts: "/api/admin/contacts",
  consultations: "/api/admin/consultations",
  subscribers: "/api/admin/subscribers",
  blogs: "/api/admin/blogs",
  comments: "/api/admin/comments",
  "cta-inquiries": "/api/admin/cta-inquiries",
  "chat-sessions": "/api/admin/chat-sessions",
};

export function useAdminData() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [ctaInquiries, setCtaInquiries] = useState<CtaInquiry[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    type: "blog" | "comment" | "chat-session";
    id: string;
    message: string;
  } | null>(null);

  const token = localStorage.getItem("admin_token");

  const authHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const redirectToLogin = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_login_time");
    navigate(ADMIN_LOGIN_PATH);
  }, [navigate]);

  const checkSessionExpiry = useCallback(() => {
    const loginTime = localStorage.getItem("admin_login_time");
    if (loginTime && Date.now() - parseInt(loginTime) > SESSION_DURATION) {
      redirectToLogin();
    }
  }, [redirectToLogin]);

  const fetchData = useCallback(
    async (tab: Tab) => {
      if (tab === "overview") return;
      try {
        const response = await fetch(API_ENDPOINTS[tab], {
          headers: authHeaders(),
        });
        if (response.status === 401) {
          redirectToLogin();
          return;
        }
        const data = await response.json();
        const setters: Record<string, (d: never[]) => void> = {
          contacts: setContacts,
          consultations: setConsultations,
          subscribers: setSubscribers,
          blogs: setBlogs,
          comments: setComments,
          "cta-inquiries": setCtaInquiries,
          "chat-sessions": setChatSessions,
        };
        setters[tab]?.(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    },
    [authHeaders, redirectToLogin]
  );

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled(
        Object.entries(API_ENDPOINTS).map(async ([key, url]) => {
          const response = await fetch(url, { headers: authHeaders() });
          if (response.status === 401) {
            redirectToLogin();
            return { key, data: [] };
          }
          const data = await response.json();
          return { key, data };
        })
      );

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const { key, data } = result.value;
          const setters: Record<string, (d: never[]) => void> = {
            contacts: setContacts,
            consultations: setConsultations,
            subscribers: setSubscribers,
            blogs: setBlogs,
            comments: setComments,
            "cta-inquiries": setCtaInquiries,
            "chat-sessions": setChatSessions,
          };
          setters[key]?.(data);
        }
      });
    } catch (err) {
      console.error("Fetch all error:", err);
    } finally {
      setLoading(false);
    }
  }, [authHeaders, redirectToLogin]);

  useEffect(() => {
    if (!token) {
      navigate(ADMIN_LOGIN_PATH);
      return;
    }
    checkSessionExpiry();
    const interval = setInterval(checkSessionExpiry, SESSION_CHECK_INTERVAL);
    fetchAllData();
    return () => clearInterval(interval);
  }, [token, navigate, checkSessionExpiry, fetchAllData]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAsRead = async (
    table: "contacts" | "consultations" | "comments" | "cta-inquiries" | "chat-sessions",
    id: string
  ) => {
    try {
      await fetch(`/api/admin/${table}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ id, is_read: true }),
      });
      fetchData(table as Tab);
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  const updateStatus = async (
    id: string,
    status: string,
    table: "consultations" | "cta-inquiries"
  ) => {
    try {
      await fetch(`/api/admin/${table}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ id, status }),
      });
      fetchData(table);
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const requestDelete = (type: "blog" | "comment" | "chat-session", id: string) => {
    const messages: Record<string, string> = {
      blog: "Are you sure you want to delete this blog post? This action cannot be undone.",
      comment: "Are you sure you want to delete this comment? This action cannot be undone.",
      "chat-session": "Are you sure you want to delete this chat session? This action cannot be undone.",
    };
    setPendingDelete({ type, id, message: messages[type] });
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const { type, id } = pendingDelete;
    const endpoints: Record<string, string> = {
      blog: "/api/admin/blogs",
      comment: "/api/admin/comments",
      "chat-session": "/api/admin/chat-sessions",
    };
    const tabs: Record<string, Tab> = {
      blog: "blogs",
      comment: "comments",
      "chat-session": "chat-sessions",
    };
    await fetch(endpoints[type], {
      method: "DELETE",
      headers: authHeaders(),
      body: JSON.stringify({ id }),
    });
    setPendingDelete(null);
    fetchData(tabs[type]);
  };

  const cancelDelete = () => setPendingDelete(null);

  const deleteBlog = (id: string) => requestDelete("blog", id);
  const deleteComment = (id: string) => requestDelete("comment", id);
  const deleteChatSession = (id: string) => requestDelete("chat-session", id);

  const togglePublish = async (id: string, currentState: boolean) => {
    await fetch("/api/admin/blogs", {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ id, is_published: !currentState }),
    });
    fetchData("blogs");
  };

  const updateChatSessionStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/chat-sessions", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Status update failed:", res.status, err);
        alert(`Status update failed: ${err.error || res.statusText}`);
        return;
      }
      fetchData("chat-sessions");
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status. Check console for details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_login_time");
    navigate(ADMIN_LOGIN_PATH);
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const totalUnread =
    contacts.filter((c) => !c.is_read).length +
    consultations.filter((c) => !c.is_read).length +
    comments.filter((c) => !c.is_read).length +
    ctaInquiries.filter((c) => !c.is_read).length +
    chatSessions.filter((c) => !c.is_read).length;

  return {
    activeTab,
    setActiveTab,
    contacts,
    consultations,
    subscribers,
    blogs,
    comments,
    ctaInquiries,
    chatSessions,
    loading,
    expandedId,
    toggleExpanded,
    sidebarOpen,
    setSidebarOpen,
    notifOpen,
    setNotifOpen,
    notifRef,
    totalUnread,
    markAsRead,
    updateStatus,
    deleteBlog,
    togglePublish,
    deleteComment,
    deleteChatSession,
    updateChatSessionStatus,
    handleLogout,
    pendingDelete,
    confirmDelete,
    cancelDelete,
  };
}
