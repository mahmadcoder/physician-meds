import { useState } from "react";
import { Mail, Clock, Copy, Check } from "lucide-react";
import type { Subscriber } from "../types";
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

interface SubscribersTabProps {
  subscribers: Subscriber[];
}

export default function SubscribersTab({ subscribers }: SubscribersTabProps) {
  if (subscribers.length === 0) {
    return <EmptyState icon={Mail} title="No subscribers yet" />;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="hidden sm:grid px-6 py-3.5 bg-gray-50/80 grid-cols-[1fr_180px_100px] gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span>Email</span>
        <span>Subscribed</span>
        <span className="text-right">Status</span>
      </div>

      {subscribers.map((sub) => (
        <SubscriberRow key={sub.id} subscriber={sub} />
      ))}
    </div>
  );
}

function SubscriberRow({ subscriber }: { subscriber: Subscriber }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(subscriber.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="px-4 sm:px-6 py-4 flex flex-col sm:grid sm:grid-cols-[1fr_180px_100px] gap-3 sm:gap-6 sm:items-center hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-b-0">
      {/* Email column - email text + separate copy button */}
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

      {/* Subscribed column - icon and date with clear spacing */}
      <div className="flex items-center gap-2.5 text-sm text-gray-500">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <Clock className="w-4 h-4 text-gray-400" />
        </div>
        <span className="font-medium">{formatDate(subscriber.subscribed_at)}</span>
      </div>

      {/* Status column */}
      <div className="sm:text-right">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
            subscriber.is_active
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${subscriber.is_active ? "bg-green-500" : "bg-gray-400"}`}
          />
          {subscriber.is_active ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}
