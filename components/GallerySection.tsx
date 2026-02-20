"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/UI/Reveal";

const gallery = [
  "/gallery/project1.jpg",
  "/gallery/project2.jpg",
  "/gallery/project3.jpg",
  "/gallery/project4.jpg",
  "/gallery/project5.jpg",
  "/gallery/project6.jpg",
];

export default function GallerySection() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % gallery.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const visibleImages = gallery.slice(index, index + 2);

  // handle loop edge case
  if (visibleImages.length < 2) {
    visibleImages.push(gallery[0]);
  }

  return (
    <section className="py-20 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <Reveal type="fade">
          <p className="text-sm tracking-widest text-[var(--primary)] font-semibold">
            OUR PROJECT
          </p>
        </Reveal>

        <Reveal type="slide-up">
          <h2 className="text-4xl font-bold mb-12">
            Discover our gallery of recent works
          </h2>
        </Reveal>


        {/* Images */}
        <div className="flex gap-8">

          {visibleImages.map((img, i) => (

            <Reveal
              key={index + "-" + i}
              type={i === 0 ? "slide-left" : "slide-right"}
              duration={800}
            >

              <div className="relative w-1/2 overflow-hidden rounded-2xl group">

                <Image
                  src={img}
                  alt=""
                  width={700}
                  height={500}
                  className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Hover effect */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                  <span className="text-white text-xl font-semibold translate-y-8 group-hover:translate-y-0 transition">
                    View Project
                  </span>

                </div>

              </div>

            </Reveal>

          ))}

        </div>

      </div>

    </section>
  );
}