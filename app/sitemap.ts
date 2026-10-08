import type { MetadataRoute } from "next";
import { productionSiteUrl } from "@/data/site";
import { getProjectSlug, projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/stack", "/contact"];

  const pages = routes.map((path) => ({
    url: `${productionSiteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  return [
    ...pages,
    ...projects.map((project) => ({
      url: `${productionSiteUrl}/projects/${getProjectSlug(project)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}