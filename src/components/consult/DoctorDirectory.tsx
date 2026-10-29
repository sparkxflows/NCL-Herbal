"use client";

import { useMemo, useState } from "react";
import {
  Baby,
  Brain,
  CalendarCheck,
  Flower2,
  Leaf,
  MoreHorizontal,
  Salad,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import DoctorCard from "@/components/cards/DoctorCard";
import { Eyebrow, SectionTitle, ViewAllLink } from "@/components/ui/Section";
import type { UIDoctor } from "@/lib/types";

const SPECIALTIES = [
  { key: "general-physician", icon: UserRound, label: "General Physician" },
  { key: "ayurveda", icon: Leaf, label: "Ayurveda" },
  { key: "skin-hair", icon: Sparkles, label: "Skin & Hair" },
  { key: "diet-nutrition", icon: Salad, label: "Diet & Nutrition" },
  { key: "mental-health", icon: Brain, label: "Mental Health" },
  { key: "womens-health", icon: Flower2, label: "Women's Health" },
  { key: "childrens-health", icon: Baby, label: "Children's Health" },
  { key: "more", icon: MoreHorizontal, label: "More" },
];

const HIGHLIGHTS = [
  { icon: UserRound, title: "Qualified Doctors", sub: "& Specialists" },
  { icon: ShieldCheck, title: "100% Safe", sub: "Consultations" },
  { icon: CalendarCheck, title: "Easy Online", sub: "Booking" },
];

export default function DoctorDirectory({ doctors }: { doctors: UIDoctor[] }) {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [applied, setApplied] = useState({ query: "", specialty: "all", availability: "all" });

  const filtered = useMemo(() => {
    const q = applied.query.trim().toLowerCase();
    return doctors.filter((d) => {
      const matchQ =
        !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.about.toLowerCase().includes(q);
      const matchS = applied.specialty === "all" || d.specialtyKey === applied.specialty;
      const matchA =
        applied.availability === "all" ||
        (applied.availability === "available" ? d.available : !d.available);
      return matchQ && matchS && matchA;
    });
  }, [doctors, applied]);

  return (
    <>
      {/* find the right doctor */}
      <section className="bg-white py-11">
        <div className="mx-auto grid max-w-[1240px] items-start gap-7 px-4 lg:grid-cols-[1.25fr_0.9fr]">
          <Reveal>
            <Eyebrow>Our Doctors</Eyebrow>
            <SectionTitle className="mt-1.5">Find the Right Doctor for You</SectionTitle>
            <p className="mt-2 max-w-[430px] text-[13px] leading-relaxed text-[#5e6f66]">
              Choose from our experienced doctors and book your consultation in just a few simple steps.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setApplied({ query, specialty, availability });
              }}
              className="mt-6 flex flex-wrap items-center gap-2.5"
            >
              <label className="flex min-w-[230px] flex-1 items-center gap-2 rounded-lg border border-[#e3ece4] bg-white px-3 py-2.5 transition focus-within:border-[#0d5c37] focus-within:ring-2 focus-within:ring-[#0d5c37]/12">
                <Search size={15} className="text-[#9aa79f]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, speciality or problem..."
                  className="min-w-0 flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-[#9aa79f]"
                />
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="rounded-lg border border-[#e3ece4] bg-white px-3 py-2.5 text-[12.5px] outline-none transition focus:border-[#0d5c37]"
              >
                <option value="all">All Specialties</option>
                {SPECIALTIES.slice(0, 7).map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="rounded-lg border border-[#e3ece4] bg-white px-3 py-2.5 text-[12.5px] outline-none transition focus:border-[#0d5c37]"
              >
                <option value="all">All Availability</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
              </select>
              <button type="submit" className="btn btn-primary rounded-lg px-5 py-2.5 text-[12.5px]">
                <Search size={14} /> Search
              </button>
            </form>
          </Reveal>

          <Reveal delay={140} variant="right">
            <div className="relative overflow-hidden rounded-xl border border-[#e2efe1] bg-gradient-to-br from-[#eef7ec] to-[#e4f1e2] p-6">
              <Leaf className="animate-sway absolute -top-3 right-2 h-20 w-20 text-[#9fc9a1]/35" />
              <div className="relative grid grid-cols-3 gap-4">
                {HIGHLIGHTS.map((h) => (
                  <div key={h.title} className="group flex items-start gap-2">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#0d5c37] transition-transform duration-300 group-hover:-translate-y-1">
                      <h.icon size={15} />
                    </span>
                    <span className="text-[11px] leading-tight font-semibold">
                      {h.title}
                      <br />
                      <span className="font-medium text-[#5e6f66]">{h.sub}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* popular specialties */}
      <section className="bg-white pb-11">
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="flex items-end justify-between gap-3">
            <Reveal>
              <Eyebrow>Popular Specialties</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <button
                onClick={() => {
                  setSpecialty("all");
                  setApplied({ query, specialty: "all", availability });
                }}
                className="group inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0d5c37]"
              >
                View All →
              </button>
            </Reveal>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {SPECIALTIES.map((s, i) => (
              <Reveal key={s.key} delay={i * 55}>
                <button
                  onClick={() => {
                    const next = s.key === "more" ? "all" : s.key;
                    setSpecialty(next);
                    setApplied({ query, specialty: next, availability });
                  }}
                  className={`card-hover group flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-xl border px-2 py-5 text-center ${
                    applied.specialty === s.key
                      ? "border-[#0d5c37] bg-[#eaf4ea]"
                      : "border-[#e4eee3] bg-white hover:bg-[#f6faf5]"
                  }`}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f1f8f0] text-[#0d5c37] transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-[#0d5c37] group-hover:text-white">
                    <s.icon size={17} />
                  </span>
                  <span className="text-[11px] leading-tight font-semibold">{s.label}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* meet our doctors */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Reveal>
              <Eyebrow>Our Doctors</Eyebrow>
              <SectionTitle className="mt-1">Meet Our Expert Doctors</SectionTitle>
              <p className="mt-1.5 text-[12.5px] text-[#5e6f66]">
                Experienced, certified and caring — your health is in safe hands.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ViewAllLink label="View All Doctors" href="#top" />
            </Reveal>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((d, i) => (
              <Reveal key={d.id} delay={i * 90}>
                <DoctorCard doctor={d} />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-8 rounded-xl border border-dashed border-[#d6e4d6] bg-[#f9fcf8] py-10 text-center text-sm text-[#5e6f66]">
              No doctors matched your search. Try a different speciality.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
