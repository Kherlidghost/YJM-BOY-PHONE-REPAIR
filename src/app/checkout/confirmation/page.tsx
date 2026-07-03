import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PurchaseTracker } from "@/components/cart/PurchaseTracker";
import { formatNaira } from "@/lib/products";

export const metadata: Metadata = {
  title: "Order Confirmed | YJM BOY Phone Repair and Accessories",
  description: "Your product order has been received.",
};

type ConfirmationPageProps = {
  searchParams: Promise<{
    order?: string;
    ids?: string;
    total?: string;
  }>;
};

export default async function CheckoutConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const params = await searchParams;
  const orderId = params.order ?? "";
  const contentIds = params.ids?.split(",").filter(Boolean) ?? [];
  const total = Number(params.total ?? 0);
  const safeTotal = Number.isFinite(total) ? total : 0;

  return (
    <main>
      <PurchaseTracker orderId={orderId} contentIds={contentIds} value={safeTotal} />
      <section className="tech-section">
        <div className="section-inner">
          <div className="premium-card mx-auto max-w-2xl p-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-cyan-200" aria-hidden="true" />
            <p className="offer-badge mt-6">Order confirmed</p>
            <h1 className="mt-5 text-4xl font-black text-white">Thank you</h1>
            <p className="mt-4 leading-7 text-slate-300">
              Your order has been received. YJM BOY will contact you to confirm availability and delivery.
            </p>
            {orderId ? (
              <p className="mt-6 text-sm font-bold text-slate-400">Order reference: {orderId}</p>
            ) : null}
            <p className="mt-3 text-2xl font-black text-cyan-200">{formatNaira(safeTotal)}</p>
            <Link href="/accessories" className="btn-primary mt-8">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
