import { getAppEnv } from "@/lib/runtime-env";
import { handleGeminiVoiceToken } from "@/lib/server/gemini-voice";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGeminiVoiceToken(request, getAppEnv());
}
