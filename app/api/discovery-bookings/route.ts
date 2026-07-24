import { getAppEnv } from "@/lib/runtime-env";
import { handleDiscoveryBookings } from "@/lib/server/discovery-bookings";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    return await handleDiscoveryBookings(request, getAppEnv());
  } catch (error) {
    console.error("discovery-bookings GET failed", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Availability could not be loaded.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function POST(request: Request) {
  try {
    return await handleDiscoveryBookings(request, getAppEnv());
  } catch (error) {
    console.error("discovery-bookings POST failed", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The booking could not be completed.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
