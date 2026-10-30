import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  ClipboardCheck,
  Heart,
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
      {/* Consult a Doctor Hero - Recreated Element by Element with Real UI Components */}
      <section id="top" className="relative w-full overflow-hidden border-b border-[#dbe8da] bg-gradient-to-r from-[#eef6ec] via-[#f7faf5] to-[#e4efe2] min-h-[460px] sm:min-h-[480px] lg:min-h-[500px] xl:min-h-[520px] flex items-center">
        {/* Subtle decorative green leaves framing on far left */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-[60px] sm:w-[85px] lg:w-[110px] select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wellness-leaves-left.png"
            alt=""
            className="h-full w-full object-cover object-left opacity-90"
          />
        </div>

        {/* Center-Right Doctor Visual (Dr. N.K. Sharma standing on bottom edge with generous headroom) */}
        <div className="absolute right-[8%] sm:right-[14%] lg:right-[18%] xl:right-[20%] bottom-0 top-0 w-[280px] sm:w-[360px] lg:w-[440px] xl:w-[480px] pointer-events-none flex items-end justify-center overflow-hidden z-10 pt-4 sm:pt-6 lg:pt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/doctor-sharp-portrait.png"
            alt="Dr. N.K. Sharma - Senior Ayurvedic Specialist"
            className="h-[320px] sm:h-[400px] lg:h-[95%] xl:h-[96%] w-auto max-w-full object-contain object-bottom select-none translate-y-1"
          />
        </div>

        {/* Subtle decorative green leaves framing on far right */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-[60px] sm:w-[85px] lg:w-[110px] select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wellness-leaves-right.png"
            alt=""
            className="h-full w-full object-cover object-right opacity-90"
          />
        </div>

        {/* Handwritten Decorative Script Doodle on Upper-Right */}
        <div className="absolute right-6 sm:right-10 lg:right-14 xl:right-18 top-6 sm:top-9 lg:top-10 z-20 pointer-events-none select-none text-right">
          <p className="script text-[#166a3d] text-[30px] sm:text-[36px] lg:text-[40px] font-bold leading-[1.05] rotate-[-5deg] drop-shadow-2xs">
            Your Health
            <br />
            Our Priority{" "}
            <span className="inline-block text-[#2e9b4f] text-[22px] rotate-[15deg]">🍃</span>
          </p>
        </div>

        {/* Floating Trust Information Panel on Lower-Right */}
        <div className="absolute right-6 sm:right-10 lg:right-14 xl:right-18 bottom-6 sm:bottom-8 z-20 hidden sm:block">
          <div className="flex flex-col gap-2.5 rounded-2xl border border-[#cfe2ce] bg-white/95 p-3.5 sm:p-4 shadow-sm backdrop-blur-xs w-[220px] sm:w-[240px]">
            {/* Online Consultations */}
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf4ea] text-[#0d5c37]">
                <Video size={17} />
              </span>
              <div>
                <h4 className="text-[12px] font-extrabold text-[#16241d] leading-tight">Online Consultations</h4>
                <p className="text-[10px] font-semibold text-[#5e6f66] leading-tight mt-0.5">Video / Audio Call</p>
              </div>
            </div>

            <div className="h-px w-full bg-[#e8f0e7]" />

            {/* Secure & Private */}
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf4ea] text-[#0d5c37]">
                <ShieldCheck size={17} />
              </span>
              <div>
                <h4 className="text-[12px] font-extrabold text-[#16241d] leading-tight">Secure &amp; Private</h4>
                <p className="text-[10px] font-semibold text-[#5e6f66] leading-tight mt-0.5">Your data is safe with us</p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side Content */}
        <div className="relative z-20 w-full lg:w-[50%] xl:w-[48%] pl-6 sm:pl-12 lg:pl-16 xl:pl-24 pr-4 py-10 sm:py-14 lg:py-16">
          <Reveal>
            <p className="text-[11px] sm:text-[11.5px] font-extrabold tracking-[0.22em] text-[#0d5c37] uppercase">
              EXPERT CARE <span className="mx-1 text-[#46825c]">•</span> BETTER HEALTH <span className="mx-1 text-[#46825c]">•</span> NATURALLY
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-display mt-3 text-[30px] sm:text-[38px] lg:text-[44px] xl:text-[48px] font-black leading-[1.14] tracking-tight text-[#0a3d24]">
              Consult a Doctor
              <br />
              <span className="text-[#16241d]">From the Comfort of Home</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-3.5 max-w-[460px] text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#4d6054]">
              Get professional medical advice from qualified doctors and take the first step towards a healthier you.
            </p>
          </Reveal>

          {/* 4 Feature Badges in ONE SINGLE HORIZONTAL ROW */}
          <Reveal delay={230}>
            <div className="mt-7 flex flex-wrap lg:flex-nowrap items-center gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-[#cfe2ce] bg-white/95 px-3 py-2 shadow-2xs backdrop-blur-xs">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37]">
                  <UserRound size={14} />
                </span>
                <span className="text-[11px] font-bold leading-tight text-[#1a2d22] whitespace-nowrap">
                  Qualified
                  <br />
                  Doctors
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-[#cfe2ce] bg-white/95 px-3 py-2 shadow-2xs backdrop-blur-xs">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37]">
                  <CalendarCheck size={14} />
                </span>
                <span className="text-[11px] font-bold leading-tight text-[#1a2d22] whitespace-nowrap">
                  Convenient
                  <br />
                  Online Booking
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-[#cfe2ce] bg-white/95 px-3 py-2 shadow-2xs backdrop-blur-xs">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37]">
                  <ShieldCheck size={14} />
                </span>
                <span className="text-[11px] font-bold leading-tight text-[#1a2d22] whitespace-nowrap">
                  Safe &amp; Secure
                  <br />
                  Consultation
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-[#cfe2ce] bg-white/95 px-3 py-2 shadow-2xs backdrop-blur-xs">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37]">
                  <CalendarDays size={14} />
                </span>
                <span className="text-[11px] font-bold leading-tight text-[#1a2d22] whitespace-nowrap">
                  Personalized
                  <br />
                  Health Guidance
                </span>
              </div>
            </div>
          </Reveal>

          {/* Action CTA Button */}
          <Reveal delay={300}>
            <div className="mt-7">
              <BookDoctorButton
                doctor={doctors[0] ?? null}
                label="Book an Appointment"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#0a472a] hover:bg-[#07351d] text-white px-7 sm:px-8 py-3.5 text-[14px] font-bold shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              />
            </div>
          </Reveal>

          {/* Mobile view of trust badges */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:hidden">
            <div className="flex items-center gap-2 rounded-xl border border-[#cfe2ce] bg-white/95 p-2.5 shadow-2xs">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#eaf4ea] text-[#0d5c37]">
                <Video size={14} />
              </span>
              <div>
                <h4 className="text-[11px] font-bold text-[#16241d] leading-tight">Online Consultations</h4>
                <p className="text-[9.5px] text-[#5e6f66]">Video / Audio Call</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#cfe2ce] bg-white/95 p-2.5 shadow-2xs">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#eaf4ea] text-[#0d5c37]">
                <ShieldCheck size={14} />
              </span>
              <div>
                <h4 className="text-[11px] font-bold text-[#16241d] leading-tight">Secure &amp; Private</h4>
                <p className="text-[9.5px] text-[#5e6f66]">100% Confidential</p>
              </div>
            </div>
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
