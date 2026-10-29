import Link from "next/link";
import { ArrowRight, Leaf, Stethoscope, UserRound } from "lucide-react";
import HomeHero from "@/components/home/HomeHero";
import AppointmentWidget from "@/components/home/AppointmentWidget";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/sections/Testimonials";
import TrustStrip from "@/components/sections/TrustStrip";
import { HomeProductCard } from "@/components/cards/ProductCard";
import { Eyebrow, LeafDivider, SectionTitle, ViewAllPill } from "@/components/ui/Section";
import { getArticles, getCategories, getDoctors, getProductsWithReviews, getTestimonials } from "@/lib/data";
import { toUIArticle, toUICategory, toUIDoctor, toUIProduct, toUITestimonial } from "@/lib/map";
import { nextDays } from "@/lib/dates";
import { PX } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

const QUICK_ACTIONS = [
  { icon: Stethoscope, title: "Online Consultation", sub: "Get expert advice from qualified doctors", href: "/consult-a-doctor" },
  { icon: UserRound, title: "Find a Doctor", sub: "Book appointments with experienced doctors", href: "/consult-a-doctor" },
  { icon: Leaf, title: "Herbal Products", sub: "Pure, natural and effective formulations", href: "/shop" },
  { icon: Leaf, title: "Wellness Guidance", sub: "Lifestyle tips for a healthier you", href: "/wellness-journal" },
];

export default async function HomePage() {
  const [productRows, categoryRows, articleRows, testimonialRows, doctorRows] = await Promise.all([
    getProductsWithReviews(),
    getCategories(),
    getArticles("home"),
    getTestimonials("home"),
    getDoctors(),
  ]);

  const products = productRows.map(toUIProduct);
  const trusted = products.filter((p) => ["swarn-shilajit", "kamdev-power"].includes(p.slug));
  const categories = categoryRows.map(toUICategory);
  const articles = articleRows.map(toUIArticle);
  const testimonials = testimonialRows.map(toUITestimonial);
  const doctors = doctorRows.map(toUIDoctor);
  const days = nextDays(5);
  const slots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  return (
    <>
      <HomeHero />

      {/* quick actions */}
      <section className="bg-white py-8">
        <div className="mx-auto grid max-w-[1240px] gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((a, i) => (
            <Reveal key={a.title} delay={i * 90}>
              <Link
                href={a.href}
                className="card-hover group flex h-full flex-col rounded-xl border border-[#e4eee3] bg-[#f6faf5] p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d6e7d5] bg-white text-[#0d5c37] transition-transform duration-300 group-hover:scale-110">
                  <a.icon size={19} />
                </span>
                <h3 className="font-display mt-3.5 text-[14px] font-bold">{a.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-[#5e6f66]">{a.sub}</p>
                <span className="mt-5 grid h-7 w-7 place-items-center rounded-full bg-[#0d5c37] text-white transition-transform duration-300 group-hover:translate-x-1.5">
                  <ArrowRight size={13} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* best sellers */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="relative flex items-center justify-center">
            <Reveal className="text-center">
              <Eyebrow>Our Best Sellers</Eyebrow>
              <SectionTitle className="mt-1.5">Trusted Herbal Products</SectionTitle>
              <LeafDivider />
            </Reveal>
            <div className="absolute right-0 hidden sm:block">
              <ViewAllPill label="View All Products" href="/shop" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trusted.map((p, i) => (
              <Reveal key={p.id} delay={i * 110}>
                <HomeProductCard product={p} />
              </Reveal>
            ))}

            <Reveal delay={220}>
              <div className="card-hover relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border border-[#e4eee3] bg-gradient-to-br from-[#eaf5e8] to-[#dceedb] p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PX.mortarWhite}
                  alt="Herbal mortar and pestle"
                  className="animate-floaty pointer-events-none absolute -right-6 -bottom-6 h-44 w-44 rounded-2xl object-cover opacity-90"
                />
                <div className="relative z-10 max-w-[200px]">
                  <p className="text-[10.5px] font-semibold tracking-[0.18em] text-[#58705f] uppercase">
                    Natural Solutions
                  </p>
                  <h3 className="font-display mt-2 text-[22px] leading-[1.15] font-extrabold">
                    Herbal Care
                    <br />
                    for a Healthier
                    <br />
                    Tomorrow
                  </h3>
                  <p className="mt-3 text-[12px] leading-relaxed text-[#50635a]">
                    Traditional wisdom.
                    <br />
                    Modern well-being.
                  </p>
                  <Link href="/shop" className="btn btn-primary mt-5 px-4 py-2.5 text-[12px]">
                    Explore All Products
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* book an appointment */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-[1240px] px-4">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-2xl border border-[#e2efe1] bg-gradient-to-r from-[#eef7ec] via-[#f2f9f0] to-[#e6f2e4]">
              <div className="grid items-center gap-6 p-7 md:grid-cols-[1.05fr_0.95fr] md:p-9">
                <div>
                  <h2 className="font-display text-[25px] font-extrabold">Book an Appointment</h2>
                  <p className="mt-2 max-w-[330px] text-[13px] leading-relaxed text-[#5e6f66]">
                    Consult with our expert doctor for personalized guidance on your health and wellness.
                  </p>
                  <div className="mt-5">
                    <AppointmentWidget days={days} slots={slots} doctor={doctors[0] ?? null} />
                  </div>
                </div>

                <div className="relative hidden md:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/doctor-hero.png"
                    alt="Expert doctor"
                    className="ml-auto h-[260px] w-[300px] rounded-2xl object-cover object-top"
                  />
                  <div className="absolute top-6 -right-1 hidden lg:block">
                    <p className="script text-[24px] leading-[1.05] font-semibold text-[#0d5c37]">
                      Your
                      <br />
                      Health
                      <br />
                      Matters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* categories */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Reveal>
              <Eyebrow>Explore by Category</Eyebrow>
              <SectionTitle className="mt-1.5">Wellness for Every Need</SectionTitle>
              <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#0d5c37]" />
            </Reveal>
            <Reveal delay={100}>
              <ViewAllPill label="View All Categories" href="/shop" />
            </Reveal>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={i * 85}>
                <Link
                  href="/shop"
                  className="card-hover img-zoom group flex h-full flex-col overflow-hidden rounded-xl border border-[#e8efe8] bg-white"
                >
                  <div className="h-[105px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt={c.name.replace("\n", " ")} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-2 px-3.5 py-3">
                    <span className="text-[12.5px] leading-tight font-semibold whitespace-pre-line">{c.name}</span>
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-[#0d5c37] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* blog */}
      <section className="bg-white pb-14">
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Reveal>
              <Eyebrow>Wellness Journal</Eyebrow>
              <SectionTitle className="mt-1.5">Latest from Our Blog</SectionTitle>
              <span className="mt-2 block h-[3px] w-12 rounded-full bg-[#0d5c37]" />
            </Reveal>
            <Reveal delay={100}>
              <ViewAllPill label="View All Articles" href="/wellness-journal" />
            </Reveal>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.id} delay={i * 110}>
                <Link
                  href="/wellness-journal"
                  className="card-hover img-zoom group flex h-full flex-col overflow-hidden rounded-xl border border-[#e8efe8] bg-white"
                >
                  <div className="h-[130px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-4">
                    <h3 className="font-display text-[14px] leading-snug font-bold">{a.title}</h3>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-[11px] text-[#5e6f66]">
                        {a.category} <span className="mx-1">•</span> {a.readTime}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-[#0d5c37] transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} subtitle="Real people. Real experiences. Better health, naturally." />
      <TrustStrip variant="home" />
    </>
  );
}
