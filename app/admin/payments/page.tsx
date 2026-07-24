import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminUser } from "@/lib/admin-auth";
import PaymentGenerator from "./payment-generator";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Payment Generator | CRM Solutions Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPaymentsPage() {
  const user = await requireAdminUser("/admin/payments");

  return (
    <main className="admin-page">
      <header className="admin-header">
        <Link className="wordmark" href="/">
          <span className="wordmark-icon">
            <i />
            <i />
            <i />
          </span>
          <span>CRM Solutions</span>
        </Link>
        <div>
          <span>Admin Dashboard</span>
          <strong>{user.displayName}</strong>
        </div>
        <a href="/admin/logout">Sign out</a>
      </header>
      <PaymentGenerator />
    </main>
  );
}
