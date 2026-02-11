"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "react-feather";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addEvent } from "@/lib/event-actions";
import { cn } from "@/lib/utils";

function toDateInputValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function AddEventModal({
  selectedDate,
  onClose,
}: {
  selectedDate: Date;
  onClose: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"Workshop" | "GBM" | "Social">("Workshop");
  const [date, setDate] = useState(() => toDateInputValue(selectedDate));
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Build dates in user's local timezone so server stores correct UTC
    const startDate = new Date(`${date}T${startTime}:00`);
    const endDate = new Date(`${date}T${endTime}:00`);
    const start_at = startDate.toISOString();
    const end_at = endDate.toISOString();
    const result = await addEvent({ title, type, start_at, end_at, comment: comment || undefined });
    setLoading(false);
    if (result.ok) {
      onClose();
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 backdrop-blur-xl bg-[var(--modal-overlay)]"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 z-[60] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-xl backdrop-blur bg-[var(--modal-bg)]"
        style={{ borderColor: "var(--modal-border)", borderWidth: "1px" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-event-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--modal-border)" }}>
          <h2 id="add-event-title" className="text-xl font-bold tracking-tight text-foreground">
            Add event
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-foreground/60 hover:bg-white/10 hover:text-foreground"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="add-event-title-input" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Title
            </label>
            <Input
              id="add-event-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. General Body Meeting"
              required
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>
          <div>
            <label htmlFor="add-event-type" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Type
            </label>
            <select
              id="add-event-type"
              value={type}
              onChange={(e) => setType(e.target.value as "Workshop" | "GBM" | "Social")}
              className={cn(
                "flex h-10 w-full rounded-xl border bg-background/80 px-3 py-2 text-sm text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              )}
              style={{ borderColor: "var(--modal-border)" }}
            >
              <option value="Workshop">Workshop</option>
              <option value="GBM">GBM</option>
              <option value="Social">Social</option>
            </select>
          </div>
          <div>
            <label htmlFor="add-event-date" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Date
            </label>
            <Input
              id="add-event-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="h-10 rounded-xl bg-background/80 text-foreground focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="add-event-start" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
                Start time
              </label>
              <Input
                id="add-event-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="h-10 rounded-xl bg-background/80 text-foreground focus-visible:ring-2 focus-visible:ring-secondary/50 border"
                style={{ borderColor: "var(--modal-border)" }}
              />
            </div>
            <div>
              <label htmlFor="add-event-end" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
                End time
              </label>
              <Input
                id="add-event-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="h-10 rounded-xl bg-background/80 text-foreground focus-visible:ring-2 focus-visible:ring-secondary/50 border"
                style={{ borderColor: "var(--modal-border)" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="add-event-comment" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Comment <span className="text-foreground/50 normal-case">(optional)</span>
            </label>
            <Input
              id="add-event-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Room 402B · Reza T"
              className="h-10 rounded-xl bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50 border"
              style={{ borderColor: "var(--modal-border)" }}
            />
          </div>
          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl border" style={{ borderColor: "var(--modal-border)" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondaryOutline"
              disabled={loading}
              className="text-sm font-medium"
            >
              {loading ? "Adding…" : "Add event"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
