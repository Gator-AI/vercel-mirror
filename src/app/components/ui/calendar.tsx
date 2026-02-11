"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "react-feather";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type EventType = "Workshop" | "Lecture" | "Study Group";

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  start: string;
  end: string;
  location?: string;
  instructor?: string;
  live?: boolean;
}

const EVENT_TYPE_STYLES: Record<EventType, string> = {
  Workshop: "bg-secondary/30 text-secondary border-secondary/50",
  Lecture: "bg-white/20 text-foreground border-white/30",
  "Study Group": "bg-secondary/20 text-secondary border-secondary/40",
};

function formatDateForDisplay(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getMonthYear(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getDaysInMonth(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: Date[] = [];
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

function getWeekdayOffset(year: number, month: number): number {
  const first = new Date(year, month, 1);
  let day = first.getDay() - 1;
  if (day < 0) day = 6;
  return day;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Backpropagation Deep-Dive",
    type: "Workshop",
    start: "10:00 AM",
    end: "1:00 PM",
    location: "Room 402B / Zoom",
    instructor: "Reza T",
    live: true,
  },
  {
    id: "2",
    title: "Optimization Algorithms",
    type: "Lecture",
    start: "2:30 PM",
    end: "4:00 PM",
    instructor: "Ujan Maji",
  },
  {
    id: "3",
    title: "Calculus for ML Review",
    type: "Study Group",
    start: "6:00 PM",
    end: "7:00 PM",
    instructor: "Vishal L",
  },
];

function buildEventsByDate(): Record<string, CalendarEvent[]> {
  const map: Record<string, CalendarEvent[]> = {};
  const today = new Date();
  map[dateKey(today)] = MOCK_EVENTS;
  const oct12 = new Date(2023, 9, 12);
  map[dateKey(oct12)] = MOCK_EVENTS;
  const d2 = new Date(today.getFullYear(), today.getMonth(), Math.min(11, 28));
  map[dateKey(d2)] = [MOCK_EVENTS[0]];
  const d3 = new Date(today.getFullYear(), today.getMonth(), Math.min(19, 28));
  map[dateKey(d3)] = [MOCK_EVENTS[1], MOCK_EVENTS[2]];
  return map;
}

const DEFAULT_EVENTS_BY_DATE = buildEventsByDate();

export interface CalendarProps {
  className?: string;
  eventsByDate?: Record<string, CalendarEvent[]>;
}

export function Calendar({
  className,
  eventsByDate = DEFAULT_EVENTS_BY_DATE,
}: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(today);

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
  const eventsForSelected = eventsByDate[selectedKey] ?? [];

  const daysWithEvents = useMemo(() => {
    const set = new Set<string>();
    Object.keys(eventsByDate).forEach((k) => set.add(k));
    return set;
  }, [eventsByDate]);

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
                const hasEvents = daysWithEvents.has(key);
                const selected = isSameDay(d, selectedDate);
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
                      <div className="flex gap-0.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary/90" />
                        {eventsByDate[key]?.length > 1 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/90" />
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
        {event.start} – {event.end}
      </p>
      {event.location && (
        <p className="text-xs text-foreground/60">{event.location}</p>
      )}
      {event.instructor && (
        <p className="text-xs text-foreground/60">{event.instructor}</p>
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
