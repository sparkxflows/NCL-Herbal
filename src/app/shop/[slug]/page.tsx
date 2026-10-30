import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import TrustStrip from "@/components/sections/TrustStrip";
import ProductDetailView from "@/components/store/ProductDetailView";
import { ShopProductCard } from "@/components/cards/ProductCard";
import { getProductBySlug, getProductsWithReviews } from "@/lib/data";
import { toUIProduct } from "@/lib/map";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — NLC Herbal" };

  return {
    title: `${product.name} — NLC Herbal (Dr. N.K. Sharma | New Life Clinic Hisar)`,
    description: product.shortDesc || product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [productRow, allRows] = await Promise.all([
    getProductBySlug(slug),
    getProductsWithReviews(),
  ]);

  if (!productRow) {
    notFound();
  }

  const product = toUIProduct(productRow);
  const related = allRows
    .filter((p) => p.slug !== slug && p.slug !== "nlc-pure-herbs")
    .slice(0, 4)
    .map(toUIProduct);

  return (
    <>
      {/* Main Interactive Product Detail Component */}
      <ProductDetailView product={product} />

      {/* Related Herbal Formulations Section ("You May Also Like") */}
      {related.length > 0 && (
        <section className="border-t border-[#e3ece4] bg-[#f8fbf7] py-14">
          <div className="mx-auto max-w-[1380px] px-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0d5c37]/10 px-3 py-1 text-[11px] font-bold text-[#0d5c37] uppercase tracking-wider mb-2">
                  <Sparkles size={13} />
                  <span>Holistic Recommendations</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#16241d]">
                  Related Herbal Formulations
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#5e6f66]">
                  Authentic Vaidic treatments recommended by Dr. N.K. Sharma for complete wellness.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0d5c37] hover:underline"
                >
                  View All Products <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((relProduct, i) => (
                <Reveal key={relProduct.id} delay={i * 80}>
                  <ShopProductCard product={relProduct} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Strip */}
      <TrustStrip variant="shop" />
    </>
  );
}

