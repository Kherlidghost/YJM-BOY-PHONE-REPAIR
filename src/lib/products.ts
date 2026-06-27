import type { productCategories } from "@/lib/admin-data";

export type ProductCategory = (typeof productCategories)[number];

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number | string;
  stock_quantity: number;
  description: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
};

export function formatNaira(value: number | string) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "NGN 0";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNairaCompact(value: number | string) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "₦0";
  }

  return `₦${new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export function getProductCategoryHref(category: ProductCategory) {
  if (category === "Repair Tools") {
    return "/repair-tools";
  }

  if (category === "Spare Parts") {
    return "/spare-parts";
  }

  return "/accessories";
}

export function getStockStatus(stockQuantity: number) {
  if (stockQuantity <= 0) {
    return {
      label: "Out of Stock",
      className: "border-slate-500/30 bg-slate-500/10 text-slate-300",
    };
  }

  if (stockQuantity <= 5) {
    return {
      label: "Low Stock",
      className: "border-yellow-300/35 bg-yellow-300/10 text-yellow-100",
    };
  }

  return {
    label: "In Stock",
    className: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  };
}
