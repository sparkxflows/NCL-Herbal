import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db, hasDatabaseUrl } from "@/db";
import { contactMessages } from "@/db/schema";
import { ensureSeeded } from "@/lib/data";

export const dynamic = "force-dynamic";

type ContactItem = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const memoryContacts: ContactItem[] = [
  {
    id: 1,
    name: "Rahul Verma",
    email: "rahul.v@gmail.com",
    subject: "Kamdev Power Dosage Query",
    message: "Namaste, can this supplement be taken with warm milk at night? Please advise on duration.",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    if (hasDatabaseUrl) {
      await ensureSeeded();
      const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
      return NextResponse.json({ messages: rows });
    }
    return NextResponse.json({ messages: memoryContacts });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | undefined>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const item: ContactItem = {
      id: Date.now(),
      name,
      email,
      subject: String(body.subject ?? ""),
      message,
      createdAt: new Date().toISOString(),
    };

    if (hasDatabaseUrl) {
      await ensureSeeded();
      await db.insert(contactMessages).values({
        name,
        email,
        subject: item.subject,
        message,
      });
    } else {
      memoryContacts.unshift(item);
    }

    return NextResponse.json({ ok: true, message: "Thank you! Your message has been received." });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
