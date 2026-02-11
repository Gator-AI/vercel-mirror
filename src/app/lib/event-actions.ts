"use server";

import { createServerClient } from "@/lib/supabase-server";
import type { EventType } from "@/lib/calendar-utils";

const VALID_TYPES: EventType[] = ["Workshop", "GBM", "Social"];

function isEventType(s: string): s is EventType {
  return VALID_TYPES.includes(s as EventType);
}

export type AddEventResult = { ok: true } | { ok: false; error: string };

export async function addEvent(form: {
  title: string;
  type: string;
  start_at: string;
  end_at: string;
  comment?: string;
}): Promise<AddEventResult> {
  const title = form.title?.trim();
  if (!title) return { ok: false, error: "Title is required" };
  if (!isEventType(form.type)) return { ok: false, error: "Invalid event type" };

  const startAt = new Date(form.start_at);
  const endAt = new Date(form.end_at);
  if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
    return { ok: false, error: "Invalid date or time" };
  }
  if (endAt <= startAt) return { ok: false, error: "End must be after start" };

  const supabase = await createServerClient();
  const { error } = await supabase.from("events").insert({
    title,
    type: form.type as EventType,
    start_at: startAt.toISOString(),
    end_at: endAt.toISOString(),
    comment: form.comment?.trim() || null,
  });

  if (error) {
    console.error("[addEvent]", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export type UpdateEventResult = { ok: true } | { ok: false; error: string };

export async function updateEvent(
  id: string,
  form: {
    title: string;
    type: string;
    start_at: string;
    end_at: string;
    comment?: string;
  }
): Promise<UpdateEventResult> {
  const title = form.title?.trim();
  if (!title) return { ok: false, error: "Title is required" };
  if (!isEventType(form.type)) return { ok: false, error: "Invalid event type" };

  const startAt = new Date(form.start_at);
  const endAt = new Date(form.end_at);
  if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
    return { ok: false, error: "Invalid date or time" };
  }
  if (endAt <= startAt) return { ok: false, error: "End must be after start" };

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("events")
    .update({
      title,
      type: form.type as EventType,
      start_at: startAt.toISOString(),
      end_at: endAt.toISOString(),
      comment: form.comment?.trim() || null,
    })
    .eq("id", id);

  if (error) {
    console.error("[updateEvent]", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export type DeleteEventResult = { ok: true } | { ok: false; error: string };

export async function deleteEvent(id: string): Promise<DeleteEventResult> {
  const supabase = await createServerClient();
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    console.error("[deleteEvent]", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
