"use client";

import { CalendarDays, Star } from "lucide-react";
import type { UIDoctor } from "@/lib/types";
import { useStore } from "@/components/store/StoreProvider";

export default function DoctorCard({ doctor }: { doctor: UIDoctor }) {
  const { openDoctor } = useStore();

  return (
    <article
      onClick={() => openDoctor(doctor)}
      className="card-hover img-zoom group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#e8efe8] bg-white"
    >
      <div className="relative h-[165px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover object-top" />
        {doctor.available && (
          <span className="absolute top-2.5 right-2.5 rounded-full bg-[#0d5c37] px-2.5 py-[3px] text-[10px] font-bold text-white shadow">
            Available
          </span>
        )}
        <span className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#07251a]/70 to-transparent pb-3 text-[11px] font-bold tracking-wide text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View profile &amp; book
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        <h3 className="font-display text-[15px] font-bold">{doctor.name}</h3>
        <p className="mt-0.5 text-[12px] text-[#5e6f66]">{doctor.specialty}</p>
        <div className="mt-2 flex items-center gap-1 text-[12px]">
          <Star size={13} className="fill-[#f5a623] text-[#f5a623]" />
          <span className="font-semibold">{doctor.rating}</span>
          <span className="text-[#5e6f66]">({doctor.reviewCount} reviews)</span>
        </div>
        <p className="mt-1.5 text-[12px] text-[#5e6f66]">{doctor.experience}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openDoctor(doctor);
          }}
          className="btn btn-primary mt-3.5 w-full py-2.5 text-[12.5px]"
        >
          <CalendarDays size={14} />
          Book Appointment
        </button>
      </div>
    </article>
  );
}
