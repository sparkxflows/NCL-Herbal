import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Heart, Leaf, MapPin, Phone, ShieldCheck, Sprout, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import TrustStrip from "@/components/sections/TrustStrip";
import { Eyebrow, SectionTitle } from "@/components/ui/Section";
import { PX } from "@/lib/seed-data";

export const metadata = { title: "About Us — Dr. N.K. Sharma | New Life Clinic (NLC Herbal)" };

const VALUES = [
  { icon: Leaf, title: "100% Herbal Purity", sub: "Formulations prepared using ancient Ayurvedic shastras and single-origin raw herbs." },
  { icon: ShieldCheck, title: "Non-Surgical Care", sub: "Holistic treatment for stones, fibroids, liver & chronic disorders without surgical procedures." },
  { icon: Users, title: "Direct Doctor Care", sub: "Personalised diagnosis and continuous health monitoring led by Dr. N.K. Sharma." },
  { icon: Heart, title: "Genuine Patient Trust", sub: "Serving thousands of families across Haryana and India with honest, proven care." },
];

const STATS = [
  { value: "5.0★", label: "380+ Justdial Reviews" },
  { value: "Est. 2015", label: "10+ Years in Hisar" },
  { value: "25,000+", label: "Patients Treated" },
  { value: "₹499", label: "Consultation Fee" },
];

const SPECIALTIES = [
  "Gall Bladder Stone & Kidney Stone",
  "Liver Health & Fatty Liver",
  "Cancer Complementary Herbal Support",
  "Uterus Fibroid (Bina Operation)",
  "Infertility & Reproductive Wellness",
  "Hair Fall & Scalp Rejuvenation",
  "Anxiety, Stress & Depression",
  "Hernia & Prostate Care",
];

export default function AboutPage() {
  return (
    <>
      <section className="hero-grad relative overflow-hidden">
        <Leaf className="animate-sway absolute top-6 -left-4 h-32 w-32 text-[#bedcbd]/35" />
        <div className="mx-auto grid max-w-[1380px] items-center gap-6 px-4 py-12 md:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>About New Life Clinic</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="font-display mt-2 text-[34px] leading-[1.1] font-extrabold sm:text-[42px]">
                Dr. N.K. Sharma
                <br />
                <span className="text-[#0d5c37]">New Life Clinic (Hisar)</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-[480px] text-[14px] leading-relaxed text-[#5e6f66]">
                Providing comprehensive non-surgical Ayurvedic treatments for all types of chronic physical and mental health conditions.
                Established in 2015 at ALG-21, Pushpa Complex, Hisar, New Life Clinic holds a 5.0-star rating on Justdial
                based on 380+ verified patient reviews. Led by Dr. N.K. Sharma, we combine classical Ayurvedic Shastras
                with modern diagnostics to deliver proven, non-surgical relief.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/consult-a-doctor" className="btn btn-primary px-6 py-3 text-[13px]">
                  Book Doctor Consultation (₹499) <ArrowRight size={14} className="arrow" />
                </Link>
                <Link href="/shop" className="btn btn-outline px-6 py-3 text-[13px]">
                  Shop Herbal Formulations
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal variant="zoom" delay={130}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-tradition.jpg"
              alt="Ayurvedic herbs and traditional mortar"
              className="h-[300px] w-full rounded-2xl object-cover shadow-[0_20px_40px_-20px_rgba(7,37,26,0.5)] border border-[#cfe2ce]"
            />
          </Reveal>
        </div>
      </section>

      {/* Specialties Grid from Visiting Card */}
      <section className="bg-white py-12 border-b border-[#e5efe4]">
        <div className="mx-auto max-w-[1380px] px-4">
          <Reveal className="text-center">
            <Eyebrow>Clinical Expertise</Eyebrow>
            <SectionTitle className="mt-1.5">Specialist Treatments Without Surgery</SectionTitle>
            <p className="mx-auto mt-2 max-w-[520px] text-[13.5px] text-[#5e6f66]">
              Targeted natural herbal solutions designed to dissolve stones, balance organs, and restore complete vitality.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALTIES.map((spec, i) => (
              <Reveal key={spec} delay={i * 50}>
                <div className="flex items-center gap-3 rounded-xl border border-[#dcebdc] bg-[#f8fbf7] p-4 transition hover:-translate-y-0.5 hover:border-[#0d5c37]/40 hover:bg-white shadow-2xs">
                  <CheckCircle2 size={18} className="shrink-0 text-[#0d5c37]" />
                  <span className="text-[13px] font-semibold text-[#1a2d22]">{spec}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1380px] px-4">
          <Reveal className="text-center">
            <Eyebrow>Our Guiding Pillars</Eyebrow>
            <SectionTitle className="mt-1.5">What We Stand For</SectionTitle>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 95}>
                <div className="card-hover group h-full rounded-xl border border-[#e4eee3] bg-[#f6faf5] p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0d5c37] transition-transform duration-300 group-hover:scale-110 shadow-2xs">
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
        <div className="mx-auto grid max-w-[1380px] grid-cols-2 gap-5 px-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="rounded-xl bg-white/80 py-7 text-center transition hover:-translate-y-1.5 shadow-2xs">
                <p className="font-display text-[26px] font-extrabold text-[#0d5c37]">{s.value}</p>
                <p className="mt-1 text-[12px] font-medium text-[#5e6f66]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-[1380px] items-center gap-7 px-4 md:grid-cols-2">
          <Reveal variant="left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PX.herbsTray} alt="Authentic Ayurvedic raw ingredients" className="h-[280px] w-full rounded-2xl object-cover border border-[#cfe2ce]" />
          </Reveal>
          <Reveal variant="right" delay={100}>
            <Eyebrow>Clinic & Manufacturing Quality</Eyebrow>
            <SectionTitle className="mt-1.5">Manufactured with Vaidic Bhishjalyaya Standards</SectionTitle>
            <p className="mt-3 text-[13px] leading-relaxed text-[#5e6f66]">
              Every formulation, including our flagship Original Swarn Shilajit and Kamdev Power, is manufactured under
              strict FSSAI & Ayush protocols. We source pure Shilajit extract, Ashwagandha, Safed Musli, and Gokshura
              directly from Himalayan foothills without chemical preservatives.
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                { icon: Sprout, label: "100% Natural raw herbs with no chemical fillers" },
                { icon: Award, label: "FSSAI & GMP certified herbal manufacturing" },
                { icon: ShieldCheck, label: "Doctor supervised dosage & personalised dietary advice" },
                { icon: MapPin, label: "Direct consultation at ALG-21, Pushpa Complex, Hisar (Hry.)" },
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
