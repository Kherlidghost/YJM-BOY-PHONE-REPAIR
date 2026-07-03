import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Cart | YJM BOY Phone Repair and Accessories",
  description: "Review your selected products before checkout.",
};

export default function CartPage() {
  return <CartPageClient />;
}
