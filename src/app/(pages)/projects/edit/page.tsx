import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase-server";
import { isBoardMemberEmail } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ProjectsEditView, type Project } from "./ProjectsEditView";

function normalizeTechStack(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}

export default async function ProjectsEditPage() {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    redirect("/login?next=/projects/edit");
  }

  if (!isBoardMemberEmail(user.email ?? undefined)) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-foreground/80 mb-4">You don&rsquo;t have access to this page.</p>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  const { data: projectsData, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (projectsError) {
    console.error("[ProjectsEditPage] Failed to fetch projects", projectsError);
  }

  const projects = ((projectsData ?? []) as Project[]).map((project) => ({
    ...project,
    tech_stack: normalizeTechStack(project.tech_stack),
  }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 my-32">
      <ProjectsEditView initialProjects={projects} />
    </div>
  );
}
