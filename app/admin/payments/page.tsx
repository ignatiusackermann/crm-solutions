import type { Metadata } from "next";
import Link from "next/link";
import { requireChatGPTUser } from "../../chatgpt-auth";
import PaymentGenerator from "./payment-generator";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Payment Generator | CRM Solutions Admin", robots: { index: false, follow: false } };
export default async function AdminPaymentsPage() {
  const user = await requireChatGPTUser("/admin/payments");
  if (user.email.toLowerCase() !== "ignatius@crmsolutions.app") return <main className="admin-denied"><div><p className="eyebrow">Private administration</p><h1>Access is restricted.</h1><p>This dashboard is available only to the authorised CRM Solutions administrator.</p><Link className="text-link" href="/">Return to CRM Solutions <span>↗</span></Link></div></main>;
  return <main className="admin-page"><header className="admin-header"><Link className="wordmark" href="/"><span className="wordmark-icon"><i /><i /><i /></span><span>CRM Solutions</span></Link><div><span>Admin Dashboard</span><strong>{user.displayName}</strong></div><a href="/signout-with-chatgpt?return_to=/">Sign out</a></header><PaymentGenerator /></main>;
}
