import { getAppEnv } from "@/lib/runtime-env";
import { handleAdminContact } from "@/lib/server/admin-contact";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleAdminContact(request, getAppEnv());
}

export async function POST(request: Request) {
  return handleAdminContact(request, getAppEnv());
}
