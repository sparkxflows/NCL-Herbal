import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Droplets,
  Flower2,
  Heart,
  Leaf,
  MoreHorizontal,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Carousel from "@/components/ui/Carousel";
import Testimonials from "@/components/sections/Testimonials";
import TrustStrip from "@/components/sections/TrustStrip";
import { ShopProductCard } from "@/components/cards/ProductCard";
import BookDoctorButton from "@/components/shop/BookDoctorButton";
import { Eyebrow, SectionTitle, ViewAllLink } from "@/components/ui/Section";
import { getArticles, getDoctors, getProductsWithReviews, getTestimonials } from "@/lib/data";
import { toUIArticle, toUIDoctor, toUIProduct, toUITestimonial } from "@/lib/map";

export const dynamic = "force-dynamic";


export default async function ShopPage() {
  const [productRows, articleRows, testimonialRows, doctorRows] = await Promise.all([
    getProductsWithReviews(),
    getArticles("shop"),
    getTestimonials("shop"),
    getDoctors(),
  ]);

  const products = productRows.map(toUIProduct);
  const popular = products.filter((p) => p.id && p.slug !== "nlc-pure-herbs").slice(0, 5);
  const bestSellers = products.filter((p) => p.id && p.slug !== "nlc-pure-herbs").slice(0, 5);
  const articles = articleRows.map(toUIArticle);
  const testimonials = testimonialRows.map(toUITestimonial);
  const doctors = doctorRows.map(toUIDoctor);

  return (
    <>
      {/* hero banner - designed to exactly match the reference banner */}
      <section className="relative w-full overflow-hidden border-b border-[#dbe8da] bg-gradient-to-r from-[#eef6ec] via-[#f5faf3] to-[#e6f1e4]">
        <div className="mx-auto grid max-w-[1380px] items-center gap-8 px-4 py-10 sm:py-12 md:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-14">
          {/* Left Column: Authentic Typography & Content */}
          <div className="relative z-10 flex flex-col justify-center">
            <Reveal>
              <p className="text-[12px] font-extrabold tracking-[0.22em] text-[#0d5c37] uppercase">
                NATURAL CARE <span className="mx-1 text-[#46825c]">•</span> HERBAL{" "}
                <span className="mx-1 text-[#46825c]">•</span> TRUSTED
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="font-display mt-3.5 text-[34px] leading-[1.12] font-black tracking-tight text-[#0a3d24] sm:text-[44px] lg:text-[50px]">
                Pure Herbal Products
                <br />
                <span className="text-[#13613a]">for a Healthier You</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-4 max-w-[480px] text-[14px] leading-relaxed text-[#485c51] sm:text-[15px]">
                Discover our wide range of natural and herbal products for better health, stronger immunity and a
                balanced life.
              </p>
            </Reveal>

            {/* 3 Feature Capsules (Rounded-full pill style as per reference) */}
            <Reveal delay={230}>
              <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2 rounded-full border border-[#d2e5d1] bg-white/95 px-4 py-2 shadow-2xs backdrop-blur-xs">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37]">
                    <Leaf size={13} />
                  </span>
                  <span className="text-[12px] font-bold text-[#1a2d22]">100% Natural Ingredients</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#d2e5d1] bg-white/95 px-4 py-2 shadow-2xs backdrop-blur-xs">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37]">
                    <ShieldCheck size={13} />
                  </span>
                  <span className="text-[12px] font-bold text-[#1a2d22]">Safe &amp; Effective Formulas</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#d2e5d1] bg-white/95 px-4 py-2 shadow-2xs backdrop-blur-xs">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37]">
                    <Heart size={13} />
                  </span>
                  <span className="text-[12px] font-bold text-[#1a2d22]">Trusted by Thousands</span>
                </div>
              </div>
            </Reveal>

            {/* Interactive Shop Now Button (Dark green rounded-full pill) */}
            <Reveal delay={300}>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="#popular"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#0a472a] px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#07351d] hover:shadow-lg active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Exact Reference Graphic Scene (Kamdev tubs, Nature Heals Better, Mortar & Plants) */}
          <div className="relative flex flex-col items-center justify-center lg:items-end">
            <Reveal delay={140} className="relative w-full max-w-[620px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/shop-hero-exact.png"
                alt="NLC Herbal Kamdev Power & Formulations - Nature Heals Better"
                className="h-auto w-full object-contain object-right-bottom transition-transform duration-700 ease-out hover:scale-[1.01]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* popular on shop - second section immediately following hero */}
      <section id="popular" className="scroll-mt-28 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-[1380px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Reveal>
              <Eyebrow>Featured Products</Eyebrow>
              <SectionTitle className="mt-1">Popular on Shop</SectionTitle>
              <p className="mt-1.5 text-[12.5px] text-[#5e6f66]">
                Our most loved herbal products, trusted for natural care.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ViewAllLink label="View All Products" href="/products" />
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {popular.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ShopProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* consult banner */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-[1380px] px-4">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-2xl border border-[#dcecd9] bg-gradient-to-r from-[#e9f5e7] via-[#eef8ec] to-[#e3f1e1]">
              <Leaf className="animate-sway absolute -top-2 right-[6%] h-24 w-24 text-[#9fc9a1]/30" />
              <div className="grid items-center gap-6 p-6 md:grid-cols-[0.8fr_1.3fr_0.9fr] md:p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/doctor-consulting.jpg"
                  alt="Consult a doctor"
                  className="hidden h-[230px] w-full rounded-2xl object-cover object-top md:block"
                />

                <div>
                  <Eyebrow>Online Consultation</Eyebrow>
                  <h2 className="font-display mt-1.5 text-[27px] font-extrabold">Consult a Doctor</h2>
                  <p className="mt-2 max-w-[360px] text-[13px] leading-relaxed text-[#5e6f66]">
                    Get expert advice from our qualified doctors and take the first step towards better health.
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {["Qualified & Experienced Doctors", "Convenient Online Booking", "Personalized Health Guidance"].map(
                      (t) => (
                        <li key={t} className="flex items-center gap-2 text-[12.5px] font-medium">
                          <CheckCircle2 size={15} className="text-[#0d5c37]" />
                          {t}
                        </li>
                      ),
                    )}
                  </ul>
                  <div className="mt-5">
                    <BookDoctorButton doctor={doctors[0] ?? null} label="Book Appointment" />
                  </div>
                </div>

                <div className="rounded-xl border border-white bg-white/80 p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] font-bold">
                      <Users size={16} className="text-[#0d5c37]" /> Easy Steps
                    </span>
                    <CalendarDays size={16} className="text-[#0d5c37]" />
                  </div>
                  <ol className="mt-4 flex flex-col gap-3">
                    {["Choose Doctor", "Select Time Slot", "Book & Consult"].map((s, i) => (
                      <li key={s} className="flex items-center gap-2.5 text-[12.5px]">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0d5c37] text-[10px] font-bold text-white">
                          {i + 1}
                        </span>
                        {i + 1}. {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* best sellers */}
      <section id="best-sellers" className="scroll-mt-28 bg-white pb-12">
        <div className="mx-auto max-w-[1380px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Reveal>
              <Eyebrow>Best Sellers</Eyebrow>
              <SectionTitle className="mt-1">Our Best Selling Products</SectionTitle>
              <p className="mt-1.5 text-[12.5px] text-[#5e6f66]">Highly rated and trusted by our customers.</p>
            </Reveal>
            <Reveal delay={100}>
              <ViewAllLink label="View All Products" href="/products" />
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {bestSellers.map((p, i) => (
              <Reveal key={p.id} delay={i * 85}>
                <ShopProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* wellness journal */}
      <section className="bg-white pb-14">
        <div className="mx-auto max-w-[1380px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Reveal>
              <SectionTitle>Wellness Journal</SectionTitle>
              <p className="mt-1.5 text-[12.5px] text-[#5e6f66]">
                Health tips, natural living and expert advice for a better you.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ViewAllLink label="View All Articles" href="/wellness-journal" />
            </Reveal>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((a, i) => (
              <Reveal key={a.id} delay={i * 90}>
                <Link
                  href="/wellness-journal"
                  className="card-hover img-zoom group flex h-full flex-col overflow-hidden rounded-xl border border-[#e8efe8] bg-white"
                >
                  <div className="relative h-[120px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 rounded-md bg-[#0d5c37] px-2 py-1 text-[9px] font-bold tracking-wide text-white uppercase">
                      {a.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-3.5">
                    <h3 className="font-display text-[13.5px] leading-snug font-bold">{a.title}</h3>
                    <span className="mt-auto flex items-center gap-1.5 pt-3 text-[11px] text-[#5e6f66]">
                      <Clock size={12} /> {a.readTime}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} subtitle="Real people. Real results. Natural care." variant="shop" />
      <TrustStrip variant="shop" />
    </>
  );
}
