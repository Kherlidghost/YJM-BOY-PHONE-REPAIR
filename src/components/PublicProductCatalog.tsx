"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, PackageCheck, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatNaira,
  formatNairaCompact,
  getStockStatus,
  type Product,
} from "@/lib/products";

type PublicProductCatalogProps = {
  products: Product[];
};

const whatsappNumber = "2347062849832";
const stockFilters = ["All", "In Stock", "Low Stock", "Out of Stock"] as const;
const sortOptions = ["Newest", "Price low to high", "Price high to low", "Stock quantity"] as const;

type StockFilter = (typeof stockFilters)[number];
type SortOption = (typeof sortOptions)[number];

function matchesStockFilter(product: Product, filter: StockFilter) {
  if (filter === "In Stock") {
    return product.stock_quantity > 5;
  }

  if (filter === "Low Stock") {
    return product.stock_quantity > 0 && product.stock_quantity <= 5;
  }

  if (filter === "Out of Stock") {
    return product.stock_quantity === 0;
  }

  return true;
}

function getOrderMessage(product: Product) {
  return encodeURIComponent(
    `Hello YJM BOY, I want to buy this product:\nProduct: ${product.name}\nCategory: ${product.category}\nPrice: ${formatNairaCompact(product.price)}\nIs it available?`,
  );
}

function sortProducts(products: Product[], sort: SortOption) {
  return [...products].sort((a, b) => {
    if (sort === "Price low to high") {
      return Number(a.price) - Number(b.price);
    }

    if (sort === "Price high to low") {
      return Number(b.price) - Number(a.price);
    }

    if (sort === "Stock quantity") {
      return b.stock_quantity - a.stock_quantity;
    }

    return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
  });
}

export function PublicProductCatalog({ products }: PublicProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("All");
  const [sort, setSort] = useState<SortOption>("Newest");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const visibleProducts = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(normalizedQuery);
      return matchesName && matchesStockFilter(product, stockFilter);
    });

    return sortProducts(visibleProducts, sort);
  }, [products, query, sort, stockFilter]);

  if (products.length === 0) {
    return (
      <div className="premium-card p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-md border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
          <PackageCheck className="h-8 w-8" aria-hidden="true" />
        </div>
        <p className="mt-6 text-xl font-black text-white">No products available yet.</p>
        <p className="mt-3 text-slate-400">Please contact us on WhatsApp.</p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello YJM BOY, I want to ask about product availability.")}`}
          className="btn-primary mt-6"
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="premium-card grid gap-4 p-4 lg:grid-cols-[1fr_190px_210px]">
        <label className="relative">
          <span className="sr-only">Search products by name</span>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search product name"
            className="w-full rounded-md border border-white/10 bg-[#07101a] py-3 pl-11 pr-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
        </label>

        <label>
          <span className="sr-only">Filter by stock status</span>
          <select
            value={stockFilter}
            onChange={(event) => setStockFilter(event.target.value as StockFilter)}
            className="w-full rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300"
          >
            {stockFilters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Sort products</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="w-full rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="premium-card p-8 text-center">
          <p className="text-xl font-black text-white">No matching products found.</p>
          <p className="mt-3 text-slate-400">Try another search or contact us on WhatsApp.</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello YJM BOY, I want to ask about product availability.")}`}
            className="btn-primary mt-6"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const stock = getStockStatus(product.stock_quantity);

            return (
              <article key={product.id} className="premium-card group overflow-hidden">
                <div className="relative h-56 overflow-hidden bg-[linear-gradient(135deg,rgba(34,211,238,0.28),rgba(255,255,255,0.06)),radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_36%)]">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={`${product.name} product image`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-6 grid place-items-center rounded-md border border-cyan-300/25 bg-black/20"
                      role="img"
                      aria-label={`${product.name} product placeholder`}
                    >
                      <PackageCheck className="h-14 w-14 text-cyan-100" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-black text-white">{product.name}</h2>
                    <span className={`shrink-0 rounded-md border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${stock.className}`}>
                      {stock.label}
                    </span>
                  </div>
                  <p className="mt-3 text-xl font-black text-cyan-200">{formatNaira(product.price)}</p>
                  <p className="mt-4 min-h-20 leading-7 text-slate-300">
                    {product.description || "Contact YJM Boy for details, availability, and buying advice."}
                  </p>
                  <div className="mt-6 grid gap-3">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${getOrderMessage(product)}`}
                      className="btn-primary w-full"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      Order on WhatsApp
                    </a>
                    <Link href={`/products/${product.id}`} className="btn-secondary w-full px-4 py-2 text-sm">
                      View Details
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
