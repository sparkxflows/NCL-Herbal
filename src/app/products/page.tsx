import type { Metadata } from "next";
import AllProductsView from "@/components/shop/AllProductsView";
import { getProductsWithReviews, getTestimonials } from "@/lib/data";
import { toUIProduct, toUITestimonial } from "@/lib/map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Herbal Products | New Life Clinic (NLC Herbal)",
  description:
    "Explore our complete range of authentic Ayurvedic formulations, Kamdev vitality series, Swarn Shilajit and non-surgical herbal remedies. Free shipping above ₹500.",
};

export default async function AllProductsPage() {
  const [productRows, testimonialRows] = await Promise.all([
    getProductsWithReviews(),
    getTestimonials("shop"),
  ]);

  const products = productRows.map(toUIProduct);
  const testimonials = testimonialRows.map(toUITestimonial);

  return <AllProductsView products={products} testimonials={testimonials} />;
}

