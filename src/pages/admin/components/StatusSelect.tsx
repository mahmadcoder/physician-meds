import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "new", label: "New", dot: "bg-[#2d62ff]" },
  { value: "contacted", label: "Contacted", dot: "bg-amber-500" },
  { value: "converted", label: "Converted", dot: "bg-emerald-500" },
  { value: "closed", label: "Closed", dot: "bg-gray-400" },
] as const;

interface StatusSelectProps {
  value: string;
  onChange: (val: string) => void;
}

export default function StatusSelect({ value, onChange }: StatusSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = STATUS_OPTIONS.find((o) => o.value === value) || STATUS_OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="inline-flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-all cursor-pointer shadow-sm"
      >
        <span className={`w-2 h-2 rounded-full ${current.dot}`} />
        <span>{current.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="py-1">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium transition-colors ${
                  value === option.value
                    ? "bg-gray-50 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${option.dot}`} />
                <span className="flex-1 text-left">{option.label}</span>
                {value === option.value && (
                  <Check className="w-3.5 h-3.5 text-[#2d62ff]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
