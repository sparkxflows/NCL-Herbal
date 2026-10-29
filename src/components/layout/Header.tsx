"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Headphones, Heart, Leaf, Menu, Search, ShieldCheck, ShoppingCart, Truck, User, X } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* announcement bar */}
      <div
        className={`overflow-hidden bg-[#0d5c37] text-white transition-all duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-14 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-2 text-[11px] font-medium">
          <div className="flex items-center gap-6 overflow-hidden">
            {TICKER.map((t, i) => (
              <span key={t.text} className={`flex items-center gap-1.5 whitespace-nowrap ${i > 0 ? "hidden sm:flex" : ""}`}>
                <t.icon size={13} className="shrink-0 opacity-90" />
                {t.text}
              </span>
            ))}
          </div>
          <div className="hidden items-center gap-2 whitespace-nowrap text-[11px] font-medium tracking-wide text-white/90 md:flex">
            <span>Better Health</span>
            <span className="text-[#96dfa5]">•</span>
            <span>Naturally</span>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div
        className={`border-b bg-white/95 backdrop-blur transition-all duration-300 ${
          scrolled ? "border-[#e3ece4] shadow-[0_10px_30px_-22px_rgba(7,37,26,0.5)]" : "border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1240px] items-center gap-4 px-4 transition-all duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          <Logo />

          <nav className="ml-4 hidden items-center gap-6 lg:flex">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 text-[13.5px] font-semibold transition ${
                    active ? "text-[#0d5c37]" : "text-[#2c3b33] hover:text-[#0d5c37]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-[#0d5c37]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="ml-auto hidden min-w-0 flex-1 items-center justify-end md:flex"
          >
            <label className="group flex w-full max-w-[280px] items-center gap-2 rounded-full border border-[#e3ece4] bg-[#f9fbf9] px-3.5 py-2 transition-all duration-300 focus-within:max-w-[340px] focus-within:border-[#0d5c37] focus-within:bg-white focus-within:shadow-[0_8px_22px_-14px_rgba(13,92,55,0.8)]">
              <input
                placeholder="Search for products, health topics..."
                className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#9aa79f]"
              />
              <Search size={15} className="shrink-0 text-[#5e6f66] transition group-focus-within:text-[#0d5c37]" />
            </label>
          </form>

          <div className="ml-auto flex items-center gap-1.5 md:ml-3">
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
              className="relative hidden h-9 w-9 place-items-center rounded-full text-[#2c3b33] transition hover:-translate-y-0.5 hover:bg-[#eaf4ea] hover:text-[#0d5c37] sm:grid"
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
            <button
              onClick={() => setMenu((m) => !m)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-full text-[#2c3b33] transition hover:bg-[#eaf4ea] hover:text-[#0d5c37] lg:hidden"
            >
              {menu ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* mobile nav */}
        <div
          className={`overflow-hidden border-t border-[#e3ece4] bg-white transition-all duration-400 lg:hidden ${
            menu ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="mx-auto flex max-w-[1240px] flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-[#f0f5ef] py-3 text-sm font-semibold last:border-0 ${
                  isActive(item.href) ? "text-[#0d5c37]" : "text-[#2c3b33]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
