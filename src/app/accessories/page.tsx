import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { PublicProductCatalog } from "@/components/PublicProductCatalog";
import { ProductTrustSection } from "@/components/TrustSections";
import { getAvailableProductsByCategory } from "@/lib/public-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "YJM BOY Phone Accessories in Biu",
  description:
    "Shop quality phone accessories in Biu including chargers, cables, earbuds, power banks, cases, screen protectors, and memory cards.",
};

export default async function AccessoriesPage() {
  const { data: products, error } = await getAvailableProductsByCategory("Phone Accessories");

  return (
    <main>
      <PageHeader
        eyebrow="Accessories"
        title="Quality mobile accessories for everyday use"
        description="Shop real available chargers, cables, audio products, protection, power, smart wearables, and storage accessories from YJM Boy."
      />
      <section className="tech-section">
        <div className="section-inner">
          <div className="mb-10">
            <span className="offer-badge">Offer: New Arrivals Available</span>
          </div>

          {error ? (
            <div className="premium-card p-6 text-yellow-100">
              <p className="font-black">Accessories could not be loaded.</p>
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
