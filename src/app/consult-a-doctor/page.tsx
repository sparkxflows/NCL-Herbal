import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  ClipboardCheck,
  Heart,
  Leaf,
  ShieldCheck,
  UserRound,
  Video,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import DoctorDirectory from "@/components/consult/DoctorDirectory";
import BookDoctorButton from "@/components/shop/BookDoctorButton";
import { Eyebrow, SectionTitle } from "@/components/ui/Section";
import { getDoctors } from "@/lib/data";
import { toUIDoctor } from "@/lib/map";

export const dynamic = "force-dynamic";

const HERO_CHIPS = [
  { icon: UserRound, label: "Qualified\nDoctors" },
  { icon: ClipboardCheck, label: "Convenient\nOnline Booking" },
  { icon: ShieldCheck, label: "Safe & Secure\nConsultation" },
  { icon: CalendarDays, label: "Personalized\nHealth Guidance" },
];

const STEPS = [
  { icon: CalendarDays, title: "Choose a Doctor", sub: "Select your preferred\nspecialist and time." },
  { icon: ClipboardCheck, title: "Book Appointment", sub: "Fill in your details\nand confirm." },
  { icon: Video, title: "Consult Online", sub: "Talk to your doctor via\nvideo or audio call." },
  { icon: Heart, title: "Get Better", sub: "Follow the advice and\nstay healthy." },
];

