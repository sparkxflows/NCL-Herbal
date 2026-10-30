"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Pause,
  Play,
} from "lucide-react";

type Slide = {
  id: number;
  pageName: string;
  tag: string;
  titlePrimary: string;
  titleAccent: string;
  description: string;
  btnText: string;
  btnHref: string;
  image: string;
  imageAlt: string;
  theme: {
    bg: string;
    tagColor: string;
    accentColor: string;
  };
};

const SLIDES: Slide[] = [
  {
    id: 1,
    pageName: "Home",
    tag: "Welcome to NLC Herbal",
    titlePrimary: "Natural Wellness.",
    titleAccent: "Expert Ayurvedic Care.",
    description:
      "Bringing together authentic, lab-tested herbal formulations and trusted doctor consultations for complete family health and natural living.",
    btnText: "Explore NLC Herbal",
    btnHref: "/shop",
    image: "/images/doctor-hero.png",
    imageAlt: "NLC Herbal Expert Ayurvedic Doctor",
    theme: {
      bg: "bg-gradient-to-br from-[#eef7ec] via-[#f7faf5] to-[#e4f1e3]",
      tagColor: "text-[#0d5c37] bg-[#0d5c37]/10",
      accentColor: "text-[#0d5c37]",
    },
  },
  {
    id: 2,
    pageName: "Shop",
    tag: "Herbal Store & Products",
    titlePrimary: "Pure Herbal Formulations for",
    titleAccent: "Strength & Daily Vitality",
    description:
      "Explore our authentic Ayurvedic products including Original Swarn Shilajit (200g) and Kamdev Power. 100% natural herbs with zero chemicals and no side effects.",
    btnText: "Visit Herbal Store",
    btnHref: "/shop",
    image: "/images/swarn-shilajit.jpg",
    imageAlt: "Original Swarn Shilajit Herbal Product",
    theme: {
      bg: "bg-gradient-to-br from-[#f2f8f0] via-[#fbfcfa] to-[#e8f3e6]",
      tagColor: "text-[#0d5c37] bg-[#0d5c37]/10",
      accentColor: "text-[#0d5c37]",
    },
  },
  {
    id: 3,
    pageName: "Doctor",
    tag: "Expert Doctor Consultation",
    titlePrimary: "Consult Dr. N.K. Sharma",
    titleAccent: "New Life Clinic (Hisar)",
    description:
      "Specialist in complete non-surgical holistic treatment for Kidney & Gall Bladder Stone, Liver, Uterus Fibroid, Infertility, Anxiety, Hair Fall and Chronic Ailments.",
    btnText: "Consult a Doctor",
    btnHref: "/consult-a-doctor",
    image: "/images/doctor-consulting.jpg",
    imageAlt: "Qualified Ayurvedic Doctor Consultation",
    theme: {
      bg: "bg-gradient-to-br from-[#eef6f3] via-[#f7fbf9] to-[#e2efe9]",
      tagColor: "text-[#0b6343] bg-[#0b6343]/10",
      accentColor: "text-[#0b6343]",
    },
  },
  {
    id: 4,
    pageName: "About",
    tag: "Our Story & Standards",
    titlePrimary: "Rooted in Ancient Tradition.",
    titleAccent: "Backed by Quality & Care.",
    description:
      "Learn about our heritage and manufacturing standards by Vaidic Bhishjalyaya. Strict Shodhana purification, FSSAI compliance, and honest natural wellness.",
    btnText: "Learn About Us",
    btnHref: "/about",
    image: "/images/about-tradition.jpg",
    imageAlt: "Authentic Vaidic Ayurvedic Heritage and Traditions",
    theme: {
      bg: "bg-gradient-to-br from-[#f4f7ee] via-[#fafbf5] to-[#ebf1e4]",
      tagColor: "text-[#47661b] bg-[#47661b]/10",
      accentColor: "text-[#47661b]",
    },
  },
  {
    id: 5,
    pageName: "Wellness Journal",
    tag: "Health & Lifestyle Wisdom",
    titlePrimary: "Holistic Wellness Guides &",
    titleAccent: "Daily Ayurvedic Wisdom",
    description:
      "Explore doctor-backed articles on seasonal diet routines (Ritucharya), dosha balancing principles, stress relief, and practical daily habits for lifelong vitality.",
    btnText: "Read Wellness Journal",
    btnHref: "/wellness-journal",
    image: "https://images.pexels.com/photos/13865894/pexels-photo-13865894.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "Ayurvedic Meditation and Wellness Lifestyle",
    theme: {
      bg: "bg-gradient-to-br from-[#eef7ec] via-[#f9fbf8] to-[#e5f1e3]",
      tagColor: "text-[#0d5c37] bg-[#0d5c37]/10",
      accentColor: "text-[#0d5c37]",
    },
  },
  {
    id: 6,
    pageName: "Contact",
    tag: "Customer Care & Clinic",
    titlePrimary: "Have Questions or Need Help?",
    titleAccent: "We Are Always Here for You",
    description:
      "Need advice on a product, an ongoing order, or consultation scheduling? Call our helpline at +91 93067 37990 or send us an email at info@nlcherbal.in.",
    btnText: "Contact Us Now",
    btnHref: "/contact",
    image: "/images/kamdev-power.jpg",
    imageAlt: "NLC Herbal Customer Support and Helpline",
    theme: {
      bg: "bg-gradient-to-br from-[#f2f8f0] via-[#fbfcfa] to-[#e8f3e6]",
      tagColor: "text-[#0d5c37] bg-[#0d5c37]/10",
      accentColor: "text-[#0d5c37]",
    },
  },
];

