import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { contactInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact YJM BOY Phone Repair in Biu",
  description:
    "Contact YJM BOY at No. 2 Market Road, Biu, Borno State for phone repair, accessories, spare parts, and repair tools.",
};

export default function ContactPage() {
  const message = encodeURIComponent(
    "Hello YJM Boy, I want to contact your shop.",
  );

  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Visit, call, or message YJM Boy"
        description="Reach the shop for repair questions, accessories, repair tools, and product availability."
      />
      <section className="tech-section">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <article className="premium-card p-6 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Shop address
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              {contactInfo.address}
            </h2>
            <div
              className="mt-8 min-h-[220px] rounded-md border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(255,255,255,0.05)),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.18),transparent_32%)]"
              role="img"
              aria-label="Map placeholder for YJM BOY shop location in Biu"
            />
          </article>
          <article className="premium-card p-6 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-200">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Phone numbers
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {contactInfo.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="rounded-md border border-white/10 bg-[#07101a] px-5 py-4 text-xl font-black text-white transition hover:border-cyan-300/60"
                >
                  {phone}
                </a>
              ))}
            </div>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=${message}`}
              className="btn-primary mt-8"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </article>
          <article className="premium-card p-6 sm:p-8 lg:col-span-2">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
              Contact form
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              Send a quick message
            </h2>
            <ContactForm />
          </article>
          <article className="premium-card p-6 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Business hours
            </p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-md border border-white/10 bg-[#07101a] px-5 py-4">
                <p className="font-black text-white">Monday - Saturday</p>
                <p className="mt-1 text-slate-300">8:00 AM - 6:00 PM</p>
              </div>
              <div className="rounded-md border border-white/10 bg-[#07101a] px-5 py-4">
                <p className="font-black text-white">Sunday</p>
                <p className="mt-1 text-slate-300">Closed</p>
              </div>
            </div>
          </article>
          <article className="premium-card p-6 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-200">
              <Navigation className="h-4 w-4" aria-hidden="true" />
              How to find us
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">Visit No. 2 Market Road</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Come to YJM BOY at No. 2 Market Road, Biu, Borno State for phone repair support,
              accessories, spare parts, and mobile repair tools.
            </p>
            <LinkLikeContact href={`tel:${contactInfo.phones[0]}`} label="Call before visiting" />
          </article>
          <article className="premium-card p-6 sm:p-8 lg:col-span-2">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp support
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">Confirm repair or product availability fast</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              Send a WhatsApp message to ask about repairs, accessories, spare parts, repair tools,
              prices, and available stock before coming to the shop.
            </p>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=${message}`}
              className="btn-primary mt-6"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </article>
        </div>
      </section>
      <CTASection />
    </main>
  );
}

function LinkLikeContact({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="btn-secondary mt-6">
      <Phone className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  );
}
