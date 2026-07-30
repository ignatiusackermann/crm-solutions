import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ClientLoginForm from "./login-form";
import RequestAccessForm from "./request-access-form";

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
        <Link href="/contact">Need help?</Link>
      </header>
      <section className="client-login-shell">
        <div>
          <p className="eyebrow">Client login</p>
          <h1>
            Sign in to your account
            <span>.</span>
          </h1>
          <p>
            Use the email and temporary access code from your CRM Solutions payment
            email. If that email is lost, use the form under the login card to request a
            new code.
          </p>
        </div>
        <div className="client-login-stack">
          <ClientLoginForm />
          <RequestAccessForm />
        </div>
        <p className="client-login-note">
          Prefer the private link from your email? You can use that instead.
          Cloudflare Turnstile protects this form when configured.
        </p>
      </section>
    </main>
  );
}
