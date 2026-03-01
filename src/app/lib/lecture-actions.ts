"use server";

import { createServerClient } from "@/lib/supabase-server";

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
