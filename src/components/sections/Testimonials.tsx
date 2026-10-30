"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, ExternalLink, Star, ThumbsUp } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { UITestimonial } from "@/lib/types";

const GOOGLE_MAPS_URL = "https://share.google/n4PI9OwMnQfR1luHd";
const JUSTDIAL_URL = "https://www.justdial.com/Hissar/New-Life-Clinic-Pushpa-Complex/9999P1662-1662-220516200250-A6F1_BZDET";

// Exactly 4 curated patient reviews: 2 from Google Maps, 2 from Justdial
const REAL_PATIENT_REVIEWS = [
  {
    id: "gopi-chand",
    name: "P. Gopi Chand",
    platform: "Google",
    location: "Google Reviewer • Hisar",
    rating: 5,
    tag: "Google Verified",
    initialLikes: 48,
    text: "I recently visited New Life Clinic at Pushpa Complex and was really impressed with their quick service. I didn't have to wait long to see Dr. N.K. Sharma. The staff were friendly and helpful, making the whole experience smooth and easy. Highly recommend for fast and efficient medical help!",
    verified: true,
  },
  {
    id: "sunil-malik",
    name: "Sunil Malik",
    platform: "Google",
    location: "Local Guide • Pushpa Complex",
    rating: 5,
    tag: "Google Review",
    initialLikes: 63,
    text: "Dr. N.K. Sharma's herbal treatment for kidney stone worked miraculously without any operation. Within 3 weeks the severe pain stopped and follow-up scan was completely clear. Genuinely trusted ayurvedic clinic in Hisar.",
    verified: true,
  },
  {
    id: "meenakshi-sharma",
    name: "Meenakshi Sharma",
    platform: "Justdial",
    location: "Justdial Reviewer • Haryana",
    rating: 5,
    tag: "Justdial 5.0★",
    initialLikes: 41,
    text: "Treated for uterus fibroid completely through herbal medicines without any surgical procedure. Doctor guided thoroughly on diet and lifestyle. Very respectful and reassuring atmosphere at New Life Clinic Hisar.",
    verified: true,
  },
  {
    id: "anil-kumar",
    name: "Anil Kumar",
    platform: "Justdial",
    location: "Verified Patient • Rohtak",
    rating: 5,
    tag: "Justdial 5.0★",
    initialLikes: 57,
    text: "Suffered from acute gall bladder stone and was advised surgery elsewhere. Dr. N.K. Sharma treated me with authentic herbal formulations and I am completely healed now without any operation. 380+ 5-star reviews are totally true!",
    verified: true,
  },
];

