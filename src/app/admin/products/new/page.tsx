import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminHeader
          title="Add Product"
          description="Create a product for phone accessories, repair tools, or spare parts."
        />
        <ProductForm mode="create" />
      </div>
    </AdminShell>
  );
}
