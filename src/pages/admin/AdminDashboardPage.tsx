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
  Bell,
  Search,
  ChevronRight,
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

type Tab = "contacts" | "consultations" | "subscribers" | "blogs" | "comments" | "cta-inquiries";

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

// ─── Analytics Card ──────────────────────────────────────
function StatCard({ icon: Icon, label, total, unread, color, isActive, onClick }: {
  icon: typeof Mail;
  label: string;
  total: number;
  unread: number;
  color: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const colorStyles: Record<string, { gradient: string; iconBg: string; badge: string }> = {
    blue:   { gradient: "from-blue-500/10 to-blue-600/5",   iconBg: "bg-blue-500",   badge: "bg-blue-100 text-blue-700" },
    purple: { gradient: "from-purple-500/10 to-purple-600/5", iconBg: "bg-purple-500", badge: "bg-purple-100 text-purple-700" },
    green:  { gradient: "from-emerald-500/10 to-emerald-600/5", iconBg: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
    indigo: { gradient: "from-indigo-500/10 to-indigo-600/5", iconBg: "bg-indigo-500", badge: "bg-indigo-100 text-indigo-700" },
    orange: { gradient: "from-orange-500/10 to-orange-600/5", iconBg: "bg-orange-500", badge: "bg-orange-100 text-orange-700" },
    amber:  { gradient: "from-amber-500/10 to-amber-600/5",  iconBg: "bg-amber-500",  badge: "bg-amber-100 text-amber-700" },
  };
  const s = colorStyles[color] || colorStyles.blue;

  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-300 group cursor-pointer
        ${isActive
          ? "bg-gradient-to-br " + s.gradient + " border-[#2d62ff]/30 shadow-lg shadow-[#2d62ff]/10 ring-1 ring-[#2d62ff]/20"
          : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
        }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {unread > 0 && (
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.badge} animate-pulse`}>
            {unread} new
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 font-display">{total}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
      <div className="flex items-center gap-1 mt-2 text-xs text-gray-400 group-hover:text-[#2d62ff] transition-colors">
        <span>View all</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    </button>
  );
}

const AdminDashboardPage = () => {
  usePageTitle("Admin Dashboard");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [ctaInquiries, setCtaInquiries] = useState<CtaInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const token = localStorage.getItem("admin_token");

  const authHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  // Fetch all data on initial load for stat cards
  useEffect(() => {
    if (!token) {
      navigate("/pm-portal-x9k2");
      return;
    }
    if (initialLoad) {
      fetchAllData();
      setInitialLoad(false);
    }
  }, [token, navigate]);

  // Fetch tab data on tab change
  useEffect(() => {
    if (!token) return;
    fetchData(activeTab);
  }, [activeTab, token]);

  const fetchAllData = async () => {
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
    setLoading(true);
    try {
      const endpoints: Record<Tab, string> = {
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
    } finally {
      setLoading(false);
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

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good Morning" : now.getHours() < 18 ? "Good Afternoon" : "Good Evening";
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const totalUnread = contacts.filter(c => !c.is_read).length
    + consultations.filter(c => !c.is_read).length
    + comments.filter(c => !c.is_read).length
    + ctaInquiries.filter(c => !c.is_read).length;

  const navItems = [
    { id: "contacts" as Tab, label: "Contacts", icon: MessageSquare, count: contacts.filter(c => !c.is_read).length },
    { id: "consultations" as Tab, label: "Consultations", icon: Users, count: consultations.filter(c => !c.is_read).length },
    { id: "subscribers" as Tab, label: "Subscribers", icon: Mail, count: 0 },
    { id: "blogs" as Tab, label: "Blog Posts", icon: FileText, count: 0 },
    { id: "comments" as Tab, label: "Comments", icon: MessageCircle, count: comments.filter(c => !c.is_read).length },
    { id: "cta-inquiries" as Tab, label: "CTA Inquiries", icon: Briefcase, count: ctaInquiries.filter(c => !c.is_read).length },
  ];

  const statCards = [
    { id: "contacts" as Tab, icon: MessageSquare, label: "Contacts", total: contacts.length, unread: contacts.filter(c => !c.is_read).length, color: "blue" },
    { id: "consultations" as Tab, icon: Users, label: "Consultations", total: consultations.length, unread: consultations.filter(c => !c.is_read).length, color: "purple" },
    { id: "subscribers" as Tab, icon: Mail, label: "Subscribers", total: subscribers.length, unread: 0, color: "green" },
    { id: "blogs" as Tab, icon: FileText, label: "Blog Posts", total: blogs.length, unread: 0, color: "indigo" },
    { id: "comments" as Tab, icon: MessageCircle, label: "Comments", total: comments.length, unread: comments.filter(c => !c.is_read).length, color: "orange" },
    { id: "cta-inquiries" as Tab, icon: Briefcase, label: "CTA Inquiries", total: ctaInquiries.length, unread: ctaInquiries.filter(c => !c.is_read).length, color: "amber" },
  ];

  const activeNavItem = navItems.find(n => n.id === activeTab);

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex">
      {/* ═══════════ SIDEBAR ═══════════ */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-50 w-[280px]
        bg-[#020409] text-white flex flex-col
        transition-transform duration-300 ease-out
        lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo area */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="PhysicianMeds" className="h-10 w-auto" />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 uppercase tracking-[0.2em] font-medium">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="px-3 mb-3 text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">Data Management</p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative
                  ${activeTab === item.id
                    ? "bg-[#2d62ff] text-white shadow-lg shadow-[#2d62ff]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                )}
                <item.icon className={`w-[18px] h-[18px] ${activeTab === item.id ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count > 0 && (
                  <span className={`
                    min-w-[22px] h-[22px] flex items-center justify-center rounded-full text-[11px] font-bold
                    ${activeTab === item.id ? "bg-white/20 text-white" : "bg-[#2d62ff]/20 text-[#2d62ff]"}
                  `}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200/80 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Left: hamburger + breadcrumb */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-gray-400">Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="text-gray-800 font-semibold">{activeNavItem?.label}</span>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Search (decorative) */}
              <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 w-64">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Search...</span>
              </div>

              {/* Notification bell */}
              <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-500" />
                {totalUnread > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </button>

              {/* Admin avatar */}
              <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2d62ff] to-[#1a4fd9] flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">PM</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
                  <p className="text-xs text-gray-400">PhysicianMeds</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display">
              {greeting} 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {dateStr}
            </p>
          </div>

          {/* ═══════════ STAT CARDS ═══════════ */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {statCards.map((card) => (
              <StatCard
                key={card.id}
                icon={card.icon}
                label={card.label}
                total={card.total}
                unread={card.unread}
                color={card.color}
                isActive={activeTab === card.id}
                onClick={() => setActiveTab(card.id)}
              />
            ))}
          </div>

          {/* ═══════════ SECTION HEADER ═══════════ */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              {activeNavItem && (
                <div className="w-10 h-10 rounded-xl bg-[#2d62ff] flex items-center justify-center shadow-lg shadow-[#2d62ff]/25">
                  <activeNavItem.icon className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900 font-display">{activeNavItem?.label}</h2>
                <p className="text-sm text-gray-500">
                  {activeTab === "contacts" && `${contacts.length} submissions • ${contacts.filter(c => !c.is_read).length} unread`}
                  {activeTab === "consultations" && `${consultations.length} requests • ${consultations.filter(c => !c.is_read).length} unread`}
                  {activeTab === "subscribers" && `${subscribers.length} subscribers • ${subscribers.filter(s => s.is_active).length} active`}
                  {activeTab === "blogs" && `${blogs.length} posts • ${blogs.filter(b => b.is_published).length} published`}
                  {activeTab === "comments" && `${comments.length} comments • ${comments.filter(c => !c.is_read).length} unread`}
                  {activeTab === "cta-inquiries" && `${ctaInquiries.length} inquiries • ${ctaInquiries.filter(c => !c.is_read).length} unread`}
                </p>
              </div>
            </div>

            {activeTab === "blogs" && (
              <Link to="/pm-portal-x9k2/blog/new">
                <Button className="bg-[#2d62ff] hover:bg-[#1a4fd9] text-white shadow-lg shadow-[#2d62ff]/25 rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            )}
          </div>

          {/* ═══════════ CONTENT PANEL ═══════════ */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-10 h-10 border-4 border-[#2d62ff]/20 border-t-[#2d62ff] rounded-full animate-spin" />
                <p className="text-sm text-gray-400 font-medium">Loading data...</p>
              </div>
            ) : (
              <>
                {/* ═══════════════ CONTACTS TAB ═══════════════ */}
                {activeTab === "contacts" && (
                  <div className="divide-y divide-gray-100">
                    {contacts.length === 0 ? (
                      <div className="text-center py-20 text-gray-400">
                        <MessageSquare className="w-14 h-14 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No contact submissions yet</p>
                        <p className="text-sm mt-1">When visitors submit the contact form, they'll appear here.</p>
                      </div>
                    ) : contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-5 sm:p-6 transition-colors hover:bg-gray-50/80 ${!contact.is_read ? "bg-blue-50/40 border-l-[4px] border-l-[#2d62ff]" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-4 sm:gap-6">
                          <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}>
                            {/* Header row */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-[16px] font-bold text-gray-900">{contact.name}</h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" /> {formatDate(contact.created_at)}
                                </p>
                              </div>
                            </div>

                            {/* Subject */}
                            <div className="ml-[52px] mb-3">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
                                <MessageSquareText className="w-4 h-4 text-blue-500" />
                                <span className="text-sm font-semibold text-blue-800">{contact.subject}</span>
                              </div>
                            </div>

                            {/* Contact info */}
                            <div className="flex items-center gap-3 flex-wrap ml-[52px]">
                              <CopyButton icon={Mail} value={contact.email} color="blue" />
                              {contact.phone && <CopyButton icon={Phone} value={contact.phone} color="green" />}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {!contact.is_read && (
                              <Button size="sm" variant="outline" onClick={() => markAsRead("contacts", contact.id)} className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50">
                                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Read
                              </Button>
                            )}
                            <button onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                              {expandedId === contact.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>
                          </div>
                        </div>

                        {expandedId === contact.id && (
                          <div className="mt-4 ml-[52px] p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">💬 Message</p>
                            <p className="text-[15px] text-gray-800 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ═══════════════ CONSULTATIONS TAB ═══════════════ */}
                {activeTab === "consultations" && (
                  <div className="divide-y divide-gray-100">
                    {consultations.length === 0 ? (
                      <div className="text-center py-20 text-gray-400">
                        <Users className="w-14 h-14 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No consultation requests yet</p>
                        <p className="text-sm mt-1">Free consultation requests will show up here.</p>
                      </div>
                    ) : consultations.map((consult) => (
                      <div
                        key={consult.id}
                        className={`p-5 sm:p-6 transition-colors hover:bg-gray-50/80 ${!consult.is_read ? "bg-purple-50/40 border-l-[4px] border-l-purple-500" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-4 sm:gap-6">
                          <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === consult.id ? null : consult.id)}>
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                <Users className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-[16px] font-bold text-gray-900">{consult.name}</h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" /> {formatDate(consult.created_at)}
                                </p>
                              </div>
                            </div>

                            {/* Practice & Specialty */}
                            <div className="ml-[52px] space-y-2 mb-3">
                              {consult.practice_name && (
                                <DetailRow icon={Building2} label="Practice" value={consult.practice_name} iconColor="text-purple-500" />
                              )}
                              {consult.specialty && (
                                <DetailRow icon={Stethoscope} label="Specialty" value={consult.specialty} iconColor="text-indigo-500" />
                              )}
                            </div>

                            {/* Contact info */}
                            <div className="flex items-center gap-3 flex-wrap ml-[52px]">
                              <CopyButton icon={Mail} value={consult.email} color="purple" />
                              {consult.phone && <CopyButton icon={Phone} value={consult.phone} color="green" />}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <StatusSelect value={consult.status} onChange={(val) => updateStatus(consult.id, val, "consultations")} />
                            {!consult.is_read && (
                              <Button size="sm" variant="outline" onClick={() => markAsRead("consultations", consult.id)} className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50">
                                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Read
                              </Button>
                            )}
                          </div>
                        </div>

                        {expandedId === consult.id && consult.message && (
                          <div className="mt-4 ml-[52px] p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">💬 Message</p>
                            <p className="text-[15px] text-gray-800 whitespace-pre-wrap leading-relaxed">{consult.message}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ═══════════════ SUBSCRIBERS TAB ═══════════════ */}
                {activeTab === "subscribers" && (
                  <div className="divide-y divide-gray-100">
                    {subscribers.length === 0 ? (
                      <div className="text-center py-20 text-gray-400">
                        <Mail className="w-14 h-14 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No subscribers yet</p>
                        <p className="text-sm mt-1">Newsletter subscribers will appear here.</p>
                      </div>
                    ) : (
                      <>
                        <div className="px-6 py-3.5 bg-gray-50/80 grid grid-cols-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
                          <span>Email</span>
                          <span>Subscribed</span>
                          <span className="text-right">Status</span>
                        </div>
                        {subscribers.map((sub) => (
                          <div key={sub.id} className="px-6 py-4 grid grid-cols-3 items-center hover:bg-gray-50/80 transition-colors">
                            <CopyButton icon={Mail} value={sub.email} color="green" />
                            <span className="text-sm text-gray-600 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              {formatDate(sub.subscribed_at)}
                            </span>
                            <span className="text-right">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                sub.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
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

                {/* ═══════════════ BLOGS TAB ═══════════════ */}
                {activeTab === "blogs" && (
                  <div className="divide-y divide-gray-100">
                    {blogs.length === 0 ? (
                      <div className="text-center py-20 text-gray-400">
                        <FileText className="w-14 h-14 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No blog posts yet</p>
                        <p className="text-sm mt-1">Create your first blog post to get started.</p>
                      </div>
                    ) : blogs.map((post) => (
                      <div key={post.id} className="p-5 sm:p-6 flex items-center justify-between gap-4 sm:gap-6 hover:bg-gray-50/80 transition-colors">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${
                            post.is_published ? "bg-gradient-to-br from-green-400 to-green-600" : "bg-gradient-to-br from-gray-300 to-gray-500"
                          }`}>
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-[15px] font-bold text-gray-900 truncate">{post.title}</h3>
                              {post.featured && (
                                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[11px] font-bold">⭐ Featured</span>
                              )}
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                post.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                              }`}>
                                {post.is_published ? "Published" : "Draft"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{post.category}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              {post.author_name}
                              <span className="mx-2 text-gray-300">•</span>
                              {formatDate(post.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => togglePublish(post.id, post.is_published)}
                            className={`p-2.5 rounded-lg transition-all ${post.is_published ? "text-gray-400 hover:text-orange-600 hover:bg-orange-50" : "text-gray-400 hover:text-green-600 hover:bg-green-50"}`}
                            title={post.is_published ? "Unpublish" : "Publish"}
                          >
                            {post.is_published ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                          </button>
                          <Link
                            to={`/pm-portal-x9k2/blog/edit/${post.id}`}
                            className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit className="w-[18px] h-[18px]" />
                          </Link>
                          <button
                            onClick={() => deleteBlog(post.id)}
                            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-[18px] h-[18px]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ═══════════════ COMMENTS TAB ═══════════════ */}
                {activeTab === "comments" && (
                  <div className="divide-y divide-gray-100">
                    {comments.length === 0 ? (
                      <div className="text-center py-20 text-gray-400">
                        <MessageCircle className="w-14 h-14 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No blog comments yet</p>
                        <p className="text-sm mt-1">Comments on your blog posts will appear here.</p>
                      </div>
                    ) : comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-5 sm:p-6 transition-colors hover:bg-gray-50/80 ${!comment.is_read ? "bg-orange-50/40 border-l-[4px] border-l-orange-500" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-4 sm:gap-6">
                          <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === comment.id ? null : comment.id)}>
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                <MessageCircle className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-[16px] font-bold text-gray-900">{comment.author_name}</h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" /> {formatDate(comment.created_at)}
                                </p>
                              </div>
                            </div>

                            {/* Article link */}
                            <div className="ml-[52px] mb-3">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-lg">
                                <FileText className="w-4 h-4 text-orange-500" />
                                <span className="text-sm text-gray-500">Article:</span>
                                <a href={`/blogs/${comment.post_slug}`} className="text-sm font-semibold text-orange-700 hover:underline" target="_blank" rel="noreferrer">
                                  {comment.post_slug}
                                </a>
                              </div>
                            </div>

                            {/* Contact info */}
                            <div className="flex items-center gap-3 flex-wrap ml-[52px]">
                              <CopyButton icon={Mail} value={comment.author_email} color="blue" />
                              {comment.author_website && (
                                <a
                                  href={comment.author_website}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-[13px] font-medium transition-all"
                                >
                                  <Globe className="w-4 h-4 text-indigo-500" />
                                  Website ↗
                                </a>
                              )}
                            </div>

                            {/* Comment preview */}
                            <p className="text-sm text-gray-600 mt-3 ml-[52px] line-clamp-2 leading-relaxed">{comment.comment}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {!comment.is_read && (
                              <Button size="sm" variant="outline" onClick={() => markAsRead("comments", comment.id)} className="text-xs border-orange-200 text-orange-600 hover:bg-orange-50">
                                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Read
                              </Button>
                            )}
                            <button
                              onClick={() => deleteComment(comment.id)}
                              className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 className="w-[18px] h-[18px]" />
                            </button>
                            <button onClick={() => setExpandedId(expandedId === comment.id ? null : comment.id)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                              {expandedId === comment.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>
                          </div>
                        </div>

                        {expandedId === comment.id && (
                          <div className="mt-4 ml-[52px] p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">💬 Full Comment</p>
                            <p className="text-[15px] text-gray-800 whitespace-pre-wrap leading-relaxed">{comment.comment}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ═══════════════ CTA INQUIRIES TAB ═══════════════ */}
                {activeTab === "cta-inquiries" && (
                  <div className="divide-y divide-gray-100">
                    {ctaInquiries.length === 0 ? (
                      <div className="text-center py-20 text-gray-400">
                        <Briefcase className="w-14 h-14 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No CTA inquiries yet</p>
                        <p className="text-sm mt-1">CTA form submissions will appear here.</p>
                      </div>
                    ) : ctaInquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className={`p-5 sm:p-6 transition-colors hover:bg-gray-50/80 ${!inquiry.is_read ? "bg-amber-50/40 border-l-[4px] border-l-amber-500" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-4 sm:gap-6">
                          <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}>
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                <Briefcase className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-[16px] font-bold text-gray-900">{inquiry.name}</h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" /> {formatDate(inquiry.created_at)}
                                </p>
                              </div>
                            </div>

                            {/* Practice & financials */}
                            <div className="ml-[52px] space-y-2 mb-3">
                              {inquiry.practice_name && (
                                <DetailRow icon={Building2} label="Practice" value={inquiry.practice_name} iconColor="text-amber-500" />
                              )}
                              <div className="flex items-center gap-6 flex-wrap">
                                {inquiry.monthly_collection && (
                                  <DetailRow icon={DollarSign} label="Collection" value={inquiry.monthly_collection} iconColor="text-green-500" />
                                )}
                                {inquiry.total_ar && (
                                  <DetailRow icon={BarChart3} label="Total AR" value={inquiry.total_ar} iconColor="text-blue-500" />
                                )}
                              </div>
                            </div>

                            {/* Contact info */}
                            <div className="flex items-center gap-3 flex-wrap ml-[52px]">
                              <CopyButton icon={Mail} value={inquiry.email} color="amber" />
                              {inquiry.phone && <CopyButton icon={Phone} value={inquiry.phone} color="green" />}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <StatusSelect value={inquiry.status} onChange={(val) => updateStatus(inquiry.id, val, "cta-inquiries")} />
                            {!inquiry.is_read && (
                              <Button size="sm" variant="outline" onClick={() => markAsRead("cta-inquiries", inquiry.id)} className="text-xs border-amber-200 text-amber-600 hover:bg-amber-50">
                                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Read
                              </Button>
                            )}
                          </div>
                        </div>

                        {expandedId === inquiry.id && (
                          <div className="mt-4 ml-[52px] p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                            <DetailRow icon={DollarSign} label="Monthly Collection" value={inquiry.monthly_collection || "N/A"} iconColor="text-green-500" />
                            <DetailRow icon={BarChart3} label="Total AR" value={inquiry.total_ar || "N/A"} iconColor="text-blue-500" />
                            {inquiry.message && (
                              <>
                                <div className="border-t border-gray-200 my-3" />
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">💬 Message</p>
                                <p className="text-[15px] text-gray-800 whitespace-pre-wrap leading-relaxed">{inquiry.message}</p>
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
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
