import Link from "next/link";
import { ArrowRight, CalendarDays, Heart, Leaf, Search, ShieldCheck, UserRound } from "lucide-react";
import Reveal from "@/components/Reveal";
import Carousel from "@/components/ui/Carousel";
import TopicExplorer from "@/components/wellness/TopicExplorer";
import { Eyebrow, SectionTitle, ViewAllLink } from "@/components/ui/Section";
import { getArticles } from "@/lib/data";
import { toUIArticle } from "@/lib/map";
import { PX } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

const HERO_FEATURES = [
  { icon: Leaf, label: "Natural\nSolutions" },
  { icon: ShieldCheck, label: "Expert\nGuidance" },
  { icon: Heart, label: "Holistic\nWellness" },
  { icon: UserRound, label: "Better\nYou" },
];

const STEPS = [
  { icon: Search, title: "Explore", sub: "Browse our expert\narticles and resources." },
  { icon: Leaf, title: "Learn", sub: "Get simple, practical\nwellness tips." },
  { icon: Heart, title: "Adopt", sub: "Make healthy choices\nin your daily life." },
  { icon: UserRound, title: "Feel Better", sub: "Live a healthier,\nhappier you." },
];

export default async function WellnessPage() {
  const [journeyRows, featuredRows] = await Promise.all([getArticles("journey"), getArticles("featured")]);
  const journey = journeyRows.map(toUIArticle);
  const featured = featuredRows.map(toUIArticle);

  return (
    <>
      {/* hero */}
      <section className="hero-grad relative overflow-hidden">
        <Leaf className="animate-sway absolute top-8 -left-4 h-32 w-32 text-[#bedcbd]/35" />
        <Leaf className="animate-floaty absolute right-4 bottom-6 h-24 w-24 rotate-45 text-[#bedcbd]/30" />
        <div className="mx-auto grid max-w-[1240px] items-center gap-6 px-4 py-10 md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6c8374] uppercase">
                Small Steps <span className="mx-1 text-[#9fc0a2]">•</span> Healthier You
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="font-display mt-3 text-[33px] leading-[1.12] font-extrabold tracking-[-0.02em] sm:text-[42px]">
                Your Wellness
                <br />
                Journey{" "}
                <span className="script align-baseline text-[42px] font-semibold text-[#0d5c37] sm:text-[52px]">
                  Starts Here
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-[420px] text-[13.5px] leading-relaxed text-[#5e6f66]">
                Better habits. Balanced living. Natural care.
                <br />
                Explore expert guidance, helpful resources and simple steps to live a healthier, happier you.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <Link href="#explore" className="btn btn-primary mt-6 px-6 py-3 text-[13px]">
                Start Your Journey <ArrowRight size={14} className="arrow" />
              </Link>
            </Reveal>
            <Reveal delay={300}>
              <ul className="mt-7 flex flex-wrap gap-6">
                {HERO_FEATURES.map((f) => (
                  <li key={f.label} className="group flex items-center gap-2">
                    <f.icon
                      size={18}
                      className="text-[#0d5c37] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                    />
                    <span className="text-[11px] leading-tight font-semibold whitespace-pre-line">{f.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal variant="zoom" delay={130}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PX.meditateGarden}
                alt="Woman meditating outdoors"
                className="mx-auto h-[260px] w-full max-w-[520px] rounded-2xl object-cover md:h-[330px]"
              />
            </Reveal>
            <Reveal delay={400} className="absolute top-2 right-0 hidden lg:block">
              <p className="script text-right text-[25px] leading-[1.08] font-semibold text-[#0d5c37]">
                Healthy
                <br />
                Habits
                <br />
                Happy Life
              </p>
              <svg width="100" height="22" viewBox="0 0 100 22" fill="none" className="ml-auto">
                <path d="M4 15C26 5 58 2 88 8" stroke="#0d5c37" strokeWidth="1.5" strokeLinecap="round" className="draw-line" />
                <path d="M88 8c3-3 7-4 9-3-3 2-5 4-6 8-1-2-2-4-3-5Z" fill="#2e9b4f" />
              </svg>
            </Reveal>
          </div>
        </div>
      </section>

      <div id="explore" className="scroll-mt-24" />
      <TopicExplorer articles={journey} />

      {/* simple steps */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-[1240px] px-4">
          <Reveal variant="zoom">
            <div className="grid gap-6 rounded-2xl border border-[#e4eee3] bg-[#f3f9f2] p-7 lg:grid-cols-[0.85fr_2fr]">
              <div>
                <Eyebrow>Your Wellness Steps</Eyebrow>
                <SectionTitle className="mt-1.5">A Healthier You in Simple Steps</SectionTitle>
                <p className="mt-2 max-w-[290px] text-[12.5px] leading-relaxed text-[#5e6f66]">
                  Follow these easy steps to begin your wellness journey and take control of your health.
                </p>
                <Link href="#featured" className="btn btn-primary mt-5 px-5 py-2.5 text-[12.5px]">
                  Start Now <ArrowRight size={13} className="arrow" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {STEPS.map((s, i) => (
                  <Reveal key={s.title} delay={i * 110}>
                    <div className="group relative flex h-full flex-col items-center text-center">
                      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white text-[#0d5c37] shadow-[0_14px_28px_-20px_rgba(9,66,39,0.8)] transition-transform duration-300 group-hover:-translate-y-1.5">
                        <s.icon size={20} />
                        <span className="absolute -right-1 -bottom-1 grid h-5 w-5 place-items-center rounded-full bg-[#0d5c37] text-[9px] font-bold text-white">
                          {i + 1}
                        </span>
                      </span>
                      <h3 className="font-display mt-3 text-[13px] font-bold">{s.title}</h3>
                      <p className="mt-1 text-[11px] leading-relaxed whitespace-pre-line text-[#5e6f66]">{s.sub}</p>
                      {i < STEPS.length - 1 && (
                        <ArrowRight
                          size={15}
                          className="absolute top-6 -right-3 hidden text-[#9fc0a2] lg:block"
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

      {/* featured articles */}
      <section id="featured" className="scroll-mt-24 bg-white pb-14">
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Reveal>
              <Eyebrow>Featured Articles</Eyebrow>
              <SectionTitle className="mt-1">
                Latest from <span className="text-[#0d5c37]">Our Wellness</span> Journal
              </SectionTitle>
            </Reveal>
            <Reveal delay={100}>
              <ViewAllLink label="View All Articles" href="#explore" />
            </Reveal>
          </div>

          <Reveal className="mt-6" delay={80}>
            <Carousel itemClass="w-[260px]">
              {featured.map((a) => (
                <article
                  key={a.id}
                  className="card-hover img-zoom group flex h-full flex-col overflow-hidden rounded-xl border border-[#e8efe8] bg-white"
                >
                  <div className="h-[115px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-3.5">
                    <span className="text-[10.5px] font-semibold text-[#0d5c37]">{a.category}</span>
                    <h3 className="font-display mt-1 text-[13px] leading-snug font-bold">{a.title}</h3>
                    <span className="mt-auto flex items-center gap-1.5 pt-3 text-[11px] text-[#5e6f66]">
                      <CalendarDays size={12} /> {a.publishedOn}
                    </span>
                  </div>
                </article>
              ))}
            </Carousel>
          </Reveal>

          <div className="mt-5 flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-5 bg-[#0d5c37]" : "w-1.5 bg-[#c6d8c6]"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
