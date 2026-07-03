import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | YJM BOY Phone Repair and Accessories",
  description: "Confirm your YJM BOY product order.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
