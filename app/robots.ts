import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info"],
      },
    ],
    sitemap: "https://www.crmsolutions.app/sitemap.xml",
    host: "https://www.crmsolutions.app",
  };
}
