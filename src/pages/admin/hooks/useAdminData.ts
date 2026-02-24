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
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

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
    table: "contacts" | "consultations" | "comments" | "cta-inquiries",
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

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch("/api/admin/blogs", {
      method: "DELETE",
      headers: authHeaders(),
      body: JSON.stringify({ id }),
    });
    fetchData("blogs");
  };

  const togglePublish = async (id: string, currentState: boolean) => {
    await fetch("/api/admin/blogs", {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ id, is_published: !currentState }),
    });
    fetchData("blogs");
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    await fetch("/api/admin/comments", {
      method: "DELETE",
      headers: authHeaders(),
      body: JSON.stringify({ id }),
    });
    fetchData("comments");
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
    ctaInquiries.filter((c) => !c.is_read).length;

  return {
    activeTab,
    setActiveTab,
    contacts,
    consultations,
    subscribers,
    blogs,
    comments,
    ctaInquiries,
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
    handleLogout,
  };
}
