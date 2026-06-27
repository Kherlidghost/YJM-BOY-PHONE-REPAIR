"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enquirySchema, enquiryStatusSchema } from "@/lib/validations/enquiry";

export type EnquiryActionState = {
  ok: boolean;
  message: string;
};

const enquiryPaths = ["/admin/dashboard", "/admin/enquiries", "/admin/analytics"];

function revalidateEnquiryPages() {
  enquiryPaths.forEach((path) => revalidatePath(path));
}

export async function createEnquiry(
  _previousState: EnquiryActionState,
  formData: FormData,
): Promise<EnquiryActionState> {
  const result = enquirySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!result.success) {
    return {
      ok: false,
      message: result.error.issues[0]?.message ?? "Check your message and try again.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("enquiries").insert({
    ...result.data,
    source: "website",
    status: "new",
  });

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  revalidateEnquiryPages();

  return {
    ok: true,
    message: "Thank you. Your message has been received. YJM BOY will contact you soon.",
  };
}

export async function updateEnquiryStatus(id: string, formData: FormData) {
  const result = enquiryStatusSchema.safeParse({
    status: formData.get("status"),
  });

  if (!result.success) {
    redirect("/admin/enquiries?error=status");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("enquiries")
    .update({ status: result.data.status })
    .eq("id", id);

  revalidateEnquiryPages();
  redirect(error ? "/admin/enquiries?error=status" : "/admin/enquiries?updated=1");
}

export async function deleteEnquiry(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("enquiries").delete().eq("id", id);

  revalidateEnquiryPages();
  redirect(error ? "/admin/enquiries?error=delete" : "/admin/enquiries?deleted=1");
}