export default async function ConsultPage() {
  const doctorRows = await getDoctors();
  const doctors = doctorRows.map(toUIDoctor);

  return (
    <>
      {/* hero */}
      <section id="top" className="hero-grad relative overflow-hidden">
        <Leaf className="animate-sway absolute bottom-6 left-[6%] h-32 w-32 text-[#bedcbd]/35" />

        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/doctor-hero.png" alt="" aria-hidden className="h-full w-full object-cover object-[center_top]" />
          <span className="absolute inset-0 bg-gradient-to-r from-[#f3faf1] via-[#f3faf1]/25 to-transparent" />
        </div>

        <div className="mx-auto grid max-w-[1240px] items-center gap-6 px-4 py-10 md:grid-cols-[1.08fr_0.92fr]">
          <div className="relative z-10">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6c8374] uppercase">
                Expert Care <span className="mx-1 text-[#9fc0a2]">•</span> Better Health{" "}
                <span className="mx-1 text-[#9fc0a2]">•</span> Naturally
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="font-display mt-3 text-[32px] leading-[1.1] font-extrabold tracking-[-0.02em] sm:text-[40px]">
                <span className="text-[#0d5c37]">Consult a Doctor</span>
                <br />
                From the Comfort of Home
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-[420px] text-[13.5px] leading-relaxed text-[#5e6f66]">
                Get professional medical advice from qualified doctors and take the first step towards a healthier you.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {HERO_CHIPS.map((c) => (
                  <li
                    key={c.label}
                    className="card-hover flex items-center gap-2 rounded-lg border border-[#dfeedd] bg-white/80 px-3 py-2.5"
                  >
                    <c.icon size={16} className="shrink-0 text-[#0d5c37]" />
                    <span className="text-[11px] leading-tight font-semibold whitespace-pre-line">{c.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-6">
                <BookDoctorButton doctor={doctors[0] ?? null} label="Book an Appointment" />
              </div>
            </Reveal>
          </div>

          <div className="relative md:min-h-[380px]">
            <Reveal variant="zoom" delay={130} className="md:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/doctor-hero.png"
                alt="Consult an NLC Herbal doctor online"
                className="mx-auto h-[280px] w-full max-w-[480px] rounded-2xl object-cover object-[center_top]"
              />
            </Reveal>

            <Reveal delay={360} className="absolute top-3 right-1 z-10 hidden lg:block">
              <p className="script text-right text-[25px] leading-[1.05] font-semibold text-[#0d5c37]">
                Your Health
                <br />
                Our Priority
              </p>
              <svg width="100" height="22" viewBox="0 0 100 22" fill="none" className="ml-auto">
                <path d="M4 15C26 5 58 2 88 8" stroke="#0d5c37" strokeWidth="1.5" strokeLinecap="round" className="draw-line" />
                <path d="M88 8c3-3 7-4 9-3-3 2-5 4-6 8-1-2-2-4-3-5Z" fill="#2e9b4f" />
              </svg>
            </Reveal>

            <Reveal delay={450} className="absolute right-0 bottom-2 z-10 hidden w-[230px] flex-col gap-2 lg:flex">
              {[
                { icon: Video, title: "Online Consultations", sub: "Video / Audio Call" },
                { icon: ShieldCheck, title: "Secure & Private", sub: "Your data is safe with us" },
              ].map((c) => (
                <div
                  key={c.title}
                  className="card-hover flex items-center gap-2.5 rounded-xl bg-white/95 px-4 py-3 shadow-[0_14px_30px_-20px_rgba(7,37,26,0.7)]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eaf4ea] text-[#0d5c37]">
                    <c.icon size={15} />
                  </span>
                  <span className="text-[11.5px] leading-tight font-bold">
                    {c.title}
                    <br />
                    <span className="font-medium text-[#5e6f66]">{c.sub}</span>
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <DoctorDirectory doctors={doctors} />

      {/* how it works */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-[1240px] px-4">
          <Reveal variant="zoom">
            <div className="grid gap-6 rounded-2xl border border-[#e4eee3] bg-[#f6faf5] p-7 lg:grid-cols-[0.75fr_2fr]">
              <div>
                <Eyebrow>Easy Steps</Eyebrow>
                <SectionTitle className="mt-1.5">How It Works?</SectionTitle>
                <p className="mt-2 max-w-[260px] text-[12.5px] leading-relaxed text-[#5e6f66]">
                  Book your consultation in just a few simple steps and get the care you need.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STEPS.map((s, i) => (
                  <Reveal key={s.title} delay={i * 110}>
                    <div className="group relative flex h-full flex-col rounded-xl bg-white p-4 transition hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-28px_rgba(9,66,39,0.6)]">
                      <span className="absolute -top-2.5 left-4 grid h-6 w-6 place-items-center rounded-full bg-[#0d5c37] text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="mt-2 grid h-10 w-10 place-items-center rounded-full bg-[#f1f8f0] text-[#0d5c37] transition-transform duration-300 group-hover:scale-110">
                        <s.icon size={17} />
                      </span>
                      <h3 className="font-display mt-3 text-[13px] font-bold">{s.title}</h3>
                      <p className="mt-1 text-[11.5px] leading-relaxed whitespace-pre-line text-[#5e6f66]">{s.sub}</p>
                      {i < STEPS.length - 1 && (
                        <ArrowRight
                          size={15}
                          className="absolute top-1/2 -right-3 hidden -translate-y-1/2 text-[#9fc0a2] lg:block"
                        />
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* cta */}
      <section className="bg-white pb-14">
        <div className="mx-auto max-w-[1240px] px-4">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-2xl border border-[#dcecd9] bg-gradient-to-r from-[#eaf5e8] via-[#f1f9ef] to-[#e4f1e2]">
              <div className="grid items-center gap-6 p-7 md:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-[10.5px] font-semibold tracking-[0.2em] text-[#6c8374] uppercase">
                    Healthier Today, Brighter Tomorrow
                  </p>
                  <h2 className="font-display mt-2 text-[28px] font-extrabold text-[#0d5c37]">Your Health Matters</h2>
                  <p className="mt-2 max-w-[380px] text-[13px] leading-relaxed text-[#5e6f66]">
                    Get expert medical advice, stay informed and live a healthier, happier life — naturally.
                  </p>
                  <div className="mt-5">
                    <BookDoctorButton doctor={doctors[0] ?? null} label="Book an Appointment" />
                  </div>
                </div>

                <div className="relative hidden md:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/doctor-hero.png"
                    alt="NLC Herbal doctor"
                    className="ml-auto h-[200px] w-[280px] rounded-2xl object-cover object-top"
                  />
                  <p className="script absolute top-4 -right-1 hidden text-right text-[23px] leading-[1.05] font-semibold text-[#0d5c37] lg:block">
                    Good
                    <br />
                    Health
                    <br />
                    Naturally
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
