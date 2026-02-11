"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ShimmerButton from "@/components/ui/shimmer-button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/calendar/edit";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-40 pb-16">
      <div
        className="rounded-2xl border p-8 shadow-xl backdrop-blur bg-[var(--modal-bg)]"
        style={{ borderColor: "var(--modal-border)", borderWidth: "1px" }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">
          Board sign in
        </h1>
        <p className="text-sm text-foreground/70 mb-6">
          Sign in with your board member account to access protected pages.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="h-10 rounded-xl border border-[var(--modal-border)] bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-semibold tracking-widest text-secondary/90 uppercase block mb-1.5">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="h-10 rounded-xl border border-[var(--modal-border)] bg-background/80 text-foreground placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-secondary/50"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          {/* <Button
            type="submit"
            variant="secondaryOutline"
            disabled={loading}
            className="w-full text-sm font-medium"
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button> */}
          <ShimmerButton
            borderRadius="15px"
            background="#00272b"
            className="w-full text-sm font-medium"
          >
            {loading ? "Signing in…" : "Sign in"}
          </ShimmerButton>
        </form>
        <p className="text-xs text-foreground/50 mt-6 text-center">
          <Link href="/" className="underline hover:text-foreground/70">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
