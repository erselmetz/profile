import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
