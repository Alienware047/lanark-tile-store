"use client";

import Reveal from "@/components/UI/Reveal";
import { Star } from "lucide-react";

export default function ProductReviews({ reviews }: any) {
  return (
    <div className="mb-20">
      <h3 className="text-xl font-bold mb-8 text-[var(--color-foreground)]">
        Reviews ({reviews?.length || 0})
      </h3>

      {reviews && reviews.length > 0 ? (
        reviews.map((review: any, i: number) => (
          <Reveal key={review.id} delay={i * 0.2}>
            <div className="card p-6 mb-6">
              <div className="flex gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-[var(--color-foreground)]">
                      {review.name}
                    </h4>
                    <span className="text-xs text-[var(--text-light)]">{review.date}</span>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "fill-[#c0671e] text-[#c0671e]" : "text-[var(--border)]"}
                      />
                    ))}
                  </div>

                  <p className="text-[var(--text-muted)]">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))
      ) : (
        <p className="text-[var(--text-light)]">No reviews yet.</p>
      )}
    </div>
  );
}