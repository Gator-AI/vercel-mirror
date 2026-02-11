"use client";

import { useState } from "react";
import { Plus } from "react-feather";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { CalendarEvent } from "@/components/ui/calendar";

export function CalendarEditView({ events }: { events: CalendarEvent[] }) {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-5xl font-thin leading-none">Edit calendar</h1>
          <p className="text-foreground/70 mt-2 max-w-2xl">
            Board-only: manage events. View workshops, lectures, and social events below.
          </p>
        </div>
        <Button
          type="button"
          variant="secondaryOutline"
          className="text-sm font-medium shrink-0"
          onClick={() => setAddModalOpen(true)}
        >
          <Plus size={16} className="mr-2 inline-block shrink-0" />
          Add event
        </Button>
      </div>
      <Calendar
        events={events}
        editable
        addModalOpen={addModalOpen}
        onAddModalOpenChange={setAddModalOpen}
      />
    </>
  );
}
