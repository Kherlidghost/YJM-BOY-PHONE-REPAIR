import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "@/lib/data";

export function CTASection() {
  const message = encodeURIComponent(
    "Hello YJM Boy, I want to contact your shop.",
  );

  return (
    <section className="tech-section-alt">
      <div className="section-inner rounded-lg border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(250,204,21,0.08))] p-6 shadow-2xl shadow-cyan-950/20 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="offer-badge">
              Contact YJM Boy
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black text-white sm:text-4xl">
              Need a repair, accessory, or technician tool today?
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-200">
              Visit the shop at {contactInfo.address}, call any line, or send a
              WhatsApp message for quick support.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href={`tel:${contactInfo.phones[0]}`} className="btn-secondary">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=${message}`}
              className="btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="btn-secondary"
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Visit Our Shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
