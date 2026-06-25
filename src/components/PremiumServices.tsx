import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

export function PremiumServices() {
  return (
    <section className="tech-section">
      <div className="section-inner">
        <SectionHeader
          eyebrow="What we do"
          title="Premium repair services and mobile products"
          description="A clear service experience for common phone faults, mobile accessories, and professional technician tools."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="premium-card group p-6 animate-rise"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="icon-tile transition group-hover:scale-110">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-7 text-2xl font-black text-white">{service.title}</h3>
                <p className="mt-4 min-h-20 leading-7 text-slate-300">{service.description}</p>
                <Link href={service.href} className="mt-7 inline-flex items-center gap-2 text-sm font-black text-cyan-200 transition group-hover:text-white">
                  Learn More
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
