import { getAppEnv } from "@/lib/runtime-env";
import { handleAdminPaymentPlans } from "@/lib/server/payment-plans";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleAdminPaymentPlans(request, getAppEnv());
}

export async function POST(request: Request) {
  return handleAdminPaymentPlans(request, getAppEnv());
}
