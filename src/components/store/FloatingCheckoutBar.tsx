"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { rupees } from "@/lib/types";
import { useStore } from "./StoreProvider";

export default function FloatingCheckoutBar() {
  const { cart, openCart } = useStore();

  if (!cart.count || cart.count <= 0) return null;

  return (
    <aside
      aria-label="Quick Checkout Bar"
      className="fixed bottom-5 right-4 sm:right-6 z-40 select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <button
        onClick={openCart}
        type="button"
        title="Proceed to Checkout"
        className="group relative flex items-center gap-3 sm:gap-3.5 rounded-full bg-[#0a472a] hover:bg-[#07351d] text-white px-4 sm:px-5 py-3 sm:py-3.5 shadow-[0_12px_32px_rgba(10,71,42,0.45)] border border-[#249e5d]/50 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#0d5c37]/40 cursor-pointer"
      >
        {/* Cart Icon with Live Count Badge */}
        <div className="relative flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white transition group-hover:scale-110">
            <ShoppingBag size={16} />
            <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-[#e23636] text-[9.5px] font-black text-white shadow-xs">
              {cart.count}
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9fc0a2] leading-tight">
              {cart.count} {cart.count === 1 ? "Item" : "Items"}
            </span>
            <span className="text-[14px] font-black leading-tight text-white">
              {rupees(cart.subtotal)}
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <span className="h-6 w-px bg-white/20" />

        {/* Proceed to Checkout Text & Arrow */}
        <div className="flex items-center gap-1.5 text-[12.5px] sm:text-[13.5px] font-black tracking-wide text-white">
          <span>Proceed to Checkout</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </button>
    </aside>
  );
}

