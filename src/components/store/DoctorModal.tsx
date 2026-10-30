"use client";

import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, CalendarDays, Clock, Globe, GraduationCap, Sparkles, Video } from "lucide-react";
import Stars from "@/components/ui/Stars";
import { nextDays } from "@/lib/dates";
import { rupees, type UIDoctor } from "@/lib/types";
import Modal from "./Modal";
import { useStore } from "./StoreProvider";

const CONSULT_CATEGORIES = [
  "Kidney & Gall Bladder Stone",
  "Liver Care & Digestion",
  "Uterus Fibroid & Women's Health",
  "Infertility & Reproductive Care",
  "Anxiety, Depression & Mental Health",
  "Hair Fall & Skin Treatment",
  "Hernia & Prostate Care",
  "Cancer Support & Chronic Illness",
  "General Non-Surgical Holistic Healing",
];

export default function DoctorModal({ doctor, onClose }: { doctor: UIDoctor | null; onClose: () => void }) {
  const { pushToast } = useStore();
  const days = useMemo(() => nextDays(5), []);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<string>("");
  const [category, setCategory] = useState<string>(CONSULT_CATEGORIES[0]);
  const [form, setForm] = useState({ patientName: "", email: "", phone: "", reason: "" });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (doctor) {
      setDayIdx(0);
      setSlot(doctor.slots[0] ?? "");
      setCategory(CONSULT_CATEGORIES[0]);
      setForm({ patientName: "", email: "", phone: "", reason: "" });
      setDone(false);
    }
  }, [doctor]);

  if (!doctor) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: form.patientName,
          email: form.email,
          phone: form.phone,
          doctorId: doctor.id,
          doctorName: doctor.name,
          appointmentDate: days[dayIdx].full,
          slot,
          category,
          reason: category ? `[Category: ${category}] ${form.reason}`.trim() : form.reason,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not book the appointment");
      setDone(true);
      pushToast(`Appointment booked with ${doctor.name}`);
    } catch (err) {
      pushToast((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open onClose={onClose} label={doctor.name} maxWidth="max-w-4xl">
      <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* profile */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#eef7ec] to-[#dcecd9] p-6">
          <div className="relative overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={doctor.image} alt={doctor.name} className="h-56 w-full object-cover object-top" />
            {doctor.available && (
              <span className="absolute top-3 right-3 rounded-full bg-[#0d5c37] px-2.5 py-1 text-[10px] font-bold text-white">
                Available
              </span>
            )}
          </div>
          <h3 className="font-display mt-4 text-xl font-extrabold">{doctor.name}</h3>
          <p className="text-sm text-[#0d5c37]">{doctor.specialty}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#5e6f66]">
            <Stars value={Number(doctor.rating)} size={12} />
            <span className="font-semibold text-[#16241d]">{doctor.rating}</span>
            <span>({doctor.reviewCount} reviews)</span>
          </div>

          <div className="mt-3 rounded-lg border border-[#cfe2ce] bg-white/70 p-2.5 text-[11px] font-medium text-[#16241d]">
            <span className="font-bold text-[#0d5c37]">New Life Clinic</span> · ALG-21, Pushpa Complex, Hisar
            <p className="mt-0.5 text-[10.5px] italic text-[#5e6f66]">
              &ldquo;Complete non-surgical Ayurvedic treatment for physical &amp; mental health disorders&rdquo;
            </p>
          </div>

          <ul className="mt-3.5 flex flex-col gap-2 text-[13px] text-[#2c3b33]">
            <li className="flex items-center gap-2">
              <GraduationCap size={15} className="text-[#0d5c37]" /> {doctor.qualifications}
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck size={15} className="text-[#0d5c37]" /> {doctor.experience}
            </li>
            <li className="flex items-center gap-2">
              <Globe size={15} className="text-[#0d5c37]" /> {doctor.languages}
            </li>
            <li className="flex items-center gap-2">
              <Video size={15} className="text-[#0d5c37]" /> Video / Audio call · Helpline: 9306737990
            </li>
          </ul>

          <p className="mt-4 text-[13px] leading-relaxed text-[#5e6f66]">{doctor.about}</p>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#cfe2ce] bg-white/95 p-3.5 shadow-sm">
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#5e6f66]">Consultation Fee</span>
              <span className="text-[11px] font-semibold text-[#0d5c37]">Personalized 1-on-1 Session</span>
            </div>
            <span className="font-display text-[28px] font-black text-[#0d5c37]">{rupees(doctor.fee)}</span>
          </div>
        </div>

        {/* booking */}
        <div className="p-6 sm:p-7">
          {done ? (
            <div className="animate-pop flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="animate-ring grid h-16 w-16 place-items-center rounded-full bg-[#eaf4ea]">
                <CalendarDays size={26} className="text-[#0d5c37]" />
              </div>
              <h4 className="font-display text-xl font-extrabold">Appointment confirmed</h4>
              <p className="max-w-[340px] text-sm text-[#5e6f66]">
                {doctor.name} will consult you for <strong>{category}</strong> on <strong>{days[dayIdx].full}</strong> at <strong>{slot}</strong>. A
                confirmation has been sent to {form.email}.
              </p>
              <button onClick={onClose} className="btn btn-primary mt-2 px-6 py-2.5 text-sm">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <h4 className="font-display text-lg font-extrabold">Book an Appointment</h4>
                <p className="text-[13px] text-[#5e6f66]">Choose your health category, date and time that works for you.</p>
              </div>

              {/* Consultation Category Selection */}
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase text-[#16241d]">
                  <Sparkles size={13} className="text-[#0d5c37]" /> Select Health Concern / Category
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {CONSULT_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`rounded-lg border px-3 py-2 text-left text-[11.5px] font-semibold transition ${
                        category === cat
                          ? "border-[#0d5c37] bg-[#eaf4ea] text-[#0d5c37] ring-1 ring-[#0d5c37]"
                          : "border-[#e3ece4] bg-white text-[#50635a] hover:border-[#0d5c37]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase">
                  <CalendarDays size={13} className="text-[#0d5c37]" /> Select date
                </p>
                <div className="flex flex-wrap gap-2">
                  {days.map((d, i) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setDayIdx(i)}
                      className={`min-w-[66px] rounded-lg border px-3 py-2 text-center transition hover:-translate-y-0.5 ${
                        dayIdx === i
                          ? "border-[#0d5c37] bg-[#0d5c37] text-white shadow-[0_10px_20px_-12px_rgba(13,92,55,0.9)]"
                          : "border-[#e3ece4] bg-white hover:border-[#0d5c37]"
                      }`}
                    >
                      <span className="block text-[10px] font-semibold opacity-80">{d.weekday}</span>
                      <span className="block text-xs font-bold">{d.dayLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase">
                  <Clock size={13} className="text-[#0d5c37]" /> Select time
                </p>
                <div className="flex flex-wrap gap-2">
                  {doctor.slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 ${
                        slot === s
                          ? "border-[#0d5c37] bg-[#0d5c37] text-white"
                          : "border-[#e3ece4] bg-white hover:border-[#0d5c37]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  placeholder="Full name"
                  value={form.patientName}
                  onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  className="rounded-lg border border-[#e3ece4] px-3 py-2.5 text-sm outline-none transition focus:border-[#0d5c37] focus:ring-2 focus:ring-[#0d5c37]/15"
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-lg border border-[#e3ece4] px-3 py-2.5 text-sm outline-none transition focus:border-[#0d5c37] focus:ring-2 focus:ring-[#0d5c37]/15"
                />
                <input
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-lg border border-[#e3ece4] px-3 py-2.5 text-sm outline-none transition focus:border-[#0d5c37] focus:ring-2 focus:ring-[#0d5c37]/15 sm:col-span-2"
                />
                <textarea
                  rows={3}
                  placeholder="Describe your health concern (optional)"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="resize-none rounded-lg border border-[#e3ece4] px-3 py-2.5 text-sm outline-none transition focus:border-[#0d5c37] focus:ring-2 focus:ring-[#0d5c37]/15 sm:col-span-2"
                />
              </div>

              <button type="submit" disabled={saving || !slot} className="btn btn-primary w-full py-3 text-sm disabled:opacity-70">
                <CalendarDays size={16} />
                {saving ? "Booking…" : `Confirm Booking · ${rupees(doctor.fee)}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}
