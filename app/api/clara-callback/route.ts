import { getAppEnv } from "@/lib/runtime-env";
import { handleClaraCallback } from "@/lib/server/clara";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    return await handleClaraCallback(request, getAppEnv());
  } catch (error) {
    console.error("clara-callback POST failed", error);
    return Response.json(
      { error: "The callback request could not be completed." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
