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
        <div className="flex items-start justify-between gap-3 border-b border-[#eef5ee] pb-3">
          <div>
            <h3 className="font-display text-[18px] font-extrabold text-[#16241d]">{doctor.name}</h3>
            <p className="mt-0.5 text-[12.5px] font-semibold text-[#0d5c37]">New Life Clinic · Hisar (Haryana)</p>
          </div>
          <div className="text-right">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#697d72]">Fee</span>
            <span className="font-display text-[26px] sm:text-[30px] font-black leading-none text-[#0d5c37]">
              {rupees(doctor.fee)}
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px]">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-[#f5a623] text-[#f5a623]" />
            <span className="font-bold text-[#16241d]">{doctor.rating}</span>
            <span className="text-[#0d5c37] font-semibold">({doctor.reviewCount}+ Justdial Reviews)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#5e6f66]">
            <Award size={14} className="text-[#0d5c37]" />
            <span>{doctor.experience}</span>
          </div>
        </div>

        <p className="mt-2.5 line-clamp-2 text-[12px] leading-relaxed text-[#5e6f66]">
          {doctor.about}
        </p>

        {/* Clinic Motto Banner from visiting card */}
        <div className="mt-2.5 rounded-lg border border-[#dcecd9] bg-[#f1f8f0] px-3 py-1.5 text-[11px] font-semibold text-[#0d5c37]">
          🌿 Complete non-surgical Ayurvedic treatment for physical &amp; mental health disorders.
        </div>

        {/* Health Categories / Specialist In from card */}
        <div className="mt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#697d72] mb-1.5">Specialist Clinical Care:</p>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Liver",
              "Kidney Stone",
              "Gall Bladder Stone",
              "Uterus Fibroid",
              "Infertility",
              "Hair Fall",
              "Anxiety & Depression",
              "Hernia",
              "Prostate",
            ].map((tag) => (
              <span key={tag} className="rounded-md border border-[#cfe2ce] bg-white px-2 py-0.5 text-[10.5px] font-semibold text-[#0d5c37] shadow-2xs">
                • {tag}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openDoctor(doctor);
          }}
          className="btn btn-primary mt-4 w-full py-3 text-[13.5px] font-bold shadow-md transition hover:-translate-y-0.5"
        >
          <CalendarDays size={16} />
          Book Consultation · {rupees(doctor.fee)}
        </button>
      </div>
    </article>
  );
}
