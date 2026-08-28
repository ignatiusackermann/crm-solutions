import { getAppEnv } from "@/lib/runtime-env";
import { handleReviewSubmission } from "@/lib/server/reviews";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleReviewSubmission(request, getAppEnv());
}
