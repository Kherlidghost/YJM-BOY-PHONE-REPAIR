"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { type CartProduct, useCart } from "@/components/cart/CartProvider";

type AddToCartButtonProps = {
  product: CartProduct;
  className?: string;
};

export function AddToCartButton({ product, className = "btn-secondary w-full" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
