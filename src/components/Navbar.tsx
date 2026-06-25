"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Smartphone } from "lucide-react";
import { contactInfo } from "@/lib/data";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/phone-repair", label: "Phone Repair" },
  { href: "/accessories", label: "Accessories" },
  { href: "/repair-tools", label: "Repair Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-300/15 bg-[#05070b]/78 shadow-lg shadow-black/20 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md border border-cyan-300/40 bg-cyan-300/10 text-cyan-200 shadow-lg shadow-cyan-950/30">
            <Smartphone className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <span className="text-base font-black uppercase tracking-wide text-white">
              {contactInfo.shortName}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-cyan-200">
              Phone Repair
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? "rounded-md bg-cyan-300 px-3 py-2 font-black text-[#031018] transition"
                  : "rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-cyan-200"
              }
            >
              {item.label}
            </Link>
          ))}
          <span className="hidden rounded-md border border-white/10 p-2 text-slate-300 md:grid lg:hidden">
            <Menu className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </nav>
    </header>
  );
}
