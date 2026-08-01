import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminUser } from "@/lib/admin-auth";
import BookingsClient from "./bookings-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discovery Bookings | CRM Solutions Admin",
  robots: { index: false, follow: false },
};

export default async function AdminBookingsPage() {
  const user = await requireAdminUser("/admin/bookings");

  return (
    <AdminShell
      user={user}
      active="bookings"
      sidebarExtra={
        <div>
          <strong>Discovery log</strong>
          <p>
            Confirmed calls block public slots. Cancel frees the hour and notifies the prospect by
            email.
          </p>
        </div>
      }
    >
      <BookingsClient />
    </AdminShell>
  );
}
