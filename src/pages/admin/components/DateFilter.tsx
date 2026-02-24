import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import type { DatePreset, DateRange } from "../types";
import { presetToRange, formatRangeLabel } from "../utils/dateUtils";

const PRESETS: { value: DatePreset; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "this-week", label: "This Week" },
  { value: "last-week", label: "Last Week" },
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "this-year", label: "This Year" },
  { value: "last-year", label: "Last Year" },
  { value: "all", label: "All Time" },
];

interface DateFilterProps {
  activeRange: DateRange;
  activePreset: DatePreset;
  onApply: (range: DateRange, preset: DatePreset | null) => void;
}

export default function DateFilter({
  activeRange,
  activePreset,
  onApply,
}: DateFilterProps) {
  const [open, setOpen] = useState(false);
  const [draftPreset, setDraftPreset] = useState<DatePreset | null>(activePreset);
  const [draftFrom, setDraftFrom] = useState<Date | undefined>(activeRange.from);
  const [draftTo, setDraftTo] = useState<Date | undefined>(activeRange.to);
  const [calMonth, setCalMonth] = useState(() => {
    const d = new Date(activeRange.to);
    d.setMonth(d.getMonth() - 1);
    return d;
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (!open) {
      setDraftPreset(activePreset);
      setDraftFrom(activeRange.from);
      setDraftTo(activeRange.to);
      const d = new Date(activeRange.to);
      d.setMonth(d.getMonth() - 1);
      setCalMonth(d);
    }
    setOpen(!open);
  };

  const handlePreset = (preset: DatePreset) => {
    const range = presetToRange(preset);
    setDraftPreset(preset);
    setDraftFrom(range.from);
    setDraftTo(range.to);
    const d = new Date(range.to);
    d.setMonth(d.getMonth() - 1);
    setCalMonth(d);
  };

  const handleDayClick = (day: Date) => {
    setDraftPreset(null);
    if (!draftFrom || (draftFrom && draftTo)) {
      setDraftFrom(day);
      setDraftTo(undefined);
    } else {
      if (day < draftFrom) {
        setDraftTo(draftFrom);
        setDraftFrom(day);
      } else {
        setDraftTo(day);
      }
    }
  };

  const handleApply = () => {
    if (draftFrom) {
      const from = new Date(draftFrom);
      from.setHours(0, 0, 0, 0);
      const to = draftTo ? new Date(draftTo) : new Date(draftFrom);
      to.setHours(23, 59, 59, 999);
      onApply({ from, to }, draftPreset);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const fmtInput = (d: Date | undefined) =>
    d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

  const presetLabel = PRESETS.find((p) => p.value === activePreset)?.label;

  const selected: { from: Date; to?: Date } | undefined = draftFrom
    ? { from: draftFrom, to: draftTo }
    : undefined;

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-all shadow-sm"
      >
        <CalendarIcon className="w-4 h-4 text-gray-400" />
        <span className="hidden sm:inline">
          {activePreset !== "all" && presetLabel
            ? `${presetLabel}: ${formatRangeLabel(activeRange)}`
            : presetLabel || formatRangeLabel(activeRange)}
        </span>
        <span className="sm:hidden">
          {presetLabel || "Date"}
        </span>
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="flex">
            {/* Presets sidebar */}
            <div className="w-36 border-r border-gray-100 py-2 hidden sm:block">
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => handlePreset(p.value)}
                  className={`w-full text-left px-4 py-2 text-[13px] font-medium transition-colors ${
                    draftPreset === p.value
                      ? "text-[#2d62ff] bg-blue-50/60"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Calendars + footer */}
            <div className="flex flex-col">
              {/* Mobile presets */}
              <div className="sm:hidden px-3 pt-3 pb-2 flex gap-1.5 overflow-x-auto border-b border-gray-100">
                {PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => handlePreset(p.value)}
                    className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      draftPreset === p.value
                        ? "bg-[#2d62ff] text-white"
                        : "text-gray-500 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Calendars */}
              <div className="p-3">
                <DayPicker
                  mode="range"
                  numberOfMonths={2}
                  month={calMonth}
                  onMonthChange={setCalMonth}
                  selected={selected}
                  onDayClick={handleDayClick}
                  disabled={{ after: new Date() }}
                  showOutsideDays
                  classNames={{
                    root: "flex flex-col",
                    months: "flex gap-4 flex-col sm:flex-row",
                    month: "flex flex-col gap-2",
                    month_caption: "flex items-center justify-center h-8",
                    caption_label: "text-sm font-semibold text-gray-800",
                    nav: "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between px-1",
                    button_previous: "size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors",
                    button_next: "size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors",
                    weekdays: "flex",
                    weekday: "w-9 h-8 flex items-center justify-center text-[11px] font-medium text-gray-400",
                    week: "flex",
                    day: "relative w-9 h-9 p-0 text-center",
                    day_button: "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:pointer-events-none",
                    selected: "!bg-[#2d62ff] !text-white !rounded-lg hover:!bg-[#1a4fd9]",
                    range_start: "!bg-[#2d62ff] !text-white !rounded-l-lg !rounded-r-none",
                    range_end: "!bg-[#2d62ff] !text-white !rounded-r-lg !rounded-l-none",
                    range_middle: "!bg-blue-50 !text-[#2d62ff] !rounded-none",
                    today: "font-bold text-[#2d62ff]",
                    outside: "opacity-30",
                    disabled: "opacity-30 pointer-events-none",
                    hidden: "invisible",
                  }}
                />
              </div>

              {/* Footer: date inputs + actions */}
              <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium min-w-[120px] text-center">
                    {fmtInput(draftFrom) || "Start date"}
                  </div>
                  <span className="text-gray-300">&ndash;</span>
                  <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium min-w-[120px] text-center">
                    {fmtInput(draftTo || draftFrom) || "End date"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50 border border-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApply}
                    disabled={!draftFrom}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-[#2d62ff] hover:bg-[#1a4fd9] disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
