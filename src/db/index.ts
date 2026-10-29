import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool = hasDatabaseUrl
  ? (globalForDb.__arenaNextJsPostgresqlPool ??
     new Pool({
       connectionString: process.env.DATABASE_URL,
     }))
  : (null as unknown as Pool);

if (process.env.NODE_ENV !== "production" && pool) {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = pool
  ? drizzle(pool)
  : (new Proxy({} as ReturnType<typeof drizzle>, {
      get(_target, prop) {
        if (prop === "then") return undefined;
        return () => {
          throw new Error("DATABASE_URL is not configured. Running with fallback static data.");
        };
      },
    }) as ReturnType<typeof drizzle>);
