"use server";

import { createServerClient } from "@/lib/supabase-server";
import { isBoardMemberEmail } from "@/lib/auth";

export type AddLectureResult = { ok: true } | { ok: false; error: string };

export async function addLecture(form: {
  name: string;
  description: string;
  date: string;
  semester: string;
  link: string;
  image: string;
  slides: string;
}): Promise<AddLectureResult> {
  const name = form.name?.trim();
  if (!name) return { ok: false, error: "Lecture name is required" };

  const description = form.description?.trim();
  if (!description) return { ok: false, error: "Description is required" };

  const date = form.date?.trim();
  if (!date) return { ok: false, error: "Date is required" };

  const semester = form.semester?.trim();
  if (!semester) return { ok: false, error: "Semester is required" };

  const link = form.link?.trim();
  if (!link) return { ok: false, error: "YouTube link is required" };

  const image = form.image?.trim();
  if (!image) return { ok: false, error: "Thumbnail URL is required" };

  const slides = form.slides?.trim();

  const supabase = await createServerClient();
  const { error } = await supabase.from("lectures").insert({
    name,
    description,
    date,
    semester,
    link,
    image,
    slides: slides || null,
  });

  if (error) {
    console.error("[addLecture]", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export type DeleteLectureResult = { ok: true } | { ok: false; error: string };

type DeleteLectureInput = {
  id?: string | null;
  name?: string | null;
  date?: string | null;
  semester?: string | null;
  link?: string | null;
};

export async function deleteLecture(input: DeleteLectureInput): Promise<DeleteLectureResult> {
  const lectureId = `${input.id ?? ""}`.trim();
  const name = `${input.name ?? ""}`.trim();
  const date = `${input.date ?? ""}`.trim();
  const semester = `${input.semester ?? ""}`.trim();
  const link = `${input.link ?? ""}`.trim();

  const hasCompositeKey = Boolean(name && date && semester && link);
  if (!lectureId && !hasCompositeKey) {
    return {
      ok: false,
      error: "Missing lecture identity. Please ensure name/date/semester/link are set.",
    };
  }

  const supabase = await createServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { ok: false, error: "You must be signed in." };
  }

  if (!isBoardMemberEmail(userData.user.email ?? undefined)) {
    return { ok: false, error: "Only board members can delete lectures." };
  }

  const query = supabase.from("lectures").delete();
  const { error } = lectureId
    ? await query.eq("id", lectureId)
    : await query
        .eq("name", name)
        .eq("date", date)
        .eq("semester", semester)
        .eq("link", link);

  if (error) {
    console.error("[deleteLecture]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
