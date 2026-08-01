import { getAppEnv } from "@/lib/runtime-env";
import { handleAdminDiscoveryBookings } from "@/lib/server/admin-discovery-bookings";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleAdminDiscoveryBookings(request, getAppEnv());
}

export async function POST(request: Request) {
  return handleAdminDiscoveryBookings(request, getAppEnv());
}
