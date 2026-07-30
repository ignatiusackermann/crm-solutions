import { getAppEnv } from "@/lib/runtime-env";
import { handleClientRequestAccess } from "@/lib/server/payment-plans";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleClientRequestAccess(request, getAppEnv());
}
