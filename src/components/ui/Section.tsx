import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-semibold tracking-[0.2em] text-[#0d5c37] uppercase ${className}`}>{children}</p>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-[26px] leading-tight font-extrabold sm:text-[30px] ${className}`}>{children}</h2>
  );
}

export function ViewAllPill({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="btn btn-ghost shrink-0 gap-1.5 px-4 py-2 text-[12px] font-semibold whitespace-nowrap"
    >
      {label}
      <ArrowRight size={13} className="arrow" />
    </Link>
  );
}

export function ViewAllLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-[#0d5c37] whitespace-nowrap"
    >
      {label}
      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function LeafDivider() {
  return (
    <div className="mt-3 flex items-center justify-center gap-2">
      <span className="h-px w-10 bg-[#cfe3cf]" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="animate-sway">
        <path
          d="M20 4c-6 0-11 2.6-11 8.3 0 1.9.6 3.3 1.6 4.3C12.3 13.9 14.7 11.6 18.4 10c-2.8 1.9-5.9 3.9-7.1 7.7"
          stroke="#2e9b4f"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="h-px w-10 bg-[#cfe3cf]" />
    </div>
  );
}

export function Script({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`script ${className}`}>{children}</span>;
}
