"use client";

import Image from "next/image";
import { useCart } from "@/components/layout/CartContext";

export default function OrderTable() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 mt-10 text-[var(--color-foreground)]">
        Your Order
      </h2>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--surface)]">
              <th className="text-left p-4 font-semibold text-[var(--color-foreground)]">Product</th>
              <th className="text-right p-4 font-semibold text-[var(--color-foreground)]">Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.length > 0 ? (
              cart.map((product) => (
                <tr key={product.id} className="border-b border-[var(--color-border)] last:border-b-0">
                  <td className="flex items-center gap-4 p-4 text-[var(--color-foreground)]">
                    <Image
                      src={product.image}
                      width={60}
                      height={60}
                      alt={product.name}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">x{product.quantity}</p>
                    </div>
                  </td>
                  <td className="text-right p-4 font-semibold text-[var(--color-foreground)]">
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-4 text-center text-[var(--text-muted)]">
                  Your cart is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="border-t border-[var(--color-border)] p-4 bg-[var(--surface)] flex justify-between items-center">
          <span className="font-semibold text-[var(--color-foreground)]">Total:</span>
          <span className="text-2xl font-bold text-[var(--color-primary)]">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}