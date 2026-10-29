import { NextResponse } from "next/server";
import { db, hasDatabaseUrl } from "@/db";
import { contactMessages } from "@/db/schema";
import { ensureSeeded } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | undefined>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    if (hasDatabaseUrl) {
      await ensureSeeded();
      await db.insert(contactMessages).values({
        name,
        email,
        subject: String(body.subject ?? ""),
        message,
      });
    }

    return NextResponse.json({ ok: true, message: "Thank you! Your message has been received." });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
