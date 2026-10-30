import { Award, CreditCard, Headphones, Heart, Leaf, ShieldCheck, Star, Truck } from "lucide-react";
import Reveal from "@/components/Reveal";

const BASE = [
  { icon: Star, title: "5.0 ★ Rated", sub: "Google Maps & Justdial" },
  { icon: Leaf, title: "100% Herbal", sub: "Zero Side Effects" },
  { icon: Award, title: "Est. 2015", sub: "10+ Years in Hisar" },
  { icon: Headphones, title: "Dr. N.K. Sharma", sub: "Direct Doctor Care" },
  { icon: ShieldCheck, title: "Bina Operation", sub: "Non-Surgical Care" },
];

const SHOP = [
  { icon: Star, title: "5.0 ★ Rated", sub: "Google Maps & Justdial" },
  { icon: Leaf, title: "100% Natural", sub: "Ingredients" },
  { icon: ShieldCheck, title: "Quality Assured", sub: "FSSAI & GMP Certified" },
  { icon: Truck, title: "Free Shipping", sub: "Above ₹500" },
  { icon: Headphones, title: "Clinic Helpline", sub: "+91 93067 37990" },
  { icon: CreditCard, title: "Secure Checkout", sub: "UPI, Cards & COD" },
];

export default function TrustStrip({ variant = "home" }: { variant?: "home" | "shop" }) {
  const items = variant === "shop" ? SHOP : BASE;
  return (
    <section className="border-y border-[#eef3ed] bg-white py-7">
      <div
        className={`mx-auto grid max-w-[1380px] grid-cols-2 gap-5 px-4 sm:grid-cols-3 ${
          variant === "shop" ? "lg:grid-cols-6" : "lg:grid-cols-5"
        }`}
      >
        {items.map((f, i) => (
          <Reveal key={f.title} delay={i * 70}>
            <div className="group flex items-center justify-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#dceadb] bg-[#f4faf3] text-[#0d5c37] transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-[#0d5c37] group-hover:text-white">
                <f.icon size={17} />
              </span>
              <span className="text-[11.5px] leading-tight font-semibold">
                {f.title}
                <br />
                <span className="font-medium text-[#5e6f66]">{f.sub}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
