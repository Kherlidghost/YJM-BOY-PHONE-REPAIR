"use client";

type MetaPixelEventName = "PageView" | "ViewContent" | "Contact" | "Lead";

type MetaPixelEventParams = {
  content_ids?: string[];
  content_name?: string;
  content_type?: "product" | "product_group";
  contents?: Array<{
    id: string;
    quantity: number;
    item_price?: number;
  }>;
  currency?: string;
  value?: number;
  source?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaPixelEvent(
  eventName: MetaPixelEventName,
  params?: MetaPixelEventParams,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq("track", eventName, params);
}

export function trackMetaPageView() {
  // Fired on initial page load and every client-side route change.
  trackMetaPixelEvent("PageView");
}

export function trackMetaViewContent(params: Required<Pick<MetaPixelEventParams, "content_ids" | "content_name" | "content_type">> & MetaPixelEventParams) {
  // Fired when a real public product detail page opens. content_ids match the Meta catalog feed ids.
  trackMetaPixelEvent("ViewContent", params);
}

export function trackMetaContact(source: string) {
  // Fired when a visitor clicks a real contact CTA such as WhatsApp or phone call.
  trackMetaPixelEvent("Contact", { source });
}

export function trackMetaLead(source: string) {
  // Fired only after a real lead action succeeds, such as the public enquiry form.
  trackMetaPixelEvent("Lead", { source });
}
