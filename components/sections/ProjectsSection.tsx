"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/UI/Reveal";
import { projects } from "@/lib/projects";

const filters = ["All", "Residential", "Commercial", "Interior", "Landscape"];

export default function ProjectSection() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="py-28 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-8">
          <div>
            <Reveal type="fade">
              <p className="text-xs tracking-[0.22em] uppercase text-[var(--color-primary)] font-semibold mb-3">
                Our Projects
              </p>
            </Reveal>

            <Reveal type="slide-up">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-foreground)]">
                Work We're Proud Of
              </h2>
            </Reveal>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition
                  ${
                    active === f
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                      : "border-[var(--color-border)] text-[var(--color-foreground)]"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="group relative overflow-hidden rounded-2xl block"
              style={{ height: "340px" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute bottom-0 p-6 text-white">
                <span className="text-xs uppercase tracking-widest opacity-70">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/projects"
            className="px-8 py-4 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}