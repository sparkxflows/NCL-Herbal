import Link from "next/link";
import { ArrowRight, HeartPulse, Leaf, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const FEATURES = [
  { icon: Leaf, title: "Pure & Natural Herbs" },
  { icon: ShieldCheck, title: "Safe & Trusted Products" },
  { icon: HeartPulse, title: "Expert Doctor Support" },
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#eef7ec] via-[#f5faf3] to-[#ebf6ea]">
      <Leaf className="animate-sway pointer-events-none absolute top-10 -left-6 h-40 w-40 text-[#bedcbd]/35" />
      <Leaf className="animate-floaty pointer-events-none absolute right-[45%] bottom-4 h-20 w-20 rotate-45 text-[#bedcbd]/30" />

      {/* full-bleed hero photo (desktop) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] md:block" suppressHydrationWarning>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/doctor-hero.png"
          alt="NLC Herbal Expert Ayurvedic Doctor"
          aria-hidden
          className="h-full w-full object-cover object-[center_top]"
          suppressHydrationWarning
        />
        <span className="absolute inset-0 bg-gradient-to-r from-[#eef7ec] via-[#eef7ec]/25 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1240px] items-center gap-6 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-14">
        <div className="relative z-10">
          <Reveal>
            <p className="text-[12px] font-bold tracking-[0.28em] text-[#5e6f66] uppercase">
              Ayurveda <span className="mx-1 text-[#a5c2a8]">|</span> Herbal{" "}
              <span className="mx-1 text-[#a5c2a8]">|</span> Wellness
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-display mt-3 text-[38px] leading-[1.08] font-extrabold tracking-[-0.02em] text-[#16241d] sm:text-[48px]">
              Natural Wellness.
              <br />
              <span className="text-[#0d5c37]">Expert Care.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-4 max-w-[440px] text-[14px] leading-relaxed text-[#50635a]">
              Discover the power of nature with authentic herbal products and get expert guidance from our trusted
              doctors — all in one place.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link href="/shop" className="btn btn-primary px-6 py-3 text-[13.5px]">
                Shop Herbal Products <ArrowRight size={15} />
              </Link>
              <Link href="/consult-a-doctor" className="btn btn-outline px-6 py-3 text-[13.5px]">
                Book a Consultation
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-9 flex flex-wrap items-center gap-6 sm:gap-8">
              {FEATURES.map((f) => (
                <li key={f.title} className="group flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37] transition-transform duration-300 group-hover:scale-110">
                    <f.icon size={17} />
                  </span>
                  <span className="text-[12px] font-bold text-[#1f3026]">
                    {f.title}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative md:min-h-[420px]" suppressHydrationWarning>
          <Reveal variant="zoom" delay={120} className="md:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/doctor-hero.png"
              alt="NLC Herbal Expert Doctor"
              className="mx-auto h-[320px] w-full max-w-[480px] rounded-3xl object-cover object-top shadow-lg"
              suppressHydrationWarning
            />
          </Reveal>

          <Reveal delay={380} className="absolute top-4 right-2 z-10 hidden lg:block">
            <p className="script text-right text-[30px] leading-[1.05] font-semibold text-[#0d5c37]">
              Good Health
              <br />
              Naturally
            </p>
            <svg width="120" height="28" viewBox="0 0 110 26" fill="none" className="ml-auto">
              <path
                d="M4 18C26 6 62 2 96 10"
                stroke="#0d5c37"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="draw-line"
              />
              <path d="M96 10c4-3 8-4 11-3-3 2-6 5-7 9-2-2-3-4-4-6Z" fill="#2e9b4f" />
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
