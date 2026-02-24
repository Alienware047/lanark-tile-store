"use client";

export default function ShippingForm() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-[var(--color-foreground)]">
        Shipping Details
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input placeholder="First Name" className="input" />
        <input placeholder="Last Name" className="input" />

        <input placeholder="Address" className="input md:col-span-2" />

        <input placeholder="City" className="input" />
        <input placeholder="Postcode" className="input" />
      </div>
    </div>
  );
}