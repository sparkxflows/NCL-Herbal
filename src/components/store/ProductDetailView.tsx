"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Heart,
  Leaf,
  MessageCircle,
  Minus,
  PhoneCall,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";
import Stars from "@/components/ui/Stars";
import { rupees, type UIProduct } from "@/lib/types";
import { useStore } from "./StoreProvider";
import ProductReviews from "./ProductReviews";

export default function ProductDetailView({ product }: { product: UIProduct }) {
  const { cart, addToCart, updateQty, removeItem, busyProductId, openCart, wishlist, toggleWishlist, pushToast } = useStore();
  const cartItem = cart.items.find((i) => i.productId === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "benefits" | "dosage" | "reviews">("desc");
  const [activeImg, setActiveImg] = useState<string>(product.image);

  const gallery = product.slug.includes("shilajit")
    ? [
        { label: "Front View", src: "/images/swarn-shilajit.jpg" },
        { label: "Ingredients & Dosage Back", src: "/images/swarn-shilajit-back.jpg" },
      ]
    : product.slug.includes("cough")
    ? [
        { label: "Front View", src: "/images/herbal-cough-powder.jpg" },
        { label: "Ingredients & Dosage Back", src: "/images/herbal-cough-powder-back.jpg" },
      ]
    : [{ label: "Product View", src: product.image }];

  const currentImg = activeImg || product.image;
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const saved = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, qty, product.name);
    pushToast(`Added ${qty}x ${product.name} to your cart.`);
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty, product.name);
    openCart();
  };

  const waText = encodeURIComponent(
    `Namaste Dr. N.K. Sharma / NLC Herbal,\nI want to order:\n• Product: ${product.name}\n• Quantity: ${qty}\n• Price: ${rupees(
      product.price * qty
    )}\n\nPlease confirm availability and delivery details to my address.`
  );
  const waUrl = `https://wa.me/919306737990?text=${waText}`;

  return (
    <div className="mx-auto max-w-[1380px] px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#5e6f66]">
        <Link href="/" className="hover:text-[#0d5c37] transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#0d5c37] transition">
          Shop
        </Link>
        <span>/</span>
        <span className="text-[#0d5c37] font-bold">{product.name}</span>
      </nav>

      {/* Main 2-Column Product Grid */}
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Left Column: Gallery & Badges */}
        <div className="flex flex-col">
          <div className="relative flex flex-col items-center justify-center rounded-3xl border border-[#dcecd9] bg-gradient-to-br from-[#f2f8f1] to-[#e6f3e5] p-8 sm:p-12 shadow-sm">
            {/* Top pill badge */}
            <div className="absolute top-5 left-5 flex items-center gap-1.5 rounded-full bg-[#0d5c37] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
              <Sparkles size={13} className="text-[#8fd3a4]" />
              <span>{product.badge ?? "100% Ayurvedic"}</span>
            </div>

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Save to Wishlist"
              className={`absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm transition hover:scale-110 ${
                saved ? "text-[#0d5c37]" : "text-[#8ea095]"
              }`}
            >
              <Heart size={18} className={saved ? "fill-[#0d5c37]" : ""} />
            </button>

            {/* Main Product Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImg}
              alt={product.name}
              className="h-64 sm:h-84 md:h-96 w-auto max-w-full object-contain drop-shadow-[0_20px_40px_rgba(13,92,55,0.18)] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Gallery Thumbnails (if multi-view) */}
          {gallery.length > 1 && (
            <div className="mt-4 flex items-center gap-3">
              {gallery.map((g) => (
                <button
                  key={g.src}
                  type="button"
                  onClick={() => setActiveImg(g.src)}
                  className={`flex flex-1 items-center gap-2.5 rounded-2xl border p-2.5 text-xs font-bold transition ${
                    currentImg === g.src
                      ? "border-[#0d5c37] bg-[#eaf4ea] text-[#0d5c37] shadow-xs"
                      : "border-[#d8e7d7] bg-white text-[#3f5246] hover:border-[#0d5c37]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt="" className="h-10 w-10 rounded-xl object-contain bg-white p-1" />
                  <span className="text-left leading-tight">{g.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Quality Trust Pills */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: Leaf, label: "100% Natural", sub: "Vaidic Herbs" },
              { icon: ShieldCheck, label: "FSSAI & GMP", sub: "Lab Certified" },
              { icon: Truck, label: "Fast Shipping", sub: "Across India" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-1 rounded-2xl border border-[#e4eee3] bg-white p-3.5 text-center shadow-2xs"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eaf4ea] text-[#0d5c37]">
                  <f.icon size={16} />
                </span>
                <span className="text-xs font-bold text-[#16241d]">{f.label}</span>
                <span className="text-[10.5px] font-medium text-[#5e6f66]">{f.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Title, Pricing, Actions, Dosage */}
        <div className="flex flex-col">
          <p className="text-[11.5px] font-bold tracking-[0.24em] text-[#0d5c37] uppercase">
            {product.category}
          </p>

          <h1 className="font-display mt-2 text-[30px] sm:text-[36px] font-black leading-tight text-[#16241d]">
            {product.name}
          </h1>

          {/* Rating & Justdial Badge */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Stars value={Number(product.rating)} size={15} />
              <span className="font-extrabold text-[#16241d]">{product.rating}</span>
              <span className="text-xs text-[#5e6f66]">({product.ratingCount} reviews)</span>
            </div>
            <span className="text-[#a4b5a8]">•</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-[#e7f4e6] px-2 py-0.5 text-[11px] font-bold text-[#0d5c37]">
              ★ 5.0 Justdial Rated
            </span>
          </div>

          {/* Pricing Section */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-[32px] sm:text-[36px] font-black text-[#0d5c37]">
              {rupees(product.price)}
            </span>
            <span className="text-base text-[#8ea095] line-through font-semibold">
              {rupees(product.mrp)}
            </span>
            <span className="rounded-lg bg-[#e23636]/10 px-2.5 py-1 text-xs font-black text-[#e23636]">
              {off}% OFF (Save {rupees(product.mrp - product.price)})
            </span>
          </div>
          <p className="mt-1 text-xs text-[#63776a]">Inclusive of all taxes. Free shipping on this order.</p>

          {/* Short description */}
          <p className="mt-4 text-[14px] leading-relaxed text-[#405447]">
            {product.shortDesc}
          </p>

          {/* Sizes / Packs */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#405447]">
                Select Net Quantity / Pack Size:
              </label>
              <div className="mt-2 flex flex-wrap gap-2.5">
                {product.sizes.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(i)}
                    className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${
                      selectedSize === i
                        ? "border-[#0d5c37] bg-[#0d5c37] text-white shadow-xs"
                        : "border-[#d8e7d7] bg-white text-[#16241d] hover:border-[#0d5c37]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#405447]">
                Quantity:
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-[#cfe2ce] bg-white px-2 py-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="grid h-7 w-7 place-items-center rounded-lg hover:bg-[#eaf4ea] text-[#0d5c37] transition"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#16241d]">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="grid h-7 w-7 place-items-center rounded-lg hover:bg-[#eaf4ea] text-[#0d5c37] transition"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {inCartQty > 0 && cartItem ? (
                <div className="flex h-[48px] items-center justify-between rounded-xl bg-[#0d5c37] px-4 font-bold text-white shadow-md transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => {
                      if (inCartQty <= 1) {
                        removeItem(cartItem.id);
                      } else {
                        updateQty(cartItem.id, inCartQty - 1);
                      }
                    }}
                    aria-label="Decrease quantity"
                    title="Decrease quantity"
                    className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 text-white transition hover:bg-white/30 active:scale-90"
                  >
                    <Minus size={16} className="stroke-[2.5]" />
                  </button>
                  <span className="text-[15px] font-black tracking-wide text-white select-none">
                    {inCartQty} in Cart
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(cartItem.id, inCartQty + 1)}
                    aria-label="Increase quantity"
                    title="Increase quantity"
                    className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 text-white transition hover:bg-white/30 active:scale-90"
                  >
                    <Plus size={16} className="stroke-[2.5]" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={busyProductId === product.id}
                  className="btn btn-primary flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-bold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
                >
                  <ShoppingCart size={17} />
                  {busyProductId === product.id ? "Adding..." : "Add to Cart"}
                </button>
              )}

              {inCartQty > 0 ? (
                <button
                  onClick={openCart}
                  className="flex items-center justify-center gap-2.5 rounded-xl bg-[#0a472a] hover:bg-[#07351d] py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2.5 rounded-xl bg-[#16241d] py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#07251a]"
                >
                  Buy Now (Quick Checkout)
                </button>
              )}
            </div>

            {/* WhatsApp Quick Order */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white shadow-xs transition hover:bg-[#20ba59] hover:shadow-sm"
            >
              <MessageCircle size={18} className="fill-white" />
              Quick Order via WhatsApp (Cash on Delivery)
            </a>
          </div>

          {/* Doctor Consultation Banner */}
          <div className="mt-7 flex items-center justify-between rounded-2xl border border-[#cfe2ce] bg-[#f5faf4] p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0d5c37] text-white">
                <PhoneCall size={18} />
              </span>
              <div>
                <h4 className="text-xs font-bold text-[#16241d]">Need Doctor Advice on Dosage?</h4>
                <p className="text-[11px] text-[#5e6f66]">
                  Consult Dr. N.K. Sharma at New Life Clinic Hisar (₹499)
                </p>
              </div>
            </div>
            <Link
              href="/consult-a-doctor"
              className="btn btn-outline shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold"
            >
              Consult Doctor
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Benefits, Dosage, Reviews */}
      <div className="mt-14 border-t border-[#e2ece0] pt-8">
        <div className="flex border-b border-[#e2ece0] overflow-x-auto no-scrollbar gap-2 sm:gap-6">
          {[
            { id: "desc", label: "Description & Formulation" },
            { id: "benefits", label: "Key Health Benefits" },
            { id: "dosage", label: "Dosage & How to Use" },
            { id: "reviews", label: `Customer Reviews (${product.reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-[#0d5c37] text-[#0d5c37]"
                  : "border-transparent text-[#62776a] hover:text-[#16241d]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="py-6">
          {activeTab === "desc" && (
            <div className="max-w-3xl leading-relaxed text-[#3b4e42] text-[14.5px]">
              <p>{product.description}</p>
              <div className="mt-5 rounded-2xl border border-[#cfe2ce] bg-[#f8fbf7] p-5">
                <h4 className="font-bold text-sm text-[#0d5c37]">Authentic Vedic Quality Assured</h4>
                <p className="mt-1.5 text-xs text-[#5e6f66] leading-relaxed">
                  Manufactured according to classical Ayurvedic texts by Vaidic Bhishjalyaya under Ayush &amp; FSSAI protocols.
                  No artificial fillers, no harmful chemicals, completely safe for long term vitality.
                </p>
              </div>
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="max-w-3xl">
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2.5 rounded-xl border border-[#dfeedd] bg-[#f8fbf7] p-3 text-sm font-semibold text-[#16241d]"
                  >
                    <CheckCircle2 size={18} className="shrink-0 text-[#0d5c37]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "dosage" && (
            <div className="max-w-3xl text-sm leading-relaxed text-[#3b4e42]">
              <h4 className="font-display font-bold text-base text-[#16241d]">Recommended Usage &amp; Dosage</h4>
              <p className="mt-2 text-[14px]">
                Take 1 measuring spoon (approx. 3g – 5g) once or twice daily, preferably with lukewarm milk or warm water
                after meals, or as specifically advised by your Ayurvedic physician Dr. N.K. Sharma.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs font-semibold text-[#16241d]">
                <div className="rounded-xl border border-[#dcecd9] bg-white p-3">
                  <span className="block text-[#0d5c37] font-bold">Timing</span>
                  After dinner / bedtime
                </div>
                <div className="rounded-xl border border-[#dcecd9] bg-white p-3">
                  <span className="block text-[#0d5c37] font-bold">Medium</span>
                  Warm milk or lukewarm water
                </div>
                <div className="rounded-xl border border-[#dcecd9] bg-white p-3">
                  <span className="block text-[#0d5c37] font-bold">Side Effects</span>
                  100% Pure Herbs — Zero Side Effects
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <ProductReviews
              productId={product.id}
              productSlug={product.slug}
              productName={product.name}
              initialReviews={product.reviews}
              initialRating={product.rating}
              initialCount={product.ratingCount}
            />
          )}
        </div>
      </div>

      {/* Embedded Reviews section at bottom of product page for quick visibility */}
      {activeTab !== "reviews" && (
        <ProductReviews
          productId={product.id}
          productSlug={product.slug}
          productName={product.name}
          initialReviews={product.reviews}
          initialRating={product.rating}
          initialCount={product.ratingCount}
        />
      )}
    </div>
  );
}

