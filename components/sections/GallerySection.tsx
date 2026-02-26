"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Reveal from "@/components/UI/Reveal";

const gallery = [
  { src: "/assets/images/gallery/galleryThumb1_1.jpg", label: "Interior Design", year: "2024", category: "Residential" },
  { src: "/assets/images/gallery/galleryThumb1_2.jpg", label: "Urban Living", year: "2024", category: "Commercial" },
  { src: "/assets/images/gallery/galleryThumb1_3.jpg", label: "Rooftop Terrace", year: "2023", category: "Landscape" },
  { src: "/assets/images/gallery/galleryThumb1_4.jpg", label: "Studio Loft", year: "2023", category: "Residential" },
  { src: "/assets/images/gallery/galleryThumb1_5.jpg", label: "Glass Pavilion", year: "2024", category: "Architecture" },
  { src: "/assets/images/gallery/galleryThumb1_6.jpg", label: "Minimal Suite", year: "2023", category: "Interior" },
];

export default function GallerySection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number, dir: "next" | "prev" = "next") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive((next + gallery.length) % gallery.length);
        setAnimating(false);
      }, 500);
    },
    [animating]
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      go(active + 1, "next");
    }, 5000);
  }, [active, go]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active]);

  const prev = () => { go(active - 1, "prev"); };
  const next = () => { go(active + 1, "next"); };

  const current = gallery[active];
  const secondIdx = (active + 1) % gallery.length;
  const thirdIdx = (active + 2) % gallery.length;
  const second = gallery[secondIdx];
  const third = gallery[thirdIdx];

  return (
    <section className="py-24 overflow-hidden bg-[var(--color-background)]">
      <style>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(60px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-60px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-slide-right { animation: slide-in-right 0.52s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-slide-left  { animation: slide-in-left  0.52s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-up     { animation: fade-up 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-up-2   { animation: fade-up 0.45s 0.1s cubic-bezier(0.22,1,0.36,1) both; }

        .thumb-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          background: var(--color-primary);
          transition: width 5s linear;
        }
        .gallery-num {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── HEADER ROW ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <Reveal type="fade">
              <p className="text-xs tracking-[0.22em] uppercase text-[var(--color-primary)] font-semibold mb-3">
                Our Projects
              </p>
            </Reveal>
            <Reveal type="slide-up">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-foreground)]">
                Discover our gallery<br className="hidden md:block" /> of recent works
              </h2>
            </Reveal>
          </div>

          {/* CONTROLS */}
          <Reveal type="fade">
            <div className="flex items-center gap-4">
              <span className="gallery-num text-sm text-[var(--text-muted)]">
                <span className="text-2xl font-bold text-[var(--color-foreground)]">
                  {String(active + 1).padStart(2, "0")}
                </span>
                {" / "}
                {String(gallery.length).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition group"
                  aria-label="Previous"
                >
                  <svg className="w-4 h-4 text-[var(--color-foreground)] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-full bg-[var(--color-primary)] flex items-center justify-center hover:opacity-90 transition"
                  aria-label="Next"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── MAIN GRID ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">

          {/* FEATURED IMAGE */}
          <div
            key={active + "-featured"}
            className={`relative overflow-hidden rounded-2xl group cursor-pointer ${animating ? (direction === "next" ? "anim-slide-right" : "anim-slide-left") : ""}`}
            style={{ height: "520px" }}
          >
            <Image
              src={current.src}
              alt={current.label}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              priority
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-5 left-5">
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[var(--color-primary)] text-white">
                {current.category}
              </span>
            </div>

            {/* Bottom info */}
            <div
              key={active + "-label"}
              className={`absolute bottom-0 left-0 right-0 p-7 ${animating ? "anim-fade-up" : ""}`}
            >
              <p className="text-white/60 text-xs tracking-widest uppercase mb-1">{current.year}</p>
              <h3 className="text-white text-2xl font-bold leading-tight mb-4">{current.label}</h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/40 px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
              >
                View Project
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20">
              <div
                key={active + "-bar"}
                className="thumb-bar"
                style={{ width: animating ? "0%" : "100%" }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN — stacked thumbnails */}
          <div className="flex flex-col gap-5">

            {[
              { item: second, idx: secondIdx },
              { item: third,  idx: thirdIdx  },
            ].map(({ item, idx }, colI) => (
              <div
                key={idx + "-thumb"}
                onClick={() => go(idx, "next")}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300
                  ${animating && colI === 0 ? "anim-fade-up" : ""}
                  ${animating && colI === 1 ? "anim-fade-up-2" : ""}
                `}
                style={{ height: "247px" }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Hover ring */}
                <div className="absolute inset-0 ring-2 ring-[var(--color-primary)] ring-offset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <p className="text-white/50 text-[10px] tracking-widest uppercase mb-0.5">{item.year}</p>
                    <h4 className="text-white text-base font-bold">{item.label}</h4>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ── THUMBNAIL STRIP ─────────────────────────────────────── */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {gallery.map((item, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? "next" : "prev")}
              className={`flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-300 focus:outline-none
                ${i === active ? "ring-2 ring-[var(--color-primary)] ring-offset-2 w-24 h-16" : "w-16 h-16 opacity-50 hover:opacity-80"}`}
            >
              <Image src={item.src} alt={item.label} fill className="object-cover" />
            </button>
          ))}

          {/* View all */}
          <a
            href="/gallery"
            className="flex-shrink-0 w-24 h-16 rounded-xl bg-[var(--primary-light)] flex flex-col items-center justify-center gap-1 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition group"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-[10px] font-semibold tracking-wide">All Works</span>
          </a>
        </div>

      </div>
    </section>
  );
}