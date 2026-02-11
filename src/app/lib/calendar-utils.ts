/**
 * Calendar date/event utilities. Used by the calendar UI and for mapping DB events to dates.
 */

export type EventType = "Workshop" | "GBM" | "Social";

/**
 * Event shape for DB/API. Each event has a datetime so it maps to a single calendar day.
 * Use eventsToEventsByDate(events) to build the map the calendar needs.
 */
export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  /** ISO 8601 datetime (e.g. "2025-02-19T10:00:00.000Z") – used for calendar date and time display */
  startAt: string;
  /** ISO 8601 datetime */
  endAt: string;
  /** Optional free-form notes: instructor, location, etc. */
  comment?: string;
  live?: boolean;
}

/** Unique key for a calendar day (year-month-day, 0-based month). */
export function dateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Returns whether a calendar day is in the past, today, or future (date-only comparison). */
export function getDayStatus(
  day: Date,
  today: Date
): "past" | "today" | "future" {
  const d = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (d < t) return "past";
  if (d > t) return "future";
  return "today";
}

export function formatDateForDisplay(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getMonthYear(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const last = new Date(year, month + 1, 0);
  const days: Date[] = [];
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

/** Weekday offset for Monday-first calendar (0 = Monday, 6 = Sunday). */
export function getWeekdayOffset(year: number, month: number): number {
  const first = new Date(year, month, 1);
  let day = first.getDay() - 1;
  if (day < 0) day = 6;
  return day;
}

/** Calendar date (start of day) for an event from its startAt. */
export function getEventDate(event: CalendarEvent): Date {
  const d = new Date(event.startAt);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Group a flat list of events by calendar date for the calendar UI. */
export function eventsToEventsByDate(
  events: CalendarEvent[]
): Record<string, CalendarEvent[]> {
  const map: Record<string, CalendarEvent[]> = {};
  for (const event of events) {
    const key = dateKey(getEventDate(event));
    if (!map[key]) map[key] = [];
    map[key].push(event);
  }
  return map;
}

export function formatEventTimeRange(event: CalendarEvent): string {
  const start = new Date(event.startAt);
  const end = new Date(event.endAt);
  return `${start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} – ${end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
}

/** Build ISO date string for a given Date (for startAt/endAt). */
export function toISODate(d: Date, hour: number, minute: number): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(hour).padStart(2, "0");
  const min = String(minute).padStart(2, "0");
  return `${y}-${m}-${day}T${h}:${min}:00.000Z`;
}
