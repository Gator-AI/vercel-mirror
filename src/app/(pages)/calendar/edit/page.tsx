import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase-server";
import { isBoardMemberEmail } from "@/lib/auth";
import { getEvents } from "@/lib/events";
import { Button } from "@/components/ui/button";
import { CalendarEditView } from "./CalendarEditView";

export default async function CalendarEditPage() {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    redirect("/login?next=/calendar/edit");
  }

  if (!isBoardMemberEmail(user.email ?? undefined)) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-foreground/80 mb-4">You don’t have access to this page.</p>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  const events = await getEvents();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 my-32">
      <CalendarEditView events={events} />
    </div>
  );
}
