import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "CRM Solutions | Founder-Led Business Growth Systems",
  description:
    "Connected revenue platforms for established businesses—bringing the website, customer journey, CRM, automation and follow-up together.",
  other: {
    "codex-preview": "development",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SiteExperience />
      </body>
    </html>
  );
}
