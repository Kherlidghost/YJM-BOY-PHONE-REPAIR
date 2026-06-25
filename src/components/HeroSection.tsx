import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { contactInfo } from "@/lib/data";

export function HeroSection() {
  const message = encodeURIComponent(
    "Hello YJM Boy, I want to ask about your services.",
  );

  return (
    <section className="relative overflow-hidden bg-[#05070b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.24),transparent_32%),radial-gradient(circle_at_left,rgba(14,165,233,0.18),transparent_35%),linear-gradient(135deg,rgba(14,165,233,0.14),transparent_48%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="offer-badge mb-5">
            Biu trusted repair shop
          </p>
          <h1 className="text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Professional Phone Repair, Accessories & Repair Tools
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Fast repairs, quality accessories, and professional tools you can
            trust.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              href="/phone-repair"
              className="btn-secondary"
            >
              View Services
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-slate-400">
            {contactInfo.address}
          </p>
        </div>

        <div
          className="premium-card relative min-h-[400px] overflow-hidden p-5"
          role="img"
          aria-label="Phone repair desk illustration placeholder"
        >
          <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(34,211,238,0.24),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.18),transparent_34%)]" />
          <div className="relative grid h-full gap-4">
            <div className="rounded-md border border-white/10 bg-black/35 p-5">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                <Wrench className="h-4 w-4" aria-hidden="true" />
                Repair desk
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <span className="h-24 rounded-md bg-cyan-300/25" />
                <span className="h-24 rounded-md bg-white/15" />
                <span className="h-24 rounded-md bg-yellow-300/25" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <Smartphone className="mb-3 h-6 w-6 text-cyan-200" aria-hidden="true" />
                <p className="text-3xl font-black text-white">3</p>
                <p className="mt-1 text-sm text-slate-300">Phone lines</p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="mb-3 h-6 w-6 text-yellow-200" aria-hidden="true" />
                <p className="text-3xl font-black text-cyan-200">Fast</p>
                <p className="mt-1 text-sm text-slate-300">Repair support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
