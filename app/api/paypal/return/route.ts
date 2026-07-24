import { getAppEnv } from "@/lib/runtime-env";
import { handlePayPalReturn } from "@/lib/server/payment-plans";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handlePayPalReturn(request, getAppEnv());
}
