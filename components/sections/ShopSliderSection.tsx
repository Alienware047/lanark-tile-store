"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Reveal from "@/components/UI/Reveal";

const products = [
  {
    title: "Vein Patterns",
    image: "/images/shop/shopThumb1_1.png",
    price: "$82.00",
  },
  {
    title: "Tiling & concrete",
    image: "/images/shop/shopThumb1_2.png",
    price: "$82.00",
  },
  {
    title: "Terracotta Tiles",
    image: "/images/shop/shopThumb1_3.png",
    price: "$82.00",
  },
  {
    title: "Concrete Tiles",
    image: "/images/shop/shopThumb1_1.png",
    price: "$82.00",
  },
];

export default function ShopCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollAmount = 0;
    const container = containerRef.current;

    if (!container) return;

    const totalScrollWidth = container.scrollWidth / 2; // because we duplicate cards
    const step = 1; // px per frame
    const speed = 16; // ms per frame ~60fps

    const scroll = () => {
      if (!container) return;

      scrollAmount += step;
      if (scrollAmount >= totalScrollWidth) {
        // reset scroll for infinite effect
        scrollAmount = 0;
        container.scrollLeft = 0;
      } else {
        container.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(scroll, speed);

    return () => clearInterval(interval);
  }, []);

  // Duplicate products for infinite scroll
  const displayProducts = [...products, ...products];

  return (
    <section className="py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Reveal>
            <div className="flex items-center justify-center gap-3 text-[var(--primary)] font-semibold tracking-widest">
              <Image src="/images/shape/titleShape1_1.png" alt="" width={20} height={20} />
              OUR SHOP
              <Image src="/images/shape/titleShape1_2.png" alt="" width={20} height={20} />
            </div>
          </Reveal>

          <Reveal type="slide-up" delay={200}>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
              Let's Look at the Newest Items Available.
            </h2>
          </Reveal>
        </div>

        {/* CAROUSEL */}
        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-hidden whitespace-nowrap"
        >
          {displayProducts.map((product, i) => (
            <Reveal
              key={i}
              type="slide-up"
              delay={i * 100}
              duration={800}
              className="inline-block w-[350px] flex-shrink-0"
            >
              {/* HORIZONTAL CARD */}
              <div className="group relative flex rounded-[28px] shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden bg-[var(--card-bg)] border border-[var(--border)]">

                {/* IMAGE LEFT */}
                <div className="relative w-[45%] min-h-[220px] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                {/* CONTENT RIGHT */}
                <div className="flex flex-col justify-between flex-1 p-6">

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-[var(--text-main)]">
                      {product.title}
                    </h3>

                    {/* STARS */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Image
                          key={i}
                          src="/images/icon/starIcon.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      ))}
                    </div>

                    <p className="text-[var(--text-muted)] text-sm">
                      There are many variation passages of Lorem
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-[var(--primary)]">
                      {product.price}
                    </span>

                    <div className="relative">
                      <Image
                        src="/images/shape/shopCardShape1_1.png"
                        alt=""
                        width={60}
                        height={60}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--text-main)]">
                        SHOP
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}