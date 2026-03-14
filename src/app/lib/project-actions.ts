"use server";

import { createServerClient } from "@/lib/supabase-server";
import { isBoardMemberEmail } from "@/lib/auth";

export type AddProjectResult = { ok: true } | { ok: false; error: string };

export async function addProject(form: {
  name: string;
  description: string;
  difficulty?: string;
  tech_stack?: string[];
  github_url?: string;
  learn_more_url?: string;
  image?: string;
}): Promise<AddProjectResult> {
  const name = form.name?.trim();
  if (!name) return { ok: false, error: "Project name is required" };

  const description = form.description?.trim();
  if (!description) return { ok: false, error: "Description is required" };

  const difficulty = form.difficulty?.trim() || null;
  const githubUrl = form.github_url?.trim() || null;
  const learnMoreUrl = form.learn_more_url?.trim() || null;
  const image = form.image?.trim() || null;
  const techStack = Array.isArray(form.tech_stack)
    ? form.tech_stack.map((item) => item.trim()).filter(Boolean)
    : [];

  const supabase = await createServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { ok: false, error: "You must be signed in." };
  }

  if (!isBoardMemberEmail(userData.user.email ?? undefined)) {
    return { ok: false, error: "Only board members can add projects." };
  }

  const { data: firstProject, error: sortLookupError } = await supabase
    .from("projects")
    .select("sort_order")
    .not("sort_order", "is", null)
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (sortLookupError) {
    console.error("[addProject][sortLookup]", sortLookupError);
    return { ok: false, error: sortLookupError.message };
  }

  const topSortOrder = typeof firstProject?.sort_order === "number"
    ? firstProject.sort_order - 1
    : 0;

  const payload: {
    name: string;
    description: string;
    difficulty: string | null;
    github_url: string | null;
    learn_more_url: string | null;
    image: string | null;
    tech_stack: string[];
    sort_order: number;
  } = {
    name,
    description,
    difficulty,
    github_url: githubUrl,
    learn_more_url: learnMoreUrl,
    image,
    tech_stack: techStack,
    sort_order: topSortOrder,
  };

  const { error } = await supabase.from("projects").insert(payload);
  if (error) {
    console.error("[addProject]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export type DeleteProjectResult = { ok: true } | { ok: false; error: string };

type DeleteProjectInput = {
  id?: string | null;
  name?: string | null;
};

export async function deleteProject(input: DeleteProjectInput): Promise<DeleteProjectResult> {
  const projectId = `${input.id ?? ""}`.trim();
  const name = `${input.name ?? ""}`.trim();

  if (!projectId && !name) {
    return {
      ok: false,
      error: "Missing project identity. Please ensure id or name is provided.",
    };
  }

  const supabase = await createServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { ok: false, error: "You must be signed in." };
  }

  if (!isBoardMemberEmail(userData.user.email ?? undefined)) {
    return { ok: false, error: "Only board members can delete projects." };
  }

  const query = supabase.from("projects").delete();
  const { error } = projectId
    ? await query.eq("id", projectId)
    : await query.eq("name", name);

  if (error) {
    console.error("[deleteProject]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
