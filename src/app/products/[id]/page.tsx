import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, PackageCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { MetaViewContent } from "@/components/MetaViewContent";
import {
  formatNaira,
  formatNairaCompact,
  getProductCategoryHref,
  getStockStatus,
} from "@/lib/products";
import { getAvailableProductById } from "@/lib/public-products";

export const dynamic = "force-dynamic";

const whatsappNumber = "2347062849832";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const { data: product, error } = await getAvailableProductById(id);

  if (error || !product) {
    notFound();
  }

  const stock = getStockStatus(product.stock_quantity);
  const backHref = getProductCategoryHref(product.category);
  const orderMessage = encodeURIComponent(
    `Hello YJM BOY, I want to buy this product:\nProduct: ${product.name}\nCategory: ${product.category}\nPrice: ${formatNairaCompact(product.price)}\nIs it available?`,
  );

  return (
    <main>
      <MetaViewContent catalogProductId={product.id} />
      <section className="tech-section">
        <div className="section-inner">
          <Link href={backHref} className="btn-secondary mb-8 px-4 py-2 text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to products
          </Link>

          <article className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="premium-card overflow-hidden">
              <div className="relative min-h-[340px] overflow-hidden bg-[linear-gradient(135deg,rgba(34,211,238,0.28),rgba(255,255,255,0.06)),radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_36%)] sm:min-h-[520px]">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={`${product.name} product image`}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div
                    className="absolute inset-8 grid place-items-center rounded-md border border-cyan-300/25 bg-black/20"
                    role="img"
                    aria-label={`${product.name} product placeholder`}
                  >
                    <PackageCheck className="h-20 w-20 text-cyan-100" aria-hidden="true" />
                  </div>
                )}
              </div>
            </div>

            <div className="premium-card p-6 sm:p-8">
              <p className="offer-badge">{product.category}</p>
              <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">
                {product.name}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <p className="text-3xl font-black text-cyan-200">{formatNaira(product.price)}</p>
                <span className={`rounded-md border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${stock.className}`}>
                  {stock.label}
                </span>
              </div>
              <p className="mt-6 leading-8 text-slate-300">
                {product.description || "Contact YJM Boy for details, availability, and buying advice."}
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${orderMessage}`}
                className="btn-primary mt-8 w-full"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Order on WhatsApp
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
