import type { Metadata } from "next";
import { SiteFooter, StandardHeader } from "../../site-components";
import ThankYouClient from "./thank-you-client";

export const metadata: Metadata = {
  title: "Discovery Call Confirmed | CRM Solutions",
  description: "Your CRM Solutions Discovery Call is reserved.",
  robots: { index: false, follow: false },
};

export default function DiscoveryThankYouPage() {
  return (
    <main id="top" className="thank-you-page">
      <StandardHeader current="book" />
      <ThankYouClient />
      <section className="booking-expect section-shell">
        <div>
          <p className="eyebrow">What to bring</p>
          <h2>Useful before it becomes a sales conversation.</h2>
        </div>
        <div>
          <p>
            Bring your current website, the business goal, any relevant lead or sales numbers,
            and the one commercial problem you most want to solve.
          </p>
          <p>
            If the economics do not justify an R20,000+ engagement, Ignatius will say so.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
