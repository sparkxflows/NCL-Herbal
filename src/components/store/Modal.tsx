"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  children,
  maxWidth = "max-w-5xl",
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  label?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto p-3 sm:p-6">
      <div className="animate-fade fixed inset-0 bg-[#07251a]/55 backdrop-blur-[3px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`animate-pop relative z-10 my-auto w-full ${maxWidth} overflow-hidden rounded-[22px] bg-white shadow-[0_40px_90px_-30px_rgba(7,37,26,0.55)]`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#16241d] shadow-md transition hover:rotate-90 hover:bg-[#0d5c37] hover:text-white"
        >
          <X size={17} />
        </button>
        {children}
      </div>
    </div>
  );
}
