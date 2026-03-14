"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "react-feather";
import { Button } from "@/components/ui/button";
import { DeleteProjectModal } from "@/components/DeleteProjectModal";
import { AddProjectModal } from "@/components/AddProjectModal";
import { createClient } from "@/lib/supabase/client";
import { deleteProject } from "@/lib/project-actions";

const blobBaseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/$/, "") ?? "";

export type Project = {
  id?: string;
  name: string;
  description: string;
  github_url: string | null;
  learn_more_url: string | null;
  tech_stack: string[] | null;
  difficulty: string | null;
  image: string | null;
  sort_order?: number | null;
};

type ProjectsEditViewProps = {
  initialProjects: Project[];
};

function normalizeTechStack(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}

function resolveImageUrl(image: string | null): string | null {
  if (!image) {
    return null;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/") && blobBaseUrl) {
    return `${blobBaseUrl}${image}`;
  }

  return image;
}

export function ProjectsEditView({ initialProjects }: ProjectsEditViewProps) {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [fetching, setFetching] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingProjectKey, setDeletingProjectKey] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const fetchProjects = useCallback(async () => {
    setFetching(true);
    setLoadError(null);

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });

      if (error) {
        throw error;
      }

      const normalized = ((data ?? []) as Project[]).map((project) => ({
        ...project,
        tech_stack: normalizeTechStack(project.tech_stack),
      }));

      setProjects(normalized);
    } catch (error) {
      console.error("Error fetching projects:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load projects. Please try again.";
      setLoadError(message);
    } finally {
      setFetching(false);
    }
  }, [supabase]);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  const handleDeleteRequest = useCallback((project: Project) => {
    setProjectToDelete(project);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!projectToDelete) return;
    const projectKey = projectToDelete.id ?? projectToDelete.name;

    setDeletingProjectKey(projectKey);
    setDeleteError(null);

    const result = await deleteProject({
      id: projectToDelete.id,
      name: projectToDelete.name,
    });

    if (!result.ok) {
      setDeleteError(result.error);
      setDeletingProjectKey(null);
      return;
    }

    await fetchProjects();
    setProjectToDelete(null);
    setDeletingProjectKey(null);
    router.refresh();
  }, [fetchProjects, projectToDelete, router]);

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-5xl font-thin leading-none">Edit projects</h1>
          <p className="text-foreground/70 mt-2 max-w-2xl">
            Board-only: manage project cards.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondaryOutline"
            className="text-sm font-medium shrink-0"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus size={16} className="mr-2 inline-block shrink-0" />
            Add project
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-foreground/70 hover:text-foreground"
            onClick={fetchProjects}
            disabled={fetching}
          >
            {fetching ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {loadError && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-200">
          {loadError}
        </div>
      )}

      {deleteError && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-200">
          {deleteError}
        </div>
      )}

      {fetching && projects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-sm text-foreground/70">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-sm text-foreground/70">
          No projects found yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const projectKey = project.id ?? project.name;
            const imageUrl = resolveImageUrl(project.image);

            return (
              <article
                key={projectKey}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="mb-4 w-full overflow-hidden rounded-xl border border-white/10 bg-white/10">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${project.name} thumbnail`}
                      width={640}
                      height={360}
                      className="h-48 w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center text-sm text-foreground/50">
                      No thumbnail
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-widest text-foreground/60">
                    {project.difficulty ?? "Unknown"}
                  </p>
                  <h2 className="text-xl font-semibold text-foreground">{project.name}</h2>
                  <p className="text-sm text-foreground/70 line-clamp-3">{project.description}</p>

                  {project.tech_stack?.length ? (
                    <p className="text-sm text-foreground/60 line-clamp-2">
                      {project.tech_stack.join(", ")}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {project.learn_more_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.learn_more_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn more
                          </a>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => handleDeleteRequest(project)}
                    disabled={deletingProjectKey === projectKey}
                  >
                    <Trash2 size={14} />
                    {deletingProjectKey === projectKey ? "Deleting..." : "Delete project"}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {projectToDelete && (
        <DeleteProjectModal
          projectName={projectToDelete.name}
          loading={deletingProjectKey !== null}
          onClose={() => {
            if (!deletingProjectKey) {
              setProjectToDelete(null);
            }
          }}
          onConfirm={confirmDelete}
        />
      )}

      {addModalOpen && (
        <AddProjectModal
          onClose={() => setAddModalOpen(false)}
          onAdded={fetchProjects}
        />
      )}
    </>
  );
}
