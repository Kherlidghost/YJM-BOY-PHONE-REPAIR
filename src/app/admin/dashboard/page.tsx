import { Boxes, CircleCheck, CircleHelp, Mail, Package, PhoneCall } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id,name,category,stock_quantity,is_available")
    .order("created_at", { ascending: false });
  const { data: enquiries, error: enquiriesError } = await supabase
    .from("enquiries")
    .select("id,status");

  const productRows = (products ?? []) as Product[];
  const enquiryRows = enquiries ?? [];
  const totalProducts = productRows.length;
  const lowStockItems = productRows.filter((product) => product.stock_quantity > 0 && product.stock_quantity <= 5).length;
  const totalEnquiries = enquiryRows.length;
  const newEnquiries = enquiryRows.filter((enquiry) => enquiry.status === "new").length;
  const contactedEnquiries = enquiryRows.filter((enquiry) => enquiry.status === "contacted").length;
  const closedEnquiries = enquiryRows.filter((enquiry) => enquiry.status === "closed").length;

  const dashboardStats = [
    { label: "Total Enquiries", value: String(totalEnquiries), helper: "Messages from customers", icon: Mail },
    { label: "New Enquiries", value: String(newEnquiries), helper: "Needs follow-up", icon: CircleHelp },
    { label: "Contacted Enquiries", value: String(contactedEnquiries), helper: "Customers already contacted", icon: PhoneCall },
    { label: "Closed Enquiries", value: String(closedEnquiries), helper: "Completed follow-ups", icon: CircleCheck },
    { label: "Total Products", value: String(totalProducts), helper: "Across all categories", icon: Package },
    { label: "Low Stock Items", value: String(lowStockItems), helper: "Stock quantity is 5 or below", icon: Boxes },
  ];

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminHeader
          title="Dashboard"
          description="A high-level view of products, stock health, available inventory, and customer enquiries."
        />

        {error ? (
          <div className="premium-card p-6 text-yellow-100">
            <p className="font-black">Dashboard products could not be loaded.</p>
            <p className="mt-2 text-sm text-slate-300">{error.message}</p>
          </div>
        ) : null}
        {enquiriesError ? (
          <div className="premium-card p-6 text-yellow-100">
            <p className="font-black">Dashboard enquiries could not be loaded.</p>
            <p className="mt-2 text-sm text-slate-300">{enquiriesError.message}</p>
          </div>
        ) : null}

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <AdminStatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="premium-card p-6">
            <h2 className="text-xl font-black text-white">Inventory Snapshot</h2>
            <div className="mt-6 space-y-4">
              {productRows.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.03] p-4"
                >
                  <div>
                    <p className="font-black text-white">{product.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{product.category}</p>
                  </div>
                  <p className={product.stock_quantity <= 5 ? "text-sm font-black text-yellow-200" : "text-sm font-black text-cyan-200"}>
                    {product.stock_quantity} in stock
                  </p>
                </div>
              ))}

              {productRows.length === 0 ? (
                <p className="rounded-md border border-white/10 bg-white/[0.03] p-4 text-slate-400">
                  No products have been added yet.
                </p>
              ) : null}
            </div>
          </article>

          <article className="premium-card p-6">
            <h2 className="text-xl font-black text-white">Phase 2 Scope</h2>
            <p className="mt-4 leading-7 text-slate-300">
              This admin area is limited to login, products, inventory, image upload placeholders,
              enquiries, and analytics for the shop catalog.
            </p>
          </article>
        </section>
      </div>
    </AdminShell>
  );
}
