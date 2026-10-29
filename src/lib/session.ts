import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export const CART_COOKIE = "nlc_sid";

export async function readSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value ?? null;
}

export async function ensureSessionId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_COOKIE)?.value;
  if (existing) return existing;
  const id = randomUUID();
  store.set(CART_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
  });
  return id;
}
