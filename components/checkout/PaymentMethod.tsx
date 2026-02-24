"use client";

import { useState } from "react";
import type { PaymentMethod } from "@/types/checkout";

const paymentMethods = [
  { id: "bank", label: "Bank Transfer" },
  { id: "cheque", label: "Cheque" },
  { id: "card", label: "Credit/Debit Card" },
  { id: "paypal", label: "PayPal" },
] as const;

export default function PaymentMethods() {
  const [method, setMethod] = useState<PaymentMethod>("bank");

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-6 text-[var(--color-foreground)]">
        Payment Method
      </h2>

      <div className="space-y-3">
        {paymentMethods.map((pm) => (
          <label
            key={pm.id}
            className="flex items-center gap-3 p-4 border border-[var(--color-border)] rounded-lg cursor-pointer hover:bg-[var(--surface)] transition-colors"
          >
            <input
              type="radio"
              name="payment-method"
              checked={method === pm.id}
              onChange={() => setMethod(pm.id as PaymentMethod)}
              className="w-4 h-4 cursor-pointer accent-[var(--color-primary)]"
            />
            <span className="text-[var(--color-foreground)] font-medium">{pm.label}</span>
          </label>
        ))}
      </div>

      <button className="btn-primary w-full mt-8">
        Place Order
      </button>
    </div>
  );
}