"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingUp,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { rupees } from "@/lib/types";

type Appointment = {
  id: number;
  doctorId: number | null;
  doctorName: string;
  patientName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  slot: string;
  reason: string;
  status: string;
  createdAt: string;
};

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

type Subscriber = {
  id: number;
  email: string;
  createdAt: string;
};

type AdminProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  mrp: number;
  rating: string;
  image: string;
  badge?: string | null;
  inStock?: boolean;
};

const SAMPLE_PRODUCTS: AdminProduct[] = [
  {
    id: 1,
    name: "Kamdev Power",
    category: "Immunity & Vitality",
    price: 2499,
    mrp: 2999,
    rating: "4.9",
    image: "/images/kamdev-power.jpg",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 2,
    name: "Original Swarn Shilajit",
    category: "Immunity & Vitality",
    price: 1799,
    mrp: 2100,
    rating: "4.9",
    image: "/images/swarn-shilajit.jpg",
    badge: "Original",
    inStock: true,
  },
  {
    id: 3,
    name: "Swarn Shilajit (200g Pack)",
    category: "Ayurvedic Herbs",
    price: 1799,
    mrp: 2100,
    rating: "4.9",
    image: "/images/swarn-shilajit-back.jpg",
    badge: "200g Jar",
    inStock: true,
  },
  {
    id: 4,
    name: "Herbal Cough Powder",
    category: "Immunity & Vitality",
    price: 350,
    mrp: 450,
    rating: "4.6",
    image: "/images/herbal-cough-powder.png",
    badge: null,
    inStock: true,
  },
];

