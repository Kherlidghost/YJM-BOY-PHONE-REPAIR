import {
  BadgeCheck,
  Clock,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Tags,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const homeTrustItems = [
  {
    title: "Same-day support",
    description: "Fast attention for common phone issues, accessories, and product availability questions.",
    icon: Clock,
  },
  {
    title: "Quality products",
    description: "Accessories, spare parts, and tools are selected for practical everyday reliability.",
    icon: PackageCheck,
  },
  {
    title: "Affordable prices",
    description: "Clear options for customers who need useful products and careful service at fair prices.",
    icon: Tags,
  },
  {
    title: "Free diagnosis",
    description: "Customers can bring phones for inspection and clear advice before repair work begins.",
    icon: ShieldCheck,
  },
  {
    title: "WhatsApp support",
    description: "Ask about repairs, stock, and product details quickly before visiting the shop.",
    icon: MessageCircle,
  },
];

const productTrustItems = [
  {
    title: "Genuine quality focus",
    description: "Products are selected with everyday phone users and technicians in mind.",
    icon: BadgeCheck,
  },
  {
    title: "Tested before sale",
    description: "Available products can be checked so customers leave with confidence.",
    icon: ShieldCheck,
  },
  {
    title: "Affordable pricing",
    description: "Practical choices for customers, students, repair shops, and working technicians.",
    icon: Tags,
  },
  {
    title: "WhatsApp availability check",
    description: "Confirm stock, price, and product fit before visiting No. 2 Market Road, Biu.",
    icon: MessageCircle,
  },
];

export function HomeTrustSection() {
  return (
    <section className="tech-section">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Trusted local shop"
          title="Why customers trust YJM BOY"
          description="A careful, customer-first phone repair and product shop serving Biu with clear support and dependable product advice."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {homeTrustItems.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="premium-card p-5">
                <span className="icon-tile">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductTrustSection() {
  return (
    <section className="tech-section-alt">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Buy with confidence"
          title="Product support customers can trust"
          description="YJM BOY helps customers choose suitable products, confirm availability, and get helpful support before buying."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productTrustItems.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="premium-card p-5">
                <span className="icon-tile">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-md border border-cyan-300/25 bg-cyan-300/10 p-5 text-center">
          <Sparkles className="mx-auto h-6 w-6 text-cyan-200" aria-hidden="true" />
          <p className="mt-3 font-bold leading-7 text-slate-200">
            Need help choosing? Send a WhatsApp message and ask YJM BOY to confirm the best available option.
          </p>
        </div>
      </div>
    </section>
  );
}
