import { getAppEnv } from "@/lib/runtime-env";
import { handleClientPaymentPlan } from "@/lib/server/payment-plans";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleClientPaymentPlan(request, getAppEnv());
}
