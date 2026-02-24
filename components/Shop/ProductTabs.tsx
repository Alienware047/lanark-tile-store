"use client";

import type { Product } from "@/types/product";

import ProductReviews from "./ProductReviews";
import ReviewForm from "./ReviewForm";

export default function ProductTabs({ product }: { product: Product }) {
  return (
    <div className="mt-20 border-t border-[var(--color-border)] pt-12">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)]">
        Product Description
      </h2>

      <p className="mb-12 text-[var(--text-muted)] leading-relaxed">
        {product.description}
      </p>

      <div className="my-16">
        <ProductReviews reviews={product.reviews} />
      </div>

      <ReviewForm />
    </div>
  );
}