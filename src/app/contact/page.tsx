import { Clock, Leaf, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { Eyebrow, SectionTitle } from "@/components/ui/Section";

export const metadata = { title: "Contact — NLC Herbal" };

const INFO = [
  { icon: Phone, title: "Call Us", lines: ["+91 93067 37990", "Mon – Sat, 9 AM – 7 PM"] },
  { icon: Mail, title: "Email Us", lines: ["info@nlcherbal.in", "www.nlcherbal.com"] },
  { icon: MapPin, title: "Clinic Address", lines: ["New Life Clinic (Dr. N.K. Sharma)", "ALG-21, Pushpa Complex, Hisar (Hry.)"] },
  { icon: Clock, title: "Doctor Support", lines: ["Online consultations", "Every day, 8 AM – 9 PM"] },
];

export default function ContactPage() {
  return (
    <>
      <section className="hero-grad relative overflow-hidden py-12">
        <Leaf className="animate-sway absolute top-4 -left-4 h-28 w-28 text-[#bedcbd]/35" />
        <div className="mx-auto max-w-[1380px] px-4 text-center">
          <Reveal>
            <Eyebrow>Help Center</Eyebrow>
            <SectionTitle className="mt-1.5">We&apos;re Here to Help You</SectionTitle>
            <p className="mx-auto mt-2 max-w-[460px] text-[13px] leading-relaxed text-[#5e6f66]">
              Questions about a product, an order or a consultation? Send us a message and our wellness team will reply
              within one working day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-[1380px] gap-6 px-4 lg:grid-cols-[1fr_1.3fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {INFO.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className="card-hover group flex h-full items-start gap-3 rounded-xl border border-[#e4eee3] bg-[#f6faf5] p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#0d5c37] transition-transform duration-300 group-hover:scale-110">
                    <c.icon size={17} />
                  </span>
                  <span>
                    <span className="font-display block text-[13.5px] font-bold">{c.title}</span>
                    {c.lines.map((l) => (
                      <span key={l} className="mt-0.5 block text-[12px] text-[#5e6f66]">
                        {l}
                      </span>
                    ))}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="right" delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
