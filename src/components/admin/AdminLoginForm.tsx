"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom") ?? "/admin/dashboard";
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          setError(authError.message);
          return;
        }

        router.replace(redirectedFrom);
        router.refresh();
      } catch (loginError) {
        setError(
          loginError instanceof Error
            ? loginError.message
            : "Unable to sign in. Check your Supabase configuration.",
        );
      }
    });
  }

  return (
    <form action={handleSubmit} className="premium-card grid gap-5 p-6">
      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
        Email address
        <span className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" aria-hidden="true" />
          <input
            type="email"
            name="email"
            placeholder="admin@yjmboy.com"
            autoComplete="email"
            required
            className="w-full rounded-md border border-white/10 bg-[#07101a] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
        </span>
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
        Password
        <span className="relative">
          <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" aria-hidden="true" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full rounded-md border border-white/10 bg-[#07101a] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
        </span>
      </label>

      {error ? (
        <p className="rounded-md border border-yellow-300/30 bg-yellow-300/10 px-4 py-3 text-sm font-bold text-yellow-100">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn-primary w-full" disabled={isPending}>
        {isPending ? "Signing in..." : "Login"}
      </button>
      <Link href="/" className="text-center text-sm font-bold text-cyan-200 hover:text-white">
        Back to website
      </Link>
    </form>
  );
}
