import type { Metadata } from "next";
import Link from "next/link";
import PaymentPanel from "./payment-panel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Payment Panel | CRM Solutions",
  robots: { index: false, follow: false },
  other: { referrer: "no-referrer" },
};

export default function ClientPaymentPage() {
  return (
    <main className="client-payment-page">
      <header className="client-payment-header">
        <Link className="wordmark" href="/">
          <img
            src="/brand/crm-solutions-logo-primary-outlined.svg"
            alt="CRM Solutions — Business Growth Systems"
            width={350}
            height={96}
          />
        </Link>
        <span>Secure Client Payment Panel</span>
        <div className="client-payment-header-actions">
          <Link href="/contact">Need help?</Link>
          <a href="/client/logout">Sign out</a>
        </div>
      </header>
      <PaymentPanel />
    </main>
  );
}
