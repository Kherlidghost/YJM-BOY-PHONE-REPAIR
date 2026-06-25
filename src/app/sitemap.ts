import type { MetadataRoute } from "next";

const baseUrl = "https://yjm-boy-phone-repair.vercel.app";

const routes = ["", "/phone-repair", "/accessories", "/repair-tools", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
