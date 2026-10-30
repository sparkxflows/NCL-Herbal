import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db, hasDatabaseUrl } from "@/db";
import { reviews } from "@/db/schema";
import { ensureSeeded } from "@/lib/data";
import { seedReviews } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const slug = searchParams.get("slug");

    if (hasDatabaseUrl) {
      await ensureSeeded();
      if (productId) {
        const rows = await db
          .select()
          .from(reviews)
          .where(eq(reviews.productId, Number(productId)))
          .orderBy(asc(reviews.id));
        return NextResponse.json({ reviews: rows });
      }
      const rows = await db.select().from(reviews).orderBy(asc(reviews.id));
      return NextResponse.json({ reviews: rows });
    }

    if (slug && seedReviews[slug]) {
      return NextResponse.json({
        reviews: seedReviews[slug].map((r, i) => ({ id: i + 1, ...r })),
      });
    }

    const all = Object.entries(seedReviews).flatMap(([s, list]) =>
      list.map((r, i) => ({ id: i + 1, slug: s, ...r }))
    );
    return NextResponse.json({ reviews: all });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | number | undefined>;
    const { productId, slug, author, rating, body: reviewBody } = body;

    const trimmedAuthor = String(author ?? "").trim();
    const trimmedBody = String(reviewBody ?? "").trim();
    const numRating = Math.min(5, Math.max(1, Number(rating || 5)));

    if (!trimmedAuthor || !trimmedBody) {
      return NextResponse.json({ error: "Please provide your name and your review feedback." }, { status: 400 });
    }

    const newReview = {
      id: Date.now(),
      productId: Number(productId || 1),
      author: trimmedAuthor,
      rating: numRating,
      body: trimmedBody,
      createdAt: new Date().toISOString(),
    };

    if (hasDatabaseUrl) {
      await ensureSeeded();
      const [row] = await db
        .insert(reviews)
        .values({
          productId: Number(productId || 1),
          author: trimmedAuthor,
          rating: numRating,
          body: trimmedBody,
        })
        .returning();
      return NextResponse.json({ ok: true, review: row });
    }

    // In-memory update for fallback mode
    const productSlug = String(slug ?? "");
    if (productSlug) {
      if (!seedReviews[productSlug]) seedReviews[productSlug] = [];
      seedReviews[productSlug].unshift({
        author: trimmedAuthor,
        rating: numRating,
        body: trimmedBody,
      });
    }

    return NextResponse.json({ ok: true, review: newReview });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

