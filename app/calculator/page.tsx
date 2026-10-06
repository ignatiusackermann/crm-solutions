import type { Metadata } from "next";
import Link from "next/link";
import { CancellationCalculator } from "../for-debt-counsellors/cancellation-calculator";
import { InstallApp } from "./install";

/* The free giveaway: the cancellation calculator as an installable app.
   No site header or footer — this is the whole screen, so it looks like an
   app once it is on a home screen. The service worker (public/calculator-sw.js)
   is scoped to /calculator, so the rest of the site is unaffected. */

export const metadata: Metadata = {
  title: "Client Value Calculator | CRM Solutions",
  description:
    "Work out what a lost client really costs your practice — in Rand, in four minutes. Install it free. Nothing is stored or sent.",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/calculator" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "CRM Solutions",
    url: "https://www.crmsolutions.app/calculator",
    title: "What does a lost client really cost you?",
    description: "A free calculator for practices with clients who pay monthly. Install it on your phone.",
  },
  appleWebApp: {
    capable: true,
    title: "Client Value",
    statusBarStyle: "default",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0b2a55",
};

export default function CalculatorAppPage() {
  return (
    <main className="calc-app">
      <header className="calc-app-bar">
        <Link href="/" className="calc-brand" aria-label="CRM Solutions home">
          <img
            src="/brand/crm-solutions-icon.svg"
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
          />
          <span>Client Value Calculator</span>
        </Link>
        <InstallApp />
      </header>

      <section className="calc-app-intro">
        <h1>What does one lost client really cost you?</h1>
        <p>
          If your clients pay you every month, losing one does not cost you a single fee. It costs
          every fee that was still to come. Move the sliders to your own figures — nothing is
          stored, nothing is sent, and it works offline once installed.
        </p>
      </section>

      <section className="calc-app-body">
        <CancellationCalculator />
      </section>

      <footer className="calc-app-foot">
        <p>
          Built by CRM Solutions, Durban. We build websites and client systems for practices
          whose clients pay monthly.
        </p>
        <p className="calc-app-site">
          <Link href="/">www.crmsolutions.app</Link>
          <a href="tel:+27761809799">076 180 9799</a>
          <a href="mailto:ignatius@crmsolutions.app">ignatius@crmsolutions.app</a>
        </p>
        <p>
          <Link href="/for-debt-counsellors">For debt counselling practices →</Link>
          <Link href="/for-accounting-practices">For accounting practices →</Link>
        </p>
      </footer>
    </main>
  );
}
