import type { MetadataRoute } from "next";
import { productionSiteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${productionSiteUrl}/sitemap.xml`,
  };
}