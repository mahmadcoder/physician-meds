import { useState, useMemo, useCallback } from "react";
import {
  Plus, ArrowLeft, Send, Save, Eye, Trash2, MailCheck,
  CalendarClock, FileText, AlertCircle,
  Loader2, Users, UserCheck, Search, ChevronDown,
} from "lucide-react";
import type { Subscriber, NewsletterCampaign } from "../types";
import EmptyState from "./EmptyState";
import ConfirmModal from "./ConfirmModal";

const TEMPLATES = [
  { id: "general-update", name: "General Update", description: "Monthly updates, tips, and company news", color: "#2563eb", icon: "📬" },
  { id: "blog-highlight", name: "Blog Highlight", description: "Feature a new blog post or article", color: "#7c3aed", icon: "📝" },
  { id: "service-spotlight", name: "Service Spotlight", description: "Highlight a specific medical billing service", color: "#059669", icon: "⭐" },
  { id: "industry-news", name: "Industry News", description: "Regulatory updates and industry changes", color: "#d97706", icon: "📰" },
  { id: "special-announcement", name: "Special Announcement", description: "Important updates and announcements", color: "#dc2626", icon: "📢" },
];

type View = "list" | "create" | "edit";
type StatusFilter = "all" | "sent" | "scheduled" | "draft" | "failed";

interface CampaignForm {
  template_id: string;
  subject: string;
  heading: string;
  body: string;
  cta_text: string;
  cta_url: string;
  recipient_type: "all" | "selected";
  recipient_ids: string[];
  schedule: boolean;
  scheduled_at: string;
}

