import { getAppEnv } from "@/lib/runtime-env";
import { handleTestPayment } from "@/lib/server/payment-plans";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleTestPayment(request, getAppEnv());
}
