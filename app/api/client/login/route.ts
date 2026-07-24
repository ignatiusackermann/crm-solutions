import { getAppEnv } from "@/lib/runtime-env";
import { handleClientLogin } from "@/lib/server/client-login";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleClientLogin(request, getAppEnv());
}
