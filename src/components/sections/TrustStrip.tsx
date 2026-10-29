import { CreditCard, Headphones, Heart, Leaf, ShieldCheck, Truck } from "lucide-react";
import Reveal from "@/components/Reveal";

const BASE = [
  { icon: Leaf, title: "100% Natural", sub: "Ingredients" },
  { icon: ShieldCheck, title: "Quality", sub: "Assured" },
  { icon: Truck, title: "Fast & Reliable", sub: "Shipping" },
  { icon: Headphones, title: "Expert Doctor", sub: "Support" },
  { icon: Heart, title: "Your Wellness", sub: "Our Priority" },
];

const SHOP = [
  { icon: Leaf, title: "100% Natural", sub: "Ingredients" },
  { icon: ShieldCheck, title: "Quality", sub: "Assured" },
  { icon: Truck, title: "Free Shipping", sub: "Above ₹500" },
  { icon: Headphones, title: "Expert Doctor", sub: "Support" },
  { icon: CreditCard, title: "Secure", sub: "Payments" },
  { icon: Heart, title: "Your Wellness", sub: "Our Priority" },
];

export default function TrustStrip({ variant = "home" }: { variant?: "home" | "shop" }) {
  const items = variant === "shop" ? SHOP : BASE;
  return (
    <section className="border-y border-[#eef3ed] bg-white py-7">
      <div
        className={`mx-auto grid max-w-[1240px] grid-cols-2 gap-5 px-4 sm:grid-cols-3 ${
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
