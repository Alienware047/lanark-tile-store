"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Reveal from "@/components/UI/Reveal";
import { ServicesSectionProps } from "../types/services";
import { defaultServices } from "@/lib/serviceData";
import { useEffect, useState, useRef, useCallback } from "react";

export default function ServicesSection({
  backgroundImage = "/assets/images/bg/serviceBg1_1.jpg",
  subtitleImg = "/assets/images/shape/titleShapeWhite1_1.png",
  subtitleText = "OUR SERVICES",
  heading = "Examine Contemporary Tiles, Stone, & Consulting",
  services = defaultServices,
}: ServicesSectionProps) {

  /* ---------------------------
     Responsive Card Count
  --------------------------- */
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------------------
     Infinite Loop Setup
  --------------------------- */
  const duplicated = [...services, ...services, ...services];
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(services.length);
  const gap = 24;

  /* ---------------------------
     Card Width Calculation
  --------------------------- */
  const getCardWidth = useCallback(() => {
    if (!containerRef.current) return 0;
    const width = containerRef.current.offsetWidth;
    return width / visibleCount - gap + gap / visibleCount;
  }, [visibleCount]);

  /* ---------------------------
     Slide Functions
  --------------------------- */
  const slideTo = useCallback(async (i: number) => {
    setIndex(i);
    await controls.start({
      x: -(getCardWidth() + gap) * i,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    });
  }, [controls, getCardWidth]);

  const next = () => slideTo(index + 1);
  const prev = () => slideTo(index - 1);

  /* ---------------------------
     True Loop Reset
  --------------------------- */
  useEffect(() => {
    if (index >= services.length * 2) {
      controls.set({ x: -(getCardWidth() + gap) * services.length });
      setIndex(services.length);
    }
    if (index <= 0) {
      controls.set({ x: -(getCardWidth() + gap) * services.length });
      setIndex(services.length);
    }
  }, [index, services.length, controls, getCardWidth]);

  /* ---------------------------
     Autoplay
  --------------------------- */
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  });

  /* ---------------------------
     Swipe / Drag Handling
  --------------------------- */
  const dragEnd = (_: any, info: any) => {
    if (info.offset.x < -50) next();
    if (info.offset.x > 50) prev();
  };

  /* ---------------------------
     UI
  --------------------------- */
  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <Reveal>
          <div className="mb-14">
            <div className="flex items-center gap-3 text-white">
              <Image src={subtitleImg} width={24} height={24} alt="" />
              {subtitleText}
            </div>
            <h2 className="text-white text-4xl font-bold mt-3">
              {heading}
            </h2>
          </div>
        </Reveal>

        {/* Slider */}
        <div ref={containerRef} className="relative overflow-visible">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[var(--body)] shadow-lg rounded-full hover:bg-[var(--theme-primary)] hover:text-white transition"
          >
            ←
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[var(--body)] shadow-lg rounded-full hover:bg-[var(--theme-primary)] hover:text-white transition"
          >
            →
          </button>

          {/* Track */}
          <motion.div
            drag="x"
            onDragEnd={dragEnd}
            animate={controls}
            className="flex gap-6 cursor-grab active:cursor-grabbing py-12"
          >
            {duplicated.map((service, i) => (
              <div
                key={i}
                style={{ width: getCardWidth() }}
                className="
                  relative
                  pt-28
                  pb-8
                  px-6
                  flex-shrink-0
                  rounded-3xl
                  bg-[var(--body)]
                  shadow-[0_15px_50px_rgba(0,0,0,0.25)]
                  hover:-translate-y-3
                  transition-all duration-500
                  flex flex-col items-center text-center
                  min-h-[460px]
                  overflow-visible
                "
              >
                {/* Icon */}
                <div className="absolute -top-12">
                  <div className="
                    w-24 h-24
                    bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)]
                    rounded-2xl
                    flex items-center justify-center
                    shadow-xl
                  ">
                    <Image src={service.icon} width={40} height={40} alt={service.title} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-6 font-semibold text-xl text-white">
                  {service.title}
                </h3>

                {/* Image */}
                <div className="relative h-44 w-full mt-6 rounded-xl overflow-hidden">
                  <Image src={service.thumb} fill alt={service.title} className="object-cover" />
                </div>

                {/* Rounded CTA Button */}
                <a
                  href={service.link}
                  className="
                    mt-auto
                    w-14 h-14
                    flex items-center justify-center
                    bg-[var(--theme-primary)]
                    text-white text-xl
                    rounded-xl
                    hover:bg-[var(--theme-secondary)]
                    transition
                  "
                >
                  →
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}