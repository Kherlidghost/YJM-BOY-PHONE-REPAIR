import { BatteryCharging, Database, Droplets, PanelBottom, SearchCheck, Smartphone, Unplug, Wrench } from "lucide-react";
import { phoneRepairServices } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

const icons = [
  Smartphone,
  BatteryCharging,
  Unplug,
  PanelBottom,
  Droplets,
  Database,
  SearchCheck,
];

export function ServicesSection() {
  return (
    <section className="tech-section">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Phone repair services"
          title="Reliable repair work for common phone problems"
          description="From broken screens to charging problems, YJM Boy helps customers get their phones working again with careful checks and practical repairs."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {phoneRepairServices.map((service, index) => {
            const Icon = icons[index] ?? Wrench;

            return (
            <article
              key={service}
              className="premium-card p-6"
            >
              <div className="icon-tile">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-black text-white">{service}</h3>
              <p className="mt-3 leading-7 text-slate-300">
                Fast support, clean handling, and clear communication before the
                job starts.
              </p>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
