import { getAppEnv } from "@/lib/runtime-env";
import { handleCreatePayPalOrder } from "@/lib/server/payment-plans";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleCreatePayPalOrder(request, getAppEnv());
}
