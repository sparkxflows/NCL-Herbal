"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(260, el.clientWidth * 0.8), behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <div className="relative group/carousel">
      {/* Left button: hidden when at scrollLeft === 0 so it never overlaps the first card */}
      <button
        onClick={() => scrollBy(-1)}
        disabled={!canScrollLeft}
        aria-label="Previous"
        className={`absolute top-1/2 -left-3.5 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[#d6e4d6] bg-white/95 text-[#2c3b33] shadow-md backdrop-blur-xs transition-all duration-300 md:grid ${
          canScrollLeft
            ? "opacity-100 hover:scale-110 hover:border-[#0d5c37] hover:bg-[#0d5c37] hover:text-white"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronLeft size={17} />
      </button>

      {/* Right button: hidden when at the end */}
      <button
        onClick={() => scrollBy(1)}
        disabled={!canScrollRight}
        aria-label="Next"
        className={`absolute top-1/2 -right-3.5 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[#d6e4d6] bg-white/95 text-[#2c3b33] shadow-md backdrop-blur-xs transition-all duration-300 md:grid ${
          canScrollRight
            ? "opacity-100 hover:scale-110 hover:border-[#0d5c37] hover:bg-[#0d5c37] hover:text-white"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronRight size={17} />
      </button>

      {/* Items track: items-stretch guarantees every card stretches to 100% equal height */}
      <div
        ref={ref}
        onScroll={checkScroll}
        className={`no-scrollbar flex items-stretch snap-x snap-mandatory overflow-x-auto py-2.5 px-0.5 ${gap}`}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} className={`shrink-0 snap-start flex flex-col ${itemClass}`}>
                {child}
              </div>
            ))
          : children}
      </div>
    </div>
  );
}
