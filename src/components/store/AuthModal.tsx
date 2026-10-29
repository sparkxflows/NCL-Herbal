"use client";

import { useState } from "react";
import { Lock, Mail, Phone, ShieldCheck, User, X, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useStore } from "./StoreProvider";

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { pushToast } = useStore();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [remember, setRemember] = useState(true);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (tab === "login") {
        pushToast(`Welcome back${emailOrPhone ? `, ${emailOrPhone}` : ""}!`);
      } else {
        pushToast(`Account created successfully! Welcome to NLC Herbal.`);
      }
      onClose();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#07251a]/55 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* modal box */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#dceedb] bg-white shadow-2xl transition-all duration-300">
        {/* top header decoration */}
        <div className="relative bg-gradient-to-r from-[#0d5c37] via-[#116e43] to-[#0d5c37] px-6 py-6 text-white">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
              <User size={16} />
            </span>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#a5e0b6] uppercase">
              NLC Herbal Account
            </p>
          </div>
          <h2 className="font-display mt-2 text-xl font-bold">
            {tab === "login" ? "Sign in to your account" : "Create your free account"}
          </h2>
          <p className="mt-1 text-xs text-white/80">
            {tab === "login"
              ? "Access your doctor appointments, orders & wishlist"
              : "Get personalized Ayurvedic advice & special offers"}
          </p>

          {/* tab switcher */}
          <div className="mt-5 grid grid-cols-2 rounded-xl bg-black/20 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`rounded-lg py-2 transition ${
                tab === "login"
                  ? "bg-white text-[#0d5c37] shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={`rounded-lg py-2 transition ${
                tab === "register"
                  ? "bg-white text-[#0d5c37] shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* form body */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {tab === "register" && (
            <div>
              <label className="block text-xs font-semibold text-[#2c3b33]">
                Full Name
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#e1ece3] bg-[#f8faf8] px-3.5 py-2.5 transition focus-within:border-[#0d5c37] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0d5c37]/15">
                <User size={16} className="text-[#6c8374]" />
                <input
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#16241d] outline-none placeholder:text-[#9aa79f]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#2c3b33]">
              Email or Mobile Number
            </label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#e1ece3] bg-[#f8faf8] px-3.5 py-2.5 transition focus-within:border-[#0d5c37] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0d5c37]/15">
              <Mail size={16} className="text-[#6c8374]" />
              <input
                type="text"
                required
                placeholder="name@example.com or 9876543210"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full bg-transparent text-sm text-[#16241d] outline-none placeholder:text-[#9aa79f]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#2c3b33]">
                Password
              </label>
              {tab === "login" && (
                <button
                  type="button"
                  onClick={() => pushToast("Password reset link sent to your email/phone")}
                  className="text-[11px] font-semibold text-[#0d5c37] hover:underline"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#e1ece3] bg-[#f8faf8] px-3.5 py-2.5 transition focus-within:border-[#0d5c37] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0d5c37]/15">
              <Lock size={16} className="text-[#6c8374]" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-[#16241d] outline-none placeholder:text-[#9aa79f]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-[#9aa79f] hover:text-[#2c3b33]"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {tab === "login" && (
            <label className="flex cursor-pointer items-center gap-2 text-xs text-[#5e6f66]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-[#d6e7d5] text-[#0d5c37] accent-[#0d5c37]"
              />
              Keep me signed in
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-2 flex w-full items-center justify-center gap-2 py-3 text-sm font-bold shadow-md shadow-[#0d5c37]/20 disabled:opacity-60"
          >
            {loading ? (
              "Please wait..."
            ) : tab === "login" ? (
              <>
                Sign In <ArrowRight size={15} />
              </>
            ) : (
              <>
                Create Account <ArrowRight size={15} />
              </>
            )}
          </button>

          <div className="mt-4 flex items-center gap-2 text-center text-[11px] text-[#7d9284]">
            <ShieldCheck size={14} className="shrink-0 text-[#0d5c37]" />
            <span>100% Secure &amp; confidential Ayurvedic healthcare data</span>
          </div>
        </form>
      </div>
    </div>
  );
}

