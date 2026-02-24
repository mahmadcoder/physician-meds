import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type {
  DateRange,
  ChartDataPoint,
  Contact,
  Consultation,
  CtaInquiry,
  Comment,
  Subscriber,
} from "../types";

interface AnalyticsChartProps {
  dateRange: DateRange;
  contacts: Contact[];
  consultations: Consultation[];
  ctaInquiries: CtaInquiry[];
  comments: Comment[];
  subscribers: Subscriber[];
}

const SERIES = [
  { key: "contacts" as const, label: "Contacts", color: "#2d62ff" },
  { key: "consultations" as const, label: "Consultations", color: "#7c3aed" },
  { key: "ctaInquiries" as const, label: "CTA Inquiries", color: "#d97706" },
  { key: "comments" as const, label: "Comments", color: "#ea580c" },
  { key: "subscribers" as const, label: "Subscribers", color: "#059669" },
];

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function toDayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function toMonthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function dayLabel(key: string): string {
  const d = new Date(key + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function monthLabel(key: string): string {
  const [y, m] = key.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export default function AnalyticsChart({
  dateRange,
  contacts,
  consultations,
  ctaInquiries,
  comments,
  subscribers,
}: AnalyticsChartProps) {
  const chartData: ChartDataPoint[] = useMemo(() => {
    const span = daysBetween(dateRange.from, dateRange.to);
    const useMonthly = span > 62;

    const map = new Map<string, ChartDataPoint>();

    if (useMonthly) {
      const cur = new Date(dateRange.from.getFullYear(), dateRange.from.getMonth(), 1);
      const end = new Date(dateRange.to);
      while (cur <= end) {
        const key = toMonthKey(cur);
        map.set(key, { date: key, label: monthLabel(key), contacts: 0, consultations: 0, ctaInquiries: 0, comments: 0, subscribers: 0 });
        cur.setMonth(cur.getMonth() + 1);
      }
    } else {
      const cur = new Date(dateRange.from);
      cur.setHours(0, 0, 0, 0);
      const end = new Date(dateRange.to);
      while (cur <= end) {
        const key = toDayKey(cur);
        map.set(key, { date: key, label: dayLabel(key), contacts: 0, consultations: 0, ctaInquiries: 0, comments: 0, subscribers: 0 });
        cur.setDate(cur.getDate() + 1);
      }
    }

    const bucket = (dateStr: string): string | null => {
      const d = new Date(dateStr);
      if (d < dateRange.from || d > dateRange.to) return null;
      return useMonthly ? toMonthKey(d) : toDayKey(d);
    };

    contacts.forEach((c) => { const k = bucket(c.created_at); if (k && map.has(k)) map.get(k)!.contacts++; });
    consultations.forEach((c) => { const k = bucket(c.created_at); if (k && map.has(k)) map.get(k)!.consultations++; });
    ctaInquiries.forEach((c) => { const k = bucket(c.created_at); if (k && map.has(k)) map.get(k)!.ctaInquiries++; });
    comments.forEach((c) => { const k = bucket(c.created_at); if (k && map.has(k)) map.get(k)!.comments++; });
    subscribers.forEach((s) => { const k = bucket(s.subscribed_at); if (k && map.has(k)) map.get(k)!.subscribers++; });

    return Array.from(map.values());
  }, [dateRange, contacts, consultations, ctaInquiries, comments, subscribers]);

  const hasData = chartData.some(
    (d) => d.contacts + d.consultations + d.ctaInquiries + d.comments + d.subscribers > 0
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 font-display">
          Activity Overview
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          {SERIES.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[11px] text-gray-500 hidden sm:inline">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {!hasData ? (
          <div className="flex items-center justify-center h-[280px] text-gray-400">
            <p className="text-sm">No data for this period</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                {SERIES.map((s) => (
                  <linearGradient
                    key={s.key}
                    id={`grad-${s.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={s.color} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: 13,
                }}
              />
              {SERIES.map((s) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={2}
                  fill={`url(#grad-${s.key})`}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
