"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, Smartphone, X } from "lucide-react";
import { useState } from "react";
import { logoutAdminAction } from "@/actions/admin-auth";
import { adminNavItems } from "@/lib/admin-data";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="border-b border-cyan-300/15 bg-[#05070b]/95 px-4 py-4 backdrop-blur lg:min-h-screen lg:border-b-0 lg:border-r lg:px-5">
      <div className="flex items-center justify-between gap-4">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md border border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
            <Smartphone className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-black uppercase text-white">YJM Boy</span>
            <span className="text-xs uppercase tracking-[0.18em] text-cyan-200">Admin</span>
          </span>
        </Link>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.03] text-cyan-100 lg:hidden"
          aria-label={isOpen ? "Close admin menu" : "Open admin menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <div className={isOpen ? "mt-6 grid gap-4 lg:mt-8" : "hidden lg:mt-8 lg:grid lg:gap-4"}>
        <nav className="grid gap-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={
                  isActive
                    ? "inline-flex items-center gap-3 rounded-md border border-cyan-300/50 bg-cyan-300 px-4 py-3 text-sm font-black text-[#031018] shadow-lg shadow-cyan-950/25"
                    : "inline-flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
                }
              >
                <Icon className={isActive ? "h-4 w-4 text-[#031018]" : "h-4 w-4 text-cyan-200"} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-yellow-300/30 bg-yellow-300/10 px-4 py-3 text-sm font-black text-yellow-100 transition hover:border-yellow-200 hover:text-white"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
