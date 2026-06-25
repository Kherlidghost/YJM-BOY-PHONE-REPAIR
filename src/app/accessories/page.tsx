import {
  Cable,
  Headphones,
  PackageCheck,
  Power,
  Shield,
  Speaker,
  Watch,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { accessories } from "@/lib/data";

const accessoryIcons = [
  Power,
  Cable,
  Headphones,
  Speaker,
  Watch,
  Power,
  Shield,
  Shield,
  PackageCheck,
];

export default function AccessoriesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Accessories"
        title="Quality mobile accessories for everyday use"
        description="Shop chargers, cables, audio products, protection, power, smart wearables, and storage accessories from YJM Boy."
      />
      <section className="tech-section">
        <div className="section-inner">
          <div className="mb-10">
            <span className="offer-badge">Offer: New Arrivals Available</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {accessories.map((product, index) => {
              const Icon = accessoryIcons[index] ?? PackageCheck;

              return (
              <article
                key={product.name}
                className="premium-card overflow-hidden"
              >
                <div
                  className="h-40 bg-[linear-gradient(135deg,rgba(34,211,238,0.42),rgba(255,255,255,0.08)),radial-gradient(circle_at_top_right,rgba(250,204,21,0.2),transparent_36%)]"
                  role="img"
                  aria-label={`${product.name} product placeholder`}
                />
                <div className="p-6">
                  <div className="icon-tile mb-5">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-black text-white">{product.name}</h2>
                  <p className="mt-3 leading-7 text-slate-300">
                    Available for customers who want reliable phone products,
                    clean presentation, and helpful buying advice.
                  </p>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
