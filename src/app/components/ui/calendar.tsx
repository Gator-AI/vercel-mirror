"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "react-feather";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  type CalendarEvent,
  type EventType,
  dateKey,
  isSameDay,
  getDayStatus,
  formatDateForDisplay,
  getMonthYear,
  getDaysInMonth,
  getWeekdayOffset,
  getEventDate,
  eventsToEventsByDate,
  formatEventTimeRange,
  toISODate,
} from "@/lib/calendar-utils";

export type { CalendarEvent, EventType };
export { getEventDate, eventsToEventsByDate } from "@/lib/calendar-utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EVENT_TYPE_STYLES: Record<EventType, string> = {
  Workshop: "bg-secondary/30 text-secondary border-secondary/50",
  GBM: "bg-secondary/30 text-secondary border-secondary/50",
  Social: "bg-secondary/30 text-secondary border-secondary/50",
};

/** Mock events with startAt/endAt so each event has its own date. Replace with DB fetch. */
function buildMockEvents(): CalendarEvent[] {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const today = new Date(y, m, now.getDate());

  return [
    { id: "1", title: "Backpropagation Deep-Dive", type: "Workshop", startAt: toISODate(today, 10, 0), endAt: toISODate(today, 13, 0), comment: "Room 402B / Zoom · Reza T", live: true },
    { id: "2", title: "General Body Meeting", type: "GBM", startAt: toISODate(today, 14, 30), endAt: toISODate(today, 16, 0), comment: "Ujan Maji" },
    { id: "3", title: "Trail Mix Social", type: "Social", startAt: toISODate(today, 18, 0), endAt: toISODate(today, 19, 0), comment: "Vishal L" },
    { id: "4", title: "ML Monday", type: "Workshop", startAt: toISODate(new Date(y, m, Math.min(5, 28)), 18, 0), endAt: toISODate(new Date(y, m, Math.min(5, 28)), 19, 0) },
    { id: "5", title: "General Body Meeting", type: "GBM", startAt: toISODate(new Date(y, m, Math.min(7, 28)), 14, 30), endAt: toISODate(new Date(y, m, Math.min(7, 28)), 16, 0) },
    { id: "6", title: "Trail Mix Social", type: "Social", startAt: toISODate(new Date(y, m, Math.min(7, 28)), 18, 0), endAt: toISODate(new Date(y, m, Math.min(7, 28)), 19, 0) },
    { id: "7", title: "Workshop A", type: "Workshop", startAt: toISODate(new Date(y, m, Math.min(9, 28)), 10, 0), endAt: toISODate(new Date(y, m, Math.min(9, 28)), 11, 0) },
    { id: "8", title: "GBM", type: "GBM", startAt: toISODate(new Date(y, m, Math.min(9, 28)), 14, 0), endAt: toISODate(new Date(y, m, Math.min(9, 28)), 15, 0) },
    { id: "9", title: "Social", type: "Social", startAt: toISODate(new Date(y, m, Math.min(9, 28)), 18, 0), endAt: toISODate(new Date(y, m, Math.min(9, 28)), 19, 0) },
    { id: "10", title: "Workshop B", type: "Workshop", startAt: toISODate(new Date(y, m, Math.min(12, 28)), 10, 0), endAt: toISODate(new Date(y, m, Math.min(12, 28)), 11, 0) },
    { id: "11", title: "Workshop C", type: "Workshop", startAt: toISODate(new Date(y, m, Math.min(12, 28)), 12, 0), endAt: toISODate(new Date(y, m, Math.min(12, 28)), 13, 0) },
    { id: "12", title: "GBM", type: "GBM", startAt: toISODate(new Date(y, m, Math.min(12, 28)), 14, 0), endAt: toISODate(new Date(y, m, Math.min(12, 28)), 15, 0) },
    { id: "13", title: "Social", type: "Social", startAt: toISODate(new Date(y, m, Math.min(12, 28)), 18, 0), endAt: toISODate(new Date(y, m, Math.min(12, 28)), 19, 0) },
    { id: "14", title: "Event 1", type: "Workshop", startAt: toISODate(new Date(y, m, Math.min(15, 28)), 9, 0), endAt: toISODate(new Date(y, m, Math.min(15, 28)), 10, 0) },
    { id: "15", title: "Event 2", type: "GBM", startAt: toISODate(new Date(y, m, Math.min(15, 28)), 11, 0), endAt: toISODate(new Date(y, m, Math.min(15, 28)), 12, 0) },
    { id: "16", title: "Event 3", type: "Social", startAt: toISODate(new Date(y, m, Math.min(15, 28)), 13, 0), endAt: toISODate(new Date(y, m, Math.min(15, 28)), 14, 0) },
    { id: "17", title: "Event 4", type: "Workshop", startAt: toISODate(new Date(y, m, Math.min(15, 28)), 15, 0), endAt: toISODate(new Date(y, m, Math.min(15, 28)), 16, 0) },
    { id: "18", title: "Event 5", type: "GBM", startAt: toISODate(new Date(y, m, Math.min(15, 28)), 17, 0), endAt: toISODate(new Date(y, m, Math.min(15, 28)), 18, 0) },
    { id: "19", title: "Event 6", type: "Social", startAt: toISODate(new Date(y, m, Math.min(15, 28)), 19, 0), endAt: toISODate(new Date(y, m, Math.min(15, 28)), 20, 0) },
    { id: "20", title: "General Body Meeting", type: "GBM", startAt: toISODate(new Date(y, m, Math.min(19, 28)), 14, 30), endAt: toISODate(new Date(y, m, Math.min(19, 28)), 16, 0) },
    { id: "21", title: "Trail Mix Social", type: "Social", startAt: toISODate(new Date(y, m, Math.min(19, 28)), 18, 0), endAt: toISODate(new Date(y, m, Math.min(19, 28)), 19, 0) },
    { id: "past-dummy", title: "Past Workshop (dummy)", type: "Workshop", startAt: toISODate(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), 10, 0), endAt: toISODate(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), 11, 0) },
  ];
}

