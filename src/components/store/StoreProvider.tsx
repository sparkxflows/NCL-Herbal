"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, UIDoctor, UIProduct } from "@/lib/types";
import CartDrawer from "./CartDrawer";
import ProductModal from "./ProductModal";
import DoctorModal from "./DoctorModal";
import AuthModal from "./AuthModal";
import Toasts from "./Toasts";
import FloatingCheckoutBar from "./FloatingCheckoutBar";

type CartState = { items: CartLine[]; subtotal: number; count: number };

type Toast = { id: number; message: string; tone: "success" | "error" };

type StoreValue = {
  cart: CartState;
  busyProductId: number | null;
  addToCart: (productId: number, quantity?: number, name?: string) => Promise<void>;
  updateQty: (id: number, quantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  openCart: () => void;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  openProduct: (product: UIProduct) => void;
  openDoctor: (doctor: UIDoctor) => void;
  openAuth: () => void;
  pushToast: (message: string, tone?: "success" | "error") => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

const EMPTY: CartState = { items: [], subtotal: 0, count: 0 };

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(EMPTY);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [busyProductId, setBusyProductId] = useState<number | null>(null);
  const [product, setProduct] = useState<UIProduct | null>(null);
  const [doctor, setDoctor] = useState<UIDoctor | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = useCallback((message: string, tone: "success" | "error" = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2800);
  }, []);

  useEffect(() => {
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data: CartState) => setCart(data?.items ? data : EMPTY))
      .catch(() => setCart(EMPTY));
    try {
      const raw = window.localStorage.getItem("nlc_wishlist");
      if (raw) setWishlist(JSON.parse(raw) as number[]);
    } catch {
      /* ignore */
    }
  }, []);

  const addToCart = useCallback(
    async (productId: number, quantity = 1, name?: string) => {
      setBusyProductId(productId);
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });
        const data = (await res.json()) as CartState & { error?: string };
        if (!res.ok) throw new Error(data.error ?? "Could not add to cart");
        setCart(data);
        pushToast(`${name ?? "Product"} added to cart`);
      } catch (err) {
        pushToast((err as Error).message, "error");
      } finally {
        setBusyProductId(null);
      }
    },
    [pushToast],
  );

  const updateQty = useCallback(async (id: number, quantity: number) => {
    // Instant optimistic update for 0ms lag
    setCart((prev) => {
      let nextItems = prev.items.map((i) => (i.id === id ? { ...i, quantity } : i));
      if (quantity <= 0) {
        nextItems = nextItems.filter((i) => i.id !== id);
      }
      const subtotal = nextItems.reduce((s, i) => s + i.price * i.quantity, 0);
      const count = nextItems.reduce((s, i) => s + i.quantity, 0);
      return { items: nextItems, subtotal, count };
    });

    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity }),
      });
      if (res.ok) setCart((await res.json()) as CartState);
    } catch {
      /* silently handled or recovered on next fetch */
    }
  }, []);

  const removeItem = useCallback(async (id: number) => {
    // Instant optimistic update
    setCart((prev) => {
      const nextItems = prev.items.filter((i) => i.id !== id);
      const subtotal = nextItems.reduce((s, i) => s + i.price * i.quantity, 0);
      const count = nextItems.reduce((s, i) => s + i.quantity, 0);
      return { items: nextItems, subtotal, count };
    });

    try {
      const res = await fetch(`/api/cart?id=${id}`, { method: "DELETE" });
      if (res.ok) setCart((await res.json()) as CartState);
    } catch {
      /* silently handled */
    }
  }, []);

  const clearCart = useCallback(async () => {
    setCart(EMPTY);
    try {
      const res = await fetch("/api/cart", { method: "DELETE" });
      if (res.ok) setCart((await res.json()) as CartState);
    } catch {
      /* silently handled */
    }
  }, []);

  const toggleWishlist = useCallback(
    (productId: number) => {
      setWishlist((prev) => {
        const next = prev.includes(productId) ? prev.filter((i) => i !== productId) : [...prev, productId];
        try {
          window.localStorage.setItem("nlc_wishlist", JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
      pushToast(wishlist.includes(productId) ? "Removed from wishlist" : "Saved to wishlist");
    },
    [pushToast, wishlist],
  );

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      busyProductId,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      openCart: () => setCartOpen(true),
      wishlist,
      toggleWishlist,
      openProduct: (p) => setProduct(p),
      openDoctor: (d) => setDoctor(d),
      openAuth: () => setAuthOpen(true),
      pushToast,
    }),
    [cart, busyProductId, addToCart, updateQty, removeItem, clearCart, wishlist, toggleWishlist, pushToast],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ProductModal product={product} onClose={() => setProduct(null)} />
      <DoctorModal doctor={doctor} onClose={() => setDoctor(null)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <Toasts toasts={toasts} />
      <FloatingCheckoutBar />
    </StoreContext.Provider>
  );
}
