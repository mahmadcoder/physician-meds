import { Calendar } from "lucide-react";
import type { DatePeriod } from "../types";

const PERIODS: { value: DatePeriod; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "this-year", label: "This Year" },
  { value: "all", label: "All Time" },
];

interface DateFilterProps {
  value: DatePeriod;
  onChange: (period: DatePeriod) => void;
}

export default function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-gray-400 mr-1">
        <Calendar className="w-4 h-4" />
        <span className="text-xs font-medium hidden sm:inline">Period:</span>
      </div>
      <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => onChange(p.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              value === p.value
                ? "bg-[#2d62ff] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
