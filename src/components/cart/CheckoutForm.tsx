"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Send } from "lucide-react";
import {
  createCheckoutOrder,
  type CheckoutActionState,
} from "@/actions/orders";
import { useCart } from "@/components/cart/CartProvider";
import { formatNaira } from "@/lib/products";

const initialState: CheckoutActionState = {
  ok: false,
  message: "",
};

export function CheckoutForm() {
  const { items, total } = useCart();
  const [state, formAction, isPending] = useActionState(createCheckoutOrder, initialState);

  if (items.length === 0) {
    return (
      <main>
        <section className="tech-section">
          <div className="section-inner">
            <div className="premium-card p-8 text-center">
              <p className="text-xl font-black text-white">Your cart is empty.</p>
              <Link href="/accessories" className="btn-primary mt-6">
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="tech-section">
        <div className="section-inner">
          <p className="offer-badge">Checkout</p>
          <h1 className="mt-5 text-4xl font-black text-white sm:text-6xl">Confirm Your Order</h1>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <form action={formAction} className="premium-card grid gap-5 p-6 md:grid-cols-2">
              <input
                type="hidden"
                name="cart_items"
                value={JSON.stringify(items.map((item) => ({ id: item.id, quantity: item.quantity })))}
              />

              {state.message ? (
                <p className="rounded-md border border-yellow-300/30 bg-yellow-300/10 px-4 py-3 text-sm font-bold text-yellow-100 md:col-span-2">
                  {state.message}
                </p>
              ) : null}

              <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
                Full name
                <input
                  name="name"
                  type="text"
                  required
                  className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
                Phone number
                <input
                  name="phone"
                  type="tel"
                  required
                  className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-bold text-slate-200 md:col-span-2">
                Delivery address
                <input
                  name="address"
                  type="text"
                  required
                  className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-bold text-slate-200 md:col-span-2">
                Note
                <textarea
                  name="note"
                  rows={4}
                  className="resize-none rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>

              <div className="md:col-span-2">
                <button type="submit" className="btn-primary disabled:opacity-60" disabled={isPending}>
                  <Send className="h-5 w-5" aria-hidden="true" />
                  {isPending ? "Confirming..." : "Confirm Order"}
                </button>
              </div>
            </form>

            <aside className="premium-card h-fit p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Order total</p>
              <p className="mt-4 text-3xl font-black text-white">{formatNaira(total)}</p>
              <div className="mt-6 grid gap-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 text-sm text-slate-300">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-bold text-white">{formatNaira(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
