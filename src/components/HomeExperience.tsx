"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Clock,
  Cpu,
  Gauge,
  Headphones,
  MessageCircle,
  Microscope,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Smartphone,
  Tags,
  Wrench,
  Zap,
} from "lucide-react";
import { contactInfo } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const trustItems = [
  { title: "Same-day support", description: "Fast attention for urgent repair checks and product availability.", icon: Clock },
  { title: "Quality products", description: "Accessories, tools, and spare parts selected for real daily use.", icon: ShieldCheck },
  { title: "Affordable prices", description: "Clear pricing for customers, students, technicians, and repair shops.", icon: Tags },
  { title: "Free diagnosis", description: "Bring your device for inspection before making a repair decision.", icon: Gauge },
  { title: "WhatsApp support", description: "Ask questions, confirm stock, or get directions before visiting.", icon: MessageCircle },
];

const serviceTiles = [
  {
    title: "Precision Phone Repair",
    description: "Screen replacement, battery service, charging ports, water damage checks, data transfer, and motherboard diagnosis.",
    href: "/phone-repair",
    label: "View Services",
    icon: Smartphone,
  },
  {
    title: "Premium Accessories",
    description: "Chargers, cables, earbuds, power banks, cases, screen protectors, smart watches, and memory cards.",
    href: "/accessories",
    label: "View Products",
    icon: ShoppingBag,
  },
  {
    title: "Technician Repair Tools",
    description: "Soldering stations, microscopes, screwdriver kits, BGA tools, power supply units, flux, and solder wire.",
    href: "/repair-tools",
    label: "Explore Tools",
    icon: Wrench,
  },
];

const orbitItems = [
  { label: "Screen", icon: Smartphone, className: "left-2 top-12" },
  { label: "Power", icon: BatteryCharging, className: "right-2 top-24" },
  { label: "Audio", icon: Headphones, className: "bottom-28 left-0" },
  { label: "Tools", icon: Microscope, className: "bottom-12 right-4" },
];

const stats = [
  { value: "1000+", label: "Repairs Completed" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "Same-Day", label: "Support" },
  { value: "Free", label: "Diagnosis" },
];

function PremiumBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,229,255,0.22),transparent_28rem),radial-gradient(circle_at_80%_12%,rgba(59,130,246,0.24),transparent_30rem),radial-gradient(circle_at_70%_82%,rgba(250,204,21,0.12),transparent_24rem)]" />
      <div className="home-aurora absolute -left-40 top-[-18rem] h-[44rem] w-[44rem] rounded-full bg-[#00E5FF]/20 blur-3xl" />
      <div className="home-aurora-delayed absolute -right-40 top-20 h-[38rem] w-[38rem] rounded-full bg-[#3B82F6]/25 blur-3xl" />
      <div className="home-aurora-slow absolute bottom-[-18rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-[#FACC15]/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="home-light-beam absolute left-1/2 top-0 h-[120vh] w-32 -translate-x-1/2 rotate-12 bg-gradient-to-b from-cyan-300/0 via-cyan-300/12 to-cyan-300/0 blur-2xl" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="home-noise absolute inset-0 opacity-[0.12]" />
    </div>
  );
}

