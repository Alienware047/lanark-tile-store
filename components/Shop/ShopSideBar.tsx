"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import Reveal from "@/components/UI/Reveal";
import { Search, Star } from "lucide-react";

interface Props {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
}

export default function ShopSidebar({ products, onFilter }: Props) {
  const [search, setSearch] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];

  function applyFilters(overrides?: Partial<{
    search: string; min: number; max: number;
    category: string; rating: number; status: string;
  }>) {
    const s = overrides?.search ?? search;
    const mn = overrides?.min ?? min;
    const mx = overrides?.max ?? max;
    const cat = overrides?.category ?? category;
    const rat = overrides?.rating ?? rating;
    const st = overrides?.status ?? status;

    let filtered = products;

    if (s)
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(s.toLowerCase())
      );

    filtered = filtered.filter((p) => p.price >= mn && p.price <= mx);

    if (cat) filtered = filtered.filter((p) => p.category === cat);
    if (rat) filtered = filtered.filter((p) => p.rating >= rat);
    if (st) filtered = filtered.filter((p) => p.status === st);

    onFilter(filtered);
  }

  return (
    <Reveal>
      <div className="space-y-6">

        {/* SEARCH */}
        <div>
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">Search</h5>
          <div className="flex border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-background)]">
            <input
              type="text"
              placeholder="Search here"
              value={search}
              className="flex-1 px-3 py-2 outline-none bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--text-light)] text-sm"
              onChange={(e) => {
                setSearch(e.target.value);
                applyFilters({ search: e.target.value });
              }}
            />
            <button className="px-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* PRICE */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">Filter By Price</h5>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">Min</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={min}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMin(val);
                  applyFilters({ min: val });
                }}
                className="w-full accent-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">Max</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={max}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMax(val);
                  applyFilters({ max: val });
                }}
                className="w-full accent-[var(--color-primary)]"
              />
            </div>
            <div className="flex justify-between text-sm text-[var(--text-muted)]">
              <span>${min}</span>
              <span>${max}</span>
            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">Categories</h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => { setCategory(""); applyFilters({ category: "" }); }}
                className={`text-sm transition-colors ${
                  category === ""
                    ? "text-[var(--color-primary)] font-medium"
                    : "text-[var(--text-muted)] hover:text-[var(--color-primary)]"
                }`}
              >
                All
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => { setCategory(cat); applyFilters({ category: cat }); }}
                  className={`text-sm transition-colors ${
                    category === cat
                      ? "text-[var(--color-primary)] font-medium"
                      : "text-[var(--text-muted)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* STATUS */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">Product Status</h5>
          <div className="space-y-2">
            {["", "in stock", "out of stock"].map((s) => (
              <button
                key={s || "all"}
                onClick={() => { setStatus(s); applyFilters({ status: s }); }}
                className={`block text-sm transition-colors ${
                  status === s
                    ? "text-[var(--color-primary)] font-medium"
                    : "text-[var(--text-muted)] hover:text-[var(--color-primary)]"
                }`}
              >
                {s === "" ? "All" : s === "in stock" ? "In Stock" : "Out of Stock"}
              </button>
            ))}
          </div>
        </div>

        {/* RATING */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">Review Star</h5>
          <button
            onClick={() => { setRating(0); applyFilters({ rating: 0 }); }}
            className={`block text-sm mb-2 transition-colors ${
              rating === 0
                ? "text-[var(--color-primary)] font-medium"
                : "text-[var(--text-muted)] hover:text-[var(--color-primary)]"
            }`}
          >
            All ratings
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => { setRating(star); applyFilters({ rating: star }); }}
              className={`flex items-center gap-2 text-sm transition-colors w-full py-1 ${
                rating === star
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--color-primary)]"
              }`}
            >
              {[...Array(star)].map((_, i) => (
                <Star key={i} size={14} fill="#c0671e" color="#c0671e" />
              ))}
              <span>& up</span>
            </button>
          ))}
        </div>

      </div>
    </Reveal>
  );
}