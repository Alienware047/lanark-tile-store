import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, Mail, ArrowRight } from "lucide-react";
import { allFaqCategories } from "@/lib/faqdata";
import Reveal from "@/components/UI/Reveal";
import FaqAccordion from "@/components/sections/FaqAccordion";

// ─── Page ─────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "FAQs — Lanark Fine Tiles & Stone",
  description:
    "Answers to common questions about installation, materials, pricing, aftercare, and commercial projects.",
};

export default function FaqPage() {
  return (
    <main className="bg-[var(--background)] overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[360px] md:h-[440px] overflow-hidden">
        <Image
          src="/assets/images/bg/serviceCardBg2_1.jpg"
          alt="Frequently Asked Questions"
          fill className="object-cover scale-105" priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: "var(--color-primary)" }} />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-14">
          <Reveal delay={0.1} >
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-5 font-medium tracking-wide">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">FAQs</span>
            </nav>
          </Reveal>

          <Reveal delay={0.2} >
            <span
              className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-4 w-fit"
              style={{ background: "rgba(192,103,30,0.2)", color: "var(--color-primary)", border: "1px solid rgba(192,103,30,0.35)" }}
            >
              Help Centre
            </span>
          </Reveal>

          <Reveal delay={0.32}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              Frequently Asked Questions
            </h1>
          </Reveal>

          <Reveal delay={0.44} >
            <p className="text-white/60 text-base md:text-lg italic">
              Everything you need to know — answered plainly and honestly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CATEGORY NAV STRIP ────────────────────────────────────────────── */}
      <div
        className="border-b sticky top-0 z-30 backdrop-blur-md"
        style={{ background: "var(--surface)", borderColor: "var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {allFaqCategories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 0.07} >
                <a
                  href={`#${cat.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:opacity-100"
                  style={{
                    background: "var(--color-card)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="relative w-4 h-4 shrink-0">
                    <Image src={cat.icon} alt="" fill sizes="16px" className="object-contain" unoptimized />
                  </div>
                  {cat.title}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_340px] gap-16">

          {/* LEFT — FAQ Categories */}
          <div className="flex flex-col gap-16">
            {allFaqCategories.map((cat, catIdx) => (
              <section key={cat.slug} id={cat.slug} className="scroll-mt-20">

                {/* Category heading */}
                <Reveal delay={0.1} >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-px" style={{ background: "var(--color-primary)" }} />
                    <span
                      className="text-xs font-bold tracking-[0.25em] uppercase"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {cat.title}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="flex items-start gap-4 mb-8">
                    <div className="relative w-10 h-10 shrink-0 mt-0.5">
                      <Image
                        src={cat.icon} alt={cat.title} fill sizes="40px"
                        className="object-contain" unoptimized
                      />
                    </div>
                    <div>
                      <h2
                        className="text-2xl md:text-3xl font-extrabold mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {cat.title}
                      </h2>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Accordion — client component */}
                <Reveal delay={0.22 + catIdx * 0.04}>
                  <FaqAccordion category={cat} />
                </Reveal>

              </section>
            ))}
          </div>

          {/* RIGHT — Sticky Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">

              {/* Jump-to nav */}
              <Reveal delay={0.2} >
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}
                >
                  <div
                    className="px-6 py-4 border-b"
                    style={{ borderColor: "var(--color-border)", background: "var(--surface)" }}
                  >
                    <h3 className="font-bold text-sm" style={{ color: "var(--color-foreground)" }}>
                      Jump to Section
                    </h3>
                  </div>
                  <ul className="p-3 flex flex-col gap-1">
                    {allFaqCategories.map((cat) => (
                      <li key={cat.slug}>
                        <a
                          href={`#${cat.slug}`}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <div className="relative w-5 h-5 shrink-0">
                            <Image
                              src={cat.icon} alt="" fill sizes="20px"
                              className="object-contain" unoptimized
                            />
                          </div>
                          <span className="flex-1">{cat.title}</span>
                          <ChevronRight
                            className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition"
                            style={{ color: "var(--color-primary)" }}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Still have questions card */}
              <Reveal delay={0.35} >
                <div
                  className="rounded-2xl p-6 border"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "rgba(192,103,30,0.12)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="#c0671e" strokeWidth="1.5" />
                      <path d="M10 6v5M10 13.5v.5" stroke="#c0671e" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Still have a question?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                    Can't find the answer you're looking for? Reach out directly — we usually respond within a few hours.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Contact us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>

              {/* CTA card */}
              <Reveal delay={0.48} >
                <div
                  className="rounded-2xl p-7 text-white relative overflow-hidden"
                  style={{ background: "var(--color-primary)" }}
                >
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-extrabold mb-2">Ready to get started?</h3>
                    <p className="text-white/75 text-sm leading-relaxed mb-6">
                      Get a free, no-obligation quote for your project within 24 hours.
                    </p>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white font-bold text-sm transition-all hover:bg-white/90"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Get Free Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="mt-4 flex flex-col gap-2">
                      <a href="tel:+12086660112" className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition">
                        <Phone className="w-4 h-4 shrink-0" /> +208-666-0112
                      </a>
                      <a href="mailto:floremh@gmail.com" className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition">
                        <Mail className="w-4 h-4 shrink-0" /> floremh@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>
          </aside>

        </div>
      </div>

      {/* ── BOTTOM CTA STRIP ──────────────────────────────────────────────── */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--surface)" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-px" style={{ background: "var(--color-primary)" }} />
              <span
                className="text-xs font-bold tracking-[0.25em] uppercase"
                style={{ color: "var(--color-primary)" }}
              >
                Not Sure Yet?
              </span>
              <div className="w-10 h-px" style={{ background: "var(--color-primary)" }} />
            </div>
          </Reveal>

          <Reveal delay={0.18} >
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{ color: "var(--color-foreground)" }}
            >
              Browse our services first
            </h2>
          </Reveal>

          <Reveal delay={0.26}>
            <p
              className="text-base leading-relaxed max-w-xl mx-auto mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              Each service page has its own tailored FAQ section, process breakdown, and specification details.
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all hover:opacity-90"
              style={{ background: "var(--color-primary)", color: "#fff" }}
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

    </main>
  );
}