import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db, hasDatabaseUrl } from "@/db";
import { appointments } from "@/db/schema";
import { ensureSeeded } from "@/lib/data";

export const dynamic = "force-dynamic";

type AppointmentItem = {
  id: number;
  doctorId: number | null;
  doctorName: string;
  patientName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  slot: string;
  reason: string;
  status: string;
  createdAt: string;
};

const memoryAppointments: AppointmentItem[] = [
  {
    id: 101,
    doctorId: 1,
    doctorName: "Dr. N.K. Sharma",
    patientName: "Vikram Malhotra",
    email: "vikram@example.com",
    phone: "+91 98765 12345",
    appointmentDate: "Nov 02, 2026",
    slot: "10:00 AM",
    reason: "Ayurvedic consultation for chronic digestion and fatigue",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 102,
    doctorId: 2,
    doctorName: "Dr. N.K. Sharma",
    patientName: "Sunita Roy",
    email: "sunita@example.com",
    phone: "+91 98111 22334",
    appointmentDate: "Nov 03, 2026",
    slot: "02:00 PM",
    reason: "Joint pain and stiffness herbal therapy follow-up",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    if (hasDatabaseUrl) {
      await ensureSeeded();
      const rows = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
      return NextResponse.json({ appointments: rows });
    }
    return NextResponse.json({ appointments: memoryAppointments });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

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
      doctorName: String(body.doctorName ?? "Dr. N.K. Sharma"),
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
          doctorName: String(body.doctorName ?? "Dr. N.K. Sharma"),
          patientName,
          email,
          phone: String(body.phone ?? ""),
          appointmentDate,
          slot,
          reason: String(body.reason ?? ""),
        })
        .returning();
      if (row) appointmentData = row;
    } else {
      memoryAppointments.unshift(appointmentData as AppointmentItem);
    }

    return NextResponse.json({ ok: true, appointment: appointmentData });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = (await request.json()) as { id: number; status: string };
    if (!id || !status) return NextResponse.json({ error: "id and status required" }, { status: 400 });

    const item = memoryAppointments.find((a) => a.id === id);
    if (item) item.status = status;

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
