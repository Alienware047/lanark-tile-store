"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal"; // make sure path is correct

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)]">

      {/* MOVING PAPER / AIR ANIMATION */}
      <div className="paper-floating">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* GRID PATTERN */}
      <div className="absolute inset-0 -z-10 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--text-main) 1px, transparent 1px), linear-gradient(90deg, var(--text-main) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="max-w-xl space-y-6">

            {/* Badge */}
            <Reveal type="fade" delay={100}>
              <div className="inline-flex items-center gap-2 border border-default px-4 py-1.5 rounded-full text-sm text-[var(--text-muted)]">
                <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></span>
                Industry Leading Tile Marketplace
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal type="slide-up" delay={200}>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Premium Tiles for
                <span className="block text-[var(--color-primary)]">
                  Exceptional Spaces
                </span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal type="slide-up" delay={400}>
              <p className="text-lg text-[var(--text-muted)]">
                Discover world-class ceramic, marble, and porcelain tiles trusted by professionals and homeowners.
              </p>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal type="slide-up" delay={600}>
              <div className="flex gap-4">
                <button className="btn-primary">Browse Tiles</button>
                <button className="card px-6 py-3 hover-lift">View Collection</button>
              </div>
            </Reveal>

          </div>

          {/* RIGHT CONTENT */}
          <div className="relative flex justify-center">

            {/* Floating Tile Top */}
            <Reveal type="scale" delay={300}>
              <div className="hidden md:block absolute -top-10 -left-10 card p-2 shadow-card-lg animate-float">
                <Image
                  src="/assets/images/bg/introBg1_1.jpg"
                  alt="Tile"
                  width={140}
                  height={140}
                  className="rounded-lg object-cover"
                />
              </div>
            </Reveal>

            {/* Main Hero Image */}
            <Reveal type="scale" delay={500}>
              <div className="card shadow-card-lg p-4 z-10">
                <Image
                  src="/assets/images/intro/introThumb1_1.png"
                  alt="Tiles"
                  width={500}
                  height={500}
                  priority
                  className="w-[340px] h-[340px] md:w-[440px] md:h-[440px] object-cover rounded-xl"
                />
              </div>
            </Reveal>

            {/* Floating Tile Bottom */}
            <Reveal type="scale" delay={700}>
              <div className="hidden md:block absolute -bottom-10 -right-10 card p-2 shadow-card-lg animate-float-delay">
                <Image
                  src="/assets/images/bg/introBg2_1.jpg"
                  alt="Tile"
                  width={160}
                  height={160}
                  className="rounded-lg object-cover"
                />
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}
