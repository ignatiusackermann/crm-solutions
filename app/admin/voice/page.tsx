import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminUser } from "@/lib/admin-auth";
import VoiceClient from "./voice-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Voice Log | CRM Solutions Admin",
  robots: { index: false, follow: false },
};

export default async function AdminVoicePage() {
  const user = await requireAdminUser("/admin/voice");

  return (
    <AdminShell
      user={user}
      active="voice"
      sidebarExtra={
        <div>
          <strong>Missed calls</strong>
          <p>
            Log missed inbound calls here today. Automatic capture needs a phone provider
            webhook (e.g. Twilio) pointed at this table later.
          </p>
        </div>
      }
    >
      <VoiceClient />
    </AdminShell>
  );
}
