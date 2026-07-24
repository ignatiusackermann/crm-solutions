import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ClientLoginForm from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Login | CRM Solutions",
  robots: { index: false, follow: false },
  other: { referrer: "no-referrer" },
};

export default function ClientLoginPage() {
  const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  return (
    <main className="client-login-page">
      {turnstile ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      ) : null}
      <header className="client-payment-header">
        <Link className="wordmark" href="/">
          <span className="wordmark-icon">
            <i />
            <i />
            <i />
          </span>
          <span>CRM Solutions</span>
        </Link>
        <span>Secure client access</span>
        <a href="mailto:ignatius@crmsolutions.app">Need help?</a>
      </header>
      <section className="client-login-shell">
        <div>
          <p className="eyebrow">Client login</p>
          <h1>
            Access your payment plan
            <span>.</span>
          </h1>
          <p>
            Use the email and temporary access code from your CRM Solutions payment
            email. After the deposit is paid, this same login remains your private
            client door.
          </p>
        </div>
        <ClientLoginForm />
        <p className="client-login-note">
          Prefer the private link? Open the payment URL from your email instead.
          Cloudflare Turnstile protects this form when configured.
        </p>
      </section>
    </main>
  );
}
