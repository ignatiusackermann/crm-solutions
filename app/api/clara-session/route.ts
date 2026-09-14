import { getAppEnv } from "@/lib/runtime-env";
import { handleClaraSession } from "@/lib/server/clara";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    return await handleClaraSession(request, getAppEnv());
  } catch (error) {
    console.error("clara-session POST failed", error);
    return Response.json(
      { error: "The conversation could not be saved." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
