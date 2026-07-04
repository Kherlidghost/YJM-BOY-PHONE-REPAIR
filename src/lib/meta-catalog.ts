const fallbackSiteUrl = "https://yjm-boy-phone-repair.vercel.app";

export function getMetaCatalogContentId(productId: string) {
  // Meta content_ids must exactly match the catalog feed id / Retailer ID.
  return productId.trim();
}

export function getMetaCatalogSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (siteUrl?.startsWith("http")) {
    return siteUrl.replace(/\/$/, "");
  }

  return fallbackSiteUrl;
}

export function getMetaCatalogProductLink(productId: string) {
  return `${getMetaCatalogSiteUrl()}/products/${getMetaCatalogContentId(productId)}`;
}
