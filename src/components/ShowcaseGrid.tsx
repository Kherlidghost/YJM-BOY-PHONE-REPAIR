import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { accessories, repairTools } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

type ShowcaseGridProps = {
  type: "accessories" | "tools";
};

export function ShowcaseGrid({ type }: ShowcaseGridProps) {
  const isAccessories = type === "accessories";
  const items = isAccessories ? accessories : repairTools;

  return (
    <section className={isAccessories ? "tech-section-alt" : "tech-section"}>
      <div className="section-inner">
        <SectionHeader
          eyebrow={isAccessories ? "Accessories showcase" : "Repair tools showcase"}
          title={isAccessories ? "Products that make every phone better" : "Tools for serious repair work"}
          description={
            isAccessories
              ? "A premium grid of daily essentials for protection, power, audio, and storage."
              : "Professional repair tools and consumables for technicians and mobile repair shops."
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.name}
                className="premium-card group overflow-hidden animate-rise"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div
                  className="relative h-48 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.34),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.1),rgba(250,204,21,0.12))]"
                  role="img"
                  aria-label={`${item.name} product placeholder`}
                >
                  <div className="absolute inset-6 grid place-items-center rounded-2xl border border-white/10 bg-black/20 transition duration-300 group-hover:scale-105">
                    <Icon className="h-16 w-16 text-white drop-shadow" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black text-white">{item.name}</h3>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-slate-300">{item.description}</p>
                  <Link
                    href={isAccessories ? "/accessories" : "/repair-tools"}
                    className="btn-secondary mt-5 w-full px-4 py-2 text-sm"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
