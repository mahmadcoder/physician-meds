import { Clock, ChevronRight } from "lucide-react";
import type {
  Tab,
  OverviewCard,
  RecentItem,
  DatePreset,
  DateRange,
  Contact,
  Consultation,
  CtaInquiry,
  Comment,
  Subscriber,
} from "../types";
import DateFilter from "./DateFilter";
import { isInRange } from "../utils/dateUtils";
import AnalyticsChart from "./AnalyticsChart";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface UnreadRow {
  label: string;
  count: number;
  color: string;
}

interface ContentRow {
  label: string;
  value: number;
  color: string;
}

interface OverviewTabProps {
  loading: boolean;
  overviewCards: OverviewCard[];
  recentItems: RecentItem[];
  unreadRows: UnreadRow[];
  contentRows: ContentRow[];
  totalUnread: number;
  dateRange: DateRange;
  datePreset: DatePreset;
  onDateApply: (range: DateRange, preset: DatePreset | null) => void;
  contacts: Contact[];
  consultations: Consultation[];
  ctaInquiries: CtaInquiry[];
  comments: Comment[];
  subscribers: Subscriber[];
  onTabChange: (tab: Tab) => void;
}

export default function OverviewTab({
  loading,
  overviewCards,
  recentItems,
  unreadRows,
  contentRows,
  totalUnread,
  dateRange,
  datePreset,
  onDateApply,
  contacts,
  consultations,
  ctaInquiries,
  comments,
  subscribers,
  onTabChange,
}: OverviewTabProps) {
  const filteredCounts = {
    contacts: contacts.filter((c) => isInRange(c.created_at, dateRange)).length,
    consultations: consultations.filter((c) => isInRange(c.created_at, dateRange)).length,
    ctaInquiries: ctaInquiries.filter((c) => isInRange(c.created_at, dateRange)).length,
    comments: comments.filter((c) => isInRange(c.created_at, dateRange)).length,
    subscribers: subscribers.filter((s) => isInRange(s.subscribed_at, dateRange)).length,
  };

  const filteredCards: OverviewCard[] = overviewCards.map((card) => {
    const keyMap: Record<string, keyof typeof filteredCounts> = {
      contacts: "contacts",
      consultations: "consultations",
      "cta-inquiries": "ctaInquiries",
      comments: "comments",
      subscribers: "subscribers",
    };
    const countKey = keyMap[card.tab];
    return countKey ? { ...card, value: filteredCounts[countKey] } : card;
  });

  return (
    <div className="space-y-6">
      {/* Welcome + date filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-display">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening with your website today.
          </p>
        </div>
        <DateFilter
          activeRange={dateRange}
          activePreset={datePreset}
          onApply={onDateApply}
        />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {filteredCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.tab}
              onClick={() => onTabChange(card.tab)}
              className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 text-left hover:shadow-md hover:border-gray-200 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: card.color + "12" }}
                >
                  <Icon
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    style={{ color: card.color }}
                  />
                </div>
                {card.unread > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600">
                    +{card.unread}
                  </span>
                )}
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 font-display">
                {card.value}
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                {card.label}
              </p>
              <div className="flex items-center gap-1 mt-2 sm:mt-3 text-[11px] sm:text-xs text-gray-400 group-hover:text-[#2d62ff] transition-colors">
                <span>View all</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Analytics Chart */}
      <AnalyticsChart
        dateRange={dateRange}
        contacts={contacts}
        consultations={consultations}
        ctaInquiries={ctaInquiries}
        comments={comments}
        subscribers={subscribers}
      />

      {/* Recent Activity + Quick Stats */}
      <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 font-display">
              Recent Activity
            </h3>
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
              {recentItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="px-4 sm:px-6 py-3.5 flex items-center gap-3 sm:gap-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: item.color + "12" }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">{item.type}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] sm:text-xs text-gray-400">
                        {formatDate(item.date)}
                      </p>
                      {!item.isRead && (
                        <span className="inline-block w-2 h-2 rounded-full bg-[#2d62ff] mt-1" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar stats */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <h3 className="font-bold text-gray-900 font-display mb-4">
              Unread Summary
            </h3>
            <div className="space-y-3">
              {unreadRows.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span
                    className={`text-sm font-bold ${item.count > 0 ? "text-gray-900" : "text-gray-300"}`}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Total Unread
              </span>
              <span className="text-lg font-bold text-[#2d62ff]">
                {totalUnread}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <h3 className="font-bold text-gray-900 font-display mb-4">
              Content Status
            </h3>
            <div className="space-y-3">
              {contentRows.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={`text-sm font-bold ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
