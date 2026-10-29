import { asc, eq, sql } from "drizzle-orm";
import { db, hasDatabaseUrl } from "@/db";
import {
  articles,
  doctors,
  products,
  reviews,
  shopCategories,
  testimonials,
  type Article,
  type Doctor,
  type Product,
  type Review,
  type ShopCategory,
  type Testimonial,
} from "@/db/schema";
import {
  seedArticles,
  seedCategories,
  seedDoctors,
  seedProducts,
  seedReviews,
  seedTestimonials,
} from "./seed-data";

let seedPromise: Promise<void> | null = null;

async function seed() {
  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  if (row && row.count > 0) return;

  const inserted = await db.insert(products).values(seedProducts).returning({ id: products.id, slug: products.slug });
  const bySlug = new Map(inserted.map((p) => [p.slug, p.id]));

  const reviewRows = Object.entries(seedReviews).flatMap(([slug, list]) => {
    const pid = bySlug.get(slug);
    if (!pid) return [];
    return list.map((r) => ({ productId: pid, author: r.author, rating: r.rating, body: r.body }));
  });
  if (reviewRows.length) await db.insert(reviews).values(reviewRows);

  await db.insert(doctors).values(seedDoctors);
  await db.insert(articles).values(seedArticles);
  await db.insert(shopCategories).values(seedCategories);
  await db.insert(testimonials).values(seedTestimonials);
}

export async function ensureSeeded() {
  if (!hasDatabaseUrl) return;
  if (!seedPromise) {
    seedPromise = seed().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}

/* -------------------------------------------------------------------------- */
/* fallbacks (used only if the database is unreachable)                        */
/* -------------------------------------------------------------------------- */

const fallbackProducts = seedProducts.map((p, i) => ({ ...p, id: i + 1 })) as unknown as Product[];
const fallbackDoctors = seedDoctors.map((d, i) => ({ ...d, id: i + 1 })) as unknown as Doctor[];
const fallbackArticles = seedArticles.map((a, i) => ({ ...a, id: i + 1 })) as unknown as Article[];
const fallbackCategories = seedCategories.map((c, i) => ({ ...c, id: i + 1 })) as unknown as ShopCategory[];
const fallbackTestimonials = seedTestimonials.map((t, i) => ({ ...t, id: i + 1 })) as unknown as Testimonial[];

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabaseUrl) {
    return fallback;
  }
  try {
    await ensureSeeded();
    return await fn();
  } catch (err) {
    console.warn("[data] fallback active (database error):", (err as Error).message);
    return fallback;
  }
}

export function getProducts() {
  return safe(() => db.select().from(products).orderBy(asc(products.sortOrder)), fallbackProducts);
}

export function getDoctors() {
  return safe(() => db.select().from(doctors).orderBy(asc(doctors.sortOrder)), fallbackDoctors);
}

export function getArticles(surface: string) {
  return safe(
    () => db.select().from(articles).where(eq(articles.surface, surface)).orderBy(asc(articles.sortOrder)),
    fallbackArticles.filter((a) => a.surface === surface),
  );
}

export function getCategories() {
  return safe(
    () => db.select().from(shopCategories).orderBy(asc(shopCategories.sortOrder)),
    fallbackCategories,
  );
}

export function getTestimonials(surface: string) {
  return safe(
    () => db.select().from(testimonials).where(eq(testimonials.surface, surface)).orderBy(asc(testimonials.sortOrder)),
    fallbackTestimonials.filter((t) => t.surface === surface),
  );
}

export function getReviews() {
  return safe(() => db.select().from(reviews).orderBy(asc(reviews.id)), [] as Review[]);
}

export type ProductWithReviews = Product & { reviews: Pick<Review, "id" | "author" | "rating" | "body">[] };

export async function getProductsWithReviews(): Promise<ProductWithReviews[]> {
  const [list, allReviews] = await Promise.all([getProducts(), getReviews()]);
  const grouped = new Map<number, Pick<Review, "id" | "author" | "rating" | "body">[]>();
  for (const r of allReviews) {
    const arr = grouped.get(r.productId) ?? [];
    arr.push({ id: r.id, author: r.author, rating: r.rating, body: r.body });
    grouped.set(r.productId, arr);
  }
  return list.map((p) => ({
    ...p,
    reviews:
      grouped.get(p.id) ??
      (seedReviews[p.slug] ?? []).map((r, i) => ({ id: i + 1, author: r.author, rating: r.rating, body: r.body })),
  }));
}
