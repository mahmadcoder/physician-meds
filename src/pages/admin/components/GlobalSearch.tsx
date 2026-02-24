import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { SearchResult, Tab } from "../types";

interface GlobalSearchProps {
  results: SearchResult[];
  onSelect: (tab: Tab, id: string) => void;
}

export default function GlobalSearch({ results, onSelect }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return results
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.detail.toLowerCase().includes(q) ||
          r.tabLabel.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, results]);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSelect = (result: SearchResult) => {
    onSelect(result.tab, result.id);
    setOpen(false);
    setQuery("");
  };

  const tabColors: Record<string, string> = {
    contacts: "bg-[#2d62ff]/10 text-[#2d62ff]",
    consultations: "bg-purple-50 text-purple-600",
    "cta-inquiries": "bg-amber-50 text-amber-600",
    blogs: "bg-indigo-50 text-indigo-600",
    comments: "bg-orange-50 text-orange-600",
    subscribers: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-400 text-sm transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold text-gray-400 bg-white border border-gray-200 rounded">
          Ctrl K
        </kbd>
      </button>

      {/* Search modal / dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[1px]" onClick={() => { setOpen(false); setQuery(""); }} />
          <div className="fixed left-1/2 top-[15%] -translate-x-1/2 w-[90vw] max-w-lg z-50">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 border-b border-gray-100">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search contacts, consultations, blogs..."
                  className="flex-1 py-4 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {query.trim() && filtered.length === 0 && (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm text-gray-400">
                      No results for "{query}"
                    </p>
                  </div>
                )}

                {filtered.length > 0 && (
                  <div className="py-2">
                    {filtered.map((result) => {
                      const Icon = result.icon;
                      return (
                        <button
                          key={`${result.tab}-${result.id}`}
                          onClick={() => handleSelect(result)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: result.color + "12" }}
                          >
                            <Icon
                              className="w-4 h-4"
                              style={{ color: result.color }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {result.name}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate">
                              {result.detail}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${tabColors[result.tab] || "bg-gray-100 text-gray-500"}`}
                          >
                            {result.tabLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {!query.trim() && (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm text-gray-400">
                      Type to search across all data
                    </p>
                    <p className="text-[11px] text-gray-300 mt-1">
                      Contacts, consultations, blogs, comments, subscribers
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
