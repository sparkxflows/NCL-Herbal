"use client";

import { ArrowRight, Heart, ShoppingCart } from "lucide-react";
import Stars from "@/components/ui/Stars";
import { rupees, type UIProduct } from "@/lib/types";
import { useStore } from "@/components/store/StoreProvider";

export function ShopProductCard({ product }: { product: UIProduct }) {
  const { addToCart, busyProductId, openProduct, wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);

  return (
    <article
      onClick={() => openProduct(product)}
      className="card-hover img-zoom group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#e8efe8] bg-white"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        aria-label="Add to wishlist"
        className={`absolute top-2.5 right-2.5 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-110 ${
          saved ? "text-[#0d5c37]" : "text-[#9aa79f]"
        }`}
      >
        <Heart size={13} className={saved ? "fill-[#0d5c37]" : ""} />
      </button>

      <div className="relative grid h-[150px] place-items-center overflow-hidden bg-[#f6faf5] px-4 pt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-[#0d5c37]/92 py-1.5 text-center text-[10px] font-bold tracking-wide text-white uppercase transition-transform duration-300 group-hover:translate-y-0">
          Quick view
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pt-3 pb-3.5">
        <h3 className="text-[13px] leading-snug font-bold">{product.name}</h3>
        <div className="mt-1.5 flex items-center gap-1 text-[10.5px] text-[#5e6f66]">
          <Stars value={Number(product.rating)} size={11} />
          <span className="font-semibold text-[#16241d]">{product.rating}</span>
          <span>({product.ratingCount})</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="text-[14px] font-extrabold text-[#0d5c37]">{rupees(product.price)}</span>
          <span className="text-[11px] text-[#9aa79f] line-through">{rupees(product.mrp)}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id, 1, product.name);
          }}
          disabled={busyProductId === product.id}
          className="btn btn-primary mt-3 w-full py-2 text-[12px] disabled:opacity-70"
        >
          {busyProductId === product.id ? "Adding…" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export function HomeProductCard({ product }: { product: UIProduct }) {
  const { addToCart, busyProductId, openProduct } = useStore();

  return (
    <article
      onClick={() => openProduct(product)}
      className="card-hover img-zoom group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#e8efe8] bg-white"
    >
      <div className="grid h-[215px] place-items-center overflow-hidden bg-[#f6faf5] p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <h3 className="font-display text-[15px] font-bold">{product.name}</h3>
        <span className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium text-[#5e6f66] transition group-hover:text-[#0d5c37]">
          View product <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id, 1, product.name);
          }}
          disabled={busyProductId === product.id}
          className="btn btn-primary mt-4 w-full py-2.5 text-[12.5px] disabled:opacity-70"
        >
          <ShoppingCart size={14} />
          {busyProductId === product.id ? "Adding…" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
