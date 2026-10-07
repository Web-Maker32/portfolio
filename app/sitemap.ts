import type { MetadataRoute } from "next";
import { productionSiteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/about/projects", "/stack", "/contact"];

  return routes.map((path) => ({
    url: `${productionSiteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}