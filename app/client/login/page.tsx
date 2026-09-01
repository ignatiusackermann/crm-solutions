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
          <img
            src="/brand/crm-solutions-logo-primary-outlined.svg"
            alt="CRM Solutions — Business Growth Systems"
            width={350}
            height={96}
          />
        </Link>
        <span>Secure client access</span>
        <Link href="/contact">Need help?</Link>
      </header>
      <section className="client-login-shell">
        <div className="client-login-intro">
          <p className="eyebrow">Client login</p>
          <h1>
            Sign in to your account
            <span>.</span>
          </h1>
          <p>
            Use the email and access code from your payment email. Lost the code? Request a
            new one in the panel on the right — both options stay visible above the fold.
          </p>
        </div>
        <div className="client-login-panels">
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
