"use client";

type MetaPixelEventName =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Contact"
  | "Lead";

type MetaPixelEventParams = {
  content_ids?: string[];
  content_type?: "product" | "product_group";
  currency?: string;
  value?: number;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __yjmMetaPixelQueue?: MetaPixelQueuedEvent[];
  }
}

type MetaPixelQueuedEvent = {
  eventName: MetaPixelEventName;
  params?: MetaPixelEventParams;
};

function sendMetaPixelEvent({ eventName, params }: MetaPixelQueuedEvent) {
  if (params) {
    window.fbq?.("track", eventName, params);
  } else {
    window.fbq?.("track", eventName);
  }
}

export function flushMetaPixelEvents() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return false;
  }

  const queuedEvents = window.__yjmMetaPixelQueue ?? [];
  window.__yjmMetaPixelQueue = [];

  queuedEvents.forEach(sendMetaPixelEvent);
  return true;
}

export function trackMetaPixelEvent(
  eventName: MetaPixelEventName,
  params?: MetaPixelEventParams,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    if (typeof window !== "undefined") {
      window.__yjmMetaPixelQueue = [
        ...(window.__yjmMetaPixelQueue ?? []).slice(-25),
        { eventName, params },
      ];
    }

    return true;
  }

  flushMetaPixelEvents();
  sendMetaPixelEvent({ eventName, params });

  return true;
}

export function trackMetaPageView() {
  // Fired on initial page load and every client-side route change.
  trackMetaPixelEvent("PageView");
}

export function trackMetaViewContent(params: Required<Pick<MetaPixelEventParams, "content_ids" | "content_type">> & MetaPixelEventParams) {
  // Fired when a real public product detail page opens. content_ids match the Meta catalog feed ids.
  return trackMetaPixelEvent("ViewContent", params);
}

export function trackMetaAddToCart(params: Required<Pick<MetaPixelEventParams, "content_ids" | "content_type">> & MetaPixelEventParams) {
  // Fired only after a product is successfully stored in the local shopping cart.
  return trackMetaPixelEvent("AddToCart", params);
}

export function trackMetaInitiateCheckout(params: Required<Pick<MetaPixelEventParams, "currency" | "value">>) {
  // Fired when a customer clicks the checkout button from a non-empty cart.
  return trackMetaPixelEvent("InitiateCheckout", params);
}

export function trackMetaPurchase(params: Required<Pick<MetaPixelEventParams, "content_ids" | "content_type">> & MetaPixelEventParams) {
  // Fired only on the order confirmation page after checkout is saved successfully.
  return trackMetaPixelEvent("Purchase", params);
}

export function trackMetaContact() {
  // Fired when a visitor clicks a real contact CTA such as WhatsApp or phone call.
  trackMetaPixelEvent("Contact");
}

export function trackMetaContactIntent() {
  // Fired for high-intent WhatsApp and phone clicks.
  trackMetaPixelEvent("Contact");
}

export function trackMetaLead() {
  // Fired only after a real lead action succeeds, such as the public enquiry form.
  trackMetaPixelEvent("Lead");
}