const emptyForm: CampaignForm = {
  template_id: "",
  subject: "",
  heading: "",
  body: "",
  cta_text: "",
  cta_url: "",
  recipient_type: "all",
  recipient_ids: [],
  schedule: false,
  scheduled_at: "",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function statusBadge(status: string) {
  const map: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    draft: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400", label: "Draft" },
    scheduled: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", label: "Scheduled" },
    sending: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", label: "Sending..." },
    sent: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500", label: "Sent" },
    failed: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", label: "Failed" },
  };
  const s = map[status] || map.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

const LOGO_URL = "https://www.physicianmeds.com/logo.png";

// ─── Email Preview Component ─────────────────────────────
function EmailPreview({ form }: { form: CampaignForm }) {
  const templateStyles: Record<string, { badge: string; badgeBg: string; badgeColor: string; accent: string; accentBg: string }> = {
    "general-update": { badge: "📬 Newsletter Update", badgeBg: "#eff6ff", badgeColor: "#1e40af", accent: "#2563eb", accentBg: "#eff6ff" },
    "blog-highlight": { badge: "📝 New on Our Blog", badgeBg: "#f5f3ff", badgeColor: "#6d28d9", accent: "#7c3aed", accentBg: "#f5f3ff" },
    "service-spotlight": { badge: "⭐ Service Spotlight", badgeBg: "#ecfdf5", badgeColor: "#065f46", accent: "#059669", accentBg: "#ecfdf5" },
    "industry-news": { badge: "📰 Industry Update", badgeBg: "#fffbeb", badgeColor: "#92400e", accent: "#d97706", accentBg: "#fffbeb" },
    "special-announcement": { badge: "📢 Important Update", badgeBg: "#fef2f2", badgeColor: "#991b1b", accent: "#dc2626", accentBg: "#fef2f2" },
  };
  const style = templateStyles[form.template_id] || templateStyles["general-update"];

  if (!form.template_id) {
    return (
      <div className="flex items-center justify-center h-full text-gray-300">
        <div className="text-center">
          <Eye className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium">Select a template to see preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f5f9] rounded-xl p-4 overflow-auto max-h-[600px] [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
      <div className="max-w-[460px] mx-auto bg-white rounded-xl overflow-hidden shadow-sm" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        {/* Header - Real logo like team emails */}
        <div className="text-center px-5 pt-6 pb-4 border-b border-gray-100">
          <a href="https://www.physicianmeds.com" className="block">
            <img src={LOGO_URL} alt="PhysicianMeds" className="w-[52px] h-auto mx-auto mb-3" />
          </a>
          <p className="text-base font-bold">
            <span className="text-gray-900">Physician</span>
            <span className="text-blue-600">Meds</span>
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Healthcare Revenue Management</p>
          <div className="h-0.5 rounded mt-3" style={{ backgroundColor: style.accent }} />
        </div>

        {/* Content - template-specific styling (matches backend templates) */}
        <div className="px-5 py-5">
          {form.template_id === "service-spotlight" && (
            <div className="flex rounded-xl overflow-hidden mb-4 border border-[#d1fae5]" style={{ backgroundColor: style.accentBg }}>
              <div className="w-12 flex items-center justify-center text-xl" style={{ backgroundColor: "#d1fae5" }}>⭐</div>
              <div className="px-4 py-3">
                <p className="text-sm font-bold" style={{ color: style.badgeColor }}>Service Spotlight</p>
                <p className="text-xs text-gray-500">Featured medical billing insight</p>
              </div>
            </div>
          )}
          {form.template_id === "special-announcement" && (
            <div className="rounded-lg py-3 px-4 mb-4" style={{ backgroundColor: style.accentBg, borderTop: `3px solid ${style.accent}` }}>
              <span className="text-xs font-bold" style={{ color: style.badgeColor }}>📢 IMPORTANT ANNOUNCEMENT</span>
            </div>
          )}
          {form.template_id === "industry-news" && (
            <div className="rounded-lg px-3 py-2.5 mb-4" style={{ backgroundColor: style.accentBg, borderTop: `3px solid ${style.accent}` }}>
              <span className="text-xs font-bold block" style={{ color: style.badgeColor }}>📰 INDUSTRY UPDATE</span>
              <span className="text-[10px] text-gray-500">Regulatory & compliance news</span>
            </div>
          )}
          {!["service-spotlight", "special-announcement", "industry-news"].includes(form.template_id) && (
            <div
              className="rounded-lg px-3 py-2 text-xs font-bold mb-4"
              style={{ backgroundColor: style.badgeBg, color: style.badgeColor, borderLeft: form.template_id === "blog-highlight" ? `4px solid ${style.accent}` : undefined }}
            >
              {style.badge}
            </div>
          )}

          <h2 className="text-lg font-bold text-gray-900 leading-snug mb-3">
            {form.heading || "Your headline here..."}
          </h2>

          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {form.body || "Your newsletter content will appear here. Start typing to see a live preview of how your email will look to subscribers."}
          </div>

          {form.cta_text && (
            <div className="text-center mt-6">
              <span
                className="inline-block text-white text-sm font-semibold px-6 py-2.5 rounded-lg"
                style={{ backgroundColor: style.accent }}
              >
                {form.cta_text} →
              </span>
            </div>
          )}
        </div>

        {/* Footer - proper spacing */}
        <div className="bg-gray-50 px-5 py-4 text-center border-t border-gray-100">
          <p className="text-[11px] text-gray-500 font-semibold">PhysicianMeds</p>
          <p className="text-[10px] text-gray-400 mt-0.5">3044 Breckenridge Ln STE102-404, Louisville, KY 40220</p>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-[10px] text-gray-400">
              <span className="underline">Unsubscribe</span>
              <span className="mx-2">·</span>
              <span className="underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────
interface NewsletterTabProps {
  campaigns: NewsletterCampaign[];
  subscribers: Subscriber[];
  onRefresh: () => void;
}

export default function NewsletterTab({ campaigns, subscribers, onRefresh }: NewsletterTabProps) {
  const [view, setView] = useState<View>("list");
  const [form, setForm] = useState<CampaignForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sending, setSending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [subscriberSearch, setSubscriberSearch] = useState("");
  const [showRecipientList, setShowRecipientList] = useState(false);

  const token = localStorage.getItem("admin_token");
  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const activeSubscribers = useMemo(
    () => subscribers.filter((s) => s.is_active),
    [subscribers]
  );

  const filteredCampaigns = useMemo(
    () => statusFilter === "all" ? campaigns : campaigns.filter((c) => c.status === statusFilter),
    [campaigns, statusFilter]
  );

  const filteredSubscribers = useMemo(
    () => activeSubscribers.filter((s) => s.email.toLowerCase().includes(subscriberSearch.toLowerCase())),
    [activeSubscribers, subscriberSearch]
  );

  const isFormValid = form.template_id && form.subject.trim() && form.heading.trim() && form.body.trim();

  const updateForm = useCallback((partial: Partial<CampaignForm>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleRecipient = (id: string) => {
    setForm((prev) => ({
      ...prev,
      recipient_ids: prev.recipient_ids.includes(id)
        ? prev.recipient_ids.filter((r) => r !== id)
        : [...prev.recipient_ids, id],
    }));
  };

  const selectAllRecipients = () => {
    setForm((prev) => ({
      ...prev,
      recipient_ids: prev.recipient_ids.length === activeSubscribers.length
        ? []
        : activeSubscribers.map((s) => s.id),
    }));
  };

  const resetAndGoToList = () => {
    setForm(emptyForm);
    setEditId(null);
    setView("list");
    setShowPreview(false);
    onRefresh();
  };

  const handleCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setView("create");
  };

  const handleEdit = (campaign: NewsletterCampaign) => {
    setForm({
      template_id: campaign.template_id,
      subject: campaign.subject,
      heading: campaign.heading,
      body: campaign.body,
      cta_text: campaign.cta_text || "",
      cta_url: campaign.cta_url || "",
      recipient_type: campaign.recipient_type,
      recipient_ids: campaign.recipient_ids || [],
      schedule: !!campaign.scheduled_at,
      scheduled_at: campaign.scheduled_at ? new Date(campaign.scheduled_at).toISOString().slice(0, 16) : "",
    });
    setEditId(campaign.id);
    setView("edit");
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const payload = { ...form, action: "draft" };
      if (editId) {
        await fetch("/api/admin/newsletter", {
          method: "PUT",
          headers,
          body: JSON.stringify({ id: editId, ...payload }),
        });
      } else {
        await fetch("/api/admin/newsletter", {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }
      resetAndGoToList();
    } catch (e) {
      console.error("Save draft error:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleSend = async () => {
    if (!isFormValid) return;
    setSending(true);
    try {
      if (editId) {
        await fetch("/api/admin/newsletter", {
          method: "PUT",
          headers,
          body: JSON.stringify({ id: editId, action: "send" }),
        });
      } else {
        await fetch("/api/admin/newsletter", {
          method: "POST",
          headers,
          body: JSON.stringify({ ...form, action: "send" }),
        });
      }
      resetAndGoToList();
    } catch (e) {
      console.error("Send error:", e);
    } finally {
      setSending(false);
    }
  };

  const handleSchedule = async () => {
    if (!isFormValid || !form.scheduled_at) return;
    setSending(true);
    try {
      const payload = {
        ...form,
        action: "schedule",
        scheduled_at: new Date(form.scheduled_at).toISOString(),
      };
      if (editId) {
        await fetch("/api/admin/newsletter", {
          method: "PUT",
          headers,
          body: JSON.stringify({ id: editId, ...payload, status: "scheduled" }),
        });
      } else {
        await fetch("/api/admin/newsletter", {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }
      resetAndGoToList();
    } catch (e) {
      console.error("Schedule error:", e);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch("/api/admin/newsletter", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ id: deleteTarget }),
      });
      setDeleteTarget(null);
      onRefresh();
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  // ─── Stats ─────────────────────────────────────────
  const stats = useMemo(() => ({
    total: campaigns.length,
    sent: campaigns.filter((c) => c.status === "sent").length,
    scheduled: campaigns.filter((c) => c.status === "scheduled").length,
    draft: campaigns.filter((c) => c.status === "draft").length,
  }), [campaigns]);

  // ═══════════════════════════════════════════════════
  // Campaign List View
  // ═══════════════════════════════════════════════════
  if (view === "list") {
    return (
      <div className="space-y-5">
        {/* Stats + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { label: "Total", value: stats.total, color: "text-gray-900" },
              { label: "Sent", value: stats.sent, color: "text-green-600" },
              { label: "Scheduled", value: stats.scheduled, color: "text-amber-600" },
              { label: "Drafts", value: stats.draft, color: "text-gray-400" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 px-4 py-2.5 min-w-[100px]">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{s.label}</p>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2d62ff] text-white text-sm font-semibold rounded-xl hover:bg-[#2452d9] transition-colors shadow-sm shadow-blue-200"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {(["all", "sent", "scheduled", "draft", "failed"] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
                statusFilter === f
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Campaign list */}
        {filteredCampaigns.length === 0 ? (
          <EmptyState icon={Send} title="No campaigns yet" description="Create your first newsletter campaign" />
        ) : (
          <div className="space-y-3">
            {filteredCampaigns.map((c) => {
              const tpl = TEMPLATES.find((t) => t.id === c.template_id);
              return (
                <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-200 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        {statusBadge(c.status)}
                        {tpl && (
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            {tpl.icon} {tpl.name}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 truncate">{c.subject}</h3>
                      <p className="text-sm text-gray-500 mt-0.5 truncate">{c.heading}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 shrink-0">
                      {c.status === "sent" && (
                        <span className="flex items-center gap-1">
                          <MailCheck className="w-3.5 h-3.5" />
                          {c.sent_count}/{c.recipient_count}
                        </span>
                      )}
                      {c.status === "scheduled" && c.scheduled_at && (
                        <span className="flex items-center gap-1">
                          <CalendarClock className="w-3.5 h-3.5" />
                          {formatDate(c.scheduled_at)}
                        </span>
                      )}
                      <span>{formatDate(c.created_at)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {(c.status === "draft" || c.status === "scheduled") && (
                        <button
                          onClick={() => handleEdit(c)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                      {(c.status === "draft" || c.status === "failed") && (
                        <button
                          onClick={() => setDeleteTarget(c.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {c.status === "sent" && c.failed_count > 0 && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-red-500">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {c.failed_count} email(s) failed to deliver
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <ConfirmModal
          open={!!deleteTarget}
          message="Are you sure you want to delete this campaign? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════
  // Create / Edit Campaign View
  // ═══════════════════════════════════════════════════
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={resetAndGoToList}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to campaigns
        </button>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-xl border transition-colors sm:hidden ${
            showPreview ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-white text-gray-600 border-gray-200"
          }`}
        >
          <Eye className="w-4 h-4" />
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Form (left side) */}
        <div className={`lg:col-span-3 space-y-5 ${showPreview ? "hidden sm:block" : ""}`}>
          {/* Template picker */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">Choose Template</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateForm({ template_id: t.id })}
                  className={`text-left p-3.5 rounded-xl border-2 transition-all ${
                    form.template_id === t.id
                      ? "border-blue-400 bg-blue-50/50 shadow-sm"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{t.icon}</span>
                    <span className="text-sm font-bold text-gray-900">{t.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-bold text-gray-900">Email Content</h3>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Subject Line</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => updateForm({ subject: e.target.value })}
                placeholder="e.g., March Newsletter: Medical Billing Updates"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Heading</label>
              <input
                type="text"
                value={form.heading}
                onChange={(e) => updateForm({ heading: e.target.value })}
                placeholder="e.g., Stay Ahead in Medical Billing"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Body</label>
              <textarea
                value={form.body}
                onChange={(e) => updateForm({ body: e.target.value })}
                placeholder="Write your newsletter content here..."
                rows={8}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">CTA Button Text <span className="text-gray-300">(optional)</span></label>
                <input
                  type="text"
                  value={form.cta_text}
                  onChange={(e) => updateForm({ cta_text: e.target.value })}
                  placeholder="e.g., Read More"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">CTA Link <span className="text-gray-300">(optional)</span></label>
                <input
                  type="url"
                  value={form.cta_url}
                  onChange={(e) => updateForm({ cta_url: e.target.value })}
                  placeholder="https://www.physicianmeds.com/..."
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Recipients */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-bold text-gray-900">Recipients</h3>

            <div className="flex gap-2">
              <button
                onClick={() => updateForm({ recipient_type: "all", recipient_ids: [] })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  form.recipient_type === "all"
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-gray-100 text-gray-600 hover:border-gray-200"
                }`}
              >
                <Users className="w-4 h-4" />
                All Subscribers ({activeSubscribers.length})
              </button>
              <button
                onClick={() => {
                  updateForm({ recipient_type: "selected" });
                  setShowRecipientList(true);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  form.recipient_type === "selected"
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-gray-100 text-gray-600 hover:border-gray-200"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Select Specific
              </button>
            </div>

            {form.recipient_type === "selected" && (
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="p-3 border-b border-gray-100 flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    value={subscriberSearch}
                    onChange={(e) => setSubscriberSearch(e.target.value)}
                    placeholder="Search subscribers..."
                    className="flex-1 text-sm outline-none"
                  />
                  <button
                    onClick={selectAllRecipients}
                    className="text-[11px] font-bold text-blue-600 hover:underline"
                  >
                    {form.recipient_ids.length === activeSubscribers.length ? "Deselect All" : "Select All"}
                  </button>
                </div>

                <button
                  onClick={() => setShowRecipientList(!showRecipientList)}
                  className="w-full px-3 py-2 flex items-center justify-between text-xs text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <span>{form.recipient_ids.length} selected</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showRecipientList ? "rotate-180" : ""}`} />
                </button>

                {showRecipientList && (
                  <div className="max-h-[200px] overflow-y-auto border-t border-gray-100">
                    {filteredSubscribers.map((sub) => (
                      <label
                        key={sub.id}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={form.recipient_ids.includes(sub.id)}
                          onChange={() => toggleRecipient(sub.id)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 truncate">{sub.email}</span>
                      </label>
                    ))}
                    {filteredSubscribers.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">No subscribers found</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-bold text-gray-900">Delivery</h3>

            <div className="flex gap-2">
              <button
                onClick={() => updateForm({ schedule: false, scheduled_at: "" })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  !form.schedule
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-gray-100 text-gray-600 hover:border-gray-200"
                }`}
              >
                <Send className="w-4 h-4" />
                Send Now
              </button>
              <button
                onClick={() => updateForm({ schedule: true })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  form.schedule
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-gray-100 text-gray-600 hover:border-gray-200"
                }`}
              >
                <CalendarClock className="w-4 h-4" />
                Schedule
              </button>
            </div>

            {form.schedule && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Send Date & Time</label>
                <input
                  type="datetime-local"
                  value={form.scheduled_at}
                  onChange={(e) => updateForm({ scheduled_at: e.target.value })}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={saving || !form.template_id}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Draft
            </button>

            {form.schedule ? (
              <button
                onClick={handleSchedule}
                disabled={sending || !isFormValid || !form.scheduled_at}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 disabled:opacity-40 transition-colors shadow-sm shadow-amber-200"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarClock className="w-4 h-4" />}
                Schedule Campaign
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={sending || !isFormValid}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2d62ff] text-white text-sm font-semibold rounded-xl hover:bg-[#2452d9] disabled:opacity-40 transition-colors shadow-sm shadow-blue-200"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send Now
              </button>
            )}
          </div>

          {/* Validation hints */}
          {!isFormValid && form.template_id && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-700">
                <p className="font-semibold mb-0.5">Complete these fields to send:</p>
                <ul className="list-disc ml-3 space-y-0.5">
                  {!form.subject.trim() && <li>Subject line</li>}
                  {!form.heading.trim() && <li>Heading</li>}
                  {!form.body.trim() && <li>Body content</li>}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Preview (right side) */}
        <div className={`lg:col-span-2 ${showPreview ? "" : "hidden sm:block"}`}>
          <div className="sticky top-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-sm">Email Preview</h3>
                {form.subject && (
                  <span className="text-[11px] text-gray-400 truncate max-w-[180px]">
                    Subject: {form.subject}
                  </span>
                )}
              </div>
              <EmailPreview form={form} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
