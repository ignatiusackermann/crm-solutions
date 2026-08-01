import { getAppEnv } from "@/lib/runtime-env";
import { handleAdminAuditResults } from "@/lib/server/admin-audit-results";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleAdminAuditResults(request, getAppEnv());
}
