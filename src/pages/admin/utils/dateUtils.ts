import type { DatePreset, DateRange } from "../types";

export function presetToRange(preset: DatePreset): DateRange {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  switch (preset) {
    case "today":
      return { from: todayStart, to: todayEnd };

    case "yesterday": {
      const d = new Date(todayStart);
      d.setDate(d.getDate() - 1);
      const dEnd = new Date(d);
      dEnd.setHours(23, 59, 59, 999);
      return { from: d, to: dEnd };
    }

    case "this-week": {
      const day = now.getDay();
      const diff = day === 0 ? 6 : day - 1;
      const from = new Date(todayStart);
      from.setDate(from.getDate() - diff);
      return { from, to: todayEnd };
    }

    case "last-week": {
      const day = now.getDay();
      const diff = day === 0 ? 6 : day - 1;
      const thisWeekStart = new Date(todayStart);
      thisWeekStart.setDate(thisWeekStart.getDate() - diff);
      const to = new Date(thisWeekStart);
      to.setDate(to.getDate() - 1);
      to.setHours(23, 59, 59, 999);
      const from = new Date(to);
      from.setDate(from.getDate() - 6);
      from.setHours(0, 0, 0, 0);
      return { from, to };
    }

    case "this-month":
      return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: todayEnd };

    case "last-month": {
      const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const to = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      return { from, to };
    }

    case "this-year":
      return { from: new Date(now.getFullYear(), 0, 1), to: todayEnd };

    case "last-year": {
      const from = new Date(now.getFullYear() - 1, 0, 1);
      const to = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
      return { from, to };
    }

    case "all":
    default:
      return { from: new Date(2020, 0, 1), to: todayEnd };
  }
}

export function isInRange(dateStr: string, range: DateRange): boolean {
  const d = new Date(dateStr);
  return d >= range.from && d <= range.to;
}

export function formatRangeLabel(range: DateRange): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const sameDay =
    range.from.getFullYear() === range.to.getFullYear() &&
    range.from.getMonth() === range.to.getMonth() &&
    range.from.getDate() === range.to.getDate();

  return sameDay ? fmt(range.from) : `${fmt(range.from)}  \u2013  ${fmt(range.to)}`;
}
