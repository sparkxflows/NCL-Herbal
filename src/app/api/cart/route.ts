import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db, hasDatabaseUrl } from "@/db";
import { cartItems, products } from "@/db/schema";
import { ensureSessionId, readSessionId } from "@/lib/session";
import { ensureSeeded } from "@/lib/data";
import { seedProducts } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

type MemoryCartItem = {
  id: number;
  quantity: number;
  productId: number;
  name: string;
  slug: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
};

const memoryCarts = new Map<string, MemoryCartItem[]>();
let memoryItemIdCounter = 1;

async function payload(sessionId: string) {
  if (hasDatabaseUrl) {
    const rows = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        productId: products.id,
        name: products.name,
        slug: products.slug,
        price: products.price,
        mrp: products.mrp,
        image: products.image,
        category: products.category,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.sessionId, sessionId))
      .orderBy(cartItems.id);

    const subtotal = rows.reduce((sum, r) => sum + r.price * r.quantity, 0);
    const count = rows.reduce((sum, r) => sum + r.quantity, 0);
    return { items: rows, subtotal, count };
  }

  const items = memoryCarts.get(sessionId) ?? [];
  const subtotal = items.reduce((sum, r) => sum + r.price * r.quantity, 0);
  const count = items.reduce((sum, r) => sum + r.quantity, 0);
  return { items, subtotal, count };
}

export async function GET() {
  try {
    const sid = await readSessionId();
    if (!sid) return NextResponse.json({ items: [], subtotal: 0, count: 0 });
    return NextResponse.json(await payload(sid));
  } catch {
    return NextResponse.json({ items: [], subtotal: 0, count: 0 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { productId?: number; quantity?: number };
    const productId = Number(body.productId);
    const quantity = Math.max(1, Number(body.quantity) || 1);
    if (!productId) return NextResponse.json({ error: "productId is required" }, { status: 400 });

    const sid = await ensureSessionId();

    if (hasDatabaseUrl) {
      await ensureSeeded();
      const [existing] = await db
        .select()
        .from(cartItems)
        .where(and(eq(cartItems.sessionId, sid), eq(cartItems.productId, productId)));

      if (existing) {
        await db
          .update(cartItems)
          .set({ quantity: existing.quantity + quantity })
          .where(eq(cartItems.id, existing.id));
      } else {
        await db.insert(cartItems).values({ sessionId: sid, productId, quantity });
      }
    } else {
      const items = memoryCarts.get(sid) ?? [];
      const existing = items.find((i) => i.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        const prod = seedProducts[productId - 1] ?? seedProducts.find((_, idx) => idx + 1 === productId);
        if (prod) {
          items.push({
            id: memoryItemIdCounter++,
            quantity,
            productId,
            name: prod.name,
            slug: prod.slug,
            price: prod.price,
            mrp: prod.mrp,
            image: prod.image,
            category: prod.category,
          });
        }
      }
      memoryCarts.set(sid, items);
    }

    return NextResponse.json(await payload(sid));
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { id?: number; quantity?: number };
    const id = Number(body.id);
    const quantity = Number(body.quantity);
    const sid = await readSessionId();
    if (!sid || !id) return NextResponse.json({ error: "invalid request" }, { status: 400 });

    if (hasDatabaseUrl) {
      if (quantity <= 0) {
        await db.delete(cartItems).where(and(eq(cartItems.id, id), eq(cartItems.sessionId, sid)));
      } else {
        await db
          .update(cartItems)
          .set({ quantity })
          .where(and(eq(cartItems.id, id), eq(cartItems.sessionId, sid)));
      }
    } else {
      let items = memoryCarts.get(sid) ?? [];
      if (quantity <= 0) {
        items = items.filter((i) => i.id !== id);
      } else {
        const item = items.find((i) => i.id === id);
        if (item) item.quantity = quantity;
      }
      memoryCarts.set(sid, items);
    }

    return NextResponse.json(await payload(sid));
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const sid = await readSessionId();
    if (!sid) return NextResponse.json({ items: [], subtotal: 0, count: 0 });

    if (hasDatabaseUrl) {
      if (id) {
        await db.delete(cartItems).where(and(eq(cartItems.id, id), eq(cartItems.sessionId, sid)));
      } else {
        await db.delete(cartItems).where(eq(cartItems.sessionId, sid));
      }
    } else {
      if (id) {
        const items = (memoryCarts.get(sid) ?? []).filter((i) => i.id !== id);
        memoryCarts.set(sid, items);
      } else {
        memoryCarts.delete(sid);
      }
    }

    return NextResponse.json(await payload(sid));
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
