"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/UI/Reveal";

export default function NotFoundPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <Image
        src="/assets/images/bg/error-bg.jpg"
        alt="404 background"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />


      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-xl">

        <Reveal>

          <h1 className="text-8xl font-bold text-[var(--theme-primary)] mb-4">
            404
          </h1>

        </Reveal>


        <Reveal delay={0.1}>

          <h2 className="text-3xl text-white font-semibold mb-4">
            Page Not Found
          </h2>

        </Reveal>


        <Reveal delay={0.2}>

          <p className="text-white/80 mb-8">
            The page you are looking for does not exist.
          </p>

        </Reveal>


        <Reveal delay={0.3}>

          <Link
            href="/"
            className="
            bg-[var(--theme-primary)]
            text-white
            px-6 py-3
            rounded-lg
            hover:bg-[var(--primary-hover)]
            transition
            "
          >
            Back to Home
          </Link>

        </Reveal>

      </div>

    </section>
  );
}