import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  customDate: Date | undefined;
  onChange: (period: DatePeriod) => void;
  onCustomDateChange: (date: Date | undefined) => void;
}

export default function DateFilter({
  value,
  customDate,
  onChange,
  onCustomDateChange,
}: DateFilterProps) {
  const formattedCustom = customDate
    ? customDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
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

        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                value === "custom"
                  ? "bg-[#2d62ff] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {value === "custom" && formattedCustom
                  ? formattedCustom
                  : "Pick Date"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end" sideOffset={8}>
            <Calendar
              mode="single"
              selected={customDate}
              onSelect={(date) => {
                onCustomDateChange(date);
                if (date) onChange("custom");
              }}
              disabled={{ after: new Date() }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
