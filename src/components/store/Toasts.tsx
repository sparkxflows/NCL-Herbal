"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Toasts({
  toasts,
}: {
  toasts: { id: number; message: string; tone: "success" | "error" }[];
}) {
  return (
    <div className="pointer-events-none fixed right-4 bottom-5 z-[120] flex w-[min(92vw,340px)] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-pop flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-[0_18px_38px_-18px_rgba(7,37,26,0.8)] ${
            t.tone === "error" ? "bg-[#b3261e]" : "bg-[#0d5c37]"
          }`}
        >
          {t.tone === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
