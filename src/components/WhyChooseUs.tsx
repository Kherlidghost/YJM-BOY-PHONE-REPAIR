import { BadgeCheck, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { whyChooseUs } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

const icons = [Wrench, BadgeCheck, ShieldCheck, MapPin];

export function WhyChooseUs() {
  return (
    <section className="tech-section">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Why choose us"
          title="A practical repair shop built on trust"
          description="Customers come to YJM Boy for honest support, useful products, and a modern repair-shop experience close to home."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((reason, index) => (
            <article
              key={reason}
              className="premium-card p-6"
            >
              <div className="icon-tile">
                {(() => {
                  const Icon = icons[index] ?? BadgeCheck;
                  return <Icon className="h-6 w-6" aria-hidden="true" />;
                })()}
              </div>
              <p className="text-sm font-black text-yellow-200">
                0{index + 1}
              </p>
              <h3 className="mt-5 text-xl font-black leading-7 text-white">
                {reason}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
