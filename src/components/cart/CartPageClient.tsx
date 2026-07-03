"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { trackMetaInitiateCheckout } from "@/lib/meta-pixel";
import { formatNaira } from "@/lib/products";

export function CartPageClient() {
  const { items, itemCount, total, updateQuantity, removeItem } = useCart();
  const contentIds = items.map((item) => item.id);

  function handleCheckoutClick() {
    if (contentIds.length === 0) {
      return;
    }

    trackMetaInitiateCheckout({
      content_ids: contentIds,
      content_type: "product",
      currency: "NGN",
      value: total,
    });
  }

  return (
    <main>
      <section className="tech-section">
        <div className="section-inner">
          <p className="offer-badge">Shopping cart</p>
          <h1 className="mt-5 text-4xl font-black text-white sm:text-6xl">Your Cart</h1>

          {items.length === 0 ? (
            <div className="premium-card mt-8 p-8 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-cyan-200" aria-hidden="true" />
              <p className="mt-4 text-xl font-black text-white">Your cart is empty.</p>
              <Link href="/accessories" className="btn-primary mt-6">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="grid gap-4">
                {items.map((item) => (
                  <article key={item.id} className="premium-card grid gap-4 p-4 sm:grid-cols-[120px_1fr]">
                    <div className="relative aspect-square overflow-hidden rounded-md border border-cyan-300/20 bg-cyan-300/10">
                      {item.image_url ? (
                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="text-2xl font-black text-white">{item.name}</h2>
                          <p className="mt-2 text-cyan-200">{formatNaira(item.price)}</p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-slate-200"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-slate-200"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="min-w-10 text-center text-lg font-black text-white">{item.quantity}</span>
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-slate-200"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="premium-card h-fit p-6">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Summary</p>
                <div className="mt-6 flex items-center justify-between text-slate-200">
                  <span>Items</span>
                  <span className="font-black text-white">{itemCount}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xl">
                  <span className="font-black text-white">Total</span>
                  <span className="font-black text-cyan-200">{formatNaira(total)}</span>
                </div>
                <Link href="/checkout" className="btn-primary mt-8 w-full" onClick={handleCheckoutClick}>
                  Checkout
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
