"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal"; // make sure path is correct

// -------------------------
// TypeScript Interfaces
// -------------------------
interface FancyBox {
  icon: string;
  title: string;
}

interface AboutSectionProps {
  badgeText?: string;
  subtitleImg?: string;
  heading?: string;
  description?: string;
  yearsOnMarket?: number;
  progressTitle?: string;
  progressPercent?: number; // 0-100
  fancyBoxes?: FancyBox[];
  videoUrl?: string;
}

// -------------------------
// AboutSection Component
// -------------------------
export default function AboutSection({
  badgeText = "ABOUT COMPANY",
  subtitleImg = "/assets/images/shape/titleShape1_1.png",
  heading = "Examine Contemporary Tiles, Stone, & Consulting",
  description = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly.",
  yearsOnMarket = 15,
  progressTitle = "Flooring Work",
  progressPercent = 90,
  fancyBoxes = [
    { icon: "/assets/images/icon/aboutIcon1_1.svg", title: "Interior & Exterior Painting" },
    { icon: "/assets/images/icon/aboutIcon1_2.svg", title: "Modern & luxurious Flooring interior" },
  ],
  videoUrl = "https://www.youtube.com/watch?v=f2Gzr8sAGB8",
}: AboutSectionProps) {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-6">
        {/* Flip order for large screens */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT / Image */}
          <div className="relative order-first lg:order-first">
            <Reveal type="fade" delay={100}>
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/assets/images/about/aboutThumb1_1.jpg"
                  alt="About"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </Reveal>
          </div>

          {/* RIGHT / Content */}
          <div className="max-w-xl order-last lg:order-last">
            {/* Badge */}
            <Reveal type="fade" delay={100}>
              <div className="inline-flex items-center gap-2 border border-default px-4 py-1.5 rounded-full text-sm text-[var(--text-muted)] mb-6">
                <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></span>
                {badgeText}
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal type="fade" delay={200}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                {heading}
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal type="fade" delay={300}>
              <p className="text-lg text-[var(--text-muted)] mb-8">
                {description}
              </p>
            </Reveal>

            {/* Stats */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-8">
              <Reveal type="fade" delay={400}>
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <span className="text-4xl font-bold text-[var(--color-primary)]">{yearsOnMarket}+</span>
                  <p className="text-[var(--text-muted)]">Years On Market</p>
                </div>
              </Reveal>
              <Reveal type="fade" delay={500}>
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-[var(--text-muted)]">{progressTitle}</span>
                    <span className="text-[var(--text-muted)]">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-[var(--surface)] rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-[var(--color-primary)] rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Fancy Boxes */}
            {fancyBoxes.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {fancyBoxes.map((box, i) => (
                  <Reveal key={i} type="fade" delay={300 + i * 200}>
                    <div className="flex items-center gap-3 p-4 border border-default rounded-lg hover:shadow-lg transition">
                      <Image src={box.icon} width={32} height={32} alt="icon" />
                      <h4 className="font-semibold">{box.title}</h4>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Video / CTA */}
            {videoUrl && (
              <Reveal type="fade" delay={600}>
                <div className="mt-8">
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:shadow-lg transition"
                  >
                    Watch Video
                  </a>
                </div>
              </Reveal>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
