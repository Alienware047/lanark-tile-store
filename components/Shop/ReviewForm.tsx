"use client";

import Reveal from "@/components/UI/Reveal";

interface Props {
  productId?: string;
}

export default function ReviewForm({ productId }: Props) {
  return (
    <Reveal>
      <div className="card p-8">
        <h3 className="text-xl font-bold mb-6 text-[var(--color-foreground)]">
          Add Review
        </h3>

        <form className="grid md:grid-cols-2 gap-6">
          <input
            placeholder="Your Name"
            className="border border-[var(--color-border)] p-3 rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--text-light)] focus:outline-none focus:border-[var(--color-primary)]"
          />

          <input
            placeholder="Your Email"
            type="email"
            className="border border-[var(--color-border)] p-3 rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--text-light)] focus:outline-none focus:border-[var(--color-primary)]"
          />

          <textarea
            placeholder="Your Comment"
            rows={5}
            className="border border-[var(--color-border)] p-3 rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--text-light)] focus:outline-none focus:border-[var(--color-primary)] md:col-span-2 resize-none"
          />

          <button
            type="submit"
            className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] py-3 rounded-lg hover:bg-[var(--primary-hover)] transition-all font-semibold md:col-span-2"
          >
            Submit Review
          </button>
        </form>
      </div>
    </Reveal>
  );
}