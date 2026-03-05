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
  NewsletterCampaign,
} from "../types";
import { toast } from "sonner";
import { 
  CheckCircle2, 
  Trash2, 
  RefreshCcw, 
  Globe, 
  EyeOff, 
  LogOut 
} from "lucide-react";

export interface AdminNotification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  created_at: string;
  is_read: boolean;
}

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
  newsletter: "/api/admin/newsletter",
};

export function useAdminData() {
  const navigate = useNavigate();
  const [activeTab, setActiveTabState] = useState<Tab>(() => {
    const saved = sessionStorage.getItem("admin_active_tab");
    return (saved as Tab) || "overview";
  });

  const setActiveTab = useCallback((tab: Tab) => {
    setActiveTabState(tab);
    sessionStorage.setItem("admin_active_tab", tab);
  }, []);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [ctaInquiries, setCtaInquiries] = useState<CtaInquiry[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [newsletterCampaigns, setNewsletterCampaigns] = useState<NewsletterCampaign[]>([]);
  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>([]);
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
          newsletter: setNewsletterCampaigns,
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
            newsletter: setNewsletterCampaigns,
          };
          setters[key]?.(data);
        }
      });

      const notifRes = await fetch("/api/admin/notifications", { headers: authHeaders() });
      if (notifRes.ok) {
        const notifs = await notifRes.json();
        setAdminNotifications(notifs);
      }
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
      const res = await fetch(`/api/admin/${table}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ id, is_read: true }),
      });
      if (!res.ok) throw new Error("Failed to mark as read");
      
      fetchData(table as Tab);
      toast.success("Marked as read", {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        style: {
          background: "#ecfdf5",
          border: "1px solid #a7f3d0",
          color: "#065f46",
        },
      });
    } catch (err) {
      console.error("Mark as read error:", err);
      toast.error("Failed to mark as read");
    }
  };

  const updateStatus = async (
    id: string,
    status: string,
    table: "consultations" | "cta-inquiries"
  ) => {
    try {
      const res = await fetch(`/api/admin/${table}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      fetchData(table);
      toast.success("Status updated successfully", {
        icon: <RefreshCcw className="w-5 h-5 text-blue-500" />,
        style: {
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e3a8a",
        },
      });
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Failed to update status");
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
    
    try {
      const res = await fetch(endpoints[type], {
        method: "DELETE",
        headers: authHeaders(),
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete item");
      
      setPendingDelete(null);
      fetchData(tabs[type]);
      
      const labels: Record<string, string> = {
        blog: "Blog post deleted",
        comment: "Comment deleted",
        "chat-session": "Chat session deleted",
      };
      toast.success(labels[type], {
        icon: <Trash2 className="w-5 h-5 text-red-500" />,
        style: {
          background: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#991b1b",
        },
      });
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete item");
    }
  };

  const cancelDelete = () => setPendingDelete(null);

  const deleteBlog = (id: string) => requestDelete("blog", id);
  const deleteComment = (id: string) => requestDelete("comment", id);
  const deleteChatSession = (id: string) => requestDelete("chat-session", id);

  const togglePublish = async (id: string, currentState: boolean) => {
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ id, is_published: !currentState }),
      });
      if (!res.ok) throw new Error("Failed to update publish status");
      
      fetchData("blogs");
      toast.success(
        currentState ? "Blog post reverted to draft" : "Blog post published",
        {
          icon: currentState ? (
            <EyeOff className="w-5 h-5 text-amber-500" />
          ) : (
            <Globe className="w-5 h-5 text-emerald-500" />
          ),
          style: {
            background: currentState ? "#fffbeb" : "#ecfdf5",
            border: currentState ? "1px solid #fde68a" : "1px solid #a7f3d0",
            color: currentState ? "#92400e" : "#065f46",
          },
        }
      );
    } catch (err) {
      console.error("Toggle publish error:", err);
      toast.error("Failed to update publish status");
    }
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
        toast.error(`Status update failed: ${err.error || res.statusText}`);
        return;
      }
      fetchData("chat-sessions");
      toast.success("Chat session status updated", {
        icon: <RefreshCcw className="w-5 h-5 text-blue-500" />,
        style: {
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e3a8a",
        },
      });
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Failed to update status. Check console for details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_login_time");
    toast.success("Logged out successfully", {
      icon: <LogOut className="w-5 h-5 text-gray-500" />,
      style: {
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        color: "#374151",
      },
    });
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
    chatSessions.filter((c) => !c.is_read).length +
    adminNotifications.filter((n) => !n.is_read).length;

  const refreshNewsletter = () => fetchData("newsletter");

  const refreshNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications", { headers: authHeaders() });
      if (res.ok) setAdminNotifications(await res.json());
    } catch (err) {
      console.error("Fetch notifications error:", err);
    }
  };

  const dismissNotification = async (id: string) => {
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ id, is_read: true }),
      });
      if (!res.ok) throw new Error("Failed to dismiss notification");
      
      setAdminNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    } catch (err) {
      console.error("Dismiss notification error:", err);
    }
  };

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
    newsletterCampaigns,
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
    refreshNewsletter,
    adminNotifications,
    refreshNotifications,
    dismissNotification,
  };
}
