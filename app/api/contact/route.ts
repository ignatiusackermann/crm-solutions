import { getAppEnv } from "@/lib/runtime-env";
import { handleContactSubmission } from "@/lib/server/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleContactSubmission(request, getAppEnv());
}
