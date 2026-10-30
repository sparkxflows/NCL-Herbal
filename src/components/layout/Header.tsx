"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Headphones, Heart, Menu, ShieldCheck, ShoppingCart, Truck, User, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useStore } from "@/components/store/StoreProvider";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Consult a Doctor", href: "/consult-a-doctor" },
  { label: "About", href: "/about" },
  { label: "Wellness Journal", href: "/wellness-journal" },
  { label: "Contact", href: "/contact" },
];

const TICKER = [
  { icon: ShieldCheck, text: "Secure Checkout" },
  { icon: Truck, text: "Free Shipping on Orders Above ₹500" },
  { icon: Headphones, text: "Expert Consultation Support" },
];

export default function Header() {
  const pathname = usePathname();
  const { cart, openCart, wishlist, openAuth } = useStore();
  const [menu, setMenu] = useState(false);

  useEffect(() => setMenu(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Top announcement bar - scrolls naturally with page to prevent layout jitter */}
      <div className="bg-[#0d5c37] text-white">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-4 py-2 text-[11px] font-medium">
          <div className="flex items-center gap-6 overflow-hidden">
            {TICKER.map((t, i) => (
              <span key={t.text} className={`flex items-center gap-1.5 whitespace-nowrap ${i > 0 ? "hidden sm:flex" : ""}`}>
                <t.icon size={13} className="shrink-0 opacity-90" />
                {t.text}
              </span>
            ))}
          </div>
          <div className="hidden items-center gap-3 whitespace-nowrap text-[11px] font-medium tracking-wide text-white/90 md:flex">
            <a
              href="tel:+919306737990"
              className="flex items-center gap-1.5 transition hover:text-[#96dfa5]"
            >
              <span>Clinic Helpline:</span>
              <span className="font-bold text-white">+91 93067 37990</span>
            </a>
            <span className="text-white/40">|</span>
            <span>Better Health Naturally</span>
          </div>
        </div>
      </div>

      {/* Main sticky header - constant locked height, zero flicker/vibration on scroll */}
      <header className="sticky top-0 z-50 border-b border-[#e3ece4] bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-4 py-2.5 sm:py-3 transition-none">
          <Logo />

          {/* Right section: Nav items just left of Login/Wishlist/Cart */}
          <div className="flex items-center gap-6 md:gap-8">
            <nav className="hidden items-center gap-7 pt-1 lg:flex">
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative py-2 text-[14px] font-semibold tracking-wide bg-transparent focus:outline-none"
                  >
                    <span
                      className={`relative z-10 inline-block transition-all duration-300 group-hover:-translate-y-0.5 ${
                        active
                          ? "text-[#0d5c37] font-bold"
                          : "text-[#2c3b33] group-hover:text-[#0d5c37]"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Left-to-right sliding underline animation (reference: da-pizza-hub-six) */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 rounded-full origin-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active
                          ? "h-[2.5px] scale-x-100 opacity-100 bg-gradient-to-r from-[#0d5c37] via-[#249e5d] to-[#0d5c37] shadow-[0_0_8px_rgba(13,92,55,0.45)]"
                          : "h-[2px] scale-x-0 opacity-0 bg-gradient-to-r from-[#0d5c37]/80 to-[#2e9b4f]/80 group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                onClick={openAuth}
                type="button"
                aria-label="Account Login"
                title="Sign In / Register"
                className="grid h-9 w-9 place-items-center rounded-full text-[#2c3b33] transition hover:-translate-y-0.5 hover:bg-[#eaf4ea] hover:text-[#0d5c37]"
              >
                <User size={18} />
              </button>
              <button
                aria-label="Wishlist"
                className="relative hidden h-9 w-9 place-items-center rounded-full text-[#2c3b33] transition hover:-translate-y-0.5 hover:bg-[#eaf4ea] hover:text-[#0d5c37]"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#d8232a] px-1 text-[9px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={openCart}
                aria-label="Open cart"
                className="relative grid h-9 w-9 place-items-center rounded-full text-[#2c3b33] transition hover:-translate-y-0.5 hover:bg-[#eaf4ea] hover:text-[#0d5c37]"
              >
                <ShoppingCart size={18} />
                <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#0d5c37] px-1 text-[9px] font-bold text-white">
                  {cart.count}
                </span>
              </button>
              {cart.count > 0 && (
                <button
                  onClick={openCart}
                  type="button"
                  title="Proceed to Checkout"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#0d5c37] px-3.5 py-1.5 text-[12px] font-extrabold text-white shadow-xs transition-all duration-300 hover:bg-[#07351d] hover:scale-105 active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={13} />
                </button>
              )}
              <button
                onClick={() => setMenu((m) => !m)}
                aria-label="Menu"
                className="grid h-9 w-9 place-items-center rounded-full text-[#2c3b33] transition hover:bg-[#eaf4ea] hover:text-[#0d5c37] lg:hidden"
              >
                {menu ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>

        {/* mobile nav */}
        <div
          className={`overflow-hidden border-t border-[#e3ece4] bg-white transition-all duration-400 lg:hidden ${
            menu ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="mx-auto flex max-w-[1380px] flex-col px-4 py-2">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between border-b border-[#f0f5ef] py-3 text-sm font-semibold last:border-0"
                >
                  <span className="relative inline-block pb-0.5">
                    <span
                      className={`transition-colors duration-300 ${
                        active ? "text-[#0d5c37] font-bold" : "text-[#2c3b33] group-hover:text-[#0d5c37]"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-0 right-0 bottom-0 rounded-full origin-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active
                          ? "h-[2px] scale-x-100 opacity-100 bg-[#0d5c37]"
                          : "h-[1.5px] scale-x-0 opacity-0 bg-[#0d5c37] group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
