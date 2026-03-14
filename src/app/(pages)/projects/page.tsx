"use client";

import React from "react";
import Image from "next/image";
import ShimmerButton from "@/components/ui/shimmer-button";
import { Edit2, GitHub } from "react-feather";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const blobBaseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/$/, "") ?? "";

interface Project {
  id?: string;
  name: string;
  description: string;
  github_url: string | null;
  learn_more_url: string | null;
  tech_stack: string[] | null;
  difficulty: string | null;
  image: string | null;
}

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

function Projects() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [authStatus, setAuthStatus] = React.useState({
    isBoardMember: false,
    isAuthenticated: false,
  });
  const [checkingBoardStatus, setCheckingBoardStatus] = React.useState(true);
  const [accessError, setAccessError] = React.useState("");

  const fetchProjects = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const normalized = ((data ?? []) as Project[]).map((project) => ({
        ...project,
        tech_stack: normalizeTechStack(project.tech_stack),
      }));

      setProjects(normalized);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  React.useEffect(() => {
    let isMounted = true;

    async function fetchBoardStatus() {
      try {
        const response = await fetch("/api/auth/board-status", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch board status");
        }

        const data = await response.json();
        if (isMounted) {
          setAuthStatus({
            isBoardMember: Boolean(data?.isBoardMember),
            isAuthenticated: Boolean(data?.isAuthenticated),
          });
        }
      } catch (fetchError) {
        console.error("Error checking board status:", fetchError);
        if (isMounted) {
          setAuthStatus({ isBoardMember: false, isAuthenticated: false });
        }
      } finally {
        if (isMounted) {
          setCheckingBoardStatus(false);
        }
      }
    }

    void fetchBoardStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEditProjectsClick = React.useCallback(() => {
    if (checkingBoardStatus) return;

    if (!authStatus.isAuthenticated) {
      window.location.href = "/login?next=/projects/edit";
      return;
    }

    if (!authStatus.isBoardMember) {
      setAccessError("Only board members can edit projects.");
      return;
    }

    setAccessError("");
    window.location.href = "/projects/edit";
  }, [authStatus, checkingBoardStatus]);

  if (loading) {
    return (
      <div className="my-32 min-h-screen w-screen flex items-center justify-center">
        <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-center justify-center gap-8">
          <p className="text-white/80">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-32 min-h-screen w-screen flex items-center justify-center">
        <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-center justify-center gap-8">
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-32 min-h-screen w-screen flex items-center justify-center">
      <div className="w-[90%] max-w-5xl lg:max-w-7xl h-full flex flex-col items-start justify-start gap-8">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="mb-4 flex items-start justify-between gap-4 w-full flex-wrap">
            <div>
              <h1 className="text-2xl md:text-5xl font-thin leading-none">Projects</h1>
              <p className="mt-2 text-white/80 text-xl">
                Explore our club&apos;s latest projects and contributions.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button
                type="button"
                variant="secondaryOutline"
                className="shrink-0 text-sm font-medium"
                onClick={handleEditProjectsClick}
                disabled={checkingBoardStatus}
              >
                <Edit2 size={16} className="mr-2 inline-block" />
                Edit projects
              </Button>
              {accessError && (
                <p className="text-xs text-red-300 text-right max-w-[240px]">
                  {accessError}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <a href="https://linktr.ee/thegaitorclub" target="_blank" rel="noopener noreferrer">
              <ShimmerButton
                borderRadius="10px"
                background="#00272b"
                className="py-2 px-8 text-base font-light w-fit shadow-md gap-2"
              >
                Visit the LinkTree to Apply Now!
              </ShimmerButton>
            </a>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/80">
            <p>No projects found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {projects.map((project) => {
              const imageUrl = resolveImageUrl(project.image);

              return (
                <div
                  key={project.id ?? project.name}
                  className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col gap-3 hover:scale-[1.01] transition-transform duration-200"
                >
                  <div className="w-full h-40 bg-white/20 rounded mb-2 flex items-center justify-center">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`${project.name} image`}
                        width={320}
                        height={160}
                        className="object-contain w-full h-full"
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                        priority={false}
                        unoptimized
                      />
                    ) : (
                      <p className="text-sm text-white/70">No image</p>
                    )}
                  </div>

                  <div className="flex flex-col items-start justify-between gap-1 h-full min-h-[180px]">
                    <div>
                      <h2 className="font-bold text-xl md:text-2xl text-white mb-1">
                        {project.name}
                      </h2>
                      <p className="text-[#F59E0B] text-md leading-none">{project.description}</p>
                    </div>

                    {project.tech_stack?.length ? (
                      <div className="bg-[#00272b]/50 p-2 rounded-md flex flex-col gap-1">
                        <p className="w-fit text-md">
                          Difficulty:{" "}
                          <span className="bg-[#F59E0B] rounded-full px-2 py-[2px]">
                            {project.difficulty ?? "Unknown"}
                          </span>
                        </p>
                        <p>Tech Stack:</p>
                        <p className="text-[#6FFFE4]">{project.tech_stack.join(", ")}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex w-full justify-between mt-auto">
                    {project.learn_more_url ? (
                      <a href={project.learn_more_url} target="_blank" rel="noopener noreferrer">
                        <ShimmerButton
                          borderRadius="10px"
                          background="#00272b"
                          className="py-2 px-8 text-base font-light w-fit shadow-md"
                        >
                          Learn More
                        </ShimmerButton>
                      </a>
                    ) : (
                      <span />
                    )}

                    {project.github_url ? (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/50 p-2 rounded-full hover:scale-105 transition-transform"
                      >
                        <GitHub />
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
