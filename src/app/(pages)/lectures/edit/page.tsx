import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase-server";
import { isBoardMemberEmail } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LecturesEditView, type Lecture } from "./LecturesEditView";

export default async function LecturesEditPage() {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    redirect("/login?next=/lectures/edit");
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

  const { data: lecturesData, error: lecturesError } = await supabase
    .from("lectures")
    .select("*")
    .order("date", { ascending: false });

  if (lecturesError) {
    console.error("[LecturesEditPage] Failed to fetch lectures", lecturesError);
  }

  const lectures = (lecturesData ?? []) as Lecture[];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 my-32">
      <LecturesEditView initialLectures={lectures} />
    </div>
  );
}
