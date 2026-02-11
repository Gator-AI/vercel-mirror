import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { getEvents } from "@/lib/events";

export default async function CalendarPage() {
  const events = await getEvents();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 my-32">
      <div className="mb-8">
        <h1 className="text-2xl  md:text-5xl font-thin leading-none">
          Calendar
        </h1>
        <p className="text-foreground/70 mt-2 max-w-2xl">
          View workshops, lectures, and social events. Select a date to see events
          for that day.
        </p>
      </div>
      <Calendar events={events} />
    </div>
  );
}
