"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

const testimonials = [
  {
    name: "Guy Hawkins",
    role: "UI/UX Designer",
    image: "/images/testimonial/testimonialProfile1_1.png",
    rating: 5,
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by lorem injected humour, or randomised words which don't look even slightly believable.",
  },
  {
    name: "Jacob Jones",
    role: "Senior Developer",
    image: "/assets/images/testimonial/testimonialProfile1_2.png",
    rating: 5,
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by lorem injected humour, or randomised words which don't look even slightly believable.",
  },
  {
    name: "Jane Cooper",
    role: "Product Designer",
    image: "/assets/images/testimonial/testimonialProfile1_1.png",
    rating: 4,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    name: "Brooklyn Simmons",
    role: "Interior Advisor",
    image: "/assets/images/testimonial/testimonialProfile1_2.png",
    rating: 5,
    text: "Exceptional craftsmanship and attention to detail. The team delivered beyond our expectations on every front — from planning to final installation.",
  },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className="w-4 h-4"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={filled ? 0 : 1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 32 32">
    <path d="M10 8C6.134 8 3 11.134 3 15v1c0 3.866 3.134 7 7 7h1v-6h-2a1 1 0 01-1-1v-1a1 1 0 011-1h3V8h-2zm12 0c-3.866 0-7 3.134-7 15v1c0 3.866 3.134 7 7 7h1v-6h-2a1 1 0 01-1-1v-1a1 1 0 011-1h3V8h-2z" />
  </svg>
);

const ChevronLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const navigate = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, []);

  const nextSlide = useCallback(() => navigate(1), [navigate]);
  const prevSlide = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, paused]);

  const current = testimonials[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1) } },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      transition: { duration: 0.35, ease: cubicBezier(0.22, 1, 0.36, 1) },
    }),
  };

  return (
    <section
      className="py-28 overflow-hidden"
      style={{ background: "var(--color-background)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        .tcard-nav {
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .tcard-nav:hover {
          background: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: #fff !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(192,103,30,0.3);
        }
        .tdot {
          transition: width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s;
        }
        .tquote-icon {
          opacity: 0.08;
        }
        .accent-gradient {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--secondary) 100%);
        }
        .testimonial-card {
          transition: box-shadow 0.3s;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-lg">
            <p
              className="text-xs tracking-[0.22em] uppercase font-semibold mb-3 flex items-center gap-2"
              style={{ color: "var(--color-primary)" }}
            >
              <span
                className="w-8 h-px inline-block"
                style={{ background: "var(--color-primary)" }}
              />
              Testimonials
              <span
                className="w-8 h-px inline-block"
                style={{ background: "var(--color-primary)" }}
              />
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ color: "var(--color-foreground)" }}
            >
              What People Say<br className="hidden md:block" /> About Our Work
            </h2>
          </div>

          {/* Nav buttons — top right on desktop */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="tcard-nav w-12 h-12 rounded-full flex items-center justify-center border"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-foreground)",
                background: "var(--color-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="tcard-nav w-12 h-12 rounded-full flex items-center justify-center border"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-foreground)",
                background: "var(--color-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* ── LAYOUT ─────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-8 items-center">

          {/* LEFT — progress list (desktop only) */}
          <div className="hidden lg:flex flex-col gap-3 lg:col-span-1">
            {testimonials.map((t, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className="flex items-center gap-3 text-left group"
              >
                {/* Active indicator bar */}
                <div
                  className="tdot h-10 rounded-full flex-shrink-0 transition-all"
                  style={{
                    width: idx === currentIndex ? "4px" : "2px",
                    background:
                      idx === currentIndex
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                  }}
                />
                <div>
                  <div
                    className="text-sm font-semibold leading-tight transition-colors"
                    style={{
                      color:
                        idx === currentIndex
                          ? "var(--color-foreground)"
                          : "var(--text-muted)",
                    }}
                  >
                    {t.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-light)" }}>
                    {t.role}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CENTER — animated card */}
          <div className="lg:col-span-3 relative" style={{ minHeight: "340px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="testimonial-card rounded-2xl overflow-hidden"
                style={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                {/* Accent top bar */}
                <div
                  className="h-[5px] w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-primary) 0%, var(--secondary) 100%)",
                  }}
                />

                <div className="p-8 md:p-10 relative">
                  {/* Background quote icon */}
                  <div
                    className="tquote-icon absolute top-6 right-8"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <QuoteIcon />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color:
                            i < current.rating
                              ? "var(--secondary)"
                              : "var(--color-border)",
                        }}
                      >
                        <StarIcon filled={i < current.rating} />
                      </span>
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote
                    className="text-lg leading-relaxed mb-8 font-medium"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    "{current.text}"
                  </blockquote>

                  {/* Divider */}
                  <div
                    className="w-12 h-[2px] mb-6 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-primary), var(--secondary))",
                    }}
                  />

                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2"
                      style={{ borderColor: "var(--color-primary)" }}
                    >
                      <Image
                        src={current.image}
                        alt={current.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div
                        className="font-bold text-base"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {current.name}
                      </div>
                      <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {current.role}
                      </div>
                    </div>

                    {/* Verified badge */}
                    <div
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(192,103,30,0.1)",
                        color: "var(--color-primary)",
                        border: "1px solid rgba(192,103,30,0.2)",
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — summary stat card */}
          <div className="hidden lg:flex flex-col gap-4 lg:col-span-1">
            {/* Overall rating */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div
                className="text-4xl font-extrabold"
                style={{ color: "var(--color-primary)" }}
              >
                4.9
              </div>
              <div className="flex justify-center gap-0.5 my-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "var(--secondary)" }}>
                    <StarIcon filled />
                  </span>
                ))}
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Overall Rating
              </div>
            </div>

            {/* Client count */}
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="text-3xl font-extrabold"
                style={{ color: "var(--color-foreground)" }}
              >
                2.4k+
              </div>
              <div className="text-xs font-medium mt-1" style={{ color: "var(--text-muted)" }}>
                Happy Clients
              </div>
            </div>

            {/* Avatar stack */}
            <div
              className="rounded-2xl p-5 flex flex-col items-center gap-3"
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex -space-x-3">
                {testimonials.slice(0, 3).map((t, i) => (
                  <div
                    key={i}
                    className="relative w-9 h-9 rounded-full overflow-hidden border-2"
                    style={{
                      borderColor: "var(--color-card)",
                      zIndex: 3 - i,
                    }}
                  >
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    borderColor: "var(--color-card)",
                    background: "var(--color-primary)",
                    color: "#fff",
                    zIndex: 0,
                  }}
                >
                  +9
                </div>
              </div>
              <div className="text-xs text-center font-medium" style={{ color: "var(--text-muted)" }}>
                Join our clients
              </div>
            </div>
          </div>

        </div>

        {/* ── DOT INDICATORS ─────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className="tdot h-2 rounded-full"
              style={{
                width: idx === currentIndex ? "28px" : "8px",
                background:
                  idx === currentIndex
                    ? "var(--color-primary)"
                    : "var(--color-border)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}