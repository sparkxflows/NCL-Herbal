import Link from "next/link";

export default function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  const nlcColor = variant === "light" ? "#ffffff" : "#d8232a";
  const subColor = variant === "light" ? "rgba(255,255,255,0.78)" : "#2c3b33";
  return (
    <Link href="/" aria-label="NLC Herbal home" className={`group inline-flex flex-col leading-none ${className}`}>
      <span className="flex items-start">
        <span
          className="font-display text-[30px] font-extrabold tracking-[-0.03em] transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{ color: nlcColor }}
        >
          NLC
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="-ml-0.5 transition-transform duration-500 group-hover:rotate-12"
        >
          <path
            d="M21 3c-6.5 0-12 2.8-12 9 0 2 .7 3.6 1.8 4.7C12.4 14 15 11.5 19 10c-3 2-6.4 4.2-7.7 8.3"
            stroke="#2e9b4f"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M21 3c0 6.5-3.5 12-9.3 13.8" stroke="#2e9b4f" strokeWidth="2" strokeLinecap="round" opacity=".55" />
        </svg>
      </span>
      <span
        className="font-display mt-[1px] text-[9px] font-semibold tracking-[0.42em]"
        style={{ color: subColor }}
      >
        HERBAL
      </span>
    </Link>
  );
}
