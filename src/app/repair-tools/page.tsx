import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { PublicProductCatalog } from "@/components/PublicProductCatalog";
import { ProductTrustSection } from "@/components/TrustSections";
import { getAvailableProductsByCategory } from "@/lib/public-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mobile Repair Tools in Biu",
  description:
    "Find mobile repair tools in Biu including soldering stations, screwdriver kits, microscope tools, BGA tools, DC power supply, flux, and solder wire.",
};

export default async function RepairToolsPage() {
  const { data: products, error } = await getAvailableProductsByCategory("Repair Tools");

  return (
    <main>
      <PageHeader
        eyebrow="Repair tools"
        title="Professional mobile repair tools for technicians"
        description="Browse available soldering tools, microscope tools, BGA supplies, power equipment, organizers, and repair consumables."
      />
      <section className="tech-section">
        <div className="section-inner">
          <div className="mb-10">
            <span className="offer-badge">Offer: Wholesale & Retail Available</span>
          </div>

          {error ? (
            <div className="premium-card p-6 text-yellow-100">
              <p className="font-black">Repair tools could not be loaded.</p>
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
