"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/UI/Reveal";

const projects = [
  { title: "Modern Tiles",      image: "/assets/images/project/projectThumb4_1.jpg", category: "Residential" },
  { title: "Concrete Series",   image: "/assets/images/project/projectThumb4_2.jpg", category: "Commercial" },
  { title: "Terracotta Finish", image: "/assets/images/project/projectThumb4_3.jpg", category: "Interior" },
  { title: "Vein Stone",        image: "/assets/images/project/projectThumb4_4.jpg", category: "Landscape" },
  { title: "Urban Surface",     image: "/assets/images/project/projectThumb4_5.jpg", category: "Commercial" },
  { title: "Nordic Minimal",    image: "/assets/images/project/projectThumb4_6.jpg", category: "Residential" },
];

const filters = ["All", "Residential", "Commercial", "Interior", "Landscape"];

export default function ProjectSection() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section className="py-28 bg-[var(--color-background)]">
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .proj-card { animation: card-in 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        .arrow-btn {
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%);
        }
        .proj-card:hover .proj-overlay { opacity: 1; }
        .proj-card:hover .proj-content  { transform: translateY(0); opacity: 1; }
        .proj-card:hover .proj-img      { transform: scale(1.08); }

        .filter-btn {
          position: relative;
          overflow: hidden;
          transition: color 0.25s;
        }
        .filter-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--color-primary);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
          border-radius: inherit;
        }
        .filter-btn.is-active::after,
        .filter-btn:hover::after { transform: scaleY(1); }
        .filter-btn span { position: relative; z-index: 1; }
        .filter-btn.is-active span,
        .filter-btn:hover span { color: white; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── HEADER ───────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-8">
          <div>
            <Reveal type="fade">
              <p className="text-xs tracking-[0.22em] uppercase text-[var(--color-primary)] font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-[var(--color-primary)] inline-block" />
                Our Projects
              </p>
            </Reveal>
            <Reveal type="slide-up">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-foreground)]">
                Work We're<br className="hidden md:block" /> Proud Of
              </h2>
            </Reveal>
          </div>

          {/* FILTER PILLS */}
          <Reveal type="fade">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`filter-btn px-5 py-2 rounded-full text-sm font-semibold border transition-colors
                    ${active === f
                      ? "is-active border-[var(--color-primary)] text-white"
                      : "border-[var(--color-border)] text-[var(--color-foreground)]"
                    }`}
                >
                  <span>{f}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── GRID ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.title + i}
              className="proj-card group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ height: "340px", animationDelay: `${i * 0.07}s` }}
            >
              {/* IMAGE */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="proj-img object-cover transition-transform duration-700"
              />

              {/* ALWAYS-VISIBLE GRADIENT (subtle bottom) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* CATEGORY BADGE */}
              <span className="absolute top-5 left-5 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                {project.category}
              </span>

              {/* HOVER OVERLAY */}
              <div className="proj-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500" />

              {/* CONTENT — slides up on hover */}
              <div className="proj-content absolute bottom-0 left-0 right-0 p-7 translate-y-4 opacity-0 transition-all duration-500">

                {/* TITLE ROW */}
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-white text-xl font-bold leading-tight">
                    {project.title}
                  </h3>

                  {/* ARROW BUTTON */}
                  <Link
                    href="/project-details"
                    className="flex-shrink-0 arrow-btn flex items-center justify-center bg-[var(--color-primary)] text-white pl-4 pr-6 py-3 hover:opacity-90 transition"
                    style={{ minWidth: "60px", height: "44px" }}
                    aria-label="View project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 26 16" fill="none">
                      <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="white"/>
                    </svg>
                  </Link>
                </div>

                {/* DIVIDER LINE */}
                <div className="mt-4 h-px bg-white/20" />

                {/* CATEGORY LABEL */}
                <p className="text-white/60 text-xs tracking-widest uppercase mt-3">{project.category}</p>
              </div>

            </div>
          ))}
        </div>

        {/* ── VIEW ALL CTA ─────────────────────────────────────────── */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/project"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all hover:gap-5"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}