export default function HomeHero() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = SLIDES.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // Mouse & Touch Drag / Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) nextSlide();
    else if (diff < -45) prevSlide();
    setTouchStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || touchStartX === null) return;
    const diff = touchStartX - e.clientX;
    if (diff > 45) nextSlide();
    else if (diff < -45) prevSlide();
    setIsDragging(false);
    setTouchStartX(null);
  };

  const handleMouseLeaveSection = () => {
    setIsHovered(false);
    setIsDragging(false);
    setTouchStartX(null);
  };

  useEffect(() => {
    if (!isAutoPlay || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, isHovered, total]);

  const slide = SLIDES[current];

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeaveSection}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="group/hero relative overflow-hidden bg-white select-none cursor-grab active:cursor-grabbing"
    >
      {/* Background container with dynamic smooth theme */}
      <div className={`relative transition-colors duration-500 ${slide.theme.bg}`}>
        <Leaf className="animate-sway pointer-events-none absolute top-8 -left-6 h-36 w-36 text-[#bedcbd]/35" />
        <Leaf className="animate-floaty pointer-events-none absolute right-[10%] bottom-6 h-24 w-24 rotate-45 text-[#bedcbd]/30" />

        {/* Large Navigation Button: Left Edge */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border border-[#cfe2ce] bg-white/95 text-[#16241d] shadow-lg backdrop-blur-xs transition hover:scale-110 hover:bg-[#0d5c37] hover:text-white active:scale-95"
        >
          <ChevronLeft size={26} />
        </button>

        {/* Large Navigation Button: Right Edge */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border border-[#cfe2ce] bg-white/95 text-[#16241d] shadow-lg backdrop-blur-xs transition hover:scale-110 hover:bg-[#0d5c37] hover:text-white active:scale-95"
        >
          <ChevronRight size={26} />
        </button>

        {/* Slider Main Content Container */}
        <div className="mx-auto max-w-[1380px] px-8 sm:px-16 md:px-20 py-8 sm:py-10 md:py-12">
          {/* Stable fixed-height grid */}
          <div className="grid min-h-[420px] md:h-[450px] lg:h-[470px] items-center gap-8 md:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            {/* Slide Content Column */}
            <div className="relative z-10 flex h-full flex-col justify-center">
              {/* Category / Page Tag */}
              <div>
                <span className={`inline-flex items-center rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wide uppercase transition-all duration-300 ${slide.theme.tagColor}`}>
                  {slide.tag}
                </span>
              </div>

              {/* Headline */}
              <div className="mt-4 min-h-[80px] sm:min-h-[100px] flex flex-col justify-center">
                <h1 className="font-display text-[30px] leading-[1.14] font-extrabold tracking-tight text-[#16241d] sm:text-[38px] lg:text-[44px]">
                  {slide.titlePrimary}
                  <br />
                  <span className={slide.theme.accentColor}>{slide.titleAccent}</span>
                </h1>
              </div>

              {/* Description */}
              <div className="mt-3 min-h-[64px] flex items-center">
                <p className="max-w-[500px] text-[14px] leading-relaxed text-[#50635a] sm:text-[15px]">
                  {slide.description}
                </p>
              </div>

              {/* Redirection Button */}
              <div className="mt-7 flex items-center">
                <Link
                  href={slide.btnHref}
                  onClick={(e) => e.stopPropagation()}
                  className="btn btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-bold shadow-md transition hover:-translate-y-0.5"
                >
                  {slide.btnText} <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Slide Visual / Image Column: Clean card frame with smooth roundness and subtle border */}
            <div className="relative flex h-full items-center justify-center">
              <div className="relative overflow-hidden rounded-[28px] border border-[#cfe2ce] bg-white/90 p-3 sm:p-3.5 shadow-[0_20px_45px_-18px_rgba(13,92,55,0.22)] backdrop-blur-xs transition-transform duration-500 hover:scale-[1.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.imageAlt}
                  draggable={false}
                  className={`animate-fade h-[290px] w-[290px] sm:h-[340px] sm:w-[340px] md:h-[380px] md:w-[380px] lg:h-[400px] lg:w-[400px] rounded-2xl object-cover shadow-xs ${
                    slide.image.includes("doctor")
                      ? "object-top"
                      : "object-center"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Indicators & Pause Control */}
        <div className="border-t border-[#d8e6d7]/80 bg-white/60 backdrop-blur-xs py-2.5">
          <div className="mx-auto flex max-w-[1380px] items-center justify-center gap-3 px-4">
            {/* 6 Minimal Pill/Dot Indicators */}
            <div className="flex items-center gap-2">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    current === idx
                      ? "w-8 bg-[#0d5c37]"
                      : "w-2.5 bg-[#cbdacd] hover:bg-[#97b599]"
                  }`}
                />
              ))}
            </div>

            {/* Pause / Play Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoPlay((prev) => !prev);
              }}
              title={isAutoPlay ? "Click to Pause" : "Click to Play"}
              className={`ml-2 grid h-7 w-7 place-items-center rounded-full border transition ${
                !isAutoPlay
                  ? "border-[#0d5c37] bg-[#eaf4ea] text-[#0d5c37]"
                  : "border-[#dde8dc] bg-white text-[#5e6f66] hover:text-[#0d5c37]"
              }`}
            >
              {!isAutoPlay ? (
                <Play size={11} className="fill-[#0d5c37] text-[#0d5c37]" />
              ) : (
                <Pause size={11} />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
