import {
  Cable,
  Headphones,
  PackageCheck,
  Power,
  Shield,
  ShoppingBag,
  Speaker,
  Watch,
  Wrench,
} from "lucide-react";
import { accessories, repairTools } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

const productIcons = [
  Power,
  Cable,
  Headphones,
  Speaker,
  Watch,
  PackageCheck,
  Shield,
  Shield,
  PackageCheck,
];
const toolIcons = [Wrench, Wrench, Wrench, Wrench, Power, Power, PackageCheck, Cable];

const groups = [
  {
    title: "Accessories products",
    description:
      "Everyday phone accessories for protection, charging, audio, storage, and power.",
    items: accessories.map((item) => item.name),
    tone: "cyan",
  },
  {
    title: "Repair tools products",
    description:
      "Useful tools and supplies for phone technicians, repair shops, and hands-on fixes.",
    items: repairTools.map((item) => item.name),
    tone: "yellow",
  },
];

export function ProductCategories() {
  return (
    <section className="tech-section-alt">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Shop categories"
          title="Accessories and repair tools in one trusted place"
          description="YJM Boy serves customers who need quality phone products and technicians who need dependable repair tools."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {groups.map((group) => (
            <article
              key={group.title}
              className="premium-card overflow-hidden bg-[#05070b]"
            >
              <div
                role="img"
                aria-label={`${group.title} placeholder image`}
                className={
                  group.tone === "cyan"
                    ? "h-40 bg-[linear-gradient(135deg,rgba(34,211,238,0.48),rgba(255,255,255,0.06)),radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_34%)]"
                    : "h-40 bg-[linear-gradient(135deg,rgba(250,204,21,0.42),rgba(255,255,255,0.06)),radial-gradient(circle_at_top_right,rgba(34,211,238,0.24),transparent_34%)]"
                }
              />
              <div className="p-6">
                <div className="mb-5 inline-flex rounded-md border border-cyan-300/25 bg-cyan-300/10 p-3 text-cyan-200">
                  <ShoppingBag className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-black text-white">{group.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {group.description}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item, index) => {
                    const Icon =
                      group.tone === "cyan"
                        ? productIcons[index] ?? PackageCheck
                        : toolIcons[index] ?? Wrench;

                    return (
                      <p
                        key={item}
                        className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-100 transition hover:border-cyan-300/40"
                      >
                        <Icon className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
