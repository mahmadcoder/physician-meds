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
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
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

// ─── Reusable copy-to-clipboard pill ──────────────────────
function CopyPill({ icon: Icon, value, label }: { icon: typeof Mail; value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-sm text-gray-600 hover:text-gray-900 transition-all group"
      title={`Copy ${label || value}`}
    >
      <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
      <span className="truncate max-w-[200px]">{value}</span>
      {copied ? (
        <Check className="w-3 h-3 text-green-500 ml-0.5" />
      ) : (
        <Copy className="w-3 h-3 text-gray-300 group-hover:text-gray-500 ml-0.5" />
      )}
    </button>
  );
}

// ─── Status badge helper ─────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    converted: "bg-green-100 text-green-700",
    closed: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${config[status] || config.new}`}>
      {status || "new"}
    </span>
  );
}

// ─── Info row helper ─────────────────────────────────────
function InfoRow({ icon: Icon, label, value, className = "" }: { icon: typeof Mail; label: string; value: string; className?: string }) {
  if (!value) return null;
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      <span className="text-gray-500">{label}:</span>
      <span className="text-gray-700 font-medium">{value}</span>
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

      const response = await fetch(endpoints[tab], {
        headers: authHeaders(),
      });

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
      const res = await fetch(`/api/admin/${table}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        console.error("Status update failed:", await res.text());
      }
      fetchData(table);
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
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
    if (!confirm("Are you sure you want to delete this comment?")) return;
    await fetch("/api/admin/comments", {
      method: "DELETE",
      headers: authHeaders(),
      body: JSON.stringify({ id }),
    });
    fetchData("comments");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/pm-portal-x9k2");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
      {/* Admin Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-brand-dark leading-tight">Admin Dashboard</h1>
              <p className="text-xs text-gray-400">Manage your content and submissions</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all"
          >
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
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-brand-blue/10 text-brand-blue"
                }`}>
                  {tab.count}
                </span>
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
              {/* ─── Contacts Tab ─────────────────────────── */}
              {activeTab === "contacts" && (
                <div className="divide-y divide-gray-100">
                  {contacts.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p>No contact submissions yet</p>
                    </div>
                  ) : contacts.map((contact) => (
                    <div key={contact.id} className={`p-5 hover:bg-gray-50/50 transition-colors ${!contact.is_read ? "bg-blue-50/30 border-l-4 border-l-brand-blue" : ""}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}>
                          {/* Header */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-brand-dark">{contact.name}</h3>
                              <p className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(contact.created_at)}
                              </p>
                            </div>
                          </div>
                          {/* Subject */}
                          <p className="text-sm font-medium text-gray-700 mb-2 ml-10">{contact.subject}</p>
                          {/* Contact pills */}
                          <div className="flex items-center gap-2 flex-wrap ml-10">
                            <CopyPill icon={Mail} value={contact.email} label="email" />
                            {contact.phone && <CopyPill icon={Phone} value={contact.phone} label="phone" />}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {!contact.is_read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead("contacts", contact.id)}
                              className="text-xs"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" /> Read
                            </Button>
                          )}
                          <button onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}>
                            {expandedId === contact.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      {expandedId === contact.id && (
                        <div className="mt-4 ml-10 p-4 bg-gray-50 rounded-xl text-sm">
                          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Message</p>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ─── Consultations Tab ────────────────────── */}
              {activeTab === "consultations" && (
                <div className="divide-y divide-gray-100">
                  {consultations.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p>No consultation requests yet</p>
                    </div>
                  ) : consultations.map((consult) => (
                    <div key={consult.id} className={`p-5 hover:bg-gray-50/50 transition-colors ${!consult.is_read ? "bg-blue-50/30 border-l-4 border-l-brand-blue" : ""}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === consult.id ? null : consult.id)}>
                          {/* Header */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-brand-dark">{consult.name}</h3>
                              <StatusBadge status={consult.status} />
                            </div>
                          </div>
                          {/* Info */}
                          <div className="ml-10 space-y-1.5 mb-2">
                            {consult.practice_name && (
                              <InfoRow icon={Building2} label="Practice" value={consult.practice_name} />
                            )}
                            {consult.specialty && (
                              <InfoRow icon={Tag} label="Specialty" value={consult.specialty} />
                            )}
                          </div>
                          {/* Contact pills */}
                          <div className="flex items-center gap-2 flex-wrap ml-10">
                            <CopyPill icon={Mail} value={consult.email} label="email" />
                            {consult.phone && <CopyPill icon={Phone} value={consult.phone} label="phone" />}
                          </div>
                          <p className="text-xs text-gray-400 mt-2 ml-10 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(consult.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-end shrink-0">
                          <select
                            value={consult.status || "new"}
                            onChange={(e) => updateStatus(consult.id, e.target.value, "consultations")}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                          {!consult.is_read && (
                            <Button size="sm" variant="outline" onClick={() => markAsRead("consultations", consult.id)} className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" /> Read
                            </Button>
                          )}
                        </div>
                      </div>
                      {expandedId === consult.id && consult.message && (
                        <div className="mt-4 ml-10 p-4 bg-gray-50 rounded-xl text-sm">
                          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Message</p>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{consult.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ─── Subscribers Tab ──────────────────────── */}
              {activeTab === "subscribers" && (
                <div className="divide-y divide-gray-100">
                  {subscribers.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <Mail className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p>No subscribers yet</p>
                    </div>
                  ) : (
                    <>
                      <div className="px-5 py-3 bg-gray-50 grid grid-cols-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <span>Email</span>
                        <span>Subscribed</span>
                        <span className="text-right">Status</span>
                      </div>
                      {subscribers.map((sub) => (
                        <div key={sub.id} className="px-5 py-3 grid grid-cols-3 items-center hover:bg-gray-50/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                              <Mail className="w-3.5 h-3.5 text-green-600" />
                            </div>
                            <CopyPill icon={Mail} value={sub.email} label="email" />
                          </div>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(sub.subscribed_at)}
                          </span>
                          <span className="text-right">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${
                              sub.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                            }`}>
                              {sub.is_active ? "Active" : "Inactive"}
                            </span>
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* ─── Blogs Tab ────────────────────────────── */}
              {activeTab === "blogs" && (
                <div>
                  <div className="px-5 py-4 border-b border-gray-100">
                    <Link to="/pm-portal-x9k2/blog/new">
                      <Button className="btn-primary text-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        New Blog Post
                      </Button>
                    </Link>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {blogs.length === 0 ? (
                      <div className="text-center py-16 text-gray-400">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                        <p>No blog posts yet</p>
                      </div>
                    ) : blogs.map((post) => (
                      <div key={post.id} className="p-5 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-brand-dark truncate">{post.title}</h3>
                            {post.featured && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[11px] font-medium">Featured</span>
                            )}
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                              post.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                            }`}>
                              {post.is_published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{post.category} • {post.author_name} • {formatDate(post.date)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePublish(post.id, post.is_published)}
                            className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-all"
                            title={post.is_published ? "Unpublish" : "Publish"}
                          >
                            {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <Link
                            to={`/pm-portal-x9k2/blog/edit/${post.id}`}
                            className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteBlog(post.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── Comments Tab ─────────────────────────── */}
              {activeTab === "comments" && (
                <div className="divide-y divide-gray-100">
                  {comments.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p>No blog comments yet</p>
                    </div>
                  ) : comments.map((comment) => (
                    <div key={comment.id} className={`p-5 hover:bg-gray-50/50 transition-colors ${!comment.is_read ? "bg-blue-50/30 border-l-4 border-l-brand-blue" : ""}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === comment.id ? null : comment.id)}>
                          {/* Header */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <MessageCircle className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-brand-dark">{comment.author_name}</h3>
                              <p className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(comment.created_at)}
                              </p>
                            </div>
                          </div>
                          {/* Article link */}
                          <div className="ml-10 mb-2">
                            <p className="text-sm text-gray-600 flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-gray-500">Article:</span>
                              <a href={`/blogs/${comment.post_slug}`} className="text-brand-blue hover:underline font-medium" target="_blank" rel="noreferrer">
                                {comment.post_slug}
                              </a>
                            </p>
                          </div>
                          {/* Contact pills */}
                          <div className="flex items-center gap-2 flex-wrap ml-10">
                            <CopyPill icon={Mail} value={comment.author_email} label="email" />
                            {comment.author_website && (
                              <a
                                href={comment.author_website}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-sm text-gray-600 hover:text-brand-blue transition-all"
                              >
                                <Globe className="w-3.5 h-3.5" />
                                Website
                              </a>
                            )}
                          </div>
                          {/* Preview */}
                          <p className="text-sm text-gray-600 mt-2 ml-10 line-clamp-2">{comment.comment}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {!comment.is_read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead("comments", comment.id)}
                              className="text-xs"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" /> Read
                            </Button>
                          )}
                          <button
                            onClick={() => deleteComment(comment.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => setExpandedId(expandedId === comment.id ? null : comment.id)}>
                            {expandedId === comment.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      {expandedId === comment.id && (
                        <div className="mt-4 ml-10 p-4 bg-gray-50 rounded-xl text-sm">
                          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Full Comment</p>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{comment.comment}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ─── CTA Inquiries Tab ────────────────────── */}
              {activeTab === "cta-inquiries" && (
                <div className="divide-y divide-gray-100">
                  {ctaInquiries.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p>No CTA inquiries yet</p>
                    </div>
                  ) : ctaInquiries.map((inquiry) => (
                    <div key={inquiry.id} className={`p-5 hover:bg-gray-50/50 transition-colors ${!inquiry.is_read ? "bg-amber-50/30 border-l-4 border-l-amber-500" : ""}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}>
                          {/* Header */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Briefcase className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-brand-dark">{inquiry.name}</h3>
                              <StatusBadge status={inquiry.status} />
                            </div>
                          </div>
                          {/* Info rows */}
                          <div className="ml-10 space-y-1.5 mb-2">
                            {inquiry.practice_name && (
                              <InfoRow icon={Building2} label="Practice" value={inquiry.practice_name} />
                            )}
                            <div className="flex items-center gap-4 flex-wrap">
                              {inquiry.monthly_collection && (
                                <InfoRow icon={DollarSign} label="Collection" value={inquiry.monthly_collection} />
                              )}
                              {inquiry.total_ar && (
                                <InfoRow icon={BarChart3} label="Total AR" value={inquiry.total_ar} />
                              )}
                            </div>
                          </div>
                          {/* Contact pills */}
                          <div className="flex items-center gap-2 flex-wrap ml-10">
                            <CopyPill icon={Mail} value={inquiry.email} label="email" />
                            {inquiry.phone && <CopyPill icon={Phone} value={inquiry.phone} label="phone" />}
                          </div>
                          <p className="text-xs text-gray-400 mt-2 ml-10 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(inquiry.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-end shrink-0">
                          <select
                            value={inquiry.status || "new"}
                            onChange={(e) => updateStatus(inquiry.id, e.target.value, "cta-inquiries")}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                          {!inquiry.is_read && (
                            <Button size="sm" variant="outline" onClick={() => markAsRead("cta-inquiries", inquiry.id)} className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" /> Read
                            </Button>
                          )}
                        </div>
                      </div>
                      {expandedId === inquiry.id && (
                        <div className="mt-4 ml-10 p-4 bg-gray-50 rounded-xl text-sm space-y-2">
                          <InfoRow icon={DollarSign} label="Monthly Collection" value={inquiry.monthly_collection || "N/A"} />
                          <InfoRow icon={BarChart3} label="Total AR" value={inquiry.total_ar || "N/A"} />
                          {inquiry.message && (
                            <>
                              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-3 mb-1 pt-2 border-t border-gray-200">Message</p>
                              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{inquiry.message}</p>
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
