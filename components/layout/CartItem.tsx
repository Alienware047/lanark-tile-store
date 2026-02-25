"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { CartItemType } from "@/types/cart";
import { useCart } from "@/components/layout/CartContext";

export default function CartItem({
  item,
}: {
  item: CartItemType;
}) {
  const { removeItem } = useCart();

  return (
    <div className="flex gap-3 pb-3 border-b border-[var(--color-border)]">
      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-[var(--surface)]">
        <Image
          src={item.image}
          width={64}
          height={64}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-medium text-[var(--color-foreground)] mb-1">
          {item.name}
        </h4>
        <p className="text-sm text-[var(--text-muted)]">
          {item.quantity} x{" "}
          <span className="font-semibold text-[var(--color-foreground)]">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </p>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="flex-shrink-0 text-[var(--text-muted)] hover:text-[var(--color-primary)] transition"
        aria-label="Remove item"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}