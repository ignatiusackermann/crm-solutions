import postgres, { type Sql } from "postgres";

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

declare global {
  // eslint-disable-next-line no-var
  var __crm_postgres__: Sql | undefined;
}

function toPostgresParams(sql: string) {
  let index = 0;
  return sql.replaceAll("?", () => {
    index += 1;
    return `$${index}`;
  });
}

function getClient() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;

  if (!globalThis.__crm_postgres__) {
    // Supabase pooler URIs often include ?pgbouncer=true; postgres.js handles SSL via URL.
    globalThis.__crm_postgres__ = postgres(url, {
      prepare: false,
      max: 1,
      idle_timeout: 20,
      connect_timeout: 15,
      ssl: "require",
      connection: {
        application_name: "crm-solutions",
      },
    });
  }

  return globalThis.__crm_postgres__;
}

export function getSqlDatabase(): SqlDatabase | null {
  try {
    const client = getClient();
    if (!client) return null;

    const prepare = (
      sql: string,
      args: SqlValue[] = [],
    ): SqlPreparedStatement => {
      const pgSql = toPostgresParams(sql);

      return {
        bind(...nextArgs: SqlValue[]) {
          return prepare(sql, nextArgs);
        },
        async all<T extends SqlRow = SqlRow>() {
          const rows = (await client.unsafe(pgSql, args as never[])) as T[];
          return { results: rows };
        },
        async first<T extends SqlRow = SqlRow>(): Promise<T | null> {
          const { results } = await prepare(sql, args).all<T>();
          return results.length > 0 ? results[0] : null;
        },
        async run() {
          await client.unsafe(pgSql, args as never[]);
          return { success: true };
        },
      };
    };

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
  } catch (error) {
    console.error("Supabase database client failed to initialise", error);
    return null;
  }
}
