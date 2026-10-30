"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Heart, Leaf, MapPin, Phone, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { useStore } from "@/components/store/StoreProvider";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Consult Dr. N.K. Sharma", href: "/consult-a-doctor" },
  { label: "About Us", href: "/about" },
  { label: "Wellness Journal", href: "/wellness-journal" },
  { label: "Contact Clinic", href: "/contact" },
];

const CARE = [
  "Shipping Policy",
  "Returns and Refund Policy",
  "Privacy Policy",
  "Terms and Conditions",
  "FAQs",
];

export default function Footer() {
  const { pushToast } = useStore();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not subscribe");
      setEmail("");
      pushToast("Subscribed! Health tips are on the way.");
    } catch (err) {
      pushToast((err as Error).message, "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#072a19] text-white border-t border-white/5">
      {/* Da Pizza Hub style top glowing divider & ambient radial light */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8fd3a4]/50 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8fd3a4]/10 blur-[120px] pointer-events-none" />

      {/* Decorative leaf motifs */}
      <Leaf className="pointer-events-none absolute -right-6 bottom-10 h-44 w-44 rotate-12 text-white/5" />
      <Leaf className="pointer-events-none absolute -left-8 top-6 h-36 w-36 -rotate-12 text-white/5" />

      <div className="relative mx-auto grid max-w-[1380px] gap-8 px-4 pt-14 pb-12 sm:gap-10 md:grid-cols-[1.3fr_0.9fr_0.9fr_1.2fr]">
        {/* Column 1: Background-less Logo with pure white "HERBAL" + Clinic Info */}
        <div className="flex flex-col">
          <Logo variant="light" />

          <p className="mt-5 max-w-[290px] text-[13px] leading-relaxed text-white/70">
            <strong className="text-white font-semibold">New Life Clinic (NLC Herbal)</strong>
            <br />
            Specialized Ayurvedic healthcare and pure herbal formulations for complete vitality and non-surgical wellness.
          </p>

          <div className="mt-4 flex flex-col gap-2.5 text-[12.5px] text-white/75">
            <div className="group flex items-start gap-2.5 transition-all duration-300 hover:text-white">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#8fd3a4] transition-transform duration-300 group-hover:scale-115" />
              <span>ALG-21, Pushpa Complex, Hisar (Hry.)</span>
            </div>
            <div className="group flex items-center gap-2.5 transition-all duration-300 hover:text-white">
              <Phone size={15} className="shrink-0 text-[#8fd3a4] transition-transform duration-300 group-hover:scale-115" />
              <a href="tel:+919306737990" className="hover:text-white transition font-medium">
                +91 93067 37990
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919306737990?text=Hello%20Dr.%20N.K.%20Sharma,%20I%20would%20like%20to%20consult%20regarding%20my%20health."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Helpline"
              className="group/wa inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-[11.5px] font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#20ba59] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle size={14} className="fill-white transition-transform duration-300 group-hover/wa:rotate-12" />
              WhatsApp Helpline
            </a>

            <div className="flex items-center gap-2">
              {[FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8fd3a4]/20 hover:text-[#8fd3a4]"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links (Da Pizza Hub Expand Line Animation) */}
        <div>
          <h4 className="text-xs font-semibold text-[#8fd3a4] uppercase tracking-[0.2em] mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {QUICK.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center text-[13px] text-white/70 hover:text-white transition-colors duration-300"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-[#8fd3a4] mr-0 group-hover:mr-2 transition-all duration-300 ease-out" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Customer Care Policies (Da Pizza Hub Expand Line Animation) */}
        <div>
          <h4 className="text-xs font-semibold text-[#8fd3a4] uppercase tracking-[0.2em] mb-4">
            Customer Care
          </h4>
          <ul className="space-y-3">
            {CARE.map((item) => (
              <li key={item}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center text-[13px] text-white/70 hover:text-white transition-colors duration-300"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-[#8fd3a4] mr-0 group-hover:mr-2 transition-all duration-300 ease-out" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-xs font-semibold text-[#8fd3a4] uppercase tracking-[0.2em] mb-4">
            Health Newsletter
          </h4>
          <p className="text-[13px] leading-relaxed text-white/70 mb-4">
            Get updates on authentic ayurvedic remedies, new products and doctor consultation slots.
          </p>

          <form onSubmit={subscribe} className="flex items-center gap-2">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-lg bg-white/10 border border-white/10 px-3.5 py-2.5 text-[12.5px] text-white placeholder-white/40 outline-none transition-all duration-300 focus:bg-white/15 focus:border-[#8fd3a4] focus:ring-1 focus:ring-[#8fd3a4]"
            />
            <button
              type="submit"
              disabled={busy}
              aria-label="Subscribe"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#17a052] text-white shadow-sm transition-all duration-300 hover:bg-[#0e7a3e] hover:shadow-[0_0_15px_rgba(23,160,82,0.4)] active:scale-95 disabled:opacity-70"
            >
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-3 text-[11px] text-white/50">
            Ayurvedic guidance • 100% Privacy • No spam
          </p>
        </div>
      </div>

      {/* Da Pizza Hub style Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/60 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <p>© 2026 New Life Clinic (NLC Herbal). All rights reserved.</p>
            <span className="text-white/20">•</span>
            <Link href="/admin" className="hover:text-white transition-colors duration-300">
              Admin Portal
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[#f5a623] font-medium inline-flex items-center gap-1.5">
              <span>★ 5.0 on</span>
              <a
                href="https://share.google/n4PI9OwMnQfR1luHd"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                Google Maps
              </a>
              <span>&</span>
              <a
                href="https://www.justdial.com/Hissar/New-Life-Clinic-Pushpa-Complex/9999P1662-1662-220516200250-A6F1_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                Justdial
              </a>
              <span className="text-white/60">(380+ Reviews)</span>
            </span>
            <span className="text-white/20">•</span>
            <span>Est. 2015 · Hisar</span>
            <span className="text-white/20">•</span>
            <div className="group inline-flex items-center gap-1.5 text-white/70">
              <span>Developed by</span>
              <span className="text-white font-medium group-hover:text-[#8fd3a4] transition-colors duration-300">
                sparkxflow
              </span>
              <Heart
                size={12}
                className="fill-[#ff4d4f] text-[#ff4d4f] transition-transform duration-300 group-hover:scale-125"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
