import { db, hasDatabaseUrl } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (hasDatabaseUrl) {
      await db.execute(sql`select 1`);
      return Response.json({ ok: true, database: "connected" });
    }
    return Response.json({ ok: true, database: "memory/static (DATABASE_URL not configured)" });
  } catch {
    return Response.json({ ok: false, error: "Database unreachable" }, { status: 500 });
  }
}
