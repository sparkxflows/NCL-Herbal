import { NextResponse } from "next/server";
import { db, hasDatabaseUrl } from "@/db";
import { subscribers } from "@/db/schema";
import { ensureSeeded } from "@/lib/data";

export const dynamic = "force-dynamic";

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
    }

    return NextResponse.json({ ok: true, message: "Subscribed successfully!" });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
