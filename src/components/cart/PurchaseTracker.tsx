"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { trackMetaLead, trackMetaPurchase } from "@/lib/meta-pixel";

type PurchaseTrackerProps = {
  orderId: string;
  contentIds: string[];
  value: number;
};

export function PurchaseTracker({ orderId, contentIds, value }: PurchaseTrackerProps) {
  const { clearCart } = useCart();

  useEffect(() => {
    if (!orderId || contentIds.length === 0) {
      return;
    }

    const storageKey = `yjm-boy-purchase-${orderId}`;

    if (window.sessionStorage.getItem(storageKey)) {
      clearCart();
      return;
    }

    let retryCount = 0;
    let retryTimer: number | undefined;

    function firePurchase() {
      // Purchase is fired only after checkout succeeds and lands on this confirmation page.
      const didFire = trackMetaPurchase({
        content_ids: contentIds,
        content_type: "product",
        currency: "NGN",
        value,
      });

      if (didFire) {
        trackMetaLead("checkout_form_submit");
        window.sessionStorage.setItem(storageKey, "1");
        clearCart();
        return;
      }

      if (retryCount < 20) {
        retryCount += 1;
        retryTimer = window.setTimeout(firePurchase, 250);
      }
    }

    firePurchase();

    return () => {
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [clearCart, contentIds, orderId, value]);

  return null;
}
