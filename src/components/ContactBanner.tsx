import { MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "@/lib/data";

export function ContactBanner() {
  const message = encodeURIComponent("Hello YJM Boy, I need my phone fixed.");

  return (
    <section className="tech-section-alt">
      <div className="section-inner overflow-hidden rounded-[1.5rem] border border-cyan-300/30 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.28),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(250,204,21,0.08))] p-8 shadow-2xl shadow-cyan-950/25 sm:p-12 lg:p-16">
        <div className="max-w-4xl">
          <p className="offer-badge">Need Your Phone Fixed?</p>
          <h2 className="mt-5 text-4xl font-black leading-tight text-white sm:text-6xl">
            Professional Repair Starts Here.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Call the shop or start a WhatsApp chat for fast repair support, accessories,
            and mobile repair tools.
          </p>
        </div>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={`tel:${contactInfo.phones[0]}`} className="btn-primary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call Now
          </a>
          <a
            href={`https://wa.me/${contactInfo.whatsapp}?text=${message}`}
            className="btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
