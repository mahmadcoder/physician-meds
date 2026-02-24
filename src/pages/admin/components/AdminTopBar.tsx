import { Menu, Bell } from "lucide-react";
import type { Tab, RecentItem, SearchResult } from "../types";
import GlobalSearch from "./GlobalSearch";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface AdminTopBarProps {
  title: string;
  totalUnread: number;
  notifOpen: boolean;
  notifRef: React.RefObject<HTMLDivElement | null>;
  recentUnread: RecentItem[];
  searchResults: SearchResult[];
  onToggleSidebar: () => void;
  onToggleNotif: () => void;
  onNotifClick: (tab: Tab) => void;
  onSearchSelect: (tab: Tab, id: string) => void;
}

export default function AdminTopBar({
  title,
  totalUnread,
  notifOpen,
  notifRef,
  recentUnread,
  searchResults,
  onToggleSidebar,
  onToggleNotif,
  onNotifClick,
  onSearchSelect,
}: AdminTopBarProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 font-display">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Global search */}
          <GlobalSearch
            results={searchResults}
            onSelect={onSearchSelect}
          />

          {/* Notification bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={onToggleNotif}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-500" />
              {totalUnread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                  {totalUnread}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900">
                    Notifications
                  </h4>
                  <span className="text-[11px] font-bold text-[#2d62ff] bg-blue-50 px-2 py-0.5 rounded-full">
                    {totalUnread} new
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                  {recentUnread.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-gray-400">
                      All caught up!
                    </div>
                  ) : (
                    recentUnread.slice(0, 6).map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => onNotifClick(item.tab)}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
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
                            <p className="text-[11px] text-gray-400">
                              {item.type} &bull; {formatDate(item.date)}
                            </p>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-[#2d62ff] shrink-0" />
                        </div>
                      );
                    })
                  )}
                </div>
                {totalUnread > 6 && (
                  <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                    <button
                      onClick={() => onNotifClick("contacts")}
                      className="text-xs font-semibold text-[#2d62ff] hover:underline"
                    >
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Admin badge */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
            <div className="w-8 h-8 rounded-lg bg-[#2d62ff] flex items-center justify-center">
              <span className="text-white font-bold text-xs">PM</span>
            </div>
            <span className="hidden sm:block text-sm font-semibold text-gray-700">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
