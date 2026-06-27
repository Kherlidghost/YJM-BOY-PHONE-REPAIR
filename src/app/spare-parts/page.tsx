import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { PublicProductCatalog } from "@/components/PublicProductCatalog";
import { ProductTrustSection } from "@/components/TrustSections";
import { getAvailableProductsByCategory } from "@/lib/public-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Phone Spare Parts in Biu",
  description:
    "Browse available phone spare parts in Biu from YJM BOY for customers, technicians, and mobile repair shops.",
};

export default async function SparePartsPage() {
  const { data: products, error } = await getAvailableProductsByCategory("Spare Parts");

  return (
    <main>
      <PageHeader
        eyebrow="Spare parts"
        title="Mobile spare parts for careful repairs"
        description="Browse available spare parts for phone repair support, replacement needs, and technician supply."
      />
      <section className="tech-section">
        <div className="section-inner">
          <div className="mb-10">
            <span className="offer-badge">Available Stock</span>
          </div>

          {error ? (
            <div className="premium-card p-6 text-yellow-100">
              <p className="font-black">Spare parts could not be loaded.</p>
              <p className="mt-2 text-sm text-slate-300">{error.message}</p>
            </div>
          ) : (
            <PublicProductCatalog products={products ?? []} />
          )}
        </div>
      </section>
      <ProductTrustSection />
      <CTASection />
    </main>
  );
}
