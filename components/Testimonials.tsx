"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Guy Hawkins",
    role: "UI/UX Designer",
    image: "/images/testimonial/testimonialProfile1_1.png",
    background: "/images/bg/testimonialBg1_1.png",
    rating: 5,
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by lorem injected humour, or randomised words which",
  },
  {
    name: "Jacob Jones",
    role: "UI/UX Designer",
    image: "/images/testimonial/testimonialProfile1_2.png",
    background: "/images/bg/testimonialBg1_1.png",
    rating: 5,
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by lorem injected humour, or randomised words which",
  },
  {
    name: "Jane Cooper",
    role: "Product Designer",
    image: "/images/testimonial/testimonialProfile1_1.png",
    background: "/images/bg/testimonialBg1_1.png",
    rating: 4,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Animation variants for card reveal
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.6 } },
  };

  // Next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Autoplay timer
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
          <div className="section-title max-w-lg">
            <div className="flex items-center gap-2 text-[var(--primary)] font-semibold tracking-widest mb-2">
              <Image src="/images/shape/titleShape1_1.png" width={20} height={20} alt="" />
              TESTIMONIAL
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              What People Say About Services
            </h2>
          </div>
        </div>

        {/* CAROUSEL */}
        <div ref={carouselRef} className="relative flex items-center justify-center gap-8">
          
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-20 w-12 h-12 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/80 transition flex items-center justify-center"
          >
            ←
          </button>

          {/* CARD DISPLAY */}
          <motion.div
            key={currentIndex}
            className="w-full max-w-[360px] flex-shrink-0"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-lg bg-cover bg-center flex flex-col justify-between p-6 min-h-[400px]"
              style={{ backgroundImage: `url(${currentTestimonial.background})` }}
            >
              <div className="absolute top-0 right-0">
                <Image src="/images/shape/testimonialCardShape1_1.png" width={50} height={50} alt="" />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <Image src={currentTestimonial.image} width={56} height={56} alt="" className="object-cover" />
                </div>
                <div className="text-left text-white">
                  <h6 className="font-semibold">{currentTestimonial.name}</h6>
                  <p className="text-sm">{currentTestimonial.role}</p>
                </div>
              </div>

              {/* Body */}
              <div className="text-left text-white relative z-10">
                <p className="mb-3 text-sm">{currentTestimonial.text}</p>

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Image
                      key={idx}
                      src="/images/icon/starIcon.svg"
                      width={16}
                      height={16}
                      alt=""
                      className={idx < currentTestimonial.rating ? "" : "opacity-40"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-20 w-12 h-12 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/80 transition flex items-center justify-center"
          >
            →
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  idx === currentIndex ? "bg-[var(--primary)]" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}