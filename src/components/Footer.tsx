import Link from "next/link";
import { Facebook, Instagram, MapPin, MessageCircle, Phone, Smartphone } from "lucide-react";
import { contactInfo } from "@/lib/data";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const services = ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Water Damage Repair"];
const products = ["Chargers", "Power Banks", "Repair Tools", "Screen Protectors"];

export function Footer() {
  return (
    <footer className="border-t border-cyan-300/15 bg-[#03050a]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-slate-300 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <p className="flex items-center gap-2 text-lg font-black uppercase text-white">
            <Smartphone className="h-5 w-5 text-cyan-200" aria-hidden="true" />
            {contactInfo.businessName}
          </p>
          <p className="mt-3 max-w-sm leading-6">
            Premium phone repairs, reliable mobile accessories, and practical
            tools for repair technicians in Biu.
          </p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-cyan-200">Quick Links</p>
          <div className="mt-3 flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-cyan-200">Services</p>
          <div className="mt-3 flex flex-col gap-2">
            {services.map((service) => (
              <Link key={service} href="/phone-repair" className="hover:text-white">
                {service}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-cyan-200">Products</p>
          <div className="mt-3 flex flex-col gap-2">
            {products.map((product) => (
              <Link key={product} href={product === "Repair Tools" ? "/repair-tools" : "/accessories"} className="hover:text-white">
                {product}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-cyan-200">Contact Information</p>
          <p className="mt-3 flex gap-2 leading-6">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
            {contactInfo.address}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {contactInfo.phones.map((phone) => (
              <Link key={phone} href={`tel:${phone}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                {phone}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <a className="icon-tile h-10 w-10" href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
            <a className="icon-tile h-10 w-10" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a className="icon-tile h-10 w-10" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
        Copyright © 2026 {contactInfo.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
