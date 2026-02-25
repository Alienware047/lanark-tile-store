"use client";

import Link from "next/link";
import { X } from "lucide-react";
import CartItem from "@/components/layout/CartItem";
import { useCart } from "@/components/layout/CartContext";

export default function CartModal() {
  const { cart, toggleCart } = useCart();

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={toggleCart}
      />

      {/* CART MODAL PANEL */}
      <div className="fixed right-0 top-0 h-full w-96 bg-[var(--color-card)] border-l border-[var(--color-border)] shadow-lg z-50 overflow-y-auto">
        <div className="p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-[var(--color-foreground)]">Shopping Cart</h3>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-[var(--primary-light)] rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CART ITEMS */}
          <div className="space-y-3 mb-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))
            ) : (
              <p className="text-center text-sm text-[var(--text-muted)] py-8">
                Your cart is empty
              </p>
            )}
          </div>

          {cart.length > 0 && (
            <>
              {/* DIVIDER */}
              <div className="border-t border-[var(--color-border)] my-6" />

              {/* TOTAL */}
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="font-semibold text-[var(--color-foreground)]">Total:</span>
                <span className="text-2xl font-bold text-[var(--color-primary)]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              {/* BUTTONS */}
              <div className="space-y-3">
                <Link
                  href="/shop"
                  onClick={toggleCart}
                  className="block text-center px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--primary-light)] hover:text-[var(--color-primary)] transition font-medium"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="block text-center px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition font-semibold"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}