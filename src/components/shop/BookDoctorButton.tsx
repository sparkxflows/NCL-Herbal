"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import type { UIDoctor } from "@/lib/types";
import { useStore } from "@/components/store/StoreProvider";

export default function BookDoctorButton({
  doctor,
  label = "Book an Appointment",
  className = "px-6 py-3 text-[13px]",
}: {
  doctor: UIDoctor | null;
  label?: string;
  className?: string;
}) {
  const { openDoctor, pushToast } = useStore();

  return (
    <button
      onClick={() => (doctor ? openDoctor(doctor) : pushToast("No doctor available right now", "error"))}
      className={`btn btn-primary ${className}`}
    >
      <CalendarDays size={15} />
      {label}
      <ArrowRight size={14} className="arrow" />
    </button>
  );
}
