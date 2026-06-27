"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { adminLoginSchema } from "@/lib/validations/auth";

export async function loginAdminAction(formData: FormData) {
  const result = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      ok: false,
      message: "Enter a valid admin email and password.",
    };
  }

  return {
    ok: true,
    message: "Supabase Auth connection will be enabled in the next step.",
  };
}

export async function logoutAdminAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
