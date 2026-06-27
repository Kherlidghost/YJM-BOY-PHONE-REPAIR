import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { EnquiriesManager } from "@/components/admin/EnquiriesManager";
import type { Enquiry } from "@/lib/enquiries";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type AdminEnquiriesPageProps = {
  searchParams?: Promise<{
    updated?: string;
    deleted?: string;
    error?: string;
  }>;
};

function getStatusMessage(params: Awaited<NonNullable<AdminEnquiriesPageProps["searchParams"]>>) {
  if (params.updated) {
    return "Enquiry status updated.";
  }

  if (params.deleted) {
    return "Enquiry deleted.";
  }

  if (params.error === "status") {
    return "Enquiry status could not be updated.";
  }

  if (params.error === "delete") {
    return "Enquiry could not be deleted.";
  }

  return "";
}

export default async function AdminEnquiriesPage({ searchParams }: AdminEnquiriesPageProps) {
  const params = searchParams ? await searchParams : {};
  const statusMessage = getStatusMessage(params);
  const supabase = await createSupabaseServerClient();
  const { data: enquiries, error } = await supabase
    .from("enquiries")
    .select("id,name,phone,message,source,status,created_at")
    .order("created_at", { ascending: false });

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminHeader
          title="Customer Enquiries"
          description="Search customer messages, sort follow-ups, and handle enquiries faster."
        />

        {statusMessage ? (
          <div className="rounded-md border border-cyan-300/30 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100">
            {statusMessage}
          </div>
        ) : null}

        {error ? (
          <div className="premium-card p-6 text-yellow-100">
            <p className="font-black">Enquiries could not be loaded.</p>
            <p className="mt-2 text-sm text-slate-300">{error.message}</p>
          </div>
        ) : (
          <EnquiriesManager enquiries={(enquiries ?? []) as Enquiry[]} />
        )}
      </div>
    </AdminShell>
  );
}
