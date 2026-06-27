import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("id,name,category,price,stock_quantity,description,image_url,is_available,created_at,updated_at")
    .eq("id", id)
    .single();

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminHeader
          title="Edit Product"
          description="Update product details, stock quantity, availability, and image URL."
        />

        {error || !product ? (
          <div className="premium-card p-6">
            <p className="text-xl font-black text-white">Product not found</p>
            <p className="mt-3 text-slate-300">
              The selected product could not be loaded. It may have been deleted or the ID may be invalid.
            </p>
            {error ? <p className="mt-3 text-sm text-yellow-100">{error.message}</p> : null}
            <Link href="/admin/products" className="btn-primary mt-6">
              Back to Products
            </Link>
          </div>
        ) : (
          <ProductForm mode="edit" product={product as Product} />
        )}
      </div>
    </AdminShell>
  );
}
