import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/lib/client-auth";

export async function GET() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  redirect("/client/login");
}
