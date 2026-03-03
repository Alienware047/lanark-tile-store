"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Reveal from "@/components/UI/Reveal";
import { ServicesSectionProps } from "../../types/services";
import { defaultServices } from "@/lib/serviceData";
import { useEffect, useState, useRef, useCallback } from "react";

export default function ServicesSection({
  backgroundImage = "/assets/images/bg/serviceBg1_1.jpg",
  subtitleImg = "/assets/images/shape/titleShapeWhite1_1.png",
  subtitleText = "OUR SERVICES",
  heading = "Examine Contemporary Tiles, Stone, & Consulting",
  services = defaultServices,
}: ServicesSectionProps) {

  const GAP = 24;
  const total = services.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isAnimating = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const compute = useCallback(() => {
    if (!containerRef.current) return;
    const vw = window.innerWidth;
    const count = vw < 640 ? 1 : vw < 1024 ? 2 : 3;
    const cw = (containerRef.current.offsetWidth - GAP * (count - 1)) / count;
    setCardWidth(cw);
  }, []);

  useEffect(() => {
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [compute]);

  const trackItems = [services[total - 1], ...services, services[0]];
  const trackIndex = index + 1;

  const animateTrack = useCallback(
    (ti: number, instant = false) => {
      if (!cardWidth) return;
      const x = -(cardWidth + GAP) * ti;
      if (instant) controls.set({ x });
      else controls.start({ x, transition: { type: "spring", stiffness: 260, damping: 30 } });
    },
    [controls, cardWidth]
  );

  useEffect(() => { animateTrack(trackIndex); }, [index, animateTrack, trackIndex]);
  useEffect(() => { if (cardWidth) animateTrack(trackIndex, true); }, [cardWidth]); // eslint-disable-line

  const stopAutoplay = () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };

  const goTo = useCallback(
    async (newIdx: number, isAuto = false) => {
      if (!isAuto) stopAutoplay();
      if (isAnimating.current) return;
      isAnimating.current = true;

      if (newIdx >= total) {
        await controls.start({ x: -(cardWidth + GAP) * (total + 1), transition: { type: "spring", stiffness: 260, damping: 30 } });
        controls.set({ x: -(cardWidth + GAP) * 1 });
        setIndex(0);
      } else if (newIdx < 0) {
        await controls.start({ x: 0, transition: { type: "spring", stiffness: 260, damping: 30 } });
        controls.set({ x: -(cardWidth + GAP) * total });
        setIndex(total - 1);
      } else {
        setIndex(newIdx);
      }
      setTimeout(() => { isAnimating.current = false; }, 500);
    },
    [controls, cardWidth, total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    autoplayRef.current = setInterval(() => goTo(index + 1, true), 4000);
    return () => stopAutoplay();
  }, [index, goTo]); // eslint-disable-line

  const onDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
    else animateTrack(trackIndex);
  };

  return (
    /*
      FIX: Added overflow-hidden so the animating slider track (which uses
      negative translateX values and extends beyond the visible area) cannot
      widen the document and cause horizontal page shift.
    */
    <section
      className="relative w-full py-24 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/65" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <Reveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-6 h-6 shrink-0">
                <Image src={subtitleImg} alt="" fill sizes="24px" className="object-contain" unoptimized />
              </div>
              <span className="text-sm font-semibold tracking-widest uppercase text-white/80">
                {subtitleText}
              </span>
            </div>
            <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight max-w-xl">
              {heading}
            </h2>
          </div>
        </Reveal>

        {/* Slider */}
        <div className="relative">

          {/* <button onClick={prev} aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200 text-lg">
            ←
          </button>

          <button onClick={next} aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200 text-lg">
            →
          </button> */}

          <div ref={containerRef} className="overflow-hidden mx-1">
            <motion.div
              drag="x" onDragEnd={onDragEnd}
              dragElastic={0.08} dragConstraints={{ left: -99999, right: 99999 }}
              animate={controls}
              style={{ gap: GAP }}
              className="flex py-14 cursor-grab active:cursor-grabbing will-change-transform"
            >
              {trackItems.map((service, i) => (
                <div key={i}
                  style={{ width: cardWidth > 0 ? cardWidth : undefined, minWidth: 220, flexShrink: 0 }}
                  /*
                    FIX: Original had `rounded-2xlbg-black` — a typo merging two
                    class names with no space. Split into `rounded-2xl bg-black/60`
                    so the card actually has a background and rounded corners.
                  */
                  className="relative pt-16 pb-8 px-6 rounded-2xl bg-black/60 shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center min-h-[400px]"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <div className="w-20 h-20 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="relative w-9 h-9">
                        <Image src={service.icon} alt={service.title} fill sizes="36px" className="object-contain" unoptimized />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-white mt-4 font-semibold text-lg leading-snug">
                    {service.title}
                  </h3>

                  <div className="relative w-full h-44 mt-5 rounded-xl overflow-hidden">
                    <Image
                      src={service.thumb} alt={service.title} fill
                      sizes={cardWidth ? `${Math.round(cardWidth)}px` : "300px"}
                      className="object-cover"
                    />
                  </div>

                  <a href={service.link} aria-label={`Learn more about ${service.title}`}
                    className="mt-auto w-12 h-12 flex items-center justify-center bg-[var(--color-primary)] text-white text-lg rounded-full hover:opacity-80 transition-opacity">
                    →
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === index ? "w-6 h-2.5 bg-[var(--color-primary)]" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}