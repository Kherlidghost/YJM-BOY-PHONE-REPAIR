import {
  BatteryCharging,
  Database,
  Droplets,
  PanelBottom,
  SearchCheck,
  Smartphone,
  Unplug,
  Wrench,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { phoneRepairServices } from "@/lib/data";

const serviceIcons = [
  Smartphone,
  BatteryCharging,
  Unplug,
  PanelBottom,
  Droplets,
  Database,
  SearchCheck,
];

export default function PhoneRepairPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Phone repair"
        title="Professional phone repair services in Biu"
        description="From cracked screens to motherboard diagnosis, YJM Boy gives customers careful inspection, clear advice, and dependable repair support."
      />
      <section className="tech-section">
        <div className="section-inner">
          <div className="mb-10">
            <span className="offer-badge">Offer: FREE DIAGNOSIS</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {phoneRepairServices.map((service, index) => {
              const Icon = serviceIcons[index] ?? Wrench;

              return (
              <article
                key={service}
                className="premium-card p-6"
              >
                <div className="icon-tile mb-6">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-black text-white">{service}</h2>
                <p className="mt-3 leading-7 text-slate-300">
                  Bring your device for inspection, fault confirmation, and a
                  clear repair recommendation before work begins.
                </p>
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
