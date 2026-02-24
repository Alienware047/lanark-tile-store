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

  const categories = [...new Set(products.map(p => p.category))];

  function applyFilters() {
    let filtered = products;

    if (search)
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

    filtered = filtered.filter(
      p => p.price >= min && p.price <= max
    );

    if (category)
      filtered = filtered.filter(p => p.category === category);

    if (rating)
      filtered = filtered.filter(p => p.rating >= rating);

    if (status)
      filtered = filtered.filter(p => p.status === status);

    onFilter(filtered);
  }

  return (
    <Reveal>
      <div className="space-y-6">

        {/* SEARCH */}
        <div>
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">
            Search
          </h5>

          <div className="flex border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-background)]">
            <input
              type="text"
              placeholder="Search here"
              className="flex-1 px-3 py-2 outline-none bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--text-light)]"
              onChange={(e) => {
                setSearch(e.target.value);
                applyFilters();
              }}
            />

            <button className="px-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* PRICE */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">
            Filter By Price
          </h5>

          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="10000"
              value={min}
              onChange={(e) => {
                setMin(Number(e.target.value));
                applyFilters();
              }}
              className="w-full accent-[var(--color-primary)]"
            />

            <input
              type="range"
              min="0"
              max="10000"
              value={max}
              onChange={(e) => {
                setMax(Number(e.target.value));
                applyFilters();
              }}
              className="w-full accent-[var(--color-primary)]"
            />

            <div className="flex justify-between text-sm text-[var(--text-muted)]">
              <span>${min}</span>
              <span>${max}</span>
            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">
            Categories
          </h5>

          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setCategory(cat);
                    applyFilters();
                  }}
                  className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* STATUS */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">
            Product Status
          </h5>

          <div className="space-y-2">
            <button
              onClick={() => {
                setStatus("in stock");
                applyFilters();
              }}
              className="block text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              In Stock
            </button>

            <button
              onClick={() => {
                setStatus("out of stock");
                applyFilters();
              }}
              className="block text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              Out of Stock
            </button>
          </div>
        </div>

        {/* RATING */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <h5 className="font-semibold mb-3 text-[var(--color-foreground)]">
            Review Star
          </h5>

          {[5, 4, 3, 2, 1].map(star => (
            <button
              key={star}
              onClick={() => {
                setRating(star);
                applyFilters();
              }}
              className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors block w-full py-1"
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