import { X, LogOut } from "lucide-react";
import type { Tab, NavGroup } from "../types";

interface AdminSidebarProps {
  navGroups: NavGroup[];
  activeTab: Tab;
  sidebarOpen: boolean;
  onTabChange: (tab: Tab) => void;
  onClose: () => void;
  onLogout: () => void;
}

export default function AdminSidebar({
  navGroups,
  activeTab,
  sidebarOpen,
  onTabChange,
  onClose,
  onLogout,
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 w-[260px]
          bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="px-5 h-16 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="PhysicianMeds" className="h-8 w-auto" />
            <span className="text-[15px] font-bold text-gray-900 font-display">
              PhysicianMeds
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="px-3 mb-2 text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-[#2d62ff] text-white shadow-md shadow-[#2d62ff]/20"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      <Icon
                        className={`w-[17px] h-[17px] ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.count > 0 && (
                        <span
                          className={`
                            min-w-[20px] h-[20px] flex items-center justify-center rounded-full text-[10px] font-bold
                            ${
                              isActive
                                ? "bg-white/25 text-white"
                                : "bg-red-50 text-red-600"
                            }
                          `}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-[17px] h-[17px]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
