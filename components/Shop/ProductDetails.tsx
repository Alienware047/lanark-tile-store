"use client";

import type { Product } from "@/types/product";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  return (
    <section className="py-24 bg-[var(--color-background)]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <ProductGallery image={product.image} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />
      </div>
    </section>
  );
}