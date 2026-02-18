import { useState, useEffect, useCallback } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { useNavigate, Link } from "react-router-dom";
import {
  FileText,
  MessageSquare,
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

type Tab = "contacts" | "consultations" | "subscribers" | "blogs";

const AdminDashboardPage = () => {
  usePageTitle("Admin Dashboard");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
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
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (table: "contacts" | "consultations", id: string) => {
    await fetch(`/api/admin/${table}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ id, is_read: true }),
    });
    fetchData(table);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/consultations", {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ id, status }),
    });
    fetchData("consultations");
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Manage your content and submissions</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-gray-600 hover:text-red-600 hover:border-red-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

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
              {/* Contacts Tab */}
              {activeTab === "contacts" && (
                <div className="divide-y divide-gray-100">
                  {contacts.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p>No contact submissions yet</p>
                    </div>
                  ) : contacts.map((contact) => (
                    <div key={contact.id} className={`p-5 ${!contact.is_read ? "bg-blue-50/30" : ""}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}>
                          <div className="flex items-center gap-2 mb-1">
                            {!contact.is_read && <div className="w-2 h-2 bg-brand-blue rounded-full" />}
                            <h3 className="font-semibold text-brand-dark">{contact.name}</h3>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{contact.email}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-700">{contact.subject}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {formatDate(contact.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
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
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm">
                          <p className="text-gray-500 mb-1"><strong>Phone:</strong> {contact.phone || "N/A"}</p>
                          <p className="text-gray-700 whitespace-pre-wrap mt-2">{contact.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Consultations Tab */}
              {activeTab === "consultations" && (
                <div className="divide-y divide-gray-100">
                  {consultations.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p>No consultation requests yet</p>
                    </div>
                  ) : consultations.map((consult) => (
                    <div key={consult.id} className={`p-5 ${!consult.is_read ? "bg-blue-50/30" : ""}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === consult.id ? null : consult.id)}>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {!consult.is_read && <div className="w-2 h-2 bg-brand-blue rounded-full" />}
                            <h3 className="font-semibold text-brand-dark">{consult.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                              consult.status === "new" ? "bg-blue-100 text-blue-700" :
                              consult.status === "contacted" ? "bg-yellow-100 text-yellow-700" :
                              consult.status === "converted" ? "bg-green-100 text-green-700" :
                              "bg-gray-100 text-gray-600"
                            }`}>
                              {consult.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{consult.email} • {consult.phone}</p>
                          {consult.practice_name && <p className="text-sm text-gray-600 mt-1">Practice: {consult.practice_name}</p>}
                          <p className="text-xs text-gray-400 mt-1">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {formatDate(consult.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          <select
                            value={consult.status}
                            onChange={(e) => updateStatus(consult.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
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
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm">
                          <p className="text-gray-500 mb-1"><strong>Specialty:</strong> {consult.specialty || "N/A"}</p>
                          <p className="text-gray-700 whitespace-pre-wrap mt-2">{consult.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Subscribers Tab */}
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
                        <div key={sub.id} className="px-5 py-3 grid grid-cols-3 items-center">
                          <span className="text-sm text-gray-700 truncate">{sub.email}</span>
                          <span className="text-sm text-gray-500">{formatDate(sub.subscribed_at)}</span>
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

              {/* Blogs Tab */}
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
                      <div key={post.id} className="p-5 flex items-center justify-between gap-4">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
