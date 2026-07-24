import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

export function getDb() {
  const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL (or TURSO_DATABASE_URL) is not set. Add it in Vercel → Project → Settings → Environment Variables.",
    );
  }

  const authToken =
    process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;
  const client = createClient({
    url,
    authToken: authToken || undefined,
  });

  return drizzle(client, { schema });
}
