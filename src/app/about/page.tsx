import { BadgeCheck, MapPin, ShieldCheck } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { contactInfo } from "@/lib/data";

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About"
        title="A modern phone repair and accessories shop in Biu"
        description="YJM Boy provides trusted phone repair services, quality accessories, and professional tools for customers, technicians, and repair shops in Biu, Borno State."
      />
      <section className="tech-section">
        <div className="section-inner grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div
            className="premium-card min-h-[360px] overflow-hidden bg-[linear-gradient(135deg,rgba(34,211,238,0.28),rgba(255,255,255,0.06)),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.22),transparent_34%)] p-6"
            role="img"
            aria-label="YJM BOY phone repair shop brand placeholder"
          >
            <div className="grid h-full content-end gap-4">
              <div className="icon-tile">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="max-w-sm text-2xl font-black text-white">
                Trusted repair service, accessories, and tools in Biu.
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
              {contactInfo.businessName}
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              Built for repairs, accessories, and technician needs
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              YJM BOY PHONE REPAIR AND ACCESSORIES brings together trusted phone
              repair services, quality accessories, and professional mobile
              repair tools for customers, technicians, and repair shops in Biu,
              Borno State. The shop helps customers fix everyday phone problems,
              choose reliable accessories, and find practical tools for serious
              repair work.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              Visit {contactInfo.address} for direct support, product advice, and a
              premium repair-shop experience close to home.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="premium-card p-5">
                <BadgeCheck className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <p className="mt-4 font-black text-white">Quality focused</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Clear guidance for repairs, products, and tool selection.
                </p>
              </div>
              <div className="premium-card p-5">
                <MapPin className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <p className="mt-4 font-black text-white">Easy to visit</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Located at No. 2 Market Road, Biu, Borno State.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
