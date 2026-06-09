import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { MOCK_NEWS } from "@/data/newsData";

/**
 * Next.js Sitemap generator function.
 * Fetches dynamic news routes from Supabase DB to construct a comprehensive XML sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tmplawyers.com";

  // Static Routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // Dynamic news routes
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data } = await supabase.from("news").select("id, date");
    if (data && data.length > 0) {
      newsRoutes = data.map((item) => ({
        url: `${baseUrl}/news/${item.id}`,
        lastModified: new Date(item.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    } else {
      // Fallback to mock
      newsRoutes = MOCK_NEWS.map((item) => ({
        url: `${baseUrl}/news/${item.id}`,
        lastModified: new Date(item.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error generating sitemap dynamic routes:", error);
    // Fallback to mock
    newsRoutes = MOCK_NEWS.map((item) => ({
      url: `${baseUrl}/news/${item.id}`,
      lastModified: new Date(item.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...newsRoutes];
}
