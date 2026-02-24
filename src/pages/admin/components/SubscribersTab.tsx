import { Mail, Clock } from "lucide-react";
import type { Subscriber } from "../types";
import CopyButton from "./CopyButton";
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
      {/* Header - hidden on mobile, shown as table header on larger screens */}
      <div className="hidden sm:grid px-6 py-3 bg-gray-50/80 grid-cols-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span>Email</span>
        <span>Subscribed</span>
        <span className="text-right">Status</span>
      </div>

      {subscribers.map((sub) => (
        <div
          key={sub.id}
          className="px-4 sm:px-6 py-3.5 flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-0 sm:items-center hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-b-0"
        >
          <CopyButton icon={Mail} value={sub.email} />

          <span className="text-sm text-gray-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-300" />
            {formatDate(sub.subscribed_at)}
          </span>

          <span className="sm:text-right">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                sub.is_active
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${sub.is_active ? "bg-green-500" : "bg-gray-400"}`}
              />
              {sub.is_active ? "Active" : "Inactive"}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
