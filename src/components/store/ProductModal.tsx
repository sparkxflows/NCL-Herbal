"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { Check, Heart, Leaf, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { rupees, type UIProduct } from "@/lib/types";
import Stars from "@/components/ui/Stars";
import Modal from "./Modal";
import { useStore } from "./StoreProvider";

const TABS = ["Description", "Benefits", `Reviews`] as const;

export default function ProductModal({ product, onClose }: { product: UIProduct | null; onClose: () => void }) {
  const { addToCart, busyProductId, wishlist, toggleWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(0);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");
  const [activeImg, setActiveImg] = useState<string>("");

  useEffect(() => {
    if (product) {
      setQty(1);
      setSize(0);
      setTab("Description");
      setActiveImg(product.image);
    }
  }, [product]);

  if (!product) return null;

  const currentImg = activeImg || product.image;
  const hasBackView = product.slug.includes("shilajit");
  const gallery = hasBackView
    ? [
        { label: "Front", src: "/images/swarn-shilajit.jpg" },
        { label: "Ingredients / Back", src: "/images/swarn-shilajit-back.jpg" },
      ]
    : [{ label: "Product", src: product.image }];

  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const saved = wishlist.includes(product.id);
  const avg =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : Number(product.rating);

  return (
    <Modal open onClose={onClose} label={product.name}>
      <div className="grid gap-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        {/* gallery */}
        <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-[#f1f8f0] to-[#e7f2e6] p-7">
          <span className="absolute top-5 left-5 rounded-full bg-[#0d5c37] px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
            {product.badge ?? "Herbal"}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImg}
            alt={product.name}
            className="animate-floaty h-56 w-full max-w-[290px] rounded-xl object-contain sm:h-72"
          />

          {hasBackView && (
            <div className="mt-3 flex items-center justify-center gap-2">
              {gallery.map((g) => (
                <button
                  key={g.src}
                  type="button"
                  onClick={() => setActiveImg(g.src)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition ${
                    currentImg === g.src
                      ? "border-[#0d5c37] bg-[#0d5c37] text-white shadow-sm"
                      : "border-[#d8e7d7] bg-white text-[#2c3b33] hover:border-[#0d5c37]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt="" className="h-5 w-5 rounded object-cover" />
                  {g.label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-5 grid w-full grid-cols-3 gap-2">
            {[
              { icon: Leaf, label: "100% Natural" },
              { icon: ShieldCheck, label: "Lab Tested" },
              { icon: Truck, label: "Fast Shipping" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-1 rounded-xl bg-white/80 px-2 py-2.5 text-center text-[10px] font-semibold text-[#2c3b33]"
              >
                <f.icon size={15} className="text-[#0d5c37]" />
                {f.label}
              </div>
            ))}
          </div>
        </div>

        {/* details */}
        <div className="flex flex-col p-6 sm:p-7">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0d5c37] uppercase">{product.category}</p>
          <h3 className="font-display mt-1 text-2xl leading-tight font-extrabold">{product.name}</h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#5e6f66]">
            <Stars value={avg} />
            <span className="font-semibold text-[#16241d]">{product.rating}</span>
            <span>({product.ratingCount} ratings)</span>
            <span className="h-3 w-px bg-[#dfe6e0]" />
            <span className="font-medium text-[#0d5c37]">In stock</span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#5e6f66]">{product.shortDesc}</p>

          <div className="mt-4 flex items-end gap-2.5">
            <span className="font-display text-3xl font-extrabold text-[#0d5c37]">{rupees(product.price)}</span>
            <span className="mb-1 text-sm text-[#9aa79f] line-through">{rupees(product.mrp)}</span>
            <span className="mb-1.5 rounded-md bg-[#fdf0dc] px-2 py-0.5 text-[11px] font-bold text-[#b57318]">
              {off}% OFF
            </span>
          </div>

          {product.sizes.length > 0 && (
            <div className="mt-4">
              <p className="text-[11px] font-bold tracking-wide text-[#16241d] uppercase">Pack size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSize(i)}
                    className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 ${
                      size === i
                        ? "border-[#0d5c37] bg-[#0d5c37] text-white"
                        : "border-[#e3ece4] text-[#2c3b33] hover:border-[#0d5c37]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1 rounded-full border border-[#e3ece4] px-1.5 py-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-[#eaf4ea] hover:text-[#0d5c37]"
              >
                <Minus size={13} />
              </button>
              <span className="w-6 text-center text-sm font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-[#eaf4ea] hover:text-[#0d5c37]"
              >
                <Plus size={13} />
              </button>
            </div>
            <button
              onClick={() => addToCart(product.id, qty, product.name)}
              disabled={busyProductId === product.id}
              className="btn btn-primary flex-1 px-5 py-3 text-sm disabled:opacity-70"
            >
              <ShoppingCart size={16} />
              {busyProductId === product.id ? "Adding…" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
              className={`grid h-11 w-11 place-items-center rounded-full border transition hover:-translate-y-0.5 ${
                saved ? "border-[#0d5c37] bg-[#eaf4ea] text-[#0d5c37]" : "border-[#e3ece4] text-[#5e6f66]"
              }`}
            >
              <Heart size={17} className={saved ? "fill-[#0d5c37]" : ""} />
            </button>
          </div>

          <Link
            href={`/shop/${product.slug}`}
            onClick={onClose}
            className="mt-3.5 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#0d5c37] hover:underline"
          >
            Open Dedicated Product Page &amp; Write a Review →
          </Link>

          {/* tabs */}
          <div className="mt-6 flex gap-5 border-b border-[#e3ece4]">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative pb-2.5 text-xs font-bold tracking-wide uppercase transition ${
                  tab === t ? "text-[#0d5c37]" : "text-[#9aa79f] hover:text-[#2c3b33]"
                }`}
              >
                {t === "Reviews" ? `Reviews (${product.reviews.length})` : t}
                <span
                  className={`absolute -bottom-px left-0 h-[2px] w-full origin-left bg-[#0d5c37] transition-transform duration-300 ${
                    tab === t ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mt-4 max-h-[210px] overflow-y-auto pr-1 text-sm">
            {tab === "Description" && (
              <p className="animate-fade leading-relaxed text-[#5e6f66]">{product.description}</p>
            )}
            {tab === "Benefits" && (
              <ul className="animate-fade flex flex-col gap-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[#2c3b33]">
                    <Check size={15} className="mt-0.5 shrink-0 text-[#0d5c37]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === "Reviews" && (
              <ul className="animate-fade flex flex-col gap-3">
                {product.reviews.length === 0 && <li className="text-[#5e6f66]">No reviews yet.</li>}
                {product.reviews.map((r) => (
                  <li key={r.id} className="rounded-xl border border-[#e3ece4] bg-[#f9fcf8] p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold">{r.author}</span>
                      <Stars value={r.rating} size={12} />
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#5e6f66]">{r.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
