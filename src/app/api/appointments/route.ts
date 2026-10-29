import { NextResponse } from "next/server";
import { db, hasDatabaseUrl } from "@/db";
import { appointments } from "@/db/schema";
import { ensureSeeded } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | number | undefined>;
    const patientName = String(body.patientName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const appointmentDate = String(body.appointmentDate ?? "").trim();
    const slot = String(body.slot ?? "").trim();

    if (!patientName || !email || !appointmentDate || !slot) {
      return NextResponse.json({ error: "Please fill name, email, date and time slot." }, { status: 400 });
    }

    let appointmentData: Record<string, unknown> = {
      id: Date.now(),
      doctorId: body.doctorId ? Number(body.doctorId) : null,
      doctorName: String(body.doctorName ?? "NLC Expert Doctor"),
      patientName,
      email,
      phone: String(body.phone ?? ""),
      appointmentDate,
      slot,
      reason: String(body.reason ?? ""),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    if (hasDatabaseUrl) {
      await ensureSeeded();
      const [row] = await db
        .insert(appointments)
        .values({
          doctorId: body.doctorId ? Number(body.doctorId) : null,
          doctorName: String(body.doctorName ?? "NLC Expert Doctor"),
          patientName,
          email,
          phone: String(body.phone ?? ""),
          appointmentDate,
          slot,
          reason: String(body.reason ?? ""),
        })
        .returning();
      if (row) appointmentData = row;
    }

    return NextResponse.json({ ok: true, appointment: appointmentData });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
