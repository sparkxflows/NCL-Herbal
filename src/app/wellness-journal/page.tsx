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
      {/* Wellness Hero - Recreated 1:1 Fresh from Reference Banner */}
      <section id="top" className="relative w-full overflow-hidden border-b border-[#dbe8da] bg-gradient-to-r from-[#eef6ec] via-[#f7faf5] to-[#e8f1e6] min-h-[460px] sm:min-h-[480px] lg:min-h-[500px] xl:min-h-[520px] flex items-center">
        {/* Realistic green leaves framing on the far left edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-[60px] sm:w-[90px] lg:w-[110px] select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wellness-leaves-left.png"
            alt=""
            className="h-full w-full object-cover object-left opacity-90"
          />
        </div>

        {/* Right Side Visual - Meditating woman extending seamlessly to the bottom edge with comfortable head space */}
        <div className="absolute right-0 bottom-0 top-0 w-full lg:w-[56%] xl:w-[54%] pointer-events-none flex items-end justify-end overflow-hidden z-10 pt-4 sm:pt-6 lg:pt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wellness-hero-photo.png"
            alt="Woman in meditation lotus pose in lush green nature"
            className="h-[330px] sm:h-[420px] lg:h-[95%] xl:h-[96%] max-w-full lg:max-w-none w-auto object-contain object-bottom select-none translate-y-1"
          />
        </div>

        {/* Realistic green leaves framing on the far right edge */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-[60px] sm:w-[90px] lg:w-[110px] select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wellness-leaves-right.png"
            alt=""
            className="h-full w-full object-cover object-right opacity-90"
          />
        </div>

        {/* Handwritten Decorative Text on Upper-Right */}
        <div className="absolute right-6 sm:right-12 lg:right-20 xl:right-24 top-6 sm:top-10 lg:top-12 z-20 pointer-events-none select-none text-right">
          <p className="script text-[#166a3d] text-[32px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.05] rotate-[-5deg] drop-shadow-2xs">
            Healthy
            <br />
            Habits
            <br />
            Happy Life{" "}
            <span className="inline-block text-[#2e9b4f] text-[24px] rotate-[15deg]">🍃</span>
          </p>
        </div>

        {/* Left Side Content */}
        <div className="relative z-20 w-full lg:w-[48%] xl:w-[46%] pl-6 sm:pl-12 lg:pl-16 xl:pl-24 pr-4 py-10 sm:py-14 lg:py-16">
          <Reveal>
            <p className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.24em] text-[#0d5c37] uppercase">
              SMALL STEPS <span className="mx-1 text-[#46825c]">•</span> HEALTHIER YOU
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-display mt-3 text-[32px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-black leading-[1.12] tracking-tight text-[#0a3d24]">
              Your Wellness
              <br />
              Journey{" "}
              <span className="script text-[44px] sm:text-[54px] lg:text-[62px] xl:text-[68px] font-bold text-[#166a3d] align-baseline">
                Starts Here
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-3.5 max-w-[460px] text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#4d6054]">
              Better habits. Balanced life. Natural care.
              <br className="hidden sm:inline" />
              Explore expert guidance, helpful resources and simple steps to live a healthier, happier you.
            </p>
          </Reveal>

          {/* Dark Forest-Green CTA Button */}
          <Reveal delay={230}>
            <div className="mt-6 sm:mt-7">
              <Link
                href="#explore"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#0a472a] hover:bg-[#07351d] text-white px-7 sm:px-8 py-3.5 text-[14px] font-bold shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Start Your Journey</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          {/* Four Feature Items in a Horizontal Row */}
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-7 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[#0d5c37] shrink-0">
                  <Leaf size={19} className="stroke-[1.75]" />
                </span>
                <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight text-[#1a2d22]">
                  Natural
                  <br />
                  Solutions
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#0d5c37] shrink-0">
                  <ShieldCheck size={19} className="stroke-[1.75]" />
                </span>
                <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight text-[#1a2d22]">
                  Expert
                  <br />
                  Guidance
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#0d5c37] shrink-0">
                  <Heart size={19} className="stroke-[1.75]" />
                </span>
                <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight text-[#1a2d22]">
                  Holistic
                  <br />
                  Wellness
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#0d5c37] shrink-0">
                  <UserRound size={19} className="stroke-[1.75]" />
                </span>
                <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight text-[#1a2d22]">
                  Better
                  <br />
                  You
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div id="explore" className="scroll-mt-24" />
      <TopicExplorer articles={journey} />

      {/* simple steps */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-[1380px] px-4">
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
        <div className="mx-auto max-w-[1380px] px-4">
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
