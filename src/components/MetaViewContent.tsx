"use client";

import { useEffect } from "react";
import { trackMetaViewContent } from "@/lib/meta-pixel";

type MetaViewContentProps = {
  product: {
    id: string;
    name: string;
    price: number | string;
  };
};

export function MetaViewContent({ product }: MetaViewContentProps) {
  useEffect(() => {
    const value = Number(product.price);

    // ViewContent is fired when a public product page opens; the id matches the catalog feed.
    trackMetaViewContent({
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      contents: [
        {
          id: product.id,
          quantity: 1,
          item_price: Number.isFinite(value) ? value : undefined,
        },
      ],
      currency: "NGN",
      value: Number.isFinite(value) ? value : undefined,
    });
  }, [product.id, product.name, product.price]);

  return null;
}
