"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { useStore } from "@/components/store/StoreProvider";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Consult a Doctor", href: "/consult-a-doctor" },
  { label: "About Us", href: "/about" },
  { label: "Wellness Journal", href: "/wellness-journal" },
  { label: "Contact Us", href: "/contact" },
];

const CARE = [
  "Shipping Policy",
  "Returns & Refund Policy",
  "Privacy Policy",
  "Terms & Conditions",
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
    <footer className="relative overflow-hidden bg-[#0b4b2c] text-white">
      <Leaf className="absolute -right-6 bottom-10 h-40 w-40 rotate-12 text-white/5" />
      <Leaf className="absolute -left-8 top-6 h-32 w-32 -rotate-12 text-white/5" />

      <div className="relative mx-auto grid max-w-[1240px] gap-9 px-4 py-12 md:grid-cols-[1.25fr_1fr_1fr_1.25fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-[240px] text-[13px] leading-relaxed text-white/70">
            Bringing the goodness of nature and expert care together for a healthier, happier you.
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            {[FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-white hover:text-[#0b4b2c]"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold">Quick Links</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {QUICK.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="inline-block text-[13px] text-white/70 transition hover:translate-x-1 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold">Customer Care</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {CARE.map((l) => (
              <li key={l}>
                <Link
                  href="/contact"
                  className="inline-block text-[13px] text-white/70 transition hover:translate-x-1 hover:text-white"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold">Newsletter</h4>
          <p className="mt-4 max-w-[230px] text-[13px] leading-relaxed text-white/70">
            Get updates on new products, health tips and offers.
          </p>
          <form onSubmit={subscribe} className="mt-4 flex items-center gap-2">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-md bg-white px-3 py-2.5 text-[12px] text-[#16241d] outline-none ring-[#8fd3a4] transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={busy}
              aria-label="Subscribe"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#17a052] transition hover:-translate-y-0.5 hover:bg-[#0e7a3e] disabled:opacity-70"
            >
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="relative border-t border-white/12">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-2 px-4 py-4 text-[11.5px] text-white/60 sm:flex-row">
          <p>© 2025 NLC Herbal. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Natural <span className="opacity-40">|</span> Safe <span className="opacity-40">|</span> Trusted
            <Leaf size={12} className="text-[#8fd3a4]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
