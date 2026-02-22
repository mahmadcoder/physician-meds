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
      className={`text-sm font-semibold border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 cursor-pointer ${statusColors[value] || statusColors.new}`}
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
  const [activeTab, setActiveTab] = useState<Tab>("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [ctaInquiries, setCtaInquiries] = useState<CtaInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    fetchData(activeTab);
  }, [activeTab, token, navigate]);

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

  const tabs = [
    { id: "contacts" as Tab, label: "Contacts", icon: MessageSquare, count: contacts.filter(c => !c.is_read).length },
    { id: "consultations" as Tab, label: "Consultations", icon: Users, count: consultations.filter(c => !c.is_read).length },
    { id: "subscribers" as Tab, label: "Subscribers", icon: Mail, count: subscribers.length },
    { id: "blogs" as Tab, label: "Blog Posts", icon: FileText, count: blogs.length },
    { id: "comments" as Tab, label: "Comments", icon: MessageCircle, count: comments.filter(c => !c.is_read).length },
    { id: "cta-inquiries" as Tab, label: "CTA Inquiries", icon: Briefcase, count: ctaInquiries.filter(c => !c.is_read).length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-gray-900 leading-tight">Admin Dashboard</h1>
              <p className="text-xs text-gray-400">Manage your content and submissions</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-brand-blue/10 text-brand-blue"
                }`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
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
                    </div>
                  ) : contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-6 transition-colors hover:bg-gray-50/80 ${!contact.is_read ? "bg-blue-50/40 border-l-[5px] border-l-blue-500" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}>
                          {/* Header row */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
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
                    </div>
                  ) : consultations.map((consult) => (
                    <div
                      key={consult.id}
                      className={`p-6 transition-colors hover:bg-gray-50/80 ${!consult.is_read ? "bg-purple-50/40 border-l-[5px] border-l-purple-500" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === consult.id ? null : consult.id)}>
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
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
                    </div>
                  ) : (
                    <>
                      <div className="px-6 py-3.5 bg-gray-50 grid grid-cols-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
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
                <div>
                  <div className="px-6 py-4 border-b border-gray-100">
                    <Link to="/pm-portal-x9k2/blog/new">
                      <Button className="btn-primary text-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        New Blog Post
                      </Button>
                    </Link>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {blogs.length === 0 ? (
                      <div className="text-center py-20 text-gray-400">
                        <FileText className="w-14 h-14 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No blog posts yet</p>
                      </div>
                    ) : blogs.map((post) => (
                      <div key={post.id} className="p-6 flex items-center justify-between gap-6 hover:bg-gray-50/80 transition-colors">
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
                </div>
              )}

              {/* ═══════════════ COMMENTS TAB ═══════════════ */}
              {activeTab === "comments" && (
                <div className="divide-y divide-gray-100">
                  {comments.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                      <MessageCircle className="w-14 h-14 mx-auto mb-4 opacity-30" />
                      <p className="text-lg font-medium">No blog comments yet</p>
                    </div>
                  ) : comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-6 transition-colors hover:bg-gray-50/80 ${!comment.is_read ? "bg-orange-50/40 border-l-[5px] border-l-orange-500" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === comment.id ? null : comment.id)}>
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-sm">
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
                    </div>
                  ) : ctaInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className={`p-6 transition-colors hover:bg-gray-50/80 ${!inquiry.is_read ? "bg-amber-50/40 border-l-[5px] border-l-amber-500" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}>
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-sm">
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
      </div>
    </div>
  );
};

export default AdminDashboardPage;
