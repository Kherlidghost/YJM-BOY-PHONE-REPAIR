import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductTable } from "@/components/admin/ProductTable";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";

type AdminProductsPageProps = {
  searchParams?: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
    error?: string;
  }>;
};

function getStatusMessage(params: Awaited<NonNullable<AdminProductsPageProps["searchParams"]>>) {
  if (params.created) {
    return "Product created successfully.";
  }

  if (params.updated) {
    return "Product updated successfully.";
  }

  if (params.deleted) {
    return "Product deleted successfully.";
  }

  if (params.error === "delete") {
    return "Product could not be deleted. Please try again.";
  }

  return "";
}

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const params = searchParams ? await searchParams : {};
  const statusMessage = getStatusMessage(params);
  const supabase = await createSupabaseServerClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id,name,category,price,stock_quantity,description,image_url,is_available,created_at,updated_at")
    .order("created_at", { ascending: false });

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminHeader
          title="Product Management"
          description="Manage phone accessories, repair tools, and spare parts inventory."
          action={
            <Link href="/admin/products/new" className="btn-primary">
              <Plus className="h-5 w-5" aria-hidden="true" />
              Add Product
            </Link>
          }
        />

        {statusMessage ? (
          <div className="rounded-md border border-cyan-300/30 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100">
            {statusMessage}
          </div>
        ) : null}

        {error ? (
          <div className="premium-card p-6 text-yellow-100">
            <p className="font-black">Products could not be loaded.</p>
            <p className="mt-2 text-sm text-slate-300">{error.message}</p>
          </div>
        ) : (
          <ProductTable products={(products ?? []) as Product[]} />
        )}
      </div>
    </AdminShell>
  );
}
