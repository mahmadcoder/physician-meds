import type { DatePeriod } from "../types";

export function getDateRange(period: DatePeriod): { start: Date; end: Date } {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  switch (period) {
    case "today": {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return { start, end };
    }
    case "7d": {
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }
    case "30d": {
      const start = new Date(end);
      start.setDate(start.getDate() - 29);
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }
    case "this-year": {
      const start = new Date(now.getFullYear(), 0, 1);
      return { start, end };
    }
    case "all":
    default:
      return { start: new Date(2020, 0, 1), end };
  }
}

export function isInRange(dateStr: string, period: DatePeriod): boolean {
  if (period === "all") return true;
  const { start, end } = getDateRange(period);
  const d = new Date(dateStr);
  return d >= start && d <= end;
}
