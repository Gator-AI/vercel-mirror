import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { isBoardMemberEmail } from "@/lib/auth";

export async function GET() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ isBoardMember: false, isAuthenticated: false }, { status: 200 });
  }

  const user = data.user ?? null;
  const isAuthenticated = Boolean(user);
  const email = user?.email ?? undefined;
  const isBoardMember = isAuthenticated && isBoardMemberEmail(email);

  return NextResponse.json({ isBoardMember, isAuthenticated }, { status: 200 });
}