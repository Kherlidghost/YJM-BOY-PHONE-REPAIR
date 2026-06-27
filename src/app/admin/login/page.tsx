import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { hasValidSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (
    hasValidSupabaseEnv(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )
  ) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/admin/dashboard");
    }
  }

  return (
    <section className="grid min-h-[calc(100vh-4rem)] place-items-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="offer-badge">Admin Login</p>
          <h1 className="mt-4 text-4xl font-black text-white">YJM BOY Admin</h1>
          <p className="mt-3 leading-7 text-slate-300">
            Sign in to manage products, inventory, enquiries, and analytics.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="premium-card p-6 text-center text-sm font-bold text-slate-300">
              Loading admin login...
            </div>
          }
        >
          <AdminLoginForm />
        </Suspense>
      </div>
    </section>
  );
}
