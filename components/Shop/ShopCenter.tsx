"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal";
import type { Product } from "@/types/product";

interface ShopSectionProps {
  products: Product[];
}

export default function ShopSection({ products }: ShopSectionProps) {
  return (
    <section>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.1}>
              <ProductCard product={product} />
            </Reveal>
          ))
        ) : (
          <p className="col-span-full text-center text-[var(--text-light)] py-12">No products found</p>
        )}
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card group overflow-hidden hover-lift h-full flex flex-col">
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-[var(--surface)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold mb-2 text-[var(--color-foreground)]">{product.name}</h3>

        <div className="mb-4">
          <p className="text-[var(--color-primary)] font-bold text-lg">
            ${product.price}
          </p>
          <p className="text-xs text-[var(--text-light)]">{product.category}</p>
        </div>

        <button
          className="
          mt-auto
          w-full
          bg-[var(--color-primary)]
          text-[var(--color-primary-foreground)]
          py-2.5
          rounded-lg
          hover:bg-[var(--primary-hover)]
          transition-all
          duration-300
          font-medium
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}