function MagneticHero() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(0,229,255,0.20), transparent 34rem)`;
  const message = encodeURIComponent("Hello YJM BOY, I need premium phone repair or product support.");

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
    >
      <motion.div className="absolute inset-0 -z-10" style={{ background: spotlight }} />
      <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-14 pt-12 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div
            variants={fadeUp}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl"
          >
            <span className="h-2 w-2 rounded-full bg-[#00E5FF] shadow-[0_0_22px_rgba(0,229,255,0.95)]" />
            Trusted Phone Repair, Accessories & Repair Tools in Biu
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-5xl text-balance text-5xl font-black leading-[0.95] text-white sm:text-7xl lg:text-8xl"
          >
            Professional Phone Repair,
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-[#00E5FF] bg-clip-text text-transparent">
              Quality Accessories
            </span>
            <span className="home-typing mt-2 block text-4xl text-[#FACC15] sm:text-6xl lg:text-7xl">
              & Repair Tools
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-[#B5B5B5] sm:text-xl">
            A polished technology shop experience for fast repairs, trusted accessories,
            professional repair tools, and confident WhatsApp support in Biu.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={`https://wa.me/${contactInfo.whatsapp}?text=${message}`} className="home-btn-primary" target="_blank" rel="noreferrer">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <Link href="/accessories" className="home-btn-glass">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              View Products
            </Link>
            <Link href="/phone-repair" className="home-btn-glass">
              <Wrench className="h-5 w-5" aria-hidden="true" />
              View Services
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            {["Free diagnosis", "Same-day support", "Quality products"].map((badge) => (
              <span key={badge} className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-slate-200 backdrop-blur-xl">
                <CheckCircle2 className="mr-2 inline h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl"
              >
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-sm font-bold text-[#B5B5B5]">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto min-h-[600px] w-full max-w-xl"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-3xl" />
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, 1.2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-6 h-[560px] w-[300px] -translate-x-1/2 rounded-[3rem] border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.035))] p-4 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          >
            <div className="h-full overflow-hidden rounded-[2.4rem] border border-cyan-200/20 bg-[#070b16]">
              <div className="mx-auto mt-4 h-6 w-28 rounded-full bg-black/60" />
              <div className="p-5">
                <div className="mt-8 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
                  <Cpu className="h-9 w-9 text-cyan-200" aria-hidden="true" />
                  <p className="mt-5 text-2xl font-black text-white">Device Health</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Diagnosis complete. Ready for precision service.</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                    <Zap className="h-6 w-6 text-[#FACC15]" aria-hidden="true" />
                    <p className="mt-8 text-sm font-black text-white">Fast</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                    <ShieldCheck className="h-6 w-6 text-[#00E5FF]" aria-hidden="true" />
                    <p className="mt-8 text-sm font-black text-white">Trusted</p>
                  </div>
                </div>
                <div className="mt-4 rounded-[2rem] bg-[linear-gradient(135deg,rgba(0,229,255,0.25),rgba(250,204,21,0.16))] p-5">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-50">YJM BOY</p>
                  <div className="mt-10 h-2 rounded-full bg-white/20">
                    <div className="h-2 w-4/5 rounded-full bg-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.7)]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {orbitItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                animate={{ y: [0, index % 2 ? 18 : -18, 0] }}
                transition={{ duration: 4.8 + index, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute ${item.className} rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl`}
              >
                <Icon className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <p className="mt-3 text-sm font-black text-white">{item.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function PremiumSection({
  eyebrow,
  title,
  description,
  children,
  flip = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,229,255,0.10),transparent_28rem),radial-gradient(circle_at_85%_70%,rgba(59,130,246,0.12),transparent_26rem)]" />
      <div className={`relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="home-kicker">{eyebrow}</motion.p>
          <motion.h2 variants={fadeUp} className="mt-5 text-4xl font-black leading-tight text-white sm:text-6xl">{title}</motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-8 text-[#B5B5B5]">{description}</motion.p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function TrustGrid() {
  return (
    <PremiumSection
      eyebrow="Trust architecture"
      title="Designed around confidence, not noise."
      description="Every customer touchpoint is built to feel clear, fast, premium, and dependable before the first message is sent."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="grid gap-4 sm:grid-cols-2"
      >
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.article key={item.title} variants={fadeUp} whileHover={{ y: -8, scale: 1.015 }} className="home-glass-card">
              <span className="home-icon">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-[#B5B5B5]">{item.description}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </PremiumSection>
  );
}

function ServicesShowcase() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent),radial-gradient(circle_at_50%_10%,rgba(250,204,21,0.10),transparent_26rem)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl">
          <motion.p variants={fadeUp} className="home-kicker">Premium shop ecosystem</motion.p>
          <motion.h2 variants={fadeUp} className="mt-5 text-4xl font-black leading-tight text-white sm:text-6xl">
            Repair, products, and tools in one polished experience.
          </motion.h2>
        </motion.div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {serviceTiles.map((tile, index) => {
            const Icon = tile.icon;
            return (
              <motion.article
                key={tile.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] p-7 shadow-2xl shadow-black/25 backdrop-blur-2xl"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl transition group-hover:bg-cyan-300/20" />
                <span className="home-icon">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-10 text-3xl font-black text-white">{tile.title}</h3>
                <p className="mt-4 min-h-32 leading-8 text-[#B5B5B5]">{tile.description}</p>
                <Link href={tile.href} className="home-card-link mt-7">
                  {tile.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PremiumCTA() {
  const message = encodeURIComponent("Hello YJM BOY, I want premium support from your shop.");
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-12 lg:p-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,229,255,0.20),transparent_26rem),radial-gradient(circle_at_90%_70%,rgba(250,204,21,0.12),transparent_24rem)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="home-kicker">Ready when you are</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
              Visit a shop that looks and works like modern technology should.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#B5B5B5]">
              {contactInfo.address}. Call, chat, or browse available products before you arrive.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <a href={`tel:${contactInfo.phones[0]}`} className="home-btn-glass">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Now
            </a>
            <a href={`https://wa.me/${contactInfo.whatsapp}?text=${message}`} className="home-btn-primary" target="_blank" rel="noreferrer">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="home-btn-glass">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Visit Our Shop
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function HomeExperience() {
  return (
    <main className="relative isolate overflow-hidden bg-[#050816] text-white">
      <PremiumBackground />
      <MagneticHero />
      <TrustGrid />
      <ServicesShowcase />
      <PremiumSection
        eyebrow="Local, but elevated"
        title="A Biu technology brand with premium customer energy."
        description="YJM BOY blends phone repair support, accessories, spare parts, and professional tools into one modern storefront for customers and technicians."
        flip
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          className="relative min-h-[430px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,229,255,0.22),transparent_18rem),radial-gradient(circle_at_80%_75%,rgba(250,204,21,0.14),transparent_16rem)]" />
          <div className="relative grid h-full content-end">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Address", "No. 2 Market Road, Biu"],
                ["WhatsApp", "07062849832"],
                ["Catalog", "Accessories, tools, spare parts"],
                ["Support", "Free diagnosis available"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">{label}</p>
                  <p className="mt-3 text-xl font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </PremiumSection>
      <PremiumCTA />
    </main>
  );
}
