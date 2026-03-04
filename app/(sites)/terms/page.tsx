import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, Mail, Phone, FileText } from "lucide-react";
import { termsSections, termsMeta, type TermsBlock } from "@/lib/Termsdata";
import Reveal from "@/components/UI/Reveal";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Terms & Conditions — Lanark Fine Tiles & Stone",
  description:
    "Read the Terms and Conditions governing the use of Lanark Fine Tiles & Stone's website and services.",
};

// ─── Block renderer ───────────────────────────────────────────────────────────

function renderBlock(block: TermsBlock, i: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={i} className="flex flex-col gap-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--color-primary)" }}
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div
          key={i}
          className="flex items-start gap-3 p-4 rounded-xl text-sm leading-relaxed"
          style={{
            background: "rgba(192,103,30,0.06)",
            border: "1px solid rgba(192,103,30,0.18)",
            color: "var(--text-muted)",
          }}
        >
          <span
            className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
            style={{ background: "rgba(192,103,30,0.15)", color: "var(--color-primary)" }}
          >
            i
          </span>
          {block.text}
        </div>
      );
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <main className="bg-[var(--background)] overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[320px] md:h-[400px] overflow-hidden">
        <Image
          src="/assets/images/bg/serviceCardBg2_1.jpg"
          alt="Terms and Conditions"
          fill className="object-cover scale-105" priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: "var(--color-primary)" }} />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-14">
          <Reveal delay={0.1}>
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-5 font-medium tracking-wide">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">Terms & Conditions</span>
            </nav>
          </Reveal>

          <Reveal delay={0.2} >
            <span
              className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-4 w-fit"
              style={{ background: "rgba(192,103,30,0.2)", color: "var(--color-primary)", border: "1px solid rgba(192,103,30,0.35)" }}
            >
              Legal
            </span>
          </Reveal>

          <Reveal delay={0.3} >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              Terms & Conditions
            </h1>
          </Reveal>

          <Reveal delay={0.4} >
            <p className="text-white/55 text-sm md:text-base">
              Last updated: <span className="text-white/80 font-medium">{termsMeta.lastUpdated}</span>
              &nbsp;·&nbsp; Effective: <span className="text-white/80 font-medium">{termsMeta.effectiveDate}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── MAIN ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-16">

          {/* LEFT — Sections */}
          <div className="flex flex-col gap-14">

            {/* Intro blurb */}
            <Reveal delay={0.1} >
              <div
                className="p-6 rounded-2xl border flex items-start gap-4"
                style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(192,103,30,0.12)" }}
                >
                  <FileText className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-foreground)" }}>
                    Please read these terms carefully
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    These Terms and Conditions govern your relationship with {termsMeta.companyName}.
                    By using our website or services you agree to these terms. If you have any questions,{" "}
                    <Link href="/contact" className="underline underline-offset-2" style={{ color: "var(--color-primary)" }}>
                      contact us
                    </Link>{" "}
                    before proceeding.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* All sections */}
            {termsSections.map((section, secIdx) => (
              <section key={section.slug} id={section.slug} className="scroll-mt-24">

                <Reveal delay={0.1} >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-px" style={{ background: "var(--color-primary)" }} />
                    <span
                      className="text-[10px] font-bold tracking-[0.25em] uppercase"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Section {secIdx + 1}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <h2
                    className="text-2xl font-extrabold mb-6"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {section.title}
                  </h2>
                </Reveal>

                <Reveal delay={0.2} >
                  <div className="flex flex-col gap-4">
                    {section.content.map((block, i) => renderBlock(block, i))}
                  </div>
                </Reveal>

                {secIdx < termsSections.length - 1 && (
                  <div className="mt-14 h-px" style={{ background: "var(--color-border)" }} />
                )}
              </section>
            ))}
          </div>

          {/* RIGHT — Sticky Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">

              {/* Section nav */}
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
                  <ul className="p-3 flex flex-col gap-0.5">
                    {termsSections.map((section, i) => (
                      <li key={section.slug}>
                        <a
                          href={`#${section.slug}`}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                            style={{ background: "rgba(192,103,30,0.1)", color: "var(--color-primary)" }}
                          >
                            {i + 1}
                          </span>
                          <span className="flex-1 leading-snug">{section.title}</span>
                          <ChevronRight
                            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
                            style={{ color: "var(--color-primary)" }}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Also see */}
              <Reveal delay={0.32} >
                <div
                  className="rounded-2xl p-5 border"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
                    Also See
                  </p>
                  <Link
                    href="/privacy"
                    className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary)" }} />
                    Privacy Policy
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" style={{ color: "var(--color-primary)" }} />
                  </Link>
                </div>
              </Reveal>

              {/* Contact card */}
              <Reveal delay={0.44} >
                <div
                  className="rounded-2xl p-6 text-white relative overflow-hidden"
                  style={{ background: "var(--color-primary)" }}
                >
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
                  <div className="relative z-10">
                    <h3 className="font-extrabold text-base mb-1">Have a question?</h3>
                    <p className="text-white/70 text-xs leading-relaxed mb-4">
                      Our team is happy to explain any part of our terms in plain language.
                    </p>
                    <div className="flex flex-col gap-2.5">
                      <a
                        href={`mailto:${termsMeta.contactEmail}`}
                        className="flex items-center gap-2 text-white/80 hover:text-white text-xs transition"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" /> {termsMeta.contactEmail}
                      </a>
                      <a
                        href={`tel:${termsMeta.contactPhone.replace(/\D/g, "")}`}
                        className="flex items-center gap-2 text-white/80 hover:text-white text-xs transition"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" /> {termsMeta.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>
          </aside>
        </div>
      </div>

      {/* ── BOTTOM STRIP ──────────────────────────────────────────────────── */}
      <section
        className="py-16 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--surface)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Reveal delay={0.1} >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              &copy; {new Date().getFullYear()} {termsMeta.companyName}. All rights reserved.
            </p>
          </Reveal>
          <Reveal delay={0.2} >
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--text-muted)" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "var(--color-primary)" }}
              >
                Contact Us <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}