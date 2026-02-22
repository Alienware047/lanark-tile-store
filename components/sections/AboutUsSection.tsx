"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState({
    repair: 0,
    custom: 0,
  });

  /* reveal animation trigger */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgress({
            repair: 85,
            custom: 90,
          });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[var(--body)] overflow-hidden">
      <div className="container mx-auto px-6">

        <div className="grid xl:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGES */}
          <div
            ref={ref}
            className="relative w-full max-w-xl mx-auto"
          >

            {/* shape 1 */}
            <Image
              src="/assets/images/shape/aboutThumbshape2_1.png"
              alt=""
              width={180}
              height={180}
              className="
              absolute
              -top-10
              -left-10
              animate-fadeLeft
              "
            />

            {/* shape 2 */}
            <Image
              src="/assets/images/shape/aboutThumbshape2_2.png"
              alt=""
              width={140}
              height={140}
              className="
              absolute
              bottom-0
              right-0
              animate-fadeUp
              delay-200
              "
            />

            {/* main image */}
            <Image
              src="/assets/images/about/aboutThumb2_1.jpg"
              alt="about"
              width={500}
              height={600}
              className="
              rounded-xl
              shadow-2xl
              animate-revealLeft
              "
            />

            {/* floating image */}
            <Image
              src="/assets/images/about/aboutThumb2_2.jpg"
              alt="about"
              width={240}
              height={280}
              className="
              absolute
              -bottom-12
              -right-12
              rounded-xl
              shadow-xl
              border-8
              border-[var(--white)]
              animate-revealUp
              delay-300
              "
            />

          </div>


          {/* RIGHT CONTENT */}
          <div>

            {/* subtitle */}
            <div className="flex items-center gap-2 mb-4 animate-fadeUp">

              <Image
                src="/assets/images/shape/titleShape1_1.png"
                alt=""
                width={20}
                height={20}
              />

              <span className="text-theme-primary font-semibold tracking-wider">
                ABOUT US
              </span>

            </div>


            {/* title */}
            <h2 className="
            text-4xl
            font-bold
            mb-6
            animate-fadeUp
            delay-100
            ">
              The Best Paving & Flooring Company
            </h2>


            {/* desc */}
            <p className="
            text-gray-600
            mb-6
            animate-fadeUp
            delay-200
            ">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words.
            </p>


            <h3 className="
            text-xl
            font-semibold
            mb-8
            animate-fadeUp
            delay-300
            text-(--text-primary)
            ">
              We’re providing the best quality tiles in town.
            </h3>


            {/* progress bars */}

            <ProgressBar
              title="Hardwood Floor Repair"
              value={progress.repair}
            />

            <ProgressBar
              title="Custom Projects With Unique Designs"
              value={progress.custom}
            />


            {/* button */}

            <div className="mt-10 animate-fadeUp delay-500 ">

              <a
                href="/about"
                className="
                inline-flex
                items-center
                gap-4
                px-8
                py-4
                border
                border-theme-primary
                text-theme-primary
                transition
                duration-500
                group
                "
              >

                EXPLORE MORE

                →
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


/* reusable progress bar */

function ProgressBar({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="mb-6">

      <div className="flex justify-between mb-2">

        <span className="font-medium">
          {title}
        </span>

        <span className="text-theme-primary font-semibold">
          {value}%
        </span>

      </div>

      <div className="
      w-full
      h-2
      bg-gray-200
      rounded-full
      overflow-hidden
      ">

        <div
          className="
          h-full
          bg-theme-primary
          transition-all
          duration-[1800ms]
          ease-out
          "
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}