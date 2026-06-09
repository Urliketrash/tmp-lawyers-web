import { MetadataRoute } from "next";

/**
 * Next.js Robots file generator function.
 * Defines crawling rules for search engine spiders.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login/"],
    },
    sitemap: "https://tmplawyers.com/sitemap.xml",
  };
}
