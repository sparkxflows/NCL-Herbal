import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db, hasDatabaseUrl } from "@/db";
import { subscribers } from "@/db/schema";
import { ensureSeeded } from "@/lib/data";

export const dynamic = "force-dynamic";

const memorySubscribers: Array<{ id: number; email: string; createdAt: string }> = [
  { id: 1, email: "sharma.ayurveda@gmail.com", createdAt: new Date().toISOString() },
  { id: 2, email: "vikas.patel@outlook.com", createdAt: new Date().toISOString() },
];

export async function GET() {
  try {
    if (hasDatabaseUrl) {
      await ensureSeeded();
      const rows = await db.select().from(subscribers).orderBy(desc(subscribers.createdAt));
      return NextResponse.json({ subscribers: rows });
    }
    return NextResponse.json({ subscribers: memorySubscribers });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    const value = String(email ?? "").trim().toLowerCase();
    if (!value || !value.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (hasDatabaseUrl) {
      await ensureSeeded();
      await db.insert(subscribers).values({ email: value }).onConflictDoNothing();
    } else {
      if (!memorySubscribers.some((s) => s.email === value)) {
        memorySubscribers.unshift({ id: Date.now(), email: value, createdAt: new Date().toISOString() });
      }
    }

    return NextResponse.json({ ok: true, message: "Subscribed successfully!" });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
