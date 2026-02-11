"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "react-feather";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateEvent, deleteEvent } from "@/lib/event-actions";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/lib/calendar-utils";

function isoToDateInputValue(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isoToTimeInputValue(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const labelClass =
  "text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5";
const inputClass =
  "h-10 rounded-xl border border-[var(--modal-border)] bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50";

export function EditEventModal({
  event,
  onClose,
}: {
  event: CalendarEvent;
  onClose: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(event.title);
  const [type, setType] = useState<"Workshop" | "GBM" | "Social">(event.type);
  const [date, setDate] = useState(() => isoToDateInputValue(event.startAt));
  const [startTime, setStartTime] = useState(() => isoToTimeInputValue(event.startAt));
  const [endTime, setEndTime] = useState(() => isoToTimeInputValue(event.endAt));
  const [comment, setComment] = useState(event.comment ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const start_at = `${date}T${startTime}:00`;
    const end_at = `${date}T${endTime}:00`;
    const result = await updateEvent(event.id, {
      title,
      type,
      start_at,
      end_at,
      comment: comment || undefined,
    });
    setLoading(false);
    if (result.ok) {
      onClose();
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  async function handleConfirmDelete() {
    setDeleteLoading(true);
    const result = await deleteEvent(event.id);
    setDeleteLoading(false);
    if (result.ok) {
      setShowDeleteConfirm(false);
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
        aria-labelledby="edit-event-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mb-5 flex items-center justify-between border-b pb-4"
          style={{ borderColor: "var(--modal-border)" }}
        >
          <h2 id="edit-event-title" className="text-xl font-bold tracking-tight text-foreground">
            Edit event
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
            <label htmlFor="edit-event-title-input" className={labelClass}>
              Title
            </label>
            <Input
              id="edit-event-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. General Body Meeting"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="edit-event-type" className={labelClass}>
              Type
            </label>
            <select
              id="edit-event-type"
              value={type}
              onChange={(e) => setType(e.target.value as "Workshop" | "GBM" | "Social")}
              className={cn(
                "flex h-10 w-full rounded-xl border border-[var(--modal-border)] bg-background/80 px-3 py-2 text-sm text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              )}
            >
              <option value="Workshop">Workshop</option>
              <option value="GBM">GBM</option>
              <option value="Social">Social</option>
            </select>
          </div>
          <div>
            <label htmlFor="edit-event-date" className={labelClass}>
              Date
            </label>
            <Input
              id="edit-event-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-event-start" className={labelClass}>
                Start time
              </label>
              <Input
                id="edit-event-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="edit-event-end" className={labelClass}>
                End time
              </label>
              <Input
                id="edit-event-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="edit-event-comment" className={labelClass}>
              Comment <span className="text-foreground/50 normal-case">(optional)</span>
            </label>
            <Input
              id="edit-event-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Room 402B · Reza T"
              className={inputClass}
            />
          </div>
          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <Button
              type="button"
              variant="destructive"
              className="rounded-xl"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Remove event
            </Button>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl border border-[var(--modal-border)]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="secondaryOutline"
                disabled={loading}
                className="text-sm font-medium"
              >
                {loading ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Delete confirmation popup */}
      {showDeleteConfirm && (
        <>
          <div
            className="fixed inset-0 z-[70] backdrop-blur-sm bg-[var(--modal-overlay)]"
            aria-hidden
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div
            className="fixed left-1/2 top-1/2 z-[80] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-xl bg-[var(--modal-bg)] border-[var(--modal-border)]"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-confirm-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="delete-confirm-title" className="text-lg font-bold text-foreground mb-2">
              Are you sure you want to remove this event?
            </h3>
            <p className="text-sm text-foreground/70 mb-4">This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-xl border border-[var(--modal-border)]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={deleteLoading}
                className="rounded-xl"
                onClick={handleConfirmDelete}
              >
                {deleteLoading ? "Removing…" : "Remove"}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
