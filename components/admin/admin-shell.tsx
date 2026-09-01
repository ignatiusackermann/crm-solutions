import Link from "next/link";
import type { AdminUser } from "@/lib/admin-auth";

const NAV = [
  { href: "/admin/bookings", label: "Discovery Bookings", num: "01", active: "bookings" },
  { href: "/admin/contact", label: "Contact Inbox", num: "02", active: "contact" },
  { href: "/admin/voice", label: "Voice Log", num: "03", active: "voice" },
  { href: "/admin/audits", label: "Audit Results", num: "04", active: "audits" },
  { href: "/admin/payments", label: "Payment Generator", num: "05", active: "payments" },
  { href: "/admin/traffic", label: "Website Traffic", num: "06", active: "traffic" },
] as const;

export type AdminNavActive = (typeof NAV)[number]["active"];

type Props = {
  user: AdminUser;
  active: AdminNavActive;
  children: React.ReactNode;
  sidebarExtra?: React.ReactNode;
};

export function AdminShell({ user, active, children, sidebarExtra }: Props) {
  return (
    <main className="admin-page">
      <header className="admin-header">
        <Link className="wordmark" href="/">
          <img
            src="/brand/crm-solutions-logo-primary-outlined.svg"
            alt="CRM Solutions — Business Growth Systems"
            width={350}
            height={96}
          />
        </Link>
        <div>
          <span>Admin Dashboard</span>
          <strong>{user.displayName}</strong>
        </div>
        <a href="/admin/logout">Sign out</a>
      </header>
      <div className="admin-workspace">
        <aside className="admin-sidebar">
          <p>Workspace</p>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active === item.active ? "active" : undefined}
            >
              <span>{item.num}</span> {item.label}
            </Link>
          ))}
          {sidebarExtra}
        </aside>
        <div className="admin-content">{children}</div>
      </div>
    </main>
  );
}
