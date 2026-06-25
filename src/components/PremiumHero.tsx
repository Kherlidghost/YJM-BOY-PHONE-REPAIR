"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Smartphone, Sparkles, Wrench } from "lucide-react";
import { contactInfo, heroStats } from "@/lib/data";

export function PremiumHero() {
  const message = encodeURIComponent("Hello YJM Boy, I need professional phone repair support.");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#03050a]">
      <div className="animated-hero-bg absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="animate-rise">
          <p className="offer-badge mb-6">
            <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
            Premium repair brand in Biu
          </p>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.98] text-white sm:text-7xl lg:text-8xl">
            Phone repair that feels professional from start to finish.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Fast repairs, premium accessories, and professional repair tools for customers,
            technicians, and repair shops in Biu, Borno State.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
            href={`https://wa.me/${contactInfo.whatsapp}?text=${message}`}
              className="btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <Link href="/phone-repair" className="btn-secondary">
              View Services
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className="stat-card rounded-lg border border-white/10 bg-white/[0.045] p-4 backdrop-blur"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-sm font-bold text-cyan-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-float-slow relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-10 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-cyan-200/25 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div
              className="mx-auto h-[540px] max-w-[280px] rounded-[2.2rem] border border-white/20 bg-[#070b12] p-4 shadow-2xl shadow-black/50"
              role="img"
              aria-label="Illustration of a smartphone repair dashboard"
            >
              <div className="h-full rounded-[1.7rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.28),transparent_34%),linear-gradient(180deg,#101827,#05070b)] p-5">
                <div className="mx-auto h-5 w-24 rounded-full bg-black/50" />
                <div className="mt-10 grid gap-4">
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                    <Smartphone className="h-9 w-9 text-cyan-200" aria-hidden="true" />
                    <p className="mt-4 text-xl font-black text-white">Free Diagnosis</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Inspect, explain, repair.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <Wrench className="h-6 w-6 text-yellow-200" aria-hidden="true" />
                      <p className="mt-5 text-sm font-black text-white">Tools</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <ShieldCheck className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                      <p className="mt-5 text-sm font-black text-white">Quality</p>
                    </div>
                  </div>
                  <div className="h-28 rounded-2xl bg-[linear-gradient(135deg,rgba(250,204,21,0.28),rgba(34,211,238,0.2))]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
