import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type {
  DatePeriod,
  ChartDataPoint,
  Contact,
  Consultation,
  CtaInquiry,
  Comment,
  Subscriber,
} from "../types";
import { getDateRange } from "../utils/dateUtils";

interface AnalyticsChartProps {
  period: DatePeriod;
  customDate?: Date;
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

function getDateKey(d: Date, period: DatePeriod): string {
  if (period === "this-year") {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatLabel(key: string, period: DatePeriod): string {
  if (period === "this-year") {
    const [, m] = key.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[parseInt(m) - 1] || key;
  }
  const d = new Date(key + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function bucketDate(dateStr: string, period: DatePeriod, customDate?: Date): string | null {
  const { start, end } = getDateRange(period, customDate);
  const d = new Date(dateStr);
  if (d < start || d > end) return null;
  return getDateKey(d, period);
}

function generateBuckets(period: DatePeriod, customDate?: Date): string[] {
  const { start, end } = getDateRange(period, customDate);
  const buckets: string[] = [];

  if (period === "this-year") {
    const cur = new Date(start);
    while (cur <= end) {
      buckets.push(getDateKey(cur, period));
      cur.setMonth(cur.getMonth() + 1);
    }
  } else {
    const cur = new Date(start);
    while (cur <= end) {
      buckets.push(getDateKey(cur, period));
      cur.setDate(cur.getDate() + 1);
    }
  }
  return buckets;
}

export default function AnalyticsChart({
  period,
  customDate,
  contacts,
  consultations,
  ctaInquiries,
  comments,
  subscribers,
}: AnalyticsChartProps) {
  const chartData: ChartDataPoint[] = useMemo(() => {
    if (period === "all") {
      const months = new Map<string, ChartDataPoint>();
      const allDates = [
        ...contacts.map((c) => c.created_at),
        ...consultations.map((c) => c.created_at),
        ...ctaInquiries.map((c) => c.created_at),
        ...comments.map((c) => c.created_at),
        ...subscribers.map((s) => s.subscribed_at),
      ];

      let minDate = new Date();
      allDates.forEach((d) => {
        const dt = new Date(d);
        if (dt < minDate) minDate = dt;
      });

      const cur = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      const end = new Date();
      while (cur <= end) {
        const key = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}`;
        const mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        months.set(key, {
          date: key,
          label: `${mNames[cur.getMonth()]} ${cur.getFullYear()}`,
          contacts: 0,
          consultations: 0,
          ctaInquiries: 0,
          comments: 0,
          subscribers: 0,
        });
        cur.setMonth(cur.getMonth() + 1);
      }

      const toKey = (ds: string) => {
        const d = new Date(ds);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      };
      contacts.forEach((c) => { const k = toKey(c.created_at); if (months.has(k)) months.get(k)!.contacts++; });
      consultations.forEach((c) => { const k = toKey(c.created_at); if (months.has(k)) months.get(k)!.consultations++; });
      ctaInquiries.forEach((c) => { const k = toKey(c.created_at); if (months.has(k)) months.get(k)!.ctaInquiries++; });
      comments.forEach((c) => { const k = toKey(c.created_at); if (months.has(k)) months.get(k)!.comments++; });
      subscribers.forEach((s) => { const k = toKey(s.subscribed_at); if (months.has(k)) months.get(k)!.subscribers++; });

      return Array.from(months.values());
    }

    const buckets = generateBuckets(period, customDate);
    const map = new Map<string, ChartDataPoint>();
    buckets.forEach((b) =>
      map.set(b, {
        date: b,
        label: formatLabel(b, period),
        contacts: 0,
        consultations: 0,
        ctaInquiries: 0,
        comments: 0,
        subscribers: 0,
      })
    );

    contacts.forEach((c) => { const k = bucketDate(c.created_at, period, customDate); if (k && map.has(k)) map.get(k)!.contacts++; });
    consultations.forEach((c) => { const k = bucketDate(c.created_at, period, customDate); if (k && map.has(k)) map.get(k)!.consultations++; });
    ctaInquiries.forEach((c) => { const k = bucketDate(c.created_at, period, customDate); if (k && map.has(k)) map.get(k)!.ctaInquiries++; });
    comments.forEach((c) => { const k = bucketDate(c.created_at, period, customDate); if (k && map.has(k)) map.get(k)!.comments++; });
    subscribers.forEach((s) => { const k = bucketDate(s.subscribed_at, period, customDate); if (k && map.has(k)) map.get(k)!.subscribers++; });

    return Array.from(map.values());
  }, [period, customDate, contacts, consultations, ctaInquiries, comments, subscribers]);

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
              <Legend
                wrapperStyle={{ display: "none" }}
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
