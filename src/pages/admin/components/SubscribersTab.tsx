import { useState, useMemo } from "react";
import { Mail, Clock, Copy, Check } from "lucide-react";
import type { Subscriber, NewsletterCampaign } from "../types";
import EmptyState from "./EmptyState";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function emailsReceivedBySubscriber(sub: Subscriber, campaigns: NewsletterCampaign[]): number {
  return campaigns.filter(
    (c) =>
      c.status === "sent" &&
      (c.recipient_type === "all" || (c.recipient_ids?.includes(sub.id) ?? false))
  ).length;
}

interface SubscribersTabProps {
  subscribers: Subscriber[];
  campaigns?: NewsletterCampaign[];
}

type SubFilter = "all" | "active" | "inactive";

export default function SubscribersTab({ subscribers, campaigns = [] }: SubscribersTabProps) {
  const [filter, setFilter] = useState<SubFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "active") return subscribers.filter((s) => s.is_active);
    if (filter === "inactive") return subscribers.filter((s) => !s.is_active);
    return subscribers;
  }, [subscribers, filter]);

  const activeCount = subscribers.filter((s) => s.is_active).length;
  const inactiveCount = subscribers.filter((s) => !s.is_active).length;

  if (subscribers.length === 0) {
    return <EmptyState icon={Mail} title="No subscribers yet" />;
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-full sm:w-fit overflow-x-auto">
        {(["all", "active", "inactive"] as SubFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 sm:px-3.5 rounded-lg text-xs font-semibold transition-colors capitalize shrink-0 ${
              filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {f === "all" ? `All (${subscribers.length})` : f === "active" ? `Active (${activeCount})` : `Inactive (${inactiveCount})`}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="hidden sm:grid px-6 py-3.5 bg-gray-50/80 grid-cols-[1fr_140px_100px_80px] gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Email</span>
          <span>Subscribed</span>
          <span className="text-right">Emails sent</span>
          <span className="text-right">Status</span>
        </div>

        {filtered.map((sub) => (
          <SubscriberRow key={sub.id} subscriber={sub} campaigns={campaigns} />
        ))}
      </div>
    </div>
  );
}

function SubscriberRow({ subscriber, campaigns }: { subscriber: Subscriber; campaigns: NewsletterCampaign[] }) {
  const [copied, setCopied] = useState(false);
  const emailsCount = emailsReceivedBySubscriber(subscriber, campaigns);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(subscriber.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="px-4 sm:px-6 py-4 flex flex-col sm:grid sm:grid-cols-[1fr_140px_100px_80px] gap-3 sm:gap-6 sm:items-center hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-b-0">
      {/* Email column */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-sm font-medium text-gray-800 truncate" title={subscriber.email}>
          {subscriber.email}
        </span>
        <button
          onClick={handleCopy}
          className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          title="Copy email"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Subscribed column */}
      <div className="flex items-center gap-2.5 text-sm text-gray-500">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <Clock className="w-4 h-4 text-gray-400" />
        </div>
        <span className="font-medium">{formatDate(subscriber.subscribed_at)}</span>
      </div>

      {/* Emails sent column */}
      <div className="sm:text-right text-sm text-gray-600">
        {emailsCount} newsletter{emailsCount !== 1 ? "s" : ""}
      </div>

      {/* Status column */}
      <div className="sm:text-right">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
            subscriber.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${subscriber.is_active ? "bg-green-500" : "bg-gray-400"}`}
          />
          {subscriber.is_active ? "Active" : "Unsubscribed"}
        </span>
      </div>
    </div>
  );
}
