"use client";

export default function CheckoutCoupon() {
  return (
    <div className="card p-6">
      <p className="mb-4 text-[var(--color-foreground)]">
        Have a coupon?
      </p>

      <div className="flex gap-3">
        <input
          placeholder="Coupon code"
          className="input flex-1"
        />

        <button className="btn-primary">
          Apply
        </button>
      </div>
    </div>
  );
}