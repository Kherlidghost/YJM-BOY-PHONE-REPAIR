"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/components/cart/CartProvider";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <Navbar />
      {children}
      <Footer />
      <FloatingWhatsAppButton />
    </CartProvider>
  );
}
