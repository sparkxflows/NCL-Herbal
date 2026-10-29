"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Stars from "@/components/ui/Stars";
import Reveal from "@/components/Reveal";
import type { UITestimonial } from "@/lib/types";

export default function Testimonials({
  items,
  subtitle,
  variant = "home",
}: {
  items: UITestimonial[];
  subtitle: string;
  variant?: "home" | "shop";
}) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / 3));

  useEffect(() => {
    if (pages <= 1) return;
    const t = setInterval(() => setPage((p) => (p + 1) % pages), 6000);
    return () => clearInterval(t);
  }, [pages]);

  const visible = items.length <= 3 ? items : items.slice(page * 3, page * 3 + 3);

  return (
    <section className="section-mint leaf-bg relative overflow-hidden py-14">
      <div className="mx-auto max-w-[1240px] px-4">
        <Reveal className="text-center">
          <h2 className="font-display text-[24px] font-extrabold sm:text-[27px]">What Our Customers Say</h2>
          <p className="mt-1.5 text-[13px] text-[#5e6f66]">{subtitle}</p>
        </Reveal>

        <div className="relative mt-8">
          {items.length > 3 && (
            <>
              <button
                onClick={() => setPage((p) => (p - 1 + pages) % pages)}
                aria-label="Previous testimonials"
                className="absolute top-1/2 -left-2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-[#2c3b33] shadow-md transition hover:bg-[#0d5c37] hover:text-white md:grid"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => (p + 1) % pages)}
                aria-label="Next testimonials"
                className="absolute top-1/2 -right-2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-[#2c3b33] shadow-md transition hover:bg-[#0d5c37] hover:text-white md:grid"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            {visible.map((t, i) => (
              <Reveal key={t.id} delay={i * 110}>
                <figure className="card-hover relative h-full overflow-hidden rounded-xl border border-white/70 bg-white/85 p-5 pl-6">
                  <span className="absolute top-0 left-0 h-full w-[3px] bg-[#0d5c37]/70" />
                  <Quote size={18} className="fill-[#0d5c37] text-[#0d5c37]" />
                  <blockquote className="mt-2.5 text-[13px] leading-relaxed text-[#4a594f]">{t.body}</blockquote>
                  {variant === "shop" && t.name ? (
                    <figcaption className="mt-4 flex items-center gap-2.5">
                      {t.avatar && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full object-cover" />
                      )}
                      <span>
                        <span className="block text-[12.5px] font-bold">{t.name}</span>
                        <Stars value={t.rating} size={11} />
                      </span>
                    </figcaption>
                  ) : (
                    <figcaption className="mt-3.5">
                      <Stars value={t.rating} size={13} />
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {Array.from({ length: Math.max(pages, 3) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i % pages)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-5 bg-[#0d5c37]" : "w-1.5 bg-[#b9ccb9]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
