"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Eyebrow, SectionTitle } from "@/components/ui/Section";
import type { UIArticle } from "@/lib/types";

const TOPICS = [
  { key: "all", label: "All Topics" },
  { key: "immunity-energy", label: "Immunity & Energy" },
  { key: "nutrition-diet", label: "Nutrition & Diet" },
  { key: "mental-wellness", label: "Mental Wellness" },
  { key: "fitness-lifestyle", label: "Fitness & Lifestyle" },
  { key: "natural-remedies", label: "Natural Remedies" },
];

const WHY = [
  { icon: BadgeCheck, label: "Expert-backed content" },
  { icon: CheckCircle2, label: "Easy-to-follow guidance" },
  { icon: CheckCircle2, label: "Natural & safe solutions" },
  { icon: ShieldCheck, label: "Practical lifestyle tips" },
  { icon: CheckCircle2, label: "For a healthier tomorrow" },
];

export default function TopicExplorer({ articles }: { articles: UIArticle[] }) {
  const [topic, setTopic] = useState("all");
  const list = useMemo(
    () => (topic === "all" ? articles : articles.filter((a) => a.topicKey === topic)),
    [articles, topic],
  );

  return (
    <section className="bg-white py-11">
      <div className="mx-auto max-w-[1380px] px-4">
        <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_0.85fr]">
          <Reveal>
            <Eyebrow>Wellness Journey</Eyebrow>
            <SectionTitle className="mt-1.5">Explore Your Path to Better Health</SectionTitle>
            <p className="mt-2 max-w-[470px] text-[13px] leading-relaxed text-[#5e6f66]">
              Discover expert advice, natural remedies and practical tips to improve your physical, mental and emotional
              well-being.
            </p>
          </Reveal>

          <Reveal delay={130} variant="right">
            <div className="flex items-center gap-3 rounded-xl border border-[#e2efe1] bg-gradient-to-br from-[#eef7ec] to-[#e4f1e2] p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#0d5c37]">
                <Leaf size={19} />
              </span>
              <span>
                <span className="font-display block text-[14px] font-bold">Your Wellness Journey Matters</span>
                <span className="mt-0.5 block text-[12px] text-[#5e6f66]">Small changes. Big results.</span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* topic chips */}
        <Reveal className="mt-6" delay={80}>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {TOPICS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTopic(t.key)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition hover:-translate-y-0.5 ${
                  topic === t.key
                    ? "border-[#0d5c37] bg-[#0d5c37] text-white shadow-[0_12px_22px_-14px_rgba(13,92,55,0.95)]"
                    : "border-[#dde8dc] bg-white text-[#2c3b33] hover:border-[#0d5c37] hover:text-[#0d5c37]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-[2.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <article className="card-hover img-zoom group flex h-full flex-col overflow-hidden rounded-xl border border-[#e8efe8] bg-white">
                  <div className="h-[112px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-3.5">
                    <span className="text-[10.5px] font-semibold text-[#0d5c37]">{a.category}</span>
                    <h3 className="font-display mt-1 text-[13.5px] leading-snug font-bold">{a.title}</h3>
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#5e6f66]">{a.excerpt}</p>
                    <Link
                      href="#featured"
                      className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[11.5px] font-semibold text-[#0d5c37]"
                    >
                      Read More
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
            {list.length === 0 && (
              <p className="col-span-full rounded-xl border border-dashed border-[#d6e4d6] bg-[#f9fcf8] py-10 text-center text-sm text-[#5e6f66]">
                No articles in this topic yet. Try another one.
              </p>
            )}
          </div>

          <Reveal delay={140} variant="right">
            <aside className="relative h-full overflow-hidden rounded-xl border border-[#e2efe1] bg-gradient-to-b from-[#eef7ec] to-[#e2efe0] p-5">
              <Sparkles className="absolute top-3 right-3 h-16 w-16 text-white/50" />
              <h3 className="font-display relative text-[18px] leading-tight font-extrabold">
                Why Follow
                <br />
                Our Wellness Journey?
              </h3>
              <ul className="relative mt-4 flex flex-col gap-3">
                {WHY.map((w) => (
                  <li key={w.label} className="group flex items-center gap-2.5 text-[12px] font-medium">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[#0d5c37] transition-transform duration-300 group-hover:scale-110">
                      <w.icon size={13} />
                    </span>
                    {w.label}
                  </li>
                ))}
              </ul>
              <Link href="#featured" className="btn btn-primary relative mt-5 w-full py-2.5 text-[12px]">
                Explore All Articles <ArrowRight size={13} className="arrow" />
              </Link>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
