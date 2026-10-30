"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import Stars from "@/components/ui/Stars";
import { rupees, type UIProduct } from "@/lib/types";
import { useStore } from "@/components/store/StoreProvider";

export function ShopProductCard({ product }: { product: UIProduct }) {
  const router = useRouter();
  const { cart, addToCart, updateQty, removeItem, busyProductId, wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);

  const cartItem = cart.items.find((i) => i.productId === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <article
      onClick={() => router.push(`/shop/${product.slug}`)}
      className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-[#e4eee3] bg-white shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-[#0d5c37]/60 hover:shadow-xl active:scale-[0.98]"
    >
      {/* Top badges: Discount & Wishlist */}
      <div className="absolute top-2.5 inset-x-2.5 z-10 flex items-center justify-between pointer-events-none">
        {discountPercent ? (
          <span className="rounded-md bg-[#0d5c37] px-2 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-xs">
            {discountPercent}% OFF
          </span>
        ) : (
          <span />
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Add to wishlist"
          className={`pointer-events-auto grid h-7 w-7 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-110 ${
            saved ? "text-[#0d5c37]" : "text-[#9aa79f]"
          }`}
        >
          <Heart size={13} className={saved ? "fill-[#0d5c37]" : ""} />
        </button>
      </div>

      {/* Product Image: Clean square aspect ratio matching product graphics */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-[#f4f7f4] p-3"
        suppressHydrationWarning
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          suppressHydrationWarning
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 opacity-0 translate-y-3 bg-[#0d5c37]/92 py-1.5 text-center text-[10px] font-bold tracking-wide text-white uppercase transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          View Product Page →
        </span>
      </div>

      {/* Uniform content area */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <Link
            href={`/shop/${product.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="block text-[#16241d] hover:text-[#0d5c37] transition-colors"
          >
            <h3 className="line-clamp-2 min-h-[40px] text-[13.5px] leading-snug font-bold" title={product.name}>
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#5e6f66]">
            <Stars value={Number(product.rating)} size={11.5} />
            <span className="font-bold text-[#16241d]">{product.rating}</span>
            <span>({product.ratingCount})</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-[16px] font-black text-[#0d5c37]">{rupees(product.price)}</span>
            <span className="text-[12px] text-[#9aa79f] line-through">{rupees(product.mrp)}</span>
          </div>
        </div>

        {/* Live Quantity Controller (1 appearing with + and - in real-time) */}
        {inCartQty > 0 && cartItem ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-4 flex h-[38px] w-full items-center justify-between rounded-xl bg-[#0d5c37] px-2 font-bold text-white shadow-sm transition-all duration-300"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (inCartQty <= 1) {
                  removeItem(cartItem.id);
                } else {
                  updateQty(cartItem.id, inCartQty - 1);
                }
              }}
              aria-label="Decrease quantity"
              title="Decrease quantity"
              className="grid h-7 w-7 place-items-center rounded-lg bg-white/15 text-white transition hover:bg-white/30 active:scale-90"
            >
              <Minus size={14} className="stroke-[2.5]" />
            </button>
            <span className="text-[13.5px] font-black tracking-wide text-white select-none">
              {inCartQty}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                updateQty(cartItem.id, inCartQty + 1);
              }}
              aria-label="Increase quantity"
              title="Increase quantity"
              className="grid h-7 w-7 place-items-center rounded-lg bg-white/15 text-white transition hover:bg-white/30 active:scale-90"
            >
              <Plus size={14} className="stroke-[2.5]" />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id, 1, product.name);
            }}
            disabled={busyProductId === product.id}
            className="btn btn-primary mt-4 w-full py-2.5 text-[12.5px] font-bold shadow-xs hover:shadow-md disabled:opacity-70 transition-all duration-300"
          >
            {busyProductId === product.id ? "Adding…" : "Add to Cart"}
          </button>
        )}
      </div>
    </article>
  );
}

export function HomeProductCard({ product }: { product: UIProduct }) {
  const router = useRouter();
  const { cart, addToCart, updateQty, removeItem, busyProductId, wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);

  const cartItem = cart.items.find((i) => i.productId === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <article
      onClick={() => router.push(`/shop/${product.slug}`)}
      className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-[#e2ece2] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#0d5c37]/50 hover:shadow-xl active:scale-[0.99]"
    >
      {/* Top Floating Badges */}
      <div className="absolute top-3.5 inset-x-3.5 z-10 flex items-center justify-between pointer-events-none">
        <span className="rounded-full bg-[#0d5c37] px-3 py-1 text-[11px] font-extrabold text-white uppercase tracking-wider shadow-md backdrop-blur-xs">
          {product.badge ?? (discountPercent ? `${discountPercent}% OFF` : "100% Herbal")}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Add to wishlist"
          className={`pointer-events-auto grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-md transition-all duration-300 hover:scale-110 active:scale-95 ${
            saved ? "text-[#0d5c37]" : "text-[#88988e] hover:text-[#0d5c37]"
          }`}
        >
          <Heart size={14} className={saved ? "fill-[#0d5c37]" : ""} />
        </button>
      </div>

      {/* Edge-to-Edge Clean Square Image Container (1024x1024 native display) */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#f4f7f4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 py-3 text-center">
          <span className="text-xs font-bold text-white tracking-wide uppercase drop-shadow-sm">
            View Details &amp; Buy →
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-display line-clamp-2 min-h-[46px] text-[16.5px] font-bold text-[#16241d] group-hover:text-[#0d5c37] transition-colors leading-snug">
            {product.name}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-[11.5px] text-[#5e6f66]">
            <Stars value={Number(product.rating)} size={12} />
            <span className="font-bold text-[#16241d]">{product.rating}</span>
            <span>({product.ratingCount} reviews)</span>
          </div>

          <div className="mt-3 flex items-center gap-2.5">
            <span className="text-[19px] font-black text-[#0d5c37]">{rupees(product.price)}</span>
            <span className="text-[13px] text-[#9aa79f] line-through">{rupees(product.mrp)}</span>
          </div>
        </div>

        {/* Live Quantity Controller (1 appearing with + and - in real-time) */}
        {inCartQty > 0 && cartItem ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-5 flex h-[42px] w-full items-center justify-between rounded-xl bg-[#0d5c37] px-3 font-bold text-white shadow-md transition-all duration-300"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (inCartQty <= 1) {
                  removeItem(cartItem.id);
                } else {
                  updateQty(cartItem.id, inCartQty - 1);
                }
              }}
              aria-label="Decrease quantity"
              title="Decrease quantity"
              className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 text-white transition hover:bg-white/30 active:scale-90"
            >
              <Minus size={15} className="stroke-[2.5]" />
            </button>
            <span className="text-[14px] font-black tracking-wide text-white select-none">
              {inCartQty} in Cart
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                updateQty(cartItem.id, inCartQty + 1);
              }}
              aria-label="Increase quantity"
              title="Increase quantity"
              className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 text-white transition hover:bg-white/30 active:scale-90"
            >
              <Plus size={15} className="stroke-[2.5]" />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id, 1, product.name);
            }}
            disabled={busyProductId === product.id}
            className="btn btn-primary mt-5 w-full py-2.5 text-[13px] font-bold shadow-xs hover:shadow-md disabled:opacity-70 transition-all duration-300"
          >
            <ShoppingCart size={15} />
            {busyProductId === product.id ? "Adding…" : "Add to Cart"}
          </button>
        )}
      </div>
    </article>
  );
}
