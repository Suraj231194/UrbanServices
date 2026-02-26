import type { MetadataRoute } from "next";
import { getAllServices, siteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/about", "/contact", "/checkout", "/dashboard", "/auth", "/login", "/signup"];

  const staticItems = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceItems = getAllServices().map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticItems, ...serviceItems];
}

