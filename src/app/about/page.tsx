import Link from "next/link";
import { ArrowRight, Award, Heart, Leaf, ShieldCheck, Sprout, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import TrustStrip from "@/components/sections/TrustStrip";
import { Eyebrow, SectionTitle } from "@/components/ui/Section";
import { PX } from "@/lib/seed-data";

export const metadata = { title: "About Us — NLC Herbal" };

const VALUES = [
  { icon: Leaf, title: "Purity First", sub: "Every batch is made from carefully sourced, single-origin herbs." },
  { icon: ShieldCheck, title: "Safety Assured", sub: "GMP certified manufacturing and third-party lab testing." },
  { icon: Users, title: "Expert Guidance", sub: "Qualified doctors available for personalised consultation." },
  { icon: Heart, title: "Honest Care", sub: "No shortcuts, no fillers — just wellness you can trust." },
];

const STATS = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "120+", label: "Herbal Formulations" },
  { value: "25+", label: "Expert Doctors" },
  { value: "4.8★", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <>
      <section className="hero-grad relative overflow-hidden">
        <Leaf className="animate-sway absolute top-6 -left-4 h-32 w-32 text-[#bedcbd]/35" />
        <div className="mx-auto grid max-w-[1240px] items-center gap-6 px-4 py-12 md:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>About NLC Herbal</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="font-display mt-2 text-[34px] leading-[1.1] font-extrabold sm:text-[42px]">
                Nature&apos;s Wisdom,
                <br />
                <span className="text-[#0d5c37]">Expert Care.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-[440px] text-[13.5px] leading-relaxed text-[#5e6f66]">
                NLC Herbal brings together traditional ayurvedic knowledge and modern clinical guidance. We formulate
                clean, effective herbal products and pair them with doctors who actually listen — so natural wellness
                becomes simple and reliable for every family.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/shop" className="btn btn-primary px-6 py-3 text-[13px]">
                  Shop Herbal Products <ArrowRight size={14} className="arrow" />
                </Link>
                <Link href="/consult-a-doctor" className="btn btn-outline px-6 py-3 text-[13px]">
                  Consult a Doctor
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal variant="zoom" delay={130}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PX.mortarWhite}
              alt="Ayurvedic herbs"
              className="h-[280px] w-full rounded-2xl object-cover shadow-[0_30px_60px_-40px_rgba(7,37,26,0.7)]"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1240px] px-4">
          <Reveal className="text-center">
            <Eyebrow>What We Stand For</Eyebrow>
            <SectionTitle className="mt-1.5">Our Values</SectionTitle>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 95}>
                <div className="card-hover group h-full rounded-xl border border-[#e4eee3] bg-[#f6faf5] p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0d5c37] transition-transform duration-300 group-hover:scale-110">
                    <v.icon size={19} />
                  </span>
                  <h3 className="font-display mt-3.5 text-[14px] font-bold">{v.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-[#5e6f66]">{v.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mint leaf-bg py-12">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-5 px-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="rounded-xl bg-white/80 py-7 text-center transition hover:-translate-y-1.5">
                <p className="font-display text-[26px] font-extrabold text-[#0d5c37]">{s.value}</p>
                <p className="mt-1 text-[12px] font-medium text-[#5e6f66]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-[1240px] items-center gap-7 px-4 md:grid-cols-2">
          <Reveal variant="left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PX.herbsTray} alt="Herbal ingredients" className="h-[260px] w-full rounded-2xl object-cover" />
          </Reveal>
          <Reveal variant="right" delay={100}>
            <Eyebrow>Our Story</Eyebrow>
            <SectionTitle className="mt-1.5">From the Himalayas to Your Home</SectionTitle>
            <p className="mt-3 text-[13px] leading-relaxed text-[#5e6f66]">
              What began as a small family apothecary has grown into a trusted herbal brand serving more than 50,000
              families. Our herbs are sourced directly from certified growers, processed using classical ayurvedic
              methods, and tested for heavy metals and purity before they ever reach you.
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                { icon: Sprout, label: "Directly sourced, traceable herbs" },
                { icon: Award, label: "GMP certified, ISO audited facility" },
                { icon: ShieldCheck, label: "Independent lab reports for every batch" },
              ].map((l) => (
                <li key={l.label} className="flex items-center gap-2.5 text-[12.5px] font-medium">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#eaf4ea] text-[#0d5c37]">
                    <l.icon size={14} />
                  </span>
                  {l.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <TrustStrip variant="home" />
    </>
  );
}
