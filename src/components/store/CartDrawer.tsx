"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { rupees } from "@/lib/types";
import { useStore } from "./StoreProvider";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, updateQty, removeItem, clearCart, pushToast } = useStore();
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const shipping = cart.subtotal > 0 && cart.subtotal < 500 ? 49 : 0;
  const total = cart.subtotal + shipping;

  const orderLines = cart.items
    .map((item) => `• ${item.quantity}x ${item.name} (${rupees(item.price * item.quantity)})`)
    .join("\n");
  const waText = encodeURIComponent(
    `Namaste Dr. N.K. Sharma / NLC Herbal,\nI would like to place an order from your website:\n\n${orderLines}\n\nTotal Amount: ${rupees(total)}\n\nPlease confirm my order and share delivery details.`
  );
  const waUrl = `https://wa.me/919306737990?text=${waText}`;

  const checkout = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 900));
    await clearCart();
    setPlacing(false);
    pushToast("Order placed! We'll email your invoice shortly.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="animate-fade absolute inset-0 bg-[#07251a]/55 backdrop-blur-[3px]" onClick={onClose} />
      <aside className="animate-slide-in-right absolute top-0 right-0 flex h-full w-[min(100vw,420px)] flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#e3ece4] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={19} className="text-[#0d5c37]" />
            <h3 className="font-display text-base font-bold">Your Cart ({cart.count})</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-8 w-8 place-items-center rounded-full border border-[#e3ece4] transition hover:rotate-90 hover:border-[#0d5c37] hover:text-[#0d5c37]"
          >
            <X size={15} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#eaf4ea]">
                <ShoppingBag size={24} className="text-[#0d5c37]" />
              </div>
              <p className="font-display font-semibold">Your cart is empty</p>
              <p className="max-w-[240px] text-sm text-[#5e6f66]">
                Add herbal products and they will show up here.
              </p>
              <button onClick={onClose} className="btn btn-primary mt-1 px-6 py-2.5 text-sm">
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-[#e3ece4] bg-white p-3 transition hover:border-[#c9e0cd]"
                >
                  <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#f3f8f2]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-1.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold">{item.name}</p>
                    <p className="text-[11px] text-[#5e6f66]">{item.category}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 rounded-full border border-[#e3ece4] px-1 py-0.5">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease"
                          className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-[#eaf4ea] hover:text-[#0d5c37]"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          aria-label="Increase"
                          className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-[#eaf4ea] hover:text-[#0d5c37]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#0d5c37]">{rupees(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove"
                    className="self-start text-[#a9b6ae] transition hover:scale-110 hover:text-[#b3261e]"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.items.length > 0 && (
          <footer className="border-t border-[#e3ece4] bg-[#f7fbf6] px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5e6f66]">Subtotal</span>
              <span className="font-semibold">{rupees(cart.subtotal)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-[#5e6f66]">Shipping</span>
              <span className="font-semibold">{shipping === 0 ? "Free" : rupees(shipping)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-dashed border-[#d6e4d6] pt-2">
              <span className="font-display font-bold">Total</span>
              <span className="font-display text-lg font-extrabold text-[#0d5c37]">
                {rupees(total)}
              </span>
            </div>
            <button
              onClick={checkout}
              disabled={placing}
              className="btn btn-primary mt-3 w-full py-3 text-sm disabled:opacity-70"
            >
              {placing ? "Placing order…" : "Proceed to Checkout"}
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-[13px] font-bold text-white shadow-xs transition hover:bg-[#20ba59] hover:shadow-sm"
            >
              <MessageCircle size={16} className="fill-white" />
              Quick Order via WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="mt-2.5 w-full text-center text-xs font-medium text-[#5e6f66] underline-offset-2 transition hover:text-[#b3261e] hover:underline"
            >
              Clear cart
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