export default function Testimonials({
  subtitle = "Real people. Real results. Natural care.",
}: {
  items?: UITestimonial[];
  subtitle?: string;
  variant?: "home" | "shop";
}) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  // Load saved likes from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nlc_patient_review_likes");
      if (stored) {
        setLiked(JSON.parse(stored) as Record<string, boolean>);
      }
    } catch {
      // safe fallback if storage unavailable
    }
  }, []);

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const next = { ...prev, [id]: !isCurrentlyLiked };

      try {
        localStorage.setItem("nlc_patient_review_likes", JSON.stringify(next));
      } catch {
        // safe fallback
      }

      return next;
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#072418] py-20 lg:py-24 text-white border-y border-white/5">
      {/* Background ambient radial glow like da-pizza-hub */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-[380px] w-[650px] -translate-y-1/2 bg-[#8fd3a4]/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[450px] bg-[#25D366]/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        {/* Header Section (Clean, without filter pills) */}
        <Reveal>
          <div className="mb-12 text-center md:text-left">
            <p className="mb-2 text-xs font-bold tracking-[0.3em] text-[#8fd3a4] uppercase">
              VERIFIED PATIENT FEEDBACK • HISAR &amp; HARYANA
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              What Patients Say About Us
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60">
              {subtitle}
            </p>
          </div>
        </Reveal>

        {/* 4 Review Cards (Single Row 4-Columns: 2 Google + 2 Justdial) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REAL_PATIENT_REVIEWS.map((rev) => {
            const isLiked = !!liked[rev.id];
            // Exactly +1 when liked, exact base count when unliked
            const currentCount = rev.initialLikes + (isLiked ? 1 : 0);

            return (
              <div
                key={rev.id}
                className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#8fd3a4]/50 hover:bg-white/[0.1]"
              >
                <div>
                  {/* Top: Stars + Platform pill */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex text-[#f5a623]">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} size={14} className="fill-[#f5a623]" />
                      ))}
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                        rev.platform === "Google"
                          ? "border-[#4285F4]/30 bg-[#4285F4]/10 text-[#8ab4f8]"
                          : "border-[#ff7a00]/30 bg-[#ff7a00]/10 text-[#ffaa5c]"
                      }`}
                    >
                      {rev.tag}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="mb-6 text-[13.5px] leading-relaxed text-white/80 font-normal">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                {/* Bottom: Reviewer details + Verified checkmark + Interactive Like/Helpful Button */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-white">{rev.name}</span>
                      {rev.verified && <BadgeCheck size={15} className="text-[#8fd3a4]" />}
                    </div>
                    <span className="mt-0.5 block text-xs text-white/40">{rev.location}</span>
                  </div>

                  {/* Interactive Like/Helpful Button */}
                  <button
                    type="button"
                    onClick={() => toggleLike(rev.id)}
                    aria-label={`Like review by ${rev.name}`}
                    title={isLiked ? "You found this helpful (Click to unlike)" : "Mark as helpful"}
                    className={`group/like flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all duration-300 active:scale-90 cursor-pointer ${
                      isLiked
                        ? "border-[#8fd3a4] bg-[#8fd3a4]/20 text-[#8fd3a4] shadow-[0_0_12px_rgba(143,211,164,0.35)] scale-105"
                        : "border-white/10 bg-white/5 text-white/50 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <ThumbsUp
                      size={13}
                      className={`transition-all duration-300 group-hover/like:scale-115 ${
                        isLiked ? "fill-[#8fd3a4] text-[#8fd3a4] scale-110" : ""
                      }`}
                    />
                    <span className="text-[11.5px] tabular-nums font-bold">
                      {currentCount}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rich Interactive "All Reviews" Cards (Google Maps & Justdial) */}
        <Reveal delay={0.15} className="mt-14">
          <div className="mb-4 text-center">
            <p className="text-xs font-semibold text-white/60">
              Want to see all patient feedback? Click below to check all reviews on Google Maps &amp; Justdial:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            {/* View All Reviews on Google Maps */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full max-w-[450px] items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-4.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#8fd3a4] hover:bg-white/[0.12] hover:shadow-[0_12px_35px_rgba(143,211,164,0.25)] active:scale-95"
            >
              <div className="flex items-center gap-3.5">
                {/* Google Vector Icon */}
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[#f5a623]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={13} className="fill-[#f5a623]" />
                    ))}
                    <span className="ml-1 text-xs font-black text-white">5.0 ★</span>
                  </div>
                  <h4 className="mt-0.5 text-sm font-bold text-white transition-colors group-hover:text-[#8fd3a4]">
                    View All Google Maps Reviews
                  </h4>
                  <p className="text-[11px] text-[#8fd3a4] font-medium">Click to read all verified patient reviews ↗</p>
                </div>
              </div>

              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white/70 transition-all duration-300 group-hover:bg-[#8fd3a4] group-hover:text-[#072418]">
                <ExternalLink size={15} />
              </div>
            </a>

            {/* View All Reviews on Justdial */}
            <a
              href={JUSTDIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full max-w-[450px] items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-4.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#ff7a00] hover:bg-white/[0.12] hover:shadow-[0_12px_35px_rgba(255,122,0,0.25)] active:scale-95"
            >
              <div className="flex items-center gap-3.5">
                {/* JD Icon */}
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#ff7a00] font-black text-base text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  JD
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[#f5a623]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={13} className="fill-[#f5a623]" />
                    ))}
                    <span className="ml-1 text-xs font-black text-white">5.0 ★</span>
                  </div>
                  <h4 className="mt-0.5 text-sm font-bold text-white transition-colors group-hover:text-[#ffaa5c]">
                    View All 380+ Justdial Reviews
                  </h4>
                  <p className="text-[11px] text-[#ffaa5c] font-medium">Click to read all verified patient reviews ↗</p>
                </div>
              </div>

              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white/70 transition-all duration-300 group-hover:bg-[#ff7a00] group-hover:text-white">
                <ExternalLink size={15} />
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
