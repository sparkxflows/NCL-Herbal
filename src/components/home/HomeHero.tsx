import Link from "next/link";
import { Heart, Leaf, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const FEATURES = [
  { icon: Leaf, title: "Pure & Natural", sub: "Herbs" },
  { icon: ShieldCheck, title: "Safe & Trusted", sub: "Products" },
  { icon: Heart, title: "Expert Doctor", sub: "Support" },
];

export default function HomeHero() {
  return (
    <section className="hero-grad relative overflow-hidden">
      <Leaf className="animate-sway absolute top-10 -left-6 h-40 w-40 text-[#bedcbd]/35" />
      <Leaf className="animate-floaty absolute right-[42%] bottom-4 h-20 w-20 rotate-45 text-[#bedcbd]/30" />

      {/* full-bleed hero photo (desktop) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[47%] md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/doctor-hero.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[55%_18%]"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-[#f3faf1] via-[#f3faf1]/25 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1240px] items-center gap-6 px-4 py-10 md:grid-cols-[1.02fr_0.98fr] md:py-0">
        <div className="relative z-10 md:py-14">
          <Reveal>
            <p className="text-[11.5px] font-semibold tracking-[0.3em] text-[#6c8374] uppercase">
              Ayurveda <span className="mx-1 text-[#b4c8b6]">|</span> Herbal{" "}
              <span className="mx-1 text-[#b4c8b6]">|</span> Wellness
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-display mt-3 text-[38px] leading-[1.08] font-extrabold tracking-[-0.02em] sm:text-[46px]">
              Natural Wellness.
              <br />
              <span className="text-[#0d5c37]">Expert Care.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-4 max-w-[430px] text-[14px] leading-relaxed text-[#5e6f66]">
              Discover the power of nature with authentic herbal products and get expert guidance from our trusted
              doctors — all in one place.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/shop" className="btn btn-primary px-6 py-3 text-[13px]">
                Shop Herbal Products
              </Link>
              <Link href="/consult-a-doctor" className="btn btn-outline px-6 py-3 text-[13px]">
                Book a Consultation
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-8 flex flex-wrap gap-7">
              {FEATURES.map((f) => (
                <li key={f.title} className="group flex items-center gap-2">
                  <f.icon
                    size={19}
                    className="text-[#0d5c37] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                  />
                  <span className="text-[11.5px] leading-tight font-semibold">
                    {f.title}
                    <br />
                    <span className="font-medium text-[#5e6f66]">{f.sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative md:min-h-[410px]">
          <Reveal variant="zoom" delay={120} className="md:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/doctor-hero.png"
              alt="NLC Herbal expert doctor"
              className="mx-auto h-[300px] w-full max-w-[520px] rounded-2xl object-cover object-[55%_15%]"
            />
          </Reveal>

          <Reveal delay={420} className="absolute top-10 right-2 z-10 hidden lg:block">
            <p className="script text-right text-[27px] leading-[1.05] font-semibold text-[#0d5c37]">
              Good
              <br />
              Health
              <br />
              Naturally
            </p>
            <svg width="110" height="26" viewBox="0 0 110 26" fill="none" className="ml-auto">
              <path
                d="M4 18C26 6 62 2 96 10"
                stroke="#0d5c37"
                strokeWidth="1.6"
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
