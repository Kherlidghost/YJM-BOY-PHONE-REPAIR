"use client";

import { ImagePlus } from "lucide-react";
import Image from "next/image";
import type { ChangeEvent } from "react";
import { useActionState, useEffect, useState } from "react";
import { createProduct, updateProduct, type ProductActionState } from "@/actions/products";
import { productCategories } from "@/lib/admin-data";
import type { Product } from "@/lib/products";

type ProductFormProps = {
  mode: "create" | "edit";
  product?: Product;
};

const initialState: ProductActionState = {
  ok: true,
  message: "",
};

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 2 * 1024 * 1024;

export function ProductForm({ mode, product }: ProductFormProps) {
  const isEdit = mode === "edit";
  const action = isEdit && product ? updateProduct.bind(null, product.id) : createProduct;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [previewUrl, setPreviewUrl] = useState(product?.image_url ?? "");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setImageError("");

    if (!file) {
      setPreviewUrl(product?.image_url ?? "");
      return;
    }

    if (!allowedImageTypes.includes(file.type)) {
      setImageError("Upload a JPG, PNG, or WEBP image.");
      event.target.value = "";
      setPreviewUrl(product?.image_url ?? "");
      return;
    }

    if (file.size > maxImageSize) {
      setImageError("Product image must be 2MB or smaller.");
      event.target.value = "";
      setPreviewUrl(product?.image_url ?? "");
      return;
    }

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <form action={formAction} className="premium-card grid gap-5 p-6 md:grid-cols-2">
      <input type="hidden" name="image_url" value={previewUrl.startsWith("blob:") ? "" : previewUrl} />
      <input type="hidden" name="old_image_url" value={product?.image_url ?? ""} />

      {!state.ok && state.message ? (
        <div className="rounded-md border border-yellow-300/35 bg-yellow-300/10 p-4 text-sm font-bold text-yellow-100 md:col-span-2">
          {state.message}
        </div>
      ) : null}

      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
        Product name
        <input
          name="name"
          defaultValue={product?.name ?? ""}
          placeholder="Enter product name"
          required
          className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
        Category
        <select
          name="category"
          defaultValue={product?.category ?? productCategories[0]}
          className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        >
          {productCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
        Price
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          defaultValue={product?.price ?? ""}
          placeholder="0"
          required
          className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
        Stock quantity
        <input
          name="stock_quantity"
          type="number"
          min="0"
          defaultValue={product?.stock_quantity ?? ""}
          placeholder="0"
          required
          className="rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-slate-200 md:col-span-2">
        Description
        <textarea
          name="description"
          rows={5}
          defaultValue={product?.description ?? ""}
          placeholder="Short product description"
          className="resize-none rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
        />
      </label>

      <label className="flex items-center gap-3 rounded-md border border-white/10 bg-[#07101a] px-4 py-3 text-sm font-bold text-slate-200">
        <input
          name="is_available"
          type="checkbox"
          defaultChecked={product?.is_available ?? true}
          className="h-4 w-4 accent-cyan-300"
        />
        Available for customers
      </label>

      <div className="md:col-span-2">
        <div className="grid gap-5 rounded-md border border-white/10 bg-[#07101a] p-4 md:grid-cols-[220px_1fr]">
          <div className="relative grid aspect-square place-items-center overflow-hidden rounded-md border border-dashed border-cyan-300/35 bg-cyan-300/5">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={`${product?.name ?? "Selected product"} preview`}
                fill
                sizes="220px"
                className="object-cover"
                unoptimized={previewUrl.startsWith("blob:")}
              />
            ) : (
              <div className="text-center">
                <ImagePlus className="mx-auto h-10 w-10 text-cyan-200" aria-hidden="true" />
                <p className="mt-3 text-sm font-black text-white">No image</p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-3">
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-200">
              Product image
              <input
                name="product_image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="rounded-md border border-white/10 bg-[#03050a] px-4 py-3 text-white file:mr-4 file:rounded-md file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-black file:text-slate-950"
              />
            </label>
            <p className="text-sm leading-6 text-slate-400">
              Upload JPG, PNG, or WEBP. Maximum file size is 2MB.
            </p>
            {imageError ? (
              <p className="rounded-md border border-yellow-300/30 bg-yellow-300/10 px-4 py-3 text-sm font-bold text-yellow-100">
                {imageError}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <button type="submit" className="btn-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={isPending}>
          {isPending ? "Saving..." : isEdit ? "Save Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
