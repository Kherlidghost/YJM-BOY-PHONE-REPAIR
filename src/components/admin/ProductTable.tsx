"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Minus, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  decrementStock,
  deleteProduct,
  incrementStock,
  toggleProductAvailability,
} from "@/actions/products";
import { productCategories } from "@/lib/admin-data";
import { formatNaira, getStockStatus, type Product } from "@/lib/products";

type ProductTableProps = {
  products: Product[];
};

const stockFilters = ["All", "In Stock", "Low Stock", "Out of Stock"] as const;
type StockFilter = (typeof stockFilters)[number];

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

function ProductStatusBadges({ product }: { product: Product }) {
  const stock = getStockStatus(product.stock_quantity);

  return (
    <div className="flex flex-wrap gap-2">
      <span className={`rounded-md border px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] ${stock.className}`}>
        {stock.label}
      </span>
      {!product.is_available ? (
        <span className="rounded-md border border-slate-500/30 bg-slate-500/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-slate-300">
          Hidden / Unavailable
        </span>
      ) : null}
    </div>
  );
}

export function ProductTable({ products }: ProductTableProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState<StockFilter>("All");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === "All" || product.category === category;

      return matchesName && matchesCategory && matchesStockFilter(product, stockFilter);
    });
  }, [category, products, query, stockFilter]);

  if (products.length === 0) {
    return (
      <div className="premium-card p-8 text-center">
        <p className="text-xl font-black text-white">No products yet</p>
        <p className="mt-3 text-slate-400">
          Add your first phone accessory, repair tool, or spare part to start building the catalog.
        </p>
        <Link href="/admin/products/new" className="btn-primary mt-6">
          Add Product
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="premium-card grid gap-4 p-4 lg:grid-cols-[1fr_220px_180px]">
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
          <span className="sr-only">Filter by category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300"
          >
            <option value="All">All Categories</option>
            {productCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Filter by stock</span>
          <select
            value={stockFilter}
            onChange={(event) => setStockFilter(event.target.value as StockFilter)}
            className="w-full rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300"
          >
            {stockFilters.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="premium-card p-8 text-center">
          <p className="text-xl font-black text-white">No matching products</p>
          <p className="mt-3 text-slate-400">Try a different search, category, or stock filter.</p>
        </div>
      ) : (
        <div className="premium-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.18em] text-cyan-200">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Quick Actions</th>
                  <th className="px-5 py-4">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                {filteredProducts.map((product) => {
                  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;
                  const isOutOfStock = product.stock_quantity === 0;

                  return (
                    <tr key={product.id} className={isLowStock || isOutOfStock ? "bg-yellow-300/[0.06]" : undefined}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-md border border-cyan-300/25 bg-cyan-300/10">
                            {product.image_url ? (
                              <Image
                                src={product.image_url}
                                alt={`${product.name} product image`}
                                width={56}
                                height={56}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-black text-cyan-100">YJM</span>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-white">{product.name}</p>
                            {isOutOfStock ? (
                              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-yellow-200">
                                Out of stock
                              </p>
                            ) : null}
                            {isLowStock ? (
                              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-yellow-200">
                                Low stock
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">{product.category}</td>
                      <td className="px-5 py-4">{formatNaira(product.price)}</td>
                      <td className={isLowStock || isOutOfStock ? "px-5 py-4 font-black text-yellow-200" : "px-5 py-4"}>
                        {product.stock_quantity}
                      </td>
                      <td className="px-5 py-4">
                        <ProductStatusBadges product={product} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="grid min-w-[190px] gap-2">
                          <div className="flex gap-2">
                            <form action={incrementStock.bind(null, product.id)}>
                              <button
                                type="submit"
                                className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 transition hover:border-cyan-200"
                                aria-label={`Increase stock for ${product.name}`}
                                title="Increase stock by 1"
                              >
                                <Plus className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </form>
                            <form action={decrementStock.bind(null, product.id)}>
                              <button
                                type="submit"
                                className="grid h-9 w-9 place-items-center rounded-md border border-yellow-300/30 bg-yellow-300/10 text-yellow-100 transition hover:border-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label={`Decrease stock for ${product.name}`}
                                title="Decrease stock by 1"
                                disabled={product.stock_quantity <= 0}
                              >
                                <Minus className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </form>
                            <form action={toggleProductAvailability.bind(null, product.id, !product.is_available)}>
                              <button
                                type="submit"
                                className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 text-xs font-black text-slate-100 transition hover:border-cyan-300/40"
                                aria-label={product.is_available ? `Mark ${product.name} unavailable` : `Mark ${product.name} available`}
                                title={product.is_available ? "Mark as unavailable" : "Mark as available"}
                              >
                                {product.is_available ? (
                                  <EyeOff className="h-4 w-4 text-yellow-200" aria-hidden="true" />
                                ) : (
                                  <Eye className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                                )}
                                {product.is_available ? "Hide" : "Show"}
                              </button>
                            </form>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex min-w-[140px] items-center gap-4">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="inline-flex items-center gap-2 text-cyan-200 transition hover:text-white"
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                            Edit
                          </Link>
                          <form
                            action={deleteProduct.bind(null, product.id)}
                            onSubmit={(event) => {
                              if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) {
                                event.preventDefault();
                              }
                            }}
                          >
                            <button
                              type="submit"
                              className="inline-flex items-center gap-2 text-yellow-200 transition hover:text-white"
                              aria-label={`Delete ${product.name}`}
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
