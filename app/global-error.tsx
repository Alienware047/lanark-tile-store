"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/UI/Reveal";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

          {/* Background Image */}
          <Image
            src="/assets/images/bg/error-bg.jpg"
            alt="Error background"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70" />


          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-xl">

            <Reveal>

              <h1 className="text-7xl font-bold text-[var(--theme-primary)] mb-4">
                Oops!
              </h1>

            </Reveal>


            <Reveal delay={0.1}>

              <h2 className="text-3xl font-semibold text-white mb-4">
                Something went wrong
              </h2>

            </Reveal>


            <Reveal delay={0.2}>

              <p className="text-white/80 mb-8">
                We encountered an unexpected error. Please try again.
              </p>

            </Reveal>


            <Reveal delay={0.3}>

              <div className="flex flex-wrap gap-4 justify-center">

                <button
                  onClick={() => reset()}
                  className="
                  bg-[var(--theme-primary)]
                  text-white
                  px-6 py-3
                  rounded-lg
                  hover:bg-[var(--primary-hover)]
                  transition
                  "
                >
                  Try Again
                </button>


                <Link
                  href="/"
                  className="
                  border border-white
                  text-white
                  px-6 py-3
                  rounded-lg
                  hover:bg-white
                  hover:text-black
                  transition
                  "
                >
                  Go Home
                </Link>

              </div>

            </Reveal>

          </div>

        </section>

      </body>
    </html>
  );
}