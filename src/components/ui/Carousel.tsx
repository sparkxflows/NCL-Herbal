"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
  children,
  itemClass = "w-[220px]",
  gap = "gap-4",
}: {
  children: ReactNode;
  itemClass?: string;
  gap?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(260, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Previous"
        className="absolute top-1/2 -left-3 z-20 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-[#e3ece4] bg-white text-[#2c3b33] shadow-md transition hover:-translate-y-[55%] hover:border-[#0d5c37] hover:bg-[#0d5c37] hover:text-white md:grid"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => scrollBy(1)}
        aria-label="Next"
        className="absolute top-1/2 -right-3 z-20 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-[#e3ece4] bg-white text-[#2c3b33] shadow-md transition hover:-translate-y-[55%] hover:border-[#0d5c37] hover:bg-[#0d5c37] hover:text-white md:grid"
      >
        <ChevronRight size={16} />
      </button>

      <div ref={ref} className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto pb-1 ${gap}`}>
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} className={`shrink-0 snap-start ${itemClass}`}>
                {child}
              </div>
            ))
          : children}
      </div>
    </div>
  );
}
