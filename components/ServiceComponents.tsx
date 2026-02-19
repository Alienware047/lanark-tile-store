"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/UI/Reveal";
import { ServicesSectionProps } from "../types/services";
import { defaultServices } from "@/lib/serviceData";
import { useEffect, useState, useRef } from "react";

export default function ServicesSection({
  backgroundImage = "/assets/images/bg/serviceBg1_1.jpg",
  subtitleImg = "/assets/images/shape/titleShapeWhite1_1.png",
  subtitleText = "OUR SERVICES",
  heading = "Examine Contemporary Tiles, Stone, & Consulting",
  services = defaultServices,
}: ServicesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCount = 3; // Number of cards visible at once
  const cardGap = 24; // gap between cards in px

  const totalItems = [...services, ...services]; // duplicate for infinite loop

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % services.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);

  // Autoplay every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  // Calculate card width dynamically
  const getCardWidth = () => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    return containerWidth / visibleCount - (cardGap * (visibleCount - 1)) / visibleCount;
  };

  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 bg-cover bg-center border-y border-[var(--color-border)]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16">
          <div className="lg:w-1/2">
            <Reveal type="fade" delay={300}>
              <div className="section-title text-left">
                <div className="text-[var(--secondary)] flex items-center gap-3 mb-3 font-semibold text-sm tracking-widest uppercase">
                  <Image src={subtitleImg} width={24} height={24} alt="icon" />
                  {subtitleText}
                </div>
                <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-tight max-w-2xl">
                  {heading}
                </h2>
              </div>
            </Reveal>
          </div>

          {/* Navigation Arrows */}
          <div className="lg:w-1/2 flex justify-start lg:justify-end mt-8 lg:mt-0 gap-3">
  {/* Previous Button */}
  <button
    onClick={prevSlide}
    className="w-12 h-12 rounded-full bg-white/10 hover:bg-[var(--color-primary)] text-white transition-all duration-300 flex items-center justify-center border border-white/20 hover:border-[var(--color-primary)] shadow-lg hover:shadow-xl transform hover:scale-110"
    aria-label="Previous Slide"
  >
    <span className="flex items-center justify-center w-full h-full">
      <i className="fa-solid fa-arrow-left-long text-lg"></i>
    </span>
  </button>

  {/* Next Button */}
  <button
    onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-[var(--color-primary)] hover:bg-[var(--primary-hover)] text-white transition-all duration-300 flex items-center justify-center border border-[var(--color-primary)] shadow-lg hover:shadow-xl transform hover:scale-110"
                aria-label="Next Slide"
            >
                <span className="flex items-center justify-center w-full h-full">
                <i className="fa-solid fa-arrow-right-long text-lg"></i>
                </span>
            </button>
            </div>

        </div>

        {/* Carousel */}
        <div ref={containerRef} className="overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: `-${(currentIndex * (getCardWidth() + cardGap))}px`,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {totalItems.map((service, i) => (
              <Reveal key={i} type="fade" delay={100 + (i % services.length) * 100}>
                <div
                  style={{ width: getCardWidth() }}
                  className="bg-card rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md hover:shadow-xl transition-all duration-300 hover:border-[var(--color-primary)] transform hover:-translate-y-1 flex-shrink-0"
                >
                  {/* Icon Section */}
                  <div className="relative p-6 bg-gradient-to-br from-[var(--primary-light)] to-white">
                    <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-white shadow-md">
                      <Image src={service.icon} width={32} height={32} alt="icon" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 line-clamp-2">
                      <a
                        href={service.link}
                        className="hover:text-primary transition-colors"
                      >
                        {service.title}
                      </a>
                    </h3>

                    {/* Thumbnail */}
                    <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <Image
                        src={service.thumb}
                        fill
                        alt={service.title}
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="px-6 pb-6 pt-3 border-t border-[var(--color-border)]">
                    <a
                      href={service.link}
                      className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-2 transition-colors"
                    >
                      Learn More
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
