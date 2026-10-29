"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useStore } from "@/components/store/StoreProvider";

export default function ContactForm() {
  const { pushToast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not send your message");
      setForm({ name: "", email: "", subject: "", message: "" });
      pushToast("Thanks! Our team will get back to you shortly.");
    } catch (err) {
      pushToast((err as Error).message, "error");
    } finally {
      setBusy(false);
    }
  };

  const input =
    "w-full rounded-lg border border-[#e3ece4] px-3.5 py-2.5 text-[13px] outline-none transition focus:border-[#0d5c37] focus:ring-2 focus:ring-[#0d5c37]/15";

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-2xl border border-[#e4eee3] bg-white p-6 sm:grid-cols-2">
      <input
        required
        className={input}
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        required
        type="email"
        className={input}
        placeholder="Email address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className={`${input} sm:col-span-2`}
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <textarea
        required
        rows={5}
        className={`${input} resize-none sm:col-span-2`}
        placeholder="How can we help you?"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button type="submit" disabled={busy} className="btn btn-primary w-fit px-6 py-3 text-[13px] disabled:opacity-70">
        <Send size={14} />
        {busy ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
