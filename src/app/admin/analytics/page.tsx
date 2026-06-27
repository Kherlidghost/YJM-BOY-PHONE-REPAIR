import { Boxes, CircleCheck, CircleHelp, CircleSlash, Mail, Package, ShoppingBag } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id,stock_quantity,is_available");
  const { data: enquiries, error: enquiriesError } = await supabase
    .from("enquiries")
    .select("id,status");

  const productRows = (products ?? []) as Product[];
  const enquiryRows = enquiries ?? [];
  const stats = [
    { label: "Total Products", value: String(productRows.length), helper: "All catalog items", icon: Package },
    {
      label: "Available Products",
      value: String(productRows.filter((product) => product.is_available).length),
      helper: "Visible inventory",
      icon: ShoppingBag,
    },
    {
      label: "Low Stock Products",
      value: String(productRows.filter((product) => product.stock_quantity > 0 && product.stock_quantity <= 5).length),
      helper: "1 to 5 units remaining",
      icon: Boxes,
    },
    {
      label: "Out of Stock Products",
      value: String(productRows.filter((product) => product.stock_quantity === 0).length),
      helper: "Needs immediate restock",
      icon: CircleSlash,
    },
    { label: "Total Enquiries", value: String(enquiryRows.length), helper: "All customer messages", icon: Mail },
    {
      label: "New Enquiries",
      value: String(enquiryRows.filter((enquiry) => enquiry.status === "new").length),
      helper: "Awaiting first contact",
      icon: CircleHelp,
    },
    {
      label: "Closed Enquiries",
      value: String(enquiryRows.filter((enquiry) => enquiry.status === "closed").length),
      helper: "Completed follow-up",
      icon: CircleCheck,
    },
  ];

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminHeader
          title="Reports & Analytics"
          description="Simple live summaries for products, stock health, and customer enquiries."
        />

        {productsError || enquiriesError ? (
          <div className="premium-card p-6 text-yellow-100">
            <p className="font-black">Analytics data could not be fully loaded.</p>
            <p className="mt-2 text-sm text-slate-300">
              {productsError?.message ?? enquiriesError?.message}
            </p>
          </div>
        ) : null}

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <AdminStatCard key={stat.label} {...stat} />
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
