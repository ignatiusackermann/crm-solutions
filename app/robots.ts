import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info", "/book-discovery-call/thank-you", "/contact/thank-you"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info", "/book-discovery-call/thank-you", "/contact/thank-you"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info", "/book-discovery-call/thank-you", "/contact/thank-you"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info", "/book-discovery-call/thank-you", "/contact/thank-you"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin/", "/client/", "/api/", "/site-info", "/book-discovery-call/thank-you", "/contact/thank-you"],
      },
    ],
    sitemap: "https://www.crmsolutions.app/sitemap.xml",
    host: "https://www.crmsolutions.app",
  };
}
