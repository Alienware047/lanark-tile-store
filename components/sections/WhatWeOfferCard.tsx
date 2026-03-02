"use client";

import Image from "next/image";
import { offerings } from "@/lib/offerings";
import Reveal from "@/components/UI/Reveal";

export default function WhatWeOfferCard() {
  return (
    <section className="relative py-28 bg-[var(--background)] overflow-hidden">

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-main) 1px, transparent 1px), linear-gradient(90deg, var(--text-main) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[var(--color-primary)] opacity-[0.06] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <Reveal type="fade" duration={600}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[var(--color-primary)]" />
                <span className="text-[var(--color-primary)] text-xs font-bold tracking-[0.3em] uppercase">
                  Our Expertise
                </span>
              </div>
            </Reveal>
            <Reveal type="slide-up" duration={700} delay={100}>
              <h2
                className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                What We
                <span className="block text-[var(--color-primary)] italic">Offer</span>
              </h2>
            </Reveal>
          </div>

          <Reveal type="fade" duration={600} delay={200}>
            <div className="border-l-2 border-[var(--color-primary)] pl-6">
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                Premium flooring solutions engineered for exceptional spaces — where
                craftsmanship meets lasting elegance.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-primary)] bg-opacity-20 rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(var(--color-primary-rgb,192,103,30),0.15)]">
          {offerings.map((item, idx) => (
            <Reveal key={idx} type="slide-up" duration={600} delay={idx * 120}>
              <div className="group relative flex flex-col bg-[var(--background)] p-8 min-h-[420px] overflow-hidden cursor-pointer transition-all duration-500 hover:bg-[var(--surface,#f9f7f4)]">

                {/* Hover image reveal — bottom to top */}
                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    sizes="400px"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                </div>

                {/* Index number — decorative */}
                <div
                  className="absolute top-6 right-8 text-6xl font-bold leading-none select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                  style={{
                    color: "var(--color-primary)",
                    opacity: 0.08,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">

                  {/* Icon */}
                  <div className="mb-7">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-500"
                      style={{
                        borderColor: "rgba(192,103,30,0.25)",
                        background: "rgba(192,103,30,0.06)",
                      }}
                    >
                      {/* FIX: SVG needs fill wrapper + unoptimized */}
                      <div className="relative w-7 h-7">
                        <Image
                          src={item.icon}
                          alt=""
                          fill
                          sizes="28px"
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-3 text-[var(--text-main)] group-hover:text-white transition-colors duration-500"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {item.title}
                  </h3>

                  {/* Divider line */}
                  <div className="w-8 h-px bg-[var(--color-primary)] mb-4 transition-all duration-500 group-hover:w-14" />

                  {/* Description */}
                  <p className="text-[var(--text-muted)] group-hover:text-white/70 text-sm leading-relaxed mb-6 transition-colors duration-500">
                    {item.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-auto space-y-2">
                    {item.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2.5 text-sm text-[var(--text-muted)] group-hover:text-white/80 transition-colors duration-500"
                        style={{ transitionDelay: `${i * 30}ms` }}
                      >
                        <svg
                          width="14" height="14" viewBox="0 0 14 14" fill="none"
                          className="shrink-0 text-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors"
                        >
                          <polygon points="7,0 14,7 7,14 0,7" fill="currentColor" opacity="0.9" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Learn more — appears on hover */}
                  <div className="mt-6 flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                      Explore
                    </span>
                    <div className="flex-1 h-px bg-[var(--color-primary)] opacity-50" />
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <Reveal type="fade" duration={600} delay={400}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-[var(--color-primary)] border-opacity-20">
            <p className="text-[var(--text-muted)] text-sm tracking-wide">
              Trusted by architects, designers & homeowners across the region.
            </p>
            <button className="btn-primary whitespace-nowrap">
              View Full Catalogue
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}