import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminUser } from "@/lib/admin-auth";
import ContactClient from "./contact-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Inbox | CRM Solutions Admin",
  robots: { index: false, follow: false },
};

export default async function AdminContactPage() {
  const user = await requireAdminUser("/admin/contact");

  return (
    <AdminShell
      user={user}
      active="contact"
      sidebarExtra={
        <div>
          <strong>Contact inbox</strong>
          <p>
            Website enquiries with full message text. Mark replied or archived after you act —
            Resend is not the inbox.
          </p>
        </div>
      }
    >
      <ContactClient />
    </AdminShell>
  );
}
