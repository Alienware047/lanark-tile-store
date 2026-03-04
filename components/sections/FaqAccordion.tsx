"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { type FaqCategory } from "@/lib/faqdata";

interface Props {
  category: FaqCategory;
}

export default function FaqAccordion({ category }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="flex flex-col gap-3">
      {category.items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border overflow-hidden transition-all duration-200"
            style={{
              borderColor: isOpen ? "var(--color-primary)" : "var(--color-border)",
              background: "var(--color-card)",
              boxShadow: isOpen ? "0 4px 20px rgba(192,103,30,0.1)" : "none",
            }}
          >
            {/* Question row */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
              style={{ background: "transparent" }}
              aria-expanded={isOpen}
            >
              <span
                className="font-semibold text-sm md:text-base leading-snug transition-colors duration-200"
                style={{ color: isOpen ? "var(--color-primary)" : "var(--color-foreground)" }}
              >
                {item.q}
              </span>
              <ChevronRight
                className="w-4 h-4 shrink-0 transition-transform duration-300"
                style={{
                  color: "var(--color-primary)",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Answer — smooth height transition via max-height */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? "500px" : "0px" }}
            >
              <div
                className="px-6 pb-5 pt-0 text-sm leading-relaxed border-t"
                style={{
                  color: "var(--text-muted)",
                  borderColor: "var(--color-border)",
                }}
              >
                <p className="pt-4">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}