const DEFAULT_MOCK_EVENTS = buildMockEvents();

export interface CalendarProps {
  className?: string;
  /** Flat list of events (e.g. from DB). Each event must have startAt/endAt for its date. */
  events?: CalendarEvent[];
  /** Pre-grouped events by date key. If both events and eventsByDate are provided, events wins. */
  eventsByDate?: Record<string, CalendarEvent[]>;
}

export function Calendar({
  className,
  events,
  eventsByDate,
}: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const eventsByDateResolved = useMemo(
    () => (events != null ? eventsToEventsByDate(events) : eventsByDate ?? eventsToEventsByDate(DEFAULT_MOCK_EVENTS)),
    [events, eventsByDate]
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const offset = useMemo(() => getWeekdayOffset(year, month), [year, month]);

  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const selectedKey = dateKey(selectedDate);
  const eventsForSelected = eventsByDateResolved[selectedKey] ?? [];

  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-xl",
        "bg-background/95 backdrop-blur",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left: Selected date + events */}
        <aside className="w-full lg:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-background/80 p-6 flex flex-col">
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-widest text-secondary/90 uppercase mb-1">
              Selected Date
            </p>
            <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {formatDateForDisplay(selectedDate)}
            </p>
          </div>
          <div className="flex flex-col gap-4 overflow-auto flex-1">
            {eventsForSelected.length === 0 ? (
              <p className="text-sm text-foreground/60">No events this day.</p>
            ) : (
              eventsForSelected.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))
            )}
          </div>
        </aside>

        {/* Right: Month + grid */}
        <main className="flex-1 flex flex-col p-6 md:p-8 bg-background/50">
          <header className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {getMonthYear(viewDate)}
              </h1>
              <p className="text-sm font-semibold text-secondary/80 tracking-wide mt-0.5">
                Gator AI Events
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg border-white/20 bg-background/80 hover:bg-white/10 text-foreground"
                onClick={prevMonth}
                aria-label="Previous month"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg border-white/20 bg-background/80 hover:bg-white/10 text-foreground"
                onClick={nextMonth}
                aria-label="Next month"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-7 gap-px mb-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center py-2 text-xs font-bold tracking-wider text-secondary/80"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-2 flex-1 min-h-[320px]">
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: offset }, (_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded-lg bg-white/5 opacity-50 min-h-[44px]" />
              ))}
              {days.map((d) => {
                const key = dateKey(d);
                const dayEvents = eventsByDateResolved[key] ?? [];
                const hasEvents = dayEvents.length > 0;
                const dayStatus = getDayStatus(d, new Date());
                const selected = isSameDay(d, selectedDate);
                const dotColor =
                  dayStatus === "today"
                    ? "bg-amber-400/90"
                    : dayStatus === "future"
                      ? "bg-secondary/90"
                      : "bg-white/40";
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={cn(
                      "aspect-square min-h-[44px] rounded-lg flex flex-col items-center justify-start p-2 transition-colors",
                      "text-foreground/80 hover:bg-white/10",
                      selected && "bg-secondary/25 text-foreground font-bold ring-2 ring-secondary/50 shadow-lg shadow-secondary/10",
                      !selected && "hover:bg-white/10"
                    )}
                  >
                    <span className="text-sm md:text-base">{d.getDate()}</span>
                    {hasEvents && (
                      <div className="flex flex-wrap items-center justify-center gap-0.5 mt-1">
                        {Array.from({ length: Math.min(dayEvents.length, 4) }, (_, i) => (
                          <span
                            key={i}
                            className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColor)}
                          />
                        ))}
                        {dayEvents.length > 4 && (
                          <Plus className="w-2.5 h-2.5 text-foreground/60 flex-shrink-0" strokeWidth={3} />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
              {Array.from(
                { length: Math.max(0, 42 - offset - days.length) },
                (_, i) => (
                  <div
                    key={`pad-${i}`}
                    className="aspect-square rounded-lg bg-white/5 opacity-30 min-h-[44px]"
                  />
                )
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: CalendarEvent }) {
  const typeStyle = EVENT_TYPE_STYLES[event.type];
  return (
    <div
      className={cn(
        "rounded-xl border p-4 flex flex-col gap-2 min-h-0",
        "bg-background/90 border-white/10",
        event.live && "border-secondary/40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded border",
            typeStyle
          )}
        >
          {event.type}
        </span>
        {event.live && (
          <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Live Now
          </span>
        )}
      </div>
      <h3 className="font-bold text-foreground text-base leading-snug">
        {event.title}
      </h3>
      <p className="text-sm text-foreground/70">
        {formatEventTimeRange(event)}
      </p>
      {event.comment && (
        <p className="text-xs text-foreground/60">{event.comment}</p>
      )}
      <div className="flex justify-end mt-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-foreground/70 hover:bg-white/10 hover:text-foreground"
          aria-label="Add to calendar"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
}
