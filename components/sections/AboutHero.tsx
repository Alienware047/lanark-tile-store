"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative py-28 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <Image
        src="/assets/images/bg/breadcumb.jpg"
        alt="About background"
        fill
        priority
        className="object-cover"
      />


      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />


      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6">

        <div className="text-center">

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About
          </h1>


          {/* BREADCRUMB */}
          <div className="flex justify-center items-center gap-3 text-sm">

            <Link
              href="/"
              className="text-white hover:text-[var(--theme-primary)] transition"
            >
              Home
            </Link>


            <ChevronRight className="text-white" size={16} />


            <span className="text-[var(--theme-primary)]">
              About
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}