export default function AdminPage() {
  const [tab, setTab] = useState<"appointments" | "products" | "contacts" | "subscribers">("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [apptRes, contRes, subRes] = await Promise.all([
        fetch("/api/appointments").then((r) => r.json()).catch(() => ({ appointments: [] })),
        fetch("/api/contact").then((r) => r.json()).catch(() => ({ messages: [] })),
        fetch("/api/newsletter").then((r) => r.json()).catch(() => ({ subscribers: [] })),
      ]);
      setAppointments(apptRes.appointments ?? []);
      setContacts(contRes.messages ?? []);
      setSubscribers(subRes.subscribers ?? []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateApptStatus = async (id: number, status: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    try {
      await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch {
      /* ignore */
    }
  };

  const filteredAppointments = appointments.filter(
    (a) =>
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f7f4] text-[#16241d]">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#dde8dc] bg-white shadow-xs">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0d5c37] text-white shadow-sm">
              <ShieldCheck size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-base font-bold tracking-tight">NLC Herbal Admin</h1>
                <span className="rounded-full bg-[#eaf4ea] px-2 py-0.5 text-[10px] font-bold text-[#0d5c37]">
                  Live Control
                </span>
              </div>
              <p className="text-[11px] text-[#5e6f66]">Doctor Appointments & Store Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              title="Refresh Data"
              className="flex items-center gap-1.5 rounded-lg border border-[#dde8dc] bg-white px-3 py-1.5 text-xs font-semibold text-[#2c3b33] transition hover:bg-[#f0f6ef]"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-[#0d5c37]" : ""} />
              Refresh
            </button>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg bg-[#0d5c37] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#094227]"
            >
              View Site <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-[1380px] px-4 py-6 sm:px-6">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#e2ece1] bg-white p-4.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5e6f66]">Total Appointments</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf4ea] text-[#0d5c37]">
                <CalendarDays size={16} />
              </span>
            </div>
            <p className="font-display mt-2 text-2xl font-extrabold text-[#16241d]">{appointments.length}</p>
            <p className="mt-1 text-[11px] text-[#0d5c37] font-semibold">Scheduled Patients</p>
          </div>

          <div className="rounded-2xl border border-[#e2ece1] bg-white p-4.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5e6f66]">Active Products</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf4ea] text-[#0d5c37]">
                <Package size={16} />
              </span>
            </div>
            <p className="font-display mt-2 text-2xl font-extrabold text-[#16241d]">{SAMPLE_PRODUCTS.length}</p>
            <p className="mt-1 text-[11px] text-[#0d5c37] font-semibold">In Herbal Catalog</p>
          </div>

          <div className="rounded-2xl border border-[#e2ece1] bg-white p-4.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5e6f66]">Customer Enquiries</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf4ea] text-[#0d5c37]">
                <Mail size={16} />
              </span>
            </div>
            <p className="font-display mt-2 text-2xl font-extrabold text-[#16241d]">{contacts.length}</p>
            <p className="mt-1 text-[11px] text-[#5e6f66]">From Contact Us</p>
          </div>

          <div className="rounded-2xl border border-[#e2ece1] bg-white p-4.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5e6f66]">Subscribers</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf4ea] text-[#0d5c37]">
                <TrendingUp size={16} />
              </span>
            </div>
            <p className="font-display mt-2 text-2xl font-extrabold text-[#16241d]">{subscribers.length}</p>
            <p className="mt-1 text-[11px] text-[#5e6f66]">Email Newsletter</p>
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#dde8dc] pb-4">
          <div className="flex items-center gap-1 rounded-xl bg-white p-1 border border-[#e2ece1] shadow-xs">
            <button
              onClick={() => setTab("appointments")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                tab === "appointments"
                  ? "bg-[#0d5c37] text-white shadow-sm"
                  : "text-[#5e6f66] hover:text-[#16241d]"
              }`}
            >
              <CalendarDays size={14} />
              Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setTab("products")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                tab === "products"
                  ? "bg-[#0d5c37] text-white shadow-sm"
                  : "text-[#5e6f66] hover:text-[#16241d]"
              }`}
            >
              <Package size={14} />
              Products ({SAMPLE_PRODUCTS.length})
            </button>
            <button
              onClick={() => setTab("contacts")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                tab === "contacts"
                  ? "bg-[#0d5c37] text-white shadow-sm"
                  : "text-[#5e6f66] hover:text-[#16241d]"
              }`}
            >
              <Mail size={14} />
              Enquiries ({contacts.length})
            </button>
            <button
              onClick={() => setTab("subscribers")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                tab === "subscribers"
                  ? "bg-[#0d5c37] text-white shadow-sm"
                  : "text-[#5e6f66] hover:text-[#16241d]"
              }`}
            >
              <Users size={14} />
              Subscribers ({subscribers.length})
            </button>
          </div>

          {tab === "appointments" && (
            <div className="flex items-center gap-2 rounded-xl border border-[#dde8dc] bg-white px-3 py-1.5 shadow-xs">
              <Search size={14} className="text-[#88998f]" />
              <input
                type="text"
                placeholder="Search patient or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48 bg-transparent text-xs outline-none placeholder:text-[#9aa79f] sm:w-64"
              />
            </div>
          )}
        </div>

        {/* Tab 1: Appointments Table */}
        {tab === "appointments" && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#e2ece1] bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#e8efe8] bg-[#f9fbf9] text-[11px] font-bold text-[#5e6f66] uppercase">
                  <tr>
                    <th className="px-5 py-3.5">Patient Details</th>
                    <th className="px-5 py-3.5">Doctor & Speciality</th>
                    <th className="px-5 py-3.5">Date & Slot</th>
                    <th className="px-5 py-3.5">Reason / Concern</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eef4ee]">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-sm text-[#5e6f66]">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((a) => (
                      <tr key={a.id} className="transition hover:bg-[#fbfdfb]">
                        <td className="px-5 py-3.5">
                          <p className="font-bold text-[#16241d]">{a.patientName}</p>
                          <div className="mt-1 flex items-center gap-2 text-[11px] text-[#5e6f66]">
                            <span className="flex items-center gap-1">
                              <Phone size={11} className="text-[#0d5c37]" /> {a.phone || "N/A"}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Mail size={11} /> {a.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-[#0d5c37]">{a.doctorName}</p>
                          <p className="text-[11px] text-[#5e6f66]">Ayurvedic Expert</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-[#16241d]">{a.appointmentDate}</p>
                          <span className="mt-0.5 inline-flex items-center gap-1 rounded-md bg-[#eaf4ea] px-2 py-0.5 text-[10.5px] font-bold text-[#0d5c37]">
                            <Clock size={11} /> {a.slot}
                          </span>
                        </td>
                        <td className="max-w-[220px] px-5 py-3.5 text-[#5e6f66]">
                          <p className="line-clamp-2">{a.reason || "General Consultation"}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                              a.status === "confirmed"
                                ? "bg-[#e2f5e8] text-[#0d5c37]"
                                : a.status === "completed"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {a.status !== "completed" && (
                              <button
                                onClick={() => updateApptStatus(a.id, "completed")}
                                title="Mark Completed"
                                className="grid h-7 w-7 place-items-center rounded-lg border border-[#cbe4d0] text-[#0d5c37] transition hover:bg-[#eaf4ea]"
                              >
                                <CheckCircle2 size={14} />
                              </button>
                            )}
                            {a.status !== "cancelled" && (
                              <button
                                onClick={() => updateApptStatus(a.id, "cancelled")}
                                title="Cancel"
                                className="grid h-7 w-7 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                              >
                                <XCircle size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Products List */}
        {tab === "products" && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLE_PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="flex flex-col rounded-2xl border border-[#e2ece1] bg-white p-4 shadow-xs"
              >
                <div className="relative grid h-44 place-items-center overflow-hidden rounded-xl bg-[#f6faf5] p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                  {p.badge && (
                    <span className="absolute top-2 left-2 rounded-full bg-[#0d5c37] px-2 py-0.5 text-[9.5px] font-bold text-white uppercase">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-1 flex-col">
                  <span className="text-[10px] font-bold tracking-wide text-[#0d5c37] uppercase">{p.category}</span>
                  <h3 className="font-display mt-0.5 text-sm font-bold text-[#16241d]">{p.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0d5c37]">{rupees(p.price)}</span>
                      <span className="ml-1 text-[11px] text-[#9aa79f] line-through">{rupees(p.mrp)}</span>
                    </div>
                    <span className="rounded-md bg-[#eaf4ea] px-2 py-0.5 text-[10.5px] font-bold text-[#0d5c37]">
                      ★ {p.rating}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#f0f5ef] pt-3 text-[11px]">
                    <span className="text-[#0d5c37] font-semibold">● In Stock</span>
                    <Link href="/shop" className="font-bold text-[#0d5c37] hover:underline">
                      View in Store →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Enquiries */}
        {tab === "contacts" && (
          <div className="mt-4 divide-y divide-[#eef4ee] overflow-hidden rounded-2xl border border-[#e2ece1] bg-white shadow-xs">
            {contacts.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#5e6f66]">No contact enquiries yet.</div>
            ) : (
              contacts.map((c) => (
                <div key={c.id} className="p-5 transition hover:bg-[#fbfdfb]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eaf4ea] text-[#0d5c37]">
                        <User size={15} />
                      </span>
                      <div>
                        <p className="font-bold text-sm text-[#16241d]">{c.name}</p>
                        <p className="text-[11px] text-[#5e6f66]">{c.email}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#88998f]">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  {c.subject && <p className="mt-3 text-xs font-bold text-[#0d5c37]">Subject: {c.subject}</p>}
                  <p className="mt-1 text-xs leading-relaxed text-[#415349] bg-[#f8faf8] p-3 rounded-xl border border-[#edf3ed]">
                    {c.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Newsletter Subscribers */}
        {tab === "subscribers" && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#e2ece1] bg-white shadow-xs">
            <div className="p-4 border-b border-[#eef4ee] flex items-center justify-between">
              <p className="text-xs font-bold text-[#16241d]">Audience List for Email Marketing</p>
              <span className="text-xs text-[#0d5c37] font-semibold">{subscribers.length} Emails</span>
            </div>
            <ul className="divide-y divide-[#eef4ee]">
              {subscribers.length === 0 ? (
                <li className="p-6 text-center text-xs text-[#5e6f66]">No subscribers yet.</li>
              ) : (
                subscribers.map((s, idx) => (
                  <li key={s.id || idx} className="flex items-center justify-between px-5 py-3 text-xs">
                    <span className="font-semibold text-[#16241d]">{s.email}</span>
                    <span className="text-[11px] text-[#88998f]">{new Date(s.createdAt).toLocaleDateString()}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

