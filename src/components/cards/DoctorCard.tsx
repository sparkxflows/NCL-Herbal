"use client";

import { CalendarDays, Star, Award } from "lucide-react";
import type { UIDoctor } from "@/lib/types";
import { useStore } from "@/components/store/StoreProvider";
import { rupees } from "@/lib/types";

export default function DoctorCard({ doctor }: { doctor: UIDoctor }) {
  const { openDoctor } = useStore();

  return (
    <article
      onClick={() => openDoctor(doctor)}
      className="card-hover img-zoom group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#e4eee3] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#0d5c37]/40"
    >
      <div className="relative h-[210px] overflow-hidden bg-[#eef7ec]" suppressHydrationWarning>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105"
          suppressHydrationWarning
        />
        {doctor.available && (
          <span className="absolute top-3 right-3 rounded-full bg-[#0d5c37] px-3 py-1 text-[10.5px] font-bold text-white shadow-md">
            Available
          </span>
        )}
        <span className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#07251a]/75 via-transparent to-transparent pb-3 text-[11px] font-bold tracking-wide text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View Profile &amp; Book
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-[15.5px] font-bold text-[#16241d]">{doctor.name}</h3>
            <p className="mt-0.5 text-[12px] font-medium text-[#0d5c37]">{doctor.specialty}</p>
          </div>
          <span className="text-[14px] font-extrabold text-[#0d5c37]">{rupees(doctor.fee)}</span>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 text-[12px]">
          <Star size={13} className="fill-[#f5a623] text-[#f5a623]" />
          <span className="font-semibold text-[#16241d]">{doctor.rating}</span>
          <span className="text-[#5e6f66]">({doctor.reviewCount} reviews)</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-[11.5px] text-[#5e6f66]">
          <Award size={13} className="text-[#0d5c37]" />
          <span>{doctor.experience}</span>
        </div>

        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-[#5e6f66]">
          {doctor.about}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openDoctor(doctor);
          }}
          className="btn btn-primary mt-4 w-full py-2.5 text-[12.5px] font-bold"
        >
          <CalendarDays size={14} />
          Book Consultation
        </button>
      </div>
    </article>
  );
}
