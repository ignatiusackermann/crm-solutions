import type { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ return_to?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const returnTo =
    params.return_to && params.return_to.startsWith("/")
      ? params.return_to
      : "/admin/payments";

  return (
    <main className="admin-login-page">
      <header className="client-payment-header">
        <Link className="wordmark" href="/">
          <img
            src="/brand/crm-solutions-logo-primary-outlined.svg"
            alt="CRM Solutions — Business Growth Systems"
            width={350}
            height={96}
          />
        </Link>
        <span>Private administration</span>
        <Link href="/">Back to site</Link>
      </header>

      <section className="admin-login-shell">
        <div>
          <p className="eyebrow">Admin access</p>
          <h1>
            Sign in to the workspace
            <span>.</span>
          </h1>
          <p>
            Restricted to authorised CRM Solutions administration. Use the
            administrator password for this environment.
          </p>
        </div>

        <AdminLoginForm returnTo={returnTo} />
      </section>
    </main>
  );
}
