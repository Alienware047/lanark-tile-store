import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Phone, Mail, ArrowRight, Star } from "lucide-react";
import { allServices } from "@/lib/serviceData";
import Reveal from "@/components/UI/Reveal";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const service = allServices.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <main className="bg-[var(--background)] overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[480px] md:h-[560px] overflow-hidden">
        <Image src={service.heroImg} alt={service.title} fill className="object-cover scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: "var(--color-primary)" }} />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16">
          {/* Breadcrumb slides in first */}
          <Reveal delay={0.1} direction="up">
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-5 font-medium tracking-wide">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-white transition">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">{service.title}</span>
            </nav>
          </Reveal>

          {/* Category badge */}
          <Reveal delay={0.2} direction="up">
            <span
              className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-4 w-fit"
              style={{ background: "rgba(192,103,30,0.2)", color: "var(--color-primary)", border: "1px solid rgba(192,103,30,0.35)" }}
            >
              {service.category}
            </span>
          </Reveal>

          {/* Title — biggest impact, slightly more delay */}
          <Reveal delay={0.3} direction="up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-3">
              {service.title}
            </h1>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={0.42} direction="up">
            <p className="text-white/60 text-lg md:text-xl italic">{service.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────────────── */}
      <div className="border-b" style={{ background: "var(--color-primary)", borderColor: "rgba(0,0,0,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-white/20">
          {service.stats.map((stat, i) => (
            <Reveal key={i} delay={0.1 + i * 0.12} direction="up">
              <div className="flex flex-col items-center py-2 px-4">
                <span className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</span>
                <span className="text-xs text-white/70 mt-0.5 tracking-wide">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-16">

          {/* LEFT — Main Content */}
          <div>

            {/* Overview */}
            <section className="mb-16">
              <Reveal delay={0.1} direction="up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-px" style={{ background: "var(--color-primary)" }} />
                  <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "var(--color-primary)" }}>Overview</span>
                </div>
              </Reveal>

              <Reveal delay={0.18} direction="up">
                <p className="text-lg leading-relaxed text-[var(--text-muted)] mb-8">{service.description}</p>
              </Reveal>

              <Reveal delay={0.26} direction="up">
                <div className="relative w-full h-[340px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl">
                  <Image src={service.thumb} alt={service.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </Reveal>
            </section>

            {/* Features */}
            <section className="mb-16">
              <Reveal delay={0.1} direction="up">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-px" style={{ background: "var(--color-primary)" }} />
                  <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "var(--color-primary)" }}>What's Included</span>
                </div>
              </Reveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feat, i) => (
                  <Reveal key={i} delay={0.08 + i * 0.07} direction="up">
                    <div
                      className="flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 hover:shadow-md"
                      style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}
                    >
                      <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--color-primary)" }} />
                      <span className="text-sm leading-snug text-[var(--color-foreground)]">{feat}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="mb-16">
              <Reveal delay={0.1} direction="up">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-px" style={{ background: "var(--color-primary)" }} />
                  <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "var(--color-primary)" }}>Our Process</span>
                </div>
              </Reveal>

              <div className="relative">
                <div className="absolute left-[27px] top-10 bottom-10 w-px hidden sm:block" style={{ background: "var(--color-border)" }} />
                <div className="flex flex-col gap-8">
                  {service.process.map((step, i) => (
                    <Reveal key={i} delay={i * 0.13} direction="left">
                      <div className="flex gap-6 items-start group">
                        <div
                          className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 border-2 transition-all duration-300 group-hover:scale-110"
                          style={{ background: "var(--color-card)", borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
                        >
                          {step.step}
                        </div>
                        <div className="pt-3">
                          <h4 className="font-bold text-lg mb-1 text-[var(--color-foreground)]">{step.title}</h4>
                          <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <Reveal delay={0.1} direction="up">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-px" style={{ background: "var(--color-primary)" }} />
                  <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "var(--color-primary)" }}>FAQs</span>
                </div>
              </Reveal>

              <div className="flex flex-col gap-4">
                {service.faqs.map((faq, i) => (
                  <Reveal key={i} delay={i * 0.1} direction="up">
                    <details
                      className="group rounded-xl border overflow-hidden"
                      style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}
                    >
                      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition select-none">
                        {faq.q}
                        <ChevronRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-open:rotate-90" style={{ color: "var(--color-primary)" }} />
                      </summary>
                      <div className="px-6 pb-5 text-sm text-[var(--text-muted)] leading-relaxed border-t" style={{ borderColor: "var(--color-border)" }}>
                        <p className="pt-4">{faq.a}</p>
                      </div>
                    </details>
                  </Reveal>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT — Sticky Sidebar */}
          <aside className="flex flex-col gap-6">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">

              {/* All Services nav */}
              <Reveal delay={0.2} direction="right">
                <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}>
                  <div className="px-6 py-4 border-b" style={{ borderColor: "var(--color-border)", background: "var(--surface)" }}>
                    <h3 className="font-bold text-[var(--color-foreground)]">All Services</h3>
                  </div>
                  <ul className="p-3 flex flex-col gap-1">
                    {allServices.map((s) => {
                      const isActive = s.slug === slug;
                      return (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group"
                            style={isActive ? { background: "var(--color-primary)", color: "#fff" } : { color: "var(--text-muted)" }}
                          >
                            <div className="relative w-5 h-5 shrink-0">
                              <Image
                                src={s.icon} alt="" fill sizes="20px"
                                className="object-contain" unoptimized
                                style={{ filter: isActive ? "brightness(0) invert(1)" : undefined }}
                              />
                            </div>
                            <span className="flex-1">{s.title}</span>
                            {!isActive && <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>

              {/* Review card */}
              <Reveal delay={0.35} direction="right">
                <div className="rounded-2xl p-6 border" style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed italic mb-3">
                    "Exceptional work from start to finish. The team was professional, clean, and the result is absolutely stunning."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: "var(--color-primary)" }}>J</div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-foreground)]">James R.</div>
                      <div className="text-xs text-[var(--text-muted)]">Verified Client</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* CTA card */}
              <Reveal delay={0.48} direction="right">
                <div className="rounded-2xl p-7 text-white relative overflow-hidden" style={{ background: "var(--color-primary)" }}>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-extrabold mb-2">Ready to get started?</h3>
                    <p className="text-white/75 text-sm leading-relaxed mb-6">Get a free, no-obligation quote for your project within 24 hours.</p>
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

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
      <section className="py-20 border-t" style={{ borderColor: "var(--color-border)", background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal delay={0.1} direction="up">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-px" style={{ background: "var(--color-primary)" }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "var(--color-primary)" }}>More Services</span>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={0.1 + i * 0.12} direction="up">
                <Link href={`/services/${s.slug}`} className="group relative rounded-2xl overflow-hidden h-[260px] block">
                  <Image src={s.thumb} alt={s.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300" style={{ background: "rgba(192,103,30,0.25)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-white font-bold text-lg mb-2">{s.title}</h4>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:text-white transition">
                      View Service <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}