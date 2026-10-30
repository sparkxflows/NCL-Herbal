"use client";

import type React from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { UIDoctor } from "@/lib/types";
import { useStore } from "@/components/store/StoreProvider";

export default function BookDoctorButton({
  doctor,
  label = "Book an Appointment",
  className = "px-6 py-3 text-[13px]",
  style,
  children,
}: {
  doctor: UIDoctor | null;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const { openDoctor, pushToast } = useStore();

  return (
    <button
      onClick={() => (doctor ? openDoctor(doctor) : pushToast("No doctor available right now", "error"))}
      className={children ? className : `btn btn-primary ${className}`}
      style={style}
      type="button"
    >
      {children ? (
        children
      ) : (
        <>
          <CalendarDays size={15} />
          {label}
          <ArrowRight size={14} className="arrow" />
        </>
      )}
    </button>
  );
}
