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

const CATEGORIES = [
  { icon: Leaf, label: "Herbal Supplements" },
  { icon: ShieldCheck, label: "Immunity\n& Vitality" },
  { icon: Droplets, label: "Digestive\nHealth" },
  { icon: Sparkles, label: "Skin & Hair\nCare" },
  { icon: Flower2, label: "Ayurvedic\nHerbs" },
  { icon: Users, label: "Personal Care" },
  { icon: MoreHorizontal, label: "More" },
];

const HERO_FEATURES = [
  { icon: Leaf, label: "100% Natural Ingredients" },
  { icon: ShieldCheck, label: "Safe & Effective Formulas" },
  { icon: Heart, label: "Trusted by Thousands" },
];

export default async function ShopPage() {
  const [productRows, articleRows, testimonialRows, doctorRows] = await Promise.all([
    getProductsWithReviews(),
    getArticles("shop"),
    getTestimonials("shop"),
    getDoctors(),
  ]);

  const products = productRows.map(toUIProduct);
  const popular = products.filter((p) => p.id && p.slug !== "nlc-pure-herbs").slice(0, 5);
  const bestSellers = products.filter((p) => p.slug !== "kamdev-plus").slice(0, 5);
  const articles = articleRows.map(toUIArticle);
  const testimonials = testimonialRows.map(toUITestimonial);
  const doctors = doctorRows.map(toUIDoctor);

  return (
    <>
      {/* hero */}
      <section className="hero-grad relative overflow-hidden">
        <Leaf className="animate-sway absolute -top-4 left-[12%] h-28 w-28 text-[#bedcbd]/35" />
        <div className="mx-auto grid max-w-[1240px] items-center gap-6 px-4 py-10 md:grid-cols-[1fr_1fr] md:py-12">
          <div className="relative z-10">
            <Reveal>
              <p className="text-[11.5px] font-bold tracking-[0.28em] text-[#6c8374] uppercase">
                Natural Care <span className="mx-1 text-[#9fc0a2]">✦</span> Herbal{" "}
                <span className="mx-1 text-[#9fc0a2]">✦</span> Trusted
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="font-display mt-3 text-[34px] leading-[1.1] font-extrabold tracking-[-0.02em] text-[#16241d] sm:text-[44px]">
                Pure Herbal Products
                <br />
                <span className="text-[#0d5c37]">for a Healthier You</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-[430px] text-[13.5px] leading-relaxed text-[#5e6f66]">
                Discover our wide range of natural and herbal products for better health, stronger immunity and a
                balanced life.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <ul className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
                {HERO_FEATURES.map((f) => (
                  <li key={f.label} className="group flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37] transition-transform duration-300 group-hover:scale-110">
                      <f.icon size={15} />
                    </span>
                    <span className="text-[11.5px] font-bold text-[#1f3026]">{f.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <Link href="#popular" className="btn btn-primary mt-7 px-7 py-3 text-[13px]">
                Shop Now <ArrowRight size={14} className="arrow" />
              </Link>
            </Reveal>
          </div>

          <div className="relative" suppressHydrationWarning>
            <Reveal variant="zoom" delay={130}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/shop-hero.png"
                alt="NLC Herbal product range"
                className="animate-floaty mx-auto h-[250px] w-full max-w-[520px] object-contain md:h-[320px]"
                suppressHydrationWarning
              />
            </Reveal>
            <Reveal delay={400} className="absolute top-2 right-0 hidden lg:block">
              <p className="script text-right text-[26px] leading-[1.05] font-semibold text-[#0d5c37]">
                Nature
                <br />
                Heals
                <br />
                Better
              </p>
              <svg width="96" height="22" viewBox="0 0 96 22" fill="none" className="ml-auto">
                <path d="M4 15C24 5 56 2 86 8" stroke="#0d5c37" strokeWidth="1.5" strokeLinecap="round" className="draw-line" />
                <path d="M86 8c3-3 7-4 9-3-3 2-5 4-6 8-1-2-2-4-3-5Z" fill="#2e9b4f" />
              </svg>
            </Reveal>
          </div>
        </div>
      </section>

      {/* shop by category */}
      <section className="bg-white py-11">
        <div className="mx-auto max-w-[1240px] px-4">
          <Reveal className="text-center">
            <SectionTitle>Shop by Category</SectionTitle>
            <p className="mt-1.5 text-[12.5px] text-[#5e6f66]">Find the right product for your health and wellness</p>
          </Reveal>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.label} delay={i * 65}>
                <Link
                  href="#popular"
                  className="card-hover group flex h-full flex-col items-center justify-center gap-2.5 rounded-xl border border-[#e4eee3] bg-[#f6faf5] px-3 py-6 text-center"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0d5c37] shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-[#0d5c37] group-hover:text-white">
                    <c.icon size={18} />
                  </span>
                  <span className="text-[11.5px] leading-tight font-semibold whitespace-pre-line">{c.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* popular */}
      <section id="popular" className="scroll-mt-28 bg-white pb-12">
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Reveal>
              <Eyebrow>Featured Products</Eyebrow>
              <SectionTitle className="mt-1">Popular on Shop</SectionTitle>
              <p className="mt-1.5 text-[12.5px] text-[#5e6f66]">
                Our most loved herbal products, trusted for natural care.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ViewAllLink label="View All Products" href="#best-sellers" />
            </Reveal>
          </div>

          <Reveal className="mt-6" delay={80}>
            <Carousel itemClass="w-[205px]">
              {popular.map((p) => (
                <ShopProductCard key={p.id} product={p} />
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* consult banner */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-[1240px] px-4">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-2xl border border-[#dcecd9] bg-gradient-to-r from-[#e9f5e7] via-[#eef8ec] to-[#e3f1e1]">
              <Leaf className="animate-sway absolute -top-2 right-[6%] h-24 w-24 text-[#9fc9a1]/30" />
              <div className="grid items-center gap-6 p-6 md:grid-cols-[0.8fr_1.3fr_0.9fr] md:p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/doctor-hero.png"
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
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Reveal>
              <Eyebrow>Best Sellers</Eyebrow>
              <SectionTitle className="mt-1">Our Best Selling Products</SectionTitle>
              <p className="mt-1.5 text-[12.5px] text-[#5e6f66]">Highly rated and trusted by our customers.</p>
            </Reveal>
            <Reveal delay={100}>
              <ViewAllLink label="View All" href="#popular" />
            </Reveal>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
        <div className="mx-auto max-w-[1240px] px-4">
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
