"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { DayOption } from "@/lib/dates";
import type { UIDoctor } from "@/lib/types";
import { useStore } from "@/components/store/StoreProvider";

export default function AppointmentWidget({
  days,
  slots,
  doctor,
}: {
  days: DayOption[];
  slots: string[];
  doctor: UIDoctor | null;
}) {
  const { openDoctor, pushToast } = useStore();
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState(slots[0] ?? "");

  const book = () => {
    if (!doctor) {
      pushToast("No doctor available right now", "error");
      return;
    }
    openDoctor({ ...doctor, slots });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {days.map((d, i) => (
          <button
            key={d.iso}
            onClick={() => setDayIdx(i)}
            className={`min-w-[62px] rounded-lg border px-3 py-2 text-center transition hover:-translate-y-0.5 ${
              dayIdx === i
                ? "border-[#0d5c37] bg-[#0d5c37] text-white shadow-[0_12px_22px_-14px_rgba(13,92,55,0.95)]"
                : "border-[#dde8dc] bg-white hover:border-[#0d5c37]"
            }`}
          >
            <span className="block text-[10px] font-semibold opacity-85">{d.weekday}</span>
            <span className="block text-[11.5px] font-bold">{d.dayLabel}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {slots.map((s) => (
          <button
            key={s}
            onClick={() => setSlot(s)}
            className={`rounded-lg border px-3.5 py-2 text-[11.5px] font-semibold transition hover:-translate-y-0.5 ${
              slot === s
                ? "border-[#0d5c37] bg-[#0d5c37] text-white shadow-[0_12px_22px_-14px_rgba(13,92,55,0.95)]"
                : "border-[#dde8dc] bg-white hover:border-[#0d5c37]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <button onClick={book} className="btn btn-primary w-fit px-6 py-3 text-[13px]">
        <CalendarDays size={15} />
        Book Appointment
        <ArrowRight size={14} className="arrow" />
      </button>
    </div>
  );
}
