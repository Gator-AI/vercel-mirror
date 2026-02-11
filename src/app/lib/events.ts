import { createServerClient } from "@/lib/supabase-server";
import type { CalendarEvent, EventType } from "@/lib/calendar-utils";

/** Supabase row shape for public.events */
export interface DbEvent {
  id: string;
  title: string;
  type: EventType;
  start_at: string;
  end_at: string;
  comment: string | null;
}

function isEventType(s: string): s is EventType {
  return s === "Workshop" || s === "GBM" || s === "Social";
}

function dbRowToCalendarEvent(row: DbEvent): CalendarEvent {
  const now = Date.now();
  const start = new Date(row.start_at).getTime();
  const end = new Date(row.end_at).getTime();
  const live = now >= start && now <= end;

  return {
    id: row.id,
    title: row.title,
    type: isEventType(row.type) ? row.type : "Workshop",
    startAt: row.start_at,
    endAt: row.end_at,
    comment: row.comment ?? undefined,
    live,
  };
}

/**
 * Fetch all events from Supabase (server-side). Use in Server Components or route handlers.
 */
export async function getEvents(): Promise<CalendarEvent[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("events")
    .select("id, title, type, start_at, end_at, comment")
    .order("start_at", { ascending: true });

  if (error) {
    console.error("[events] getEvents error:", error);
    return [];
  }

  return (data ?? []).map(dbRowToCalendarEvent);
}
