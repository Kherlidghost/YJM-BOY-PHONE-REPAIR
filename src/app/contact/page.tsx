import { MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { contactInfo } from "@/lib/data";

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
            <form className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
                Full name
                <input
                  type="text"
                  placeholder="Your name"
                  className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
                Phone number
                <input
                  type="tel"
                  placeholder="Your phone number"
                  className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-200 md:col-span-2">
                What do you need?
                <select className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition focus:border-cyan-300">
                  <option>Phone repair</option>
                  <option>Accessories</option>
                  <option>Repair tools</option>
                  <option>General enquiry</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-200 md:col-span-2">
                Message
                <textarea
                  rows={5}
                  placeholder="Tell us what you need"
                  className="resize-none rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                />
              </label>
              <div className="md:col-span-2">
                <button
                  type="button"
                  className="btn-primary"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  Send Message
                </button>
                <p className="mt-3 text-sm text-slate-400">
                  Form UI only. Backend submission will be added in a later
                  phase.
                </p>
              </div>
            </form>
          </article>
        </div>
      </section>
    </main>
  );
}
