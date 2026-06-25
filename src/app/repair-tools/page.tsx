import { Cable, PackageCheck, Power, SearchCheck, Wrench } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { repairTools } from "@/lib/data";

const toolIcons = [
  Wrench,
  Wrench,
  SearchCheck,
  Wrench,
  Power,
  Power,
  PackageCheck,
  Cable,
];

export default function RepairToolsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Repair tools"
        title="Professional mobile repair tools for technicians"
        description="Find soldering tools, microscope tools, BGA supplies, power equipment, organizers, and repair consumables for phone work."
      />
      <section className="tech-section">
        <div className="section-inner">
          <div className="mb-10">
            <span className="offer-badge">Offer: Wholesale & Retail Available</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {repairTools.map((tool, index) => {
              const Icon = toolIcons[index] ?? Wrench;

              return (
              <article
                key={tool.name}
                className="premium-card overflow-hidden"
              >
                <div
                  className="h-40 bg-[linear-gradient(135deg,rgba(250,204,21,0.38),rgba(255,255,255,0.08)),radial-gradient(circle_at_top_right,rgba(34,211,238,0.2),transparent_36%)]"
                  role="img"
                  aria-label={`${tool.name} repair tool placeholder`}
                />
                <div className="p-6">
                  <div className="icon-tile mb-5">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-black text-white">{tool.name}</h2>
                  <p className="mt-3 leading-7 text-slate-300">
                    Useful for organized repair benches, safer handling, and
                    professional technician workflow.
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
