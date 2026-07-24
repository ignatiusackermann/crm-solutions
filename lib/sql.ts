import { createClient } from "@libsql/client";

export type SqlRow = Record<string, unknown>;

type SqlValue = string | number | bigint | boolean | null | Uint8Array | ArrayBuffer;

export type SqlPreparedStatement = {
  bind(...args: SqlValue[]): SqlPreparedStatement;
  all<T extends SqlRow = SqlRow>(): Promise<{ results: T[] }>;
  first<T extends SqlRow = SqlRow>(): Promise<T | null>;
  run(): Promise<{ success: boolean }>;
};

export type SqlDatabase = {
  prepare(sql: string): SqlPreparedStatement;
  batch(statements: SqlPreparedStatement[]): Promise<unknown[]>;
};

export function getSqlDatabase(): SqlDatabase | null {
  const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
  if (!url) return null;

  const authToken =
    process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;
  const client = createClient({
    url,
    authToken: authToken || undefined,
  });

  const prepare = (sql: string, args: SqlValue[] = []): SqlPreparedStatement => ({
    bind(...nextArgs: SqlValue[]) {
      return prepare(sql, nextArgs);
    },
    async all<T extends SqlRow = SqlRow>() {
      const result = await client.execute({ sql, args });
      return {
        results: result.rows.map((row) => ({ ...row }) as unknown as T),
      };
    },
    async first<T extends SqlRow = SqlRow>(): Promise<T | null> {
      const { results } = await prepare(sql, args).all<T>();
      return results.length > 0 ? results[0] : null;
    },
    async run() {
      await client.execute({ sql, args });
      return { success: true };
    },
  });

  return {
    prepare(sql: string) {
      return prepare(sql);
    },
    async batch(statements: SqlPreparedStatement[]) {
      const results = [];
      for (const statement of statements) {
        results.push(await statement.run());
      }
      return results;
    },
  };
}
