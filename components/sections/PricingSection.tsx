"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/UI/Reveal";
import { Check } from "lucide-react";

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Basic",
      label: "Get started",
      price: billing === "monthly" ? 149 : 111,
      featured: false,
      description: "Ideal for small rooms and single-space projects.",
      accentOpacity: "opacity-40",
    },
    {
      name: "Premium",
      label: "Most popular",
      price: billing === "monthly" ? 249 : 187,
      featured: true,
      description: "Full-service installation with priority scheduling.",
      image: "/assets/images/bg/pricingCardBg1_1.jpg",
      accentOpacity: "opacity-100",
    },
    {
      name: "Extended",
      label: "Complete coverage",
      price: billing === "monthly" ? 299 : 224,
      featured: false,
      description: "Large-scale commercial and luxury residential projects.",
      accentOpacity: "opacity-40",
    },
  ];

  const featuresByPlan = [
    ["Per Square Foot Pricing", "Fixed Project Pricing", "Material & Labor", null, null, null],
    ["Per Square Foot Pricing", "Fixed Project Pricing", "Material & Labor", "Design Consultation", "Custom Tilework", "Travel & Access Fees"],
    ["Per Square Foot Pricing", "Fixed Project Pricing", "Material & Labor", "Design Consultation", "Custom Tilework", "Travel & Access Fees"],
  ];

  return (
    <section className="relative py-28 bg-[var(--background)] overflow-hidden">

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-main) 1px, transparent 1px), linear-gradient(90deg, var(--text-main) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[var(--color-primary)] opacity-[0.05] blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <Reveal>
          <div className="text-center mb-16">

            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[var(--color-primary)]" />
              <span className="text-[var(--color-primary)] text-xs font-bold tracking-[0.3em] uppercase">
                Transparent Pricing
              </span>
              <div className="w-8 h-px bg-[var(--color-primary)]" />
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Flexible Plans,
              <span className="text-[var(--color-primary)] italic"> Zero Surprises</span>
            </h2>

            <p className="text-[var(--text-muted)] max-w-md mx-auto mb-10 leading-relaxed">
              Every project is different. Choose the plan that fits your space and vision.
            </p>

            {/* Toggle pill */}
            <div className="inline-flex items-center gap-4 bg-[var(--surface,#f5f3f0)] rounded-full p-1.5 shadow-inner">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  billing === "monthly"
                    ? "bg-[var(--color-primary)] text-white shadow-md"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  billing === "yearly"
                    ? "bg-[var(--color-primary)] text-white shadow-md"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                Yearly
              </button>

              {/* Save badge */}
              <div className="flex items-center gap-1.5 pr-3 pl-1">
                <div className="relative w-5 h-5">
                  <Image
                    src="/assets/images/icon/pricingIcon1_1.svg"
                    alt=""
                    fill
                    sizes="20px"
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-xs font-bold text-[var(--color-primary)] whitespace-nowrap">
                  Save 25%
                </span>
              </div>
            </div>

          </div>
        </Reveal>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-6 items-end">
          {plans.map((plan, index) => (
            <Reveal key={index} delay={index * 0.12}>
              <div
                className={`
                  relative rounded-3xl overflow-hidden flex flex-col
                  transition-all duration-500
                  ${plan.featured
                    ? "shadow-[0_24px_80px_rgba(192,103,30,0.25)] scale-[1.04] ring-1 ring-[var(--color-primary)]"
                    : "shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_56px_rgba(0,0,0,0.14)] hover:-translate-y-1 ring-1 ring-black/5"
                  }
                `}
              >
                {/* ── Card header ── */}
                <div className={`relative p-8 pb-10 ${plan.featured ? "text-white" : "bg-[var(--surface,#f9f7f4)]"}`}>

                  {plan.featured && plan.image && (
                    <>
                      <Image
                        src={plan.image}
                        alt=""
                        fill
                        sizes="400px"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
                    </>
                  )}

                  <div className="relative z-10">

                    {/* Label badge */}
                    <div className={`
                      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5
                      ${plan.featured
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)]"
                      }
                    `}>
                      {plan.featured && (
                        <svg width="8" height="8" viewBox="0 0 8 8">
                          <polygon points="4,0 8,4 4,8 0,4" fill="currentColor" />
                        </svg>
                      )}
                      {plan.label}
                    </div>

                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {plan.name}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? "text-white/70" : "text-[var(--text-muted)]"}`}>
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-end gap-1">
                      <span className={`text-sm font-medium mb-1.5 ${plan.featured ? "text-white/60" : "text-[var(--text-muted)]"}`}>$</span>
                      <span
                        className="text-5xl font-bold leading-none tracking-tight"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {plan.price}
                      </span>
                      <span className={`text-sm mb-1.5 ml-1 ${plan.featured ? "text-white/60" : "text-[var(--text-muted)]"}`}>
                        / {billing === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Curved separator */}
                <div
                  className={`h-6 -mt-3 ${plan.featured ? "bg-[var(--background,#fff)]" : "bg-[var(--background,#fff)]"}`}
                  style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
                />

                {/* ── Card body ── */}
                <div className="flex flex-col flex-grow p-8 pt-2 bg-[var(--background,#fff)] rounded-b-3xl">

                  <ul className="space-y-3.5 mb-8 flex-grow">
                    {featuresByPlan[index].map((feat, i) => (
                      <li key={i} className={`flex items-center gap-3 text-sm ${feat ? "" : "opacity-25 line-through"}`}>
                        <span className={`
                          w-5 h-5 rounded-full flex items-center justify-center shrink-0
                          ${feat
                            ? "bg-[var(--color-primary)] bg-opacity-10"
                            : "bg-gray-100"
                          }
                        `}>
                          <Check
                            size={11}
                            className={feat ? "text-[var(--color-primary)]" : "text-gray-300"}
                          />
                        </span>
                        <span className={feat ? "text-[var(--text-main)]" : "text-[var(--text-muted)]"}>
                          {feat ?? featuresByPlan[1][i]}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`
                      w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase
                      transition-all duration-300
                      ${plan.featured
                        ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[rgba(192,103,30,0.35)] hover:opacity-90 hover:shadow-xl"
                        : "bg-[var(--surface,#f5f3f0)] text-[var(--text-main)] hover:bg-[var(--color-primary)] hover:text-white"
                      }
                    `}
                  >
                    Get Started
                  </button>

                  {plan.featured && (
                    <p className="text-center text-xs text-[var(--text-muted)] mt-4">
                      No hidden fees · Cancel anytime
                    </p>
                  )}

                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Bottom trust strip ── */}
        <Reveal>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--text-muted)]">
            {["Fully Licensed & Insured", "Free On-Site Estimate", "5-Year Workmanship Warranty", "500+ Projects Completed"].map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <polygon points="7,0 14,7 7,14 0,7" fill="var(--color-primary)" opacity="0.7" />
                </svg>
                {t}
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}