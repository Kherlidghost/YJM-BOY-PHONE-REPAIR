import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main>
      <section className="tech-section">
        <div className="section-inner">
          <div className="premium-card mx-auto max-w-2xl p-8 text-center sm:p-10">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
              <SearchX className="h-7 w-7" aria-hidden="true" />
            </div>
            <h1 className="mt-6 text-3xl font-black text-white sm:text-4xl">
              Product not found
            </h1>
            <p className="mt-4 leading-7 text-slate-300">
              This product may be unavailable, removed, or not ready for public viewing.
            </p>
            <Link href="/accessories" className="btn-primary mt-8">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
