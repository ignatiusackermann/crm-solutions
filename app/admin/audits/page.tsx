import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminUser } from "@/lib/admin-auth";
import AuditsClient from "./audits-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Audit Results | CRM Solutions Admin",
  robots: { index: false, follow: false },
};

export default async function AdminAuditsPage() {
  const user = await requireAdminUser("/admin/audits");

  return (
    <AdminShell
      user={user}
      active="audits"
      sidebarExtra={
        <div>
          <strong>Leak Audit</strong>
          <p>
            Results are stored when a prospect emails themselves the diagnostic from the public
            audit tool.
          </p>
        </div>
      }
    >
      <AuditsClient />
    </AdminShell>
  );
}
