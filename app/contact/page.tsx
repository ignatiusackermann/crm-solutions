import type { Metadata } from "next";
import Script from "next/script";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | CRM Solutions",
  description:
    "Contact Ignatius Ackermann at CRM Solutions about a Revenue Platform, Discovery Call or commercial constraint.",
};

export default function ContactPage() {
  const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  return (
    <main id="top">
      {turnstile ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      ) : null}
      <StandardHeader />
      <section className="contact-hero section-shell">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>
            Tell me what is leaking attention, enquiries or revenue
            <span>.</span>
          </h1>
        </div>
        <p>
          Prefer a booked conversation? Use{" "}
          <a href="/book-discovery-call">Discovery Call</a>. For a shorter note,
          the form is saved to the CRM Solutions database and emailed to Ignatius.
        </p>
      </section>
      <section className="contact-body section-shell">
        <aside className="contact-aside">
          <div>
            <span>Email</span>
            <a href="mailto:ignatius@crmsolutions.app">ignatius@crmsolutions.app</a>
          </div>
          <div>
            <span>Client access</span>
            <a href="/client/login">Client login</a>
          </div>
          <div>
            <span>Based in</span>
            <strong>Durban, South Africa · remote US &amp; international</strong>
          </div>
        </aside>
        <ContactForm />
      </section>
      <DiscoveryCallSection />
      <SiteFooter />
    </main>
  );
}
