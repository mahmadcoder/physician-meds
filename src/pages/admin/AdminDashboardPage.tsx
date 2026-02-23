import { useState, useEffect, useCallback } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { useNavigate, Link } from "react-router-dom";
import {
  FileText,
  MessageSquare,
  MessageCircle,
  Users,
  Mail,
  LogOut,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  Briefcase,
  Phone,
  Copy,
  Check,
  User,
  Building2,
  Globe,
  DollarSign,
  BarChart3,
  Stethoscope,
  MessageSquareText,
  Menu,
  X,
  LayoutDashboard,
  ChevronRight,
  CircleDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ──────────────────────────────────────────────
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  practice_name: string;
  specialty: string;
  message: string;
  created_at: string;
  is_read: boolean;
  status: string;
}

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author_name: string;
  featured: boolean;
  is_published: boolean;
}

interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  author_email: string;
  author_website: string;
  comment: string;
  created_at: string;
  is_read: boolean;
}

interface CtaInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  practice_name: string;
  monthly_collection: string;
  total_ar: string;
  message: string;
  created_at: string;
  is_read: boolean;
  status: string;
}

type Tab = "overview" | "contacts" | "consultations" | "subscribers" | "blogs" | "comments" | "cta-inquiries";

// ─── Copy-to-clipboard button ────────────────────────────
function CopyButton({ icon: Icon, value, color = "blue" }: { icon: typeof Mail; value: string; color?: "blue" | "green" | "purple" | "amber" }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;

  const colorMap = {
    blue:   { bg: "bg-blue-50 hover:bg-blue-100", border: "border-blue-200 hover:border-blue-300", text: "text-blue-700", icon: "text-blue-500" },
    green:  { bg: "bg-emerald-50 hover:bg-emerald-100", border: "border-emerald-200 hover:border-emerald-300", text: "text-emerald-700", icon: "text-emerald-500" },
    purple: { bg: "bg-purple-50 hover:bg-purple-100", border: "border-purple-200 hover:border-purple-300", text: "text-purple-700", icon: "text-purple-500" },
    amber:  { bg: "bg-amber-50 hover:bg-amber-100", border: "border-amber-200 hover:border-amber-300", text: "text-amber-700", icon: "text-amber-500" },
  };
  const c = colorMap[color];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${c.bg} border ${c.border} ${c.text} text-[13px] font-medium transition-all cursor-pointer`}
      title={`Copy ${value}`}
    >
      <Icon className={`w-4 h-4 ${c.icon}`} />
      <span>{value}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-600" />
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-40" />
      )}
    </button>
  );
}

// ─── Status dropdown ─────────────────────────────────────
function StatusSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const statusColors: Record<string, string> = {
    new: "text-blue-700 bg-blue-50 border-blue-200",
    contacted: "text-yellow-700 bg-yellow-50 border-yellow-200",
    converted: "text-green-700 bg-green-50 border-green-200",
    closed: "text-gray-600 bg-gray-50 border-gray-200",
  };
  return (
    <select
      value={value || "new"}
      onChange={(e) => onChange(e.target.value)}
      className={`text-sm font-semibold border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2d62ff]/20 cursor-pointer ${statusColors[value] || statusColors.new}`}
    >
      <option value="new">🆕 New</option>
      <option value="contacted">📞 Contacted</option>
      <option value="converted">✅ Converted</option>
      <option value="closed">🔒 Closed</option>
    </select>
  );
}

// ─── Detail row ──────────────────────────────────────────
function DetailRow({ icon: Icon, label, value, iconColor = "text-gray-400" }: { icon: typeof Mail; label: string; value: string; iconColor?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2.5">
      <Icon className={`w-4 h-4 ${iconColor} shrink-0`} />
      <span className="text-gray-500 text-sm">{label}:</span>
      <span className="text-gray-900 text-sm font-semibold">{value}</span>
    </div>
  );
}

const AdminDashboardPage = () => {
  usePageTitle("Admin Dashboard");
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

  const token = localStorage.getItem("admin_token");

  const authHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  useEffect(() => {
    if (!token) {
      navigate("/pm-portal-x9k2");
      return;
    }
    fetchAllData();
  }, [token, navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const endpoints = {
        contacts: "/api/admin/contacts",
        consultations: "/api/admin/consultations",
        subscribers: "/api/admin/subscribers",
        blogs: "/api/admin/blogs",
        comments: "/api/admin/comments",
        "cta-inquiries": "/api/admin/cta-inquiries",
      };

      const results = await Promise.allSettled(
        Object.entries(endpoints).map(async ([key, url]) => {
          const response = await fetch(url, { headers: authHeaders() });
          if (response.status === 401) {
            localStorage.removeItem("admin_token");
            navigate("/pm-portal-x9k2");
            return { key, data: [] };
          }
          const data = await response.json();
          return { key, data };
        })
      );

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const { key, data } = result.value;
          switch (key) {
            case "contacts": setContacts(data); break;
            case "consultations": setConsultations(data); break;
            case "subscribers": setSubscribers(data); break;
            case "blogs": setBlogs(data); break;
            case "comments": setComments(data); break;
            case "cta-inquiries": setCtaInquiries(data); break;
          }
        }
      });
    } catch (err) {
      console.error("Fetch all error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (tab: Tab) => {
    if (tab === "overview") return;
    try {
      const endpoints: Record<string, string> = {
        contacts: "/api/admin/contacts",
        consultations: "/api/admin/consultations",
        subscribers: "/api/admin/subscribers",
        blogs: "/api/admin/blogs",
        comments: "/api/admin/comments",
        "cta-inquiries": "/api/admin/cta-inquiries",
      };

      const response = await fetch(endpoints[tab], { headers: authHeaders() });

      if (response.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/pm-portal-x9k2");
        return;
      }

      const data = await response.json();

      switch (tab) {
        case "contacts": setContacts(data); break;
        case "consultations": setConsultations(data); break;
        case "subscribers": setSubscribers(data); break;
        case "blogs": setBlogs(data); break;
        case "comments": setComments(data); break;
        case "cta-inquiries": setCtaInquiries(data); break;
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const markAsRead = async (table: "contacts" | "consultations" | "comments" | "cta-inquiries", id: string) => {
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

  const updateStatus = async (id: string, status: string, table: "consultations" | "cta-inquiries") => {
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
    await fetch("/api/admin/blogs", { method: "DELETE", headers: authHeaders(), body: JSON.stringify({ id }) });
    fetchData("blogs");
  };

  const togglePublish = async (id: string, currentState: boolean) => {
    await fetch("/api/admin/blogs", { method: "PUT", headers: authHeaders(), body: JSON.stringify({ id, is_published: !currentState }) });
    fetchData("blogs");
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    await fetch("/api/admin/comments", { method: "DELETE", headers: authHeaders(), body: JSON.stringify({ id }) });
    fetchData("comments");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/pm-portal-x9k2");
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  const totalUnread = contacts.filter(c => !c.is_read).length
    + consultations.filter(c => !c.is_read).length
    + comments.filter(c => !c.is_read).length
    + ctaInquiries.filter(c => !c.is_read).length;

  // Navigation groups — like the reference image
  const navGroups = [
    {
      label: null, // top-level, no group header
      items: [
        { id: "overview" as Tab, label: "Dashboard", icon: LayoutDashboard, count: 0 },
      ],
    },
    {
      label: "INBOX",
      items: [
        { id: "contacts" as Tab, label: "Contacts", icon: MessageSquare, count: contacts.filter(c => !c.is_read).length },
        { id: "consultations" as Tab, label: "Consultations", icon: Users, count: consultations.filter(c => !c.is_read).length },
        { id: "cta-inquiries" as Tab, label: "CTA Inquiries", icon: Briefcase, count: ctaInquiries.filter(c => !c.is_read).length },
      ],
    },
    {
      label: "CONTENT",
      items: [
        { id: "blogs" as Tab, label: "Blog Posts", icon: FileText, count: 0 },
        { id: "comments" as Tab, label: "Comments", icon: MessageCircle, count: comments.filter(c => !c.is_read).length },
      ],
    },
    {
      label: "AUDIENCE",
      items: [
        { id: "subscribers" as Tab, label: "Subscribers", icon: Mail, count: 0 },
      ],
    },
  ];

  const activeNavLabel = navGroups.flatMap(g => g.items).find(i => i.id === activeTab)?.label || "Dashboard";

  // Overview stat cards
  const overviewCards = [
    { label: "Total Contacts", value: contacts.length, unread: contacts.filter(c => !c.is_read).length, icon: MessageSquare, color: "#2d62ff", tab: "contacts" as Tab },
    { label: "Consultations", value: consultations.length, unread: consultations.filter(c => !c.is_read).length, icon: Users, color: "#7c3aed", tab: "consultations" as Tab },
    { label: "CTA Inquiries", value: ctaInquiries.length, unread: ctaInquiries.filter(c => !c.is_read).length, icon: Briefcase, color: "#d97706", tab: "cta-inquiries" as Tab },
    { label: "Subscribers", value: subscribers.length, unread: 0, icon: Mail, color: "#059669", tab: "subscribers" as Tab },
    { label: "Blog Posts", value: blogs.length, unread: 0, icon: FileText, color: "#4f46e5", tab: "blogs" as Tab },
    { label: "Comments", value: comments.length, unread: comments.filter(c => !c.is_read).length, icon: MessageCircle, color: "#ea580c", tab: "comments" as Tab },
  ];

  // Recent activity for overview
  const recentItems = [
    ...contacts.map(c => ({ type: "Contact" as const, name: c.name, date: c.created_at, isRead: c.is_read, icon: MessageSquare, color: "#2d62ff" })),
    ...consultations.map(c => ({ type: "Consultation" as const, name: c.name, date: c.created_at, isRead: c.is_read, icon: Users, color: "#7c3aed" })),
    ...ctaInquiries.map(c => ({ type: "CTA Inquiry" as const, name: c.name, date: c.created_at, isRead: c.is_read, icon: Briefcase, color: "#d97706" })),
    ...comments.map(c => ({ type: "Comment" as const, name: c.author_name, date: c.created_at, isRead: c.is_read, icon: MessageCircle, color: "#ea580c" })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex">
      {/* ═══════════ MOBILE OVERLAY ═══════════ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-[2px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 w-[260px]
        bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-out
        lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="px-5 h-16 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="PhysicianMeds" className="h-9 w-auto" />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Nav Groups */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="px-3 mb-2 text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group
                        ${isActive
                          ? "bg-[#2d62ff] text-white shadow-md shadow-[#2d62ff]/20"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      <item.icon className={`w-[17px] h-[17px] ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.count > 0 && (
                        <span className={`
                          min-w-[20px] h-[20px] flex items-center justify-center rounded-full text-[10px] font-bold
                          ${isActive ? "bg-white/25 text-white" : "bg-red-50 text-red-600"}
                        `}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-[17px] h-[17px]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ═══════════ MAIN ═══════════ */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-bold text-gray-900 font-display">{activeNavLabel}</h1>
            </div>

            {/* Right side — admin info */}
            <div className="flex items-center gap-3">
              {totalUnread > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold">
                  <CircleDot className="w-3 h-3" />
                  {totalUnread} unread
                </span>
              )}
              <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 rounded-lg bg-[#2d62ff] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PM</span>
                </div>
                <span className="hidden sm:block text-sm font-semibold text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          {/* ═══════════ OVERVIEW TAB ═══════════ */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-display">Welcome back 👋</h2>
                <p className="text-sm text-gray-500 mt-1">Here's what's happening with your website today.</p>
              </div>

              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {overviewCards.map((card) => (
                  <button
                    key={card.tab}
                    onClick={() => setActiveTab(card.tab)}
                    className="bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md hover:border-gray-200 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: card.color + "12" }}
                      >
                        <card.icon className="w-5 h-5" style={{ color: card.color }} />
                      </div>
                      {card.unread > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600">
                          +{card.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 font-display">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.label}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs text-gray-400 group-hover:text-[#2d62ff] transition-colors">
                      <span>View all</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Two-column: Recent Activity + Quick Stats */}
              <div className="grid lg:grid-cols-5 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 font-display">Recent Activity</h3>
                    <span className="text-xs text-gray-400">Latest submissions</span>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center py-16">
                      <div className="w-8 h-8 border-3 border-[#2d62ff]/20 border-t-[#2d62ff] rounded-full animate-spin" />
                    </div>
                  ) : recentItems.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-medium">No recent activity</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {recentItems.map((item, i) => (
                        <div key={i} className="px-6 py-3.5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: item.color + "12" }}
                          >
                            <item.icon className="w-4 h-4" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400">{item.type}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
                            {!item.isRead && (
                              <span className="inline-block w-2 h-2 rounded-full bg-[#2d62ff] mt-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Stats Sidebar */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Unread Summary */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 font-display mb-4">Unread Summary</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Contacts", count: contacts.filter(c => !c.is_read).length, color: "#2d62ff" },
                        { label: "Consultations", count: consultations.filter(c => !c.is_read).length, color: "#7c3aed" },
                        { label: "Comments", count: comments.filter(c => !c.is_read).length, color: "#ea580c" },
                        { label: "CTA Inquiries", count: ctaInquiries.filter(c => !c.is_read).length, color: "#d97706" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm text-gray-600">{item.label}</span>
                          </div>
                          <span className={`text-sm font-bold ${item.count > 0 ? "text-gray-900" : "text-gray-300"}`}>
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Total Unread</span>
                      <span className="text-lg font-bold text-[#2d62ff]">{totalUnread}</span>
                    </div>
                  </div>

                  {/* Blog Stats */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 font-display mb-4">Content Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Published Posts</span>
                        <span className="text-sm font-bold text-green-600">{blogs.filter(b => b.is_published).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Draft Posts</span>
                        <span className="text-sm font-bold text-gray-400">{blogs.filter(b => !b.is_published).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Featured Posts</span>
                        <span className="text-sm font-bold text-amber-600">{blogs.filter(b => b.featured).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Active Subscribers</span>
                        <span className="text-sm font-bold text-emerald-600">{subscribers.filter(s => s.is_active).length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ DATA TABS ═══════════ */}
          {activeTab !== "overview" && (
            <>
              {/* Section header */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500">
                  {activeTab === "contacts" && `${contacts.length} total • ${contacts.filter(c => !c.is_read).length} unread`}
                  {activeTab === "consultations" && `${consultations.length} total • ${consultations.filter(c => !c.is_read).length} unread`}
                  {activeTab === "subscribers" && `${subscribers.length} total • ${subscribers.filter(s => s.is_active).length} active`}
                  {activeTab === "blogs" && `${blogs.length} total • ${blogs.filter(b => b.is_published).length} published`}
                  {activeTab === "comments" && `${comments.length} total • ${comments.filter(c => !c.is_read).length} unread`}
                  {activeTab === "cta-inquiries" && `${ctaInquiries.length} total • ${ctaInquiries.filter(c => !c.is_read).length} unread`}
                </p>
                {activeTab === "blogs" && (
                  <Link to="/pm-portal-x9k2/blog/new">
                    <Button className="bg-[#2d62ff] hover:bg-[#1a4fd9] text-white rounded-xl text-sm shadow-md shadow-[#2d62ff]/20">
                      <Plus className="w-4 h-4 mr-2" />
                      New Post
                    </Button>
                  </Link>
                )}
              </div>

              {/* Content card */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <div className="w-8 h-8 border-3 border-[#2d62ff]/20 border-t-[#2d62ff] rounded-full animate-spin" />
                    <p className="text-sm text-gray-400">Loading...</p>
                  </div>
                ) : (
                  <>
                    {/* ─── CONTACTS ─── */}
                    {activeTab === "contacts" && (
                      <div className="divide-y divide-gray-100">
                        {contacts.length === 0 ? (
                          <div className="text-center py-20 text-gray-400">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No contact submissions yet</p>
                            <p className="text-sm mt-1">They'll appear here when visitors submit the contact form.</p>
                          </div>
                        ) : contacts.map((contact) => (
                          <div
                            key={contact.id}
                            className={`p-5 sm:p-6 transition-colors hover:bg-gray-50/50 ${!contact.is_read ? "bg-blue-50/30 border-l-[3px] border-l-[#2d62ff]" : ""}`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}>
                                <div className="flex items-center gap-3 mb-2.5">
                                  <div className="w-9 h-9 bg-[#2d62ff]/10 rounded-lg flex items-center justify-center shrink-0">
                                    <User className="w-4 h-4 text-[#2d62ff]" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-bold text-gray-900">{contact.name}</h3>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {formatDate(contact.created_at)}
                                    </p>
                                  </div>
                                </div>

                                <div className="ml-12 mb-2.5">
                                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-md">
                                    <MessageSquareText className="w-3.5 h-3.5 text-blue-500" />
                                    <span className="text-xs font-semibold text-blue-800">{contact.subject}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap ml-12">
                                  <CopyButton icon={Mail} value={contact.email} color="blue" />
                                  {contact.phone && <CopyButton icon={Phone} value={contact.phone} color="green" />}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {!contact.is_read && (
                                  <Button size="sm" variant="outline" onClick={() => markAsRead("contacts", contact.id)} className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg">
                                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Read
                                  </Button>
                                )}
                                <button onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                  {expandedId === contact.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                </button>
                              </div>
                            </div>

                            {expandedId === contact.id && (
                              <div className="mt-3 ml-12 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Message</p>
                                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ─── CONSULTATIONS ─── */}
                    {activeTab === "consultations" && (
                      <div className="divide-y divide-gray-100">
                        {consultations.length === 0 ? (
                          <div className="text-center py-20 text-gray-400">
                            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No consultation requests yet</p>
                          </div>
                        ) : consultations.map((consult) => (
                          <div
                            key={consult.id}
                            className={`p-5 sm:p-6 transition-colors hover:bg-gray-50/50 ${!consult.is_read ? "bg-purple-50/30 border-l-[3px] border-l-purple-500" : ""}`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === consult.id ? null : consult.id)}>
                                <div className="flex items-center gap-3 mb-2.5">
                                  <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                                    <Users className="w-4 h-4 text-purple-600" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-bold text-gray-900">{consult.name}</h3>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {formatDate(consult.created_at)}
                                    </p>
                                  </div>
                                </div>

                                <div className="ml-12 space-y-1.5 mb-2.5">
                                  {consult.practice_name && <DetailRow icon={Building2} label="Practice" value={consult.practice_name} iconColor="text-purple-500" />}
                                  {consult.specialty && <DetailRow icon={Stethoscope} label="Specialty" value={consult.specialty} iconColor="text-indigo-500" />}
                                </div>

                                <div className="flex items-center gap-2 flex-wrap ml-12">
                                  <CopyButton icon={Mail} value={consult.email} color="purple" />
                                  {consult.phone && <CopyButton icon={Phone} value={consult.phone} color="green" />}
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2 shrink-0">
                                <StatusSelect value={consult.status} onChange={(val) => updateStatus(consult.id, val, "consultations")} />
                                {!consult.is_read && (
                                  <Button size="sm" variant="outline" onClick={() => markAsRead("consultations", consult.id)} className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50 rounded-lg">
                                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Read
                                  </Button>
                                )}
                              </div>
                            </div>

                            {expandedId === consult.id && consult.message && (
                              <div className="mt-3 ml-12 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Message</p>
                                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{consult.message}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ─── SUBSCRIBERS ─── */}
                    {activeTab === "subscribers" && (
                      <div className="divide-y divide-gray-100">
                        {subscribers.length === 0 ? (
                          <div className="text-center py-20 text-gray-400">
                            <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No subscribers yet</p>
                          </div>
                        ) : (
                          <>
                            <div className="px-6 py-3 bg-gray-50/80 grid grid-cols-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <span>Email</span>
                              <span>Subscribed</span>
                              <span className="text-right">Status</span>
                            </div>
                            {subscribers.map((sub) => (
                              <div key={sub.id} className="px-6 py-3.5 grid grid-cols-3 items-center hover:bg-gray-50/50 transition-colors">
                                <CopyButton icon={Mail} value={sub.email} color="green" />
                                <span className="text-sm text-gray-500 flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-gray-300" />
                                  {formatDate(sub.subscribed_at)}
                                </span>
                                <span className="text-right">
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                    sub.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${sub.is_active ? "bg-green-500" : "bg-gray-400"}`} />
                                    {sub.is_active ? "Active" : "Inactive"}
                                  </span>
                                </span>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}

                    {/* ─── BLOGS ─── */}
                    {activeTab === "blogs" && (
                      <div className="divide-y divide-gray-100">
                        {blogs.length === 0 ? (
                          <div className="text-center py-20 text-gray-400">
                            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No blog posts yet</p>
                          </div>
                        ) : blogs.map((post) => (
                          <div key={post.id} className="p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                post.is_published ? "bg-green-50" : "bg-gray-100"
                              }`}>
                                <FileText className={`w-4 h-4 ${post.is_published ? "text-green-600" : "text-gray-400"}`} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                  <h3 className="text-sm font-bold text-gray-900 truncate">{post.title}</h3>
                                  {post.featured && (
                                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-bold">⭐ Featured</span>
                                  )}
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    post.is_published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                                  }`}>
                                    {post.is_published ? "Published" : "Draft"}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {post.category} <span className="text-gray-300 mx-1">•</span>
                                  {post.author_name} <span className="text-gray-300 mx-1">•</span>
                                  {formatDate(post.date)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5 shrink-0">
                              <button
                                onClick={() => togglePublish(post.id, post.is_published)}
                                className={`p-2 rounded-lg transition-all ${post.is_published ? "text-gray-400 hover:text-orange-600 hover:bg-orange-50" : "text-gray-400 hover:text-green-600 hover:bg-green-50"}`}
                                title={post.is_published ? "Unpublish" : "Publish"}
                              >
                                {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <Link to={`/pm-portal-x9k2/blog/edit/${post.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button onClick={() => deleteBlog(post.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ─── COMMENTS ─── */}
                    {activeTab === "comments" && (
                      <div className="divide-y divide-gray-100">
                        {comments.length === 0 ? (
                          <div className="text-center py-20 text-gray-400">
                            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No blog comments yet</p>
                          </div>
                        ) : comments.map((comment) => (
                          <div
                            key={comment.id}
                            className={`p-5 sm:p-6 transition-colors hover:bg-gray-50/50 ${!comment.is_read ? "bg-orange-50/30 border-l-[3px] border-l-orange-500" : ""}`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === comment.id ? null : comment.id)}>
                                <div className="flex items-center gap-3 mb-2.5">
                                  <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                                    <MessageCircle className="w-4 h-4 text-orange-600" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-bold text-gray-900">{comment.author_name}</h3>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {formatDate(comment.created_at)}
                                    </p>
                                  </div>
                                </div>

                                <div className="ml-12 mb-2.5">
                                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 border border-orange-100 rounded-md">
                                    <FileText className="w-3.5 h-3.5 text-orange-500" />
                                    <span className="text-xs text-gray-500">on:</span>
                                    <a href={`/blogs/${comment.post_slug}`} className="text-xs font-semibold text-orange-700 hover:underline" target="_blank" rel="noreferrer">
                                      {comment.post_slug}
                                    </a>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap ml-12">
                                  <CopyButton icon={Mail} value={comment.author_email} color="blue" />
                                  {comment.author_website && (
                                    <a href={comment.author_website} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-[12px] font-medium transition-all">
                                      <Globe className="w-3.5 h-3.5 text-indigo-500" /> Website ↗
                                    </a>
                                  )}
                                </div>

                                <p className="text-sm text-gray-600 mt-2.5 ml-12 line-clamp-2 leading-relaxed">{comment.comment}</p>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {!comment.is_read && (
                                  <Button size="sm" variant="outline" onClick={() => markAsRead("comments", comment.id)} className="text-xs border-orange-200 text-orange-600 hover:bg-orange-50 rounded-lg">
                                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Read
                                  </Button>
                                )}
                                <button onClick={() => deleteComment(comment.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => setExpandedId(expandedId === comment.id ? null : comment.id)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                  {expandedId === comment.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                </button>
                              </div>
                            </div>

                            {expandedId === comment.id && (
                              <div className="mt-3 ml-12 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Full Comment</p>
                                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{comment.comment}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ─── CTA INQUIRIES ─── */}
                    {activeTab === "cta-inquiries" && (
                      <div className="divide-y divide-gray-100">
                        {ctaInquiries.length === 0 ? (
                          <div className="text-center py-20 text-gray-400">
                            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No CTA inquiries yet</p>
                          </div>
                        ) : ctaInquiries.map((inquiry) => (
                          <div
                            key={inquiry.id}
                            className={`p-5 sm:p-6 transition-colors hover:bg-gray-50/50 ${!inquiry.is_read ? "bg-amber-50/30 border-l-[3px] border-l-amber-500" : ""}`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}>
                                <div className="flex items-center gap-3 mb-2.5">
                                  <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                                    <Briefcase className="w-4 h-4 text-amber-600" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-bold text-gray-900">{inquiry.name}</h3>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {formatDate(inquiry.created_at)}
                                    </p>
                                  </div>
                                </div>

                                <div className="ml-12 space-y-1.5 mb-2.5">
                                  {inquiry.practice_name && <DetailRow icon={Building2} label="Practice" value={inquiry.practice_name} iconColor="text-amber-500" />}
                                  <div className="flex items-center gap-5 flex-wrap">
                                    {inquiry.monthly_collection && <DetailRow icon={DollarSign} label="Collection" value={inquiry.monthly_collection} iconColor="text-green-500" />}
                                    {inquiry.total_ar && <DetailRow icon={BarChart3} label="Total AR" value={inquiry.total_ar} iconColor="text-blue-500" />}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap ml-12">
                                  <CopyButton icon={Mail} value={inquiry.email} color="amber" />
                                  {inquiry.phone && <CopyButton icon={Phone} value={inquiry.phone} color="green" />}
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2 shrink-0">
                                <StatusSelect value={inquiry.status} onChange={(val) => updateStatus(inquiry.id, val, "cta-inquiries")} />
                                {!inquiry.is_read && (
                                  <Button size="sm" variant="outline" onClick={() => markAsRead("cta-inquiries", inquiry.id)} className="text-xs border-amber-200 text-amber-600 hover:bg-amber-50 rounded-lg">
                                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Read
                                  </Button>
                                )}
                              </div>
                            </div>

                            {expandedId === inquiry.id && (
                              <div className="mt-3 ml-12 p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1.5">
                                <DetailRow icon={DollarSign} label="Monthly Collection" value={inquiry.monthly_collection || "N/A"} iconColor="text-green-500" />
                                <DetailRow icon={BarChart3} label="Total AR" value={inquiry.total_ar || "N/A"} iconColor="text-blue-500" />
                                {inquiry.message && (
                                  <>
                                    <div className="border-t border-gray-200 my-2" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Message</p>
                                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{inquiry.message}</p>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
