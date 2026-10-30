"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  CheckCircle2,
  Droplets,
  Filter,
  Flower2,
  Heart,
  Leaf,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { ShopProductCard } from "@/components/cards/ProductCard";
import Reveal from "@/components/Reveal";
import TrustStrip from "@/components/sections/TrustStrip";
import Testimonials from "@/components/sections/Testimonials";
import type { UIProduct, UITestimonial } from "@/lib/types";

const CATEGORIES = [
  { id: "all", label: "All Products", icon: Sparkles },
  { id: "Immunity & Vitality", label: "Immunity\n& Vitality", icon: ShieldCheck },
  { id: "Herbal Supplements", label: "Herbal\nSupplements", icon: Leaf },
  { id: "Ayurvedic Herbs", label: "Ayurvedic\nHerbs", icon: Flower2 },
  { id: "Digestive Health", label: "Digestive\nHealth", icon: Droplets },
  { id: "Skin & Hair Care", label: "Skin & Hair\nCare", icon: Sparkles },
  { id: "Personal Care", label: "Personal\nCare", icon: Users },
];

export default function AllProductsView({
  products,
  testimonials = [],
}: {
  products: UIProduct[];
  testimonials?: UITestimonial[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      list = list.filter((p) => {
        if (!p.category) return false;
        return p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.shortDesc && p.shortDesc.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#fcfdfc] min-h-screen">
      {/* Page Header / Hero Banner */}
      <section className="relative overflow-hidden border-b border-[#e3ece4] bg-gradient-to-r from-[#edf6eb] via-[#f7faf5] to-[#e4efe2] py-12 sm:py-16">
        <Leaf className="pointer-events-none absolute -top-4 -left-4 h-36 w-36 rotate-12 text-[#9fcba3]/30" />
        <Leaf className="pointer-events-none absolute -bottom-8 right-10 h-32 w-32 rotate-45 text-[#9fcba3]/20" />

        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#50635a]">
            <Link href="/" className="hover:text-[#0d5c37] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#0d5c37] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-[#0d5c37]">All Products</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-[11.5px] font-bold tracking-[0.24em] text-[#0d5c37] uppercase">
              100% Authentic • Vaidic Quality • Direct From Hisar Clinic
            </p>
            <h1 className="font-display mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#16241d] tracking-tight">
              All Herbal Products
            </h1>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#50635a]">
              Explore the complete range of pure Ayurvedic formulations, Kamdev vitality series, Swarn Shilajit, and natural healing powders prepared under expert medical supervision.
            </p>
          </div>
        </div>
      </section>

      {/* Shop By Category Section (Moved here as requested!) */}
      <section className="border-b border-[#e9efe8] bg-white py-10">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0d5c37]">Explore Range</p>
              <h2 className="font-display text-2xl font-black text-[#16241d]">Shop by Category</h2>
            </div>
            <p className="text-xs text-[#5e6f66]">Select a category to filter authentic remedies</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {CATEGORIES.map((c, i) => {
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`group flex flex-col items-center justify-center gap-3 rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1.5 active:scale-95 ${
                    isSelected
                      ? "border-[#0d5c37] bg-[#eaf4ea] shadow-md ring-2 ring-[#0d5c37]/20"
                      : "border-[#e4eee3] bg-[#f8fbf7] hover:border-[#0d5c37]/60 hover:bg-[#eef6ee]"
                  }`}
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full transition-all duration-300 group-hover:scale-110 ${
                      isSelected
                        ? "bg-[#0d5c37] text-white shadow-md shadow-[#0d5c37]/30"
                        : "bg-white text-[#0d5c37] shadow-sm group-hover:bg-[#0d5c37] group-hover:text-white"
                    }`}
                  >
                    <c.icon size={20} />
                  </span>
                  <span
                    className={`text-[12px] font-bold leading-tight whitespace-pre-line transition-colors ${
                      isSelected ? "text-[#0d5c37]" : "text-[#16241d] group-hover:text-[#0d5c37]"
                    }`}
                  >
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Catalog Section: Search, Sort & Grid */}
      <section className="py-10">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#e4eee3] bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7d9284]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search herbal products, Shilajit, power..."
                className="w-full rounded-xl border border-[#d6e4d5] bg-[#f9fbf9] py-2.5 pl-10 pr-9 text-xs sm:text-sm text-[#16241d] placeholder-[#8ea093] outline-none transition focus:border-[#0d5c37] focus:bg-white focus:ring-1 focus:ring-[#0d5c37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d9284] hover:text-[#16241d]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Right: Active Filters & Sort */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Product Counter */}
              <span className="text-xs font-semibold text-[#50635a]">
                Showing <strong className="text-[#16241d]">{filteredProducts.length}</strong> of{" "}
                {products.length} Products
              </span>

              {/* Reset filter pill if active */}
              {(selectedCategory !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#0d5c37]/10 px-2.5 py-1 text-xs font-semibold text-[#0d5c37] hover:bg-[#0d5c37]/20 transition"
                >
                  Clear Filters <X size={12} />
                </button>
              )}

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-[#50635a]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  aria-label="Sort products"
                  className="rounded-xl border border-[#d6e4d5] bg-[#f9fbf9] px-3 py-2 text-xs font-medium text-[#16241d] outline-none transition focus:border-[#0d5c37]"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map((p) => (
                <div key={p.id} className="h-full">
                  <ShopProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#cfe0cf] bg-white p-12 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#0d5c37]/10 text-[#0d5c37] mb-4">
                <Leaf size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-[#16241d]">No Products Found</h3>
              <p className="mt-1 text-xs sm:text-sm text-[#5e6f66] max-w-sm">
                No remedies match your current filter or search criteria. Try clearing your search or switching categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="btn btn-primary mt-6 px-6 py-2.5 text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* TrustStrip & Testimonials */}
      <Testimonials items={testimonials} subtitle="Verified patient reviews from Google Maps & Justdial." variant="shop" />
      <TrustStrip variant="shop" />
    </div>
  );
}

