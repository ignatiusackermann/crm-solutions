import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/lib/json-ld";
import { ReviewInvite } from "./review-invite";
import { PageTransition } from "./page-transition";
import { SiteExperience } from "./site-experience";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.crmsolutions.app"),
  title: "CRM Solutions | Connected Revenue Platforms",
  description:
    "Connected revenue platforms for established businesses—bringing the website, customer journey, CRM, automation and follow-up together.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.crmsolutions.app",
    siteName: "CRM Solutions",
    title: "CRM Solutions | Connected Revenue Platforms",
    description:
      "Revenue systems that stop leakage between click and cash.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM Solutions | Connected Revenue Platforms",
    description:
      "Revenue systems that stop leakage between click and cash.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/crm-solutions-favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/crm-solutions-icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-icon",
  },
};

/**
 * Arms the entrance animation before the first paint, so content fades in
 * rather than flashing visible and then hiding. The timeout is the safety
 * valve: if React never hydrates, SiteMotion never clears it and everything
 * is shown anyway. With JavaScript off this script does not run at all, so
 * nothing is ever hidden.
 */
const armMotion = [
  "var p = location.pathname;",
  "if (p.indexOf('/admin') !== 0 && p.indexOf('/client') !== 0) {",
  "  document.documentElement.classList.add('motion-ready');",
  "  window.__motionFailsafe = setTimeout(function () {",
  "    document.documentElement.classList.remove('motion-ready');",
  "  }, 5000);",
  "}",
].join("");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: armMotion }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <PageTransition>{children}</PageTransition>
        <ReviewInvite />
        <SiteExperience />
      </body>
    </html>
  );
}
