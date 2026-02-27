"use client";

import { useState } from "react";
import Reveal from "@/components/UI/Reveal";
import { Star, Plus, Minus, Heart } from "lucide-react";
import { useCart } from "@/components/layout/CartContext";

export default function ProductInfo({ product }: any) {
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, toggleCart } = useCart();

  const rating = Math.round(product.rating);

  const handleAddToCart = () => {
    const cartItem = {
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
    };
    addItem(cartItem, qty);
    toggleCart();
  };

  return (
    <Reveal delay={0.2}>
      <div>
        <h1 className="text-3xl font-bold mb-3 text-[var(--color-foreground)]">
          {product.name}
        </h1>

        <div className="text-2xl text-[var(--color-primary)] font-bold mb-4">
          ${product.price}
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < rating ? "fill-[#c0671e] text-[#c0671e]" : "text-[var(--border)]"}            />
          ))}
        </div>
        <p className="text-sm text-[var(--text-muted)] mb-6">({product.rating}/5 based on reviews)</p>

        <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="p-2 border border-[var(--color-border)] rounded-lg hover:bg-[var(--surface)] transition-colors"
          >
            <Minus size={18} />
          </button>

          <span className="text-lg font-semibold w-8 text-center">{qty}</span>

          <button
            onClick={() => setQty(q => q + 1)}
            className="p-2 border border-[var(--color-border)] rounded-lg hover:bg-[var(--surface)] transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] py-3 rounded-lg hover:bg-[var(--primary-hover)] transition-all font-semibold"
          >
            Add to Cart
          </button>

          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="p-3 border border-[var(--color-border)] rounded-lg hover:bg-[var(--surface)] transition-colors"
          >
            <Heart
              size={20}
              className={isWishlisted ? "fill-[#c0671e] text-[#c0671e]" : "text-[var(--text-muted)]"}
            />
          </button>
        </div>
      </div>
    </Reveal>
  );
}