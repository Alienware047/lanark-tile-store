"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/UI/Reveal";

const products = [
  {
    title: "Vein Patterns",
    image: "/assets/images/shop/shopThumb1_1.jpg",
    price: "$82.00",
    originalPrice: "$110.00",
    rating: 5,
    reviews: 24,
    tag: "New",
    desc: "Elegant natural vein patterns for sophisticated interiors.",
  },
  {
    title: "Tiling & Concrete",
    image: "/assets/images/shop/shopThumb1_2.jpg",
    price: "$82.00",
    originalPrice: "$99.00",
    rating: 4,
    reviews: 18,
    tag: "Popular",
    desc: "Industrial-grade concrete tiling with a raw, modern finish.",
  },
  {
    title: "Terracotta Tiles",
    image: "/assets/images/shop/shopThumb1_3.jpg",
    price: "$82.00",
    originalPrice: "$95.00",
    rating: 5,
    reviews: 31,
    tag: "Sale",
    desc: "Warm terracotta hues that bring earthy elegance to any space.",
  },
  {
    title: "Concrete Tiles",
    image: "/assets/images/shop/shopThumb1_1.jpg",
    price: "$82.00",
    originalPrice: "$108.00",
    rating: 4,
    reviews: 12,
    tag: "New",
    desc: "Smooth concrete finish tiles ideal for minimalist design.",
  },
];

const TAG_COLORS: Record<string, string> = {
  New:     "bg-emerald-500 text-white",
  Popular: "bg-[var(--color-primary)] text-white",
  Sale:    "bg-rose-500 text-white",
};

export default function ShopSection() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggle = (i: number) =>
    setWishlist((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  return (
    <section className="py-28 bg-[var(--color-background)]">
      <style>{`
        @keyframes float-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter { animation: float-up 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .card-enter:nth-child(2) { animation-delay: 0.08s; }
        .card-enter:nth-child(3) { animation-delay: 0.16s; }
        .card-enter:nth-child(4) { animation-delay: 0.24s; }

        .shop-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--color-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
          border-radius: inherit;
        }
        .shop-btn:hover::after { transform: scaleX(1); }
        .shop-btn span { position: relative; z-index: 1; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── HEADER ───────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <Reveal type="fade">
              <p className="text-xs tracking-[0.22em] uppercase text-[var(--color-primary)] font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-[var(--color-primary)] inline-block" />
                Our Shop
              </p>
            </Reveal>
            <Reveal type="slide-up">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-foreground)]">
                Newest Items<br className="hidden md:block" /> Available
              </h2>
            </Reveal>
          </div>

          <Reveal type="fade">
            <a
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-4 transition-all"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Reveal>
        </div>

        {/* ── PRODUCT GRID ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div key={i} className="card-enter group relative flex flex-col rounded-2xl overflow-hidden bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-400">

              {/* IMAGE */}
              <div className="relative overflow-hidden" style={{ height: "260px" }}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-108"
                  style={{ transform: "scale(1)", transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />

                {/* GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* TAG */}
                <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full ${TAG_COLORS[product.tag]}`}>
                  {product.tag}
                </span>

                {/* WISHLIST */}
                <button
                  onClick={() => toggle(i)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:scale-110 transition"
                >
                  <svg
                    className={`w-4 h-4 transition ${wishlist.includes(i) ? "fill-rose-500 stroke-rose-500" : "fill-none stroke-[var(--color-foreground)]"}`}
                    viewBox="0 0 24 24" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>

                {/* QUICK ADD — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <button className="shop-btn relative w-full py-3 bg-white text-[var(--color-foreground)] text-sm font-bold tracking-wide overflow-hidden hover:text-white transition-colors duration-350">
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">

                {/* STARS */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className={`w-3.5 h-3.5 ${s < product.rating ? "text-amber-400" : "text-[var(--color-border)]"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)]">({product.reviews})</span>
                </div>

                <h3 className="font-bold text-[var(--color-foreground)] text-base mb-1.5 group-hover:text-[var(--color-primary)] transition">
                  {product.title}
                </h3>

                <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-4 flex-1">
                  {product.desc}
                </p>

                {/* PRICE ROW */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-[var(--color-primary)]">{product.price}</span>
                    <span className="text-xs text-[var(--text-muted)] line-through">{product.originalPrice}</span>
                  </div>
                  <a href="/shop" className="text-xs font-semibold text-[var(--color-foreground)] hover:text-[var(--color-primary)] flex items-center gap-1 transition">
                    Details
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
        <div className="mt-14 text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm hover:opacity-90 hover:gap-5 transition-all shadow-lg"
          >
            Browse Full Collection
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}