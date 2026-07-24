import { getAppEnv } from "@/lib/runtime-env";
import { handleDiscoveryBookings } from "@/lib/server/discovery-bookings";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleDiscoveryBookings(request, getAppEnv());
}

export async function POST(request: Request) {
  return handleDiscoveryBookings(request, getAppEnv());
}
