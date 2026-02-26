"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/UI/Reveal";

const faqs = [
  {
    q: "Which Kinds Of Tiles Can You Get From A Tile Company?",
    a: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  },
  {
    q: "What Is The Best Way To Select Tiles For My Project?",
    a: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  },
  {
    q: "Exist Any Options for Eco-Friendly Tile?",
    a: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  },
  {
    q: "Are There Any Choices for Eco-Friendly Tile?",
    a: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  },
  {
    q: "There Any Choices for Eco-Friendly Tile?",
    a: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="py-28 bg-[var(--color-background)] overflow-hidden">
      <style>{`
        .faq-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .faq-body.is-open {
          grid-template-rows: 1fr;
        }
        .faq-body > div { overflow: hidden; }

        .faq-item {
          border-bottom: 1px solid var(--color-border);
          transition: background 0.3s;
        }

        .faq-num {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }

        @keyframes stat-in {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .stat-in { animation: stat-in 0.6s 0.3s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 items-start">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div>
            <Reveal type="fade">
              <p className="text-xs tracking-[0.22em] uppercase text-[var(--color-primary)] font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[var(--color-primary)] inline-block" />
                Our FAQ
              </p>
            </Reveal>

            <Reveal type="slide-up">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-foreground)] mb-6">
                What Are The Most<br className="hidden md:block" /> Common Questions?
              </h2>
            </Reveal>

            <Reveal type="fade">
              <p className="text-[var(--text-muted)] leading-relaxed mb-10 max-w-md">
                There are many variations of passages of Lorem Ipsum available — the majority have suffered alteration in some form, by injected humour or randomised words.
              </p>
            </Reveal>

            {/* STAT CARD */}
            <Reveal type="slide-up">
              <div className="stat-in relative rounded-2xl overflow-hidden bg-[var(--color-card)] border border-[var(--color-border)] p-7 flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow">

                {/* Accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-primary)] rounded-l-2xl" />

                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--primary-light)] flex items-center justify-center">
                  <Image
                    src="/assets/images/icon/faqIcon1_1.svg"
                    alt="icon"
                    width={28}
                    height={28}
                  />
                </div>

                {/* Text */}
                <div>
                  <p className="faq-num text-3xl font-extrabold text-[var(--color-foreground)] leading-none">
                    5k+
                    <span className="text-[var(--color-primary)]">.</span>
                  </p>
                  <p className="font-semibold text-[var(--color-foreground)] mt-1">Project Complete</p>
                  <p className="text-[var(--text-muted)] text-sm mt-2 leading-relaxed max-w-xs">
                    There are many variations of passages of Lorem Ipsum available — the majority have suffered alteration in some form.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT — ACCORDION ────────────────────────────────── */}
          <div className="pt-2">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="faq-item">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Number */}
                      <span className={`faq-num flex-shrink-0 text-xs font-bold tracking-widest transition-colors ${isOpen ? "text-[var(--color-primary)]" : "text-[var(--text-muted)]"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Question */}
                      <span className={`font-semibold text-[15px] leading-snug transition-colors ${isOpen ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)] group-hover:text-[var(--color-primary)]"}`}>
                        {faq.q}
                      </span>
                    </div>

                    {/* Icon */}
                    <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300
                      ${isOpen
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)] rotate-45"
                        : "bg-[var(--color-card)] border-[var(--color-border)] group-hover:border-[var(--color-primary)]"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 transition-colors ${isOpen ? "text-white" : "text-[var(--color-foreground)] group-hover:text-[var(--color-primary)]"}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  {/* ANSWER */}
                  <div className={`faq-body ${isOpen ? "is-open" : ""}`}>
                    <div>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed pb-5 pl-10">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}