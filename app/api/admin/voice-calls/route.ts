import { getAppEnv } from "@/lib/runtime-env";
import { handleAdminVoiceCalls } from "@/lib/server/admin-voice-calls";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleAdminVoiceCalls(request, getAppEnv());
}

export async function POST(request: Request) {
  return handleAdminVoiceCalls(request, getAppEnv());
}
