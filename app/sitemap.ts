import type { MetadataRoute } from "next";
import { allInsightSlugs } from "./insights/insights";

const SITE_URL = "https://www.crmsolutions.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/revenue-platform",
    "/revenue-leak-audit",
    "/book-discovery-call",
    "/contact",
    "/delivery-commitment",
    "/payment-options",
    "/work/lava-sa",
    "/work/star-aesthetic",
    "/work/storvac",
    "/privacy-policy",
    "/cookie-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/work") ? 0.8 : 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = allInsightSlugs().map((slug) => ({
    url: `${SITE_URL}/insights/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...insightRoutes];
}
