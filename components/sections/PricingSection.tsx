"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/UI/Reveal";
import { Check } from "lucide-react";

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Basic Plan",
      price: billing === "monthly" ? 149 : 111,
      featured: false,
    },
    {
      name: "Premium Plan",
      price: billing === "monthly" ? 249 : 187,
      featured: true,
      image: "/assets/images/bg/pricingCardBg1_1.jpg",
    },
    {
      name: "Extended Plan",
      price: billing === "monthly" ? 299 : 224,
      featured: false,
    },
  ];

  const features = [
    "Per Square Foot Pricing",
    "Fixed Project Pricing",
    "Material and Labor Separation",
    "Design and Consultation Fees",
    "Custom and Artistic Tilework",
    "Travel and Accessibility Fees",
  ];

  return (
    <section className="py-24 bg-[var(--color-background)]">

      <div className="container mx-auto px-6">


        {/* HEADER */}
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-12">

            <h2 className="text-4xl font-bold mb-6">
              Our Flexible Pricing Plan
            </h2>


            {/* TOGGLE */}
            <div className="flex items-center justify-center gap-6">

              <div className="bg-[var(--color-background)] flex rounded-full p-1">

                <button
                  onClick={() => setBilling("monthly")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition
                  ${
                    billing === "monthly"
                      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                      : ""
                  }`}
                >
                  Monthly
                </button>


                <button
                  onClick={() => setBilling("yearly")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition
                  ${
                    billing === "yearly"
                      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                      : ""
                  }`}
                >
                  Yearly
                </button>

              </div>


              <div className="flex items-center gap-2">

                <Image
                  src="/assets/images/icon/pricingIcon1_1.svg"
                  alt=""
                  width={30}
                  height={30}
                />

                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  Save 25%
                </span>

              </div>

            </div>

          </div>
        </Reveal>



        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


          {plans.map((plan, index) => (

            <Reveal key={index} delay={index * 0.15}>

              <div
                className={`
                overflow-hidden
                border
                hover:shadow-xl
                transition
                flex flex-col
                ${
                  plan.featured
                    ? "border-[var(--color-primary)] scale-105"
                    : ""
                }
                `}
              >


                {/* HEADER */}
                <div
                  className={`p-8 relative
                  ${plan.featured ? "text-white" : ""}
                  `}
                >

                  {plan.featured && (

                    <Image
                      src={plan.image!}
                      alt=""
                      fill
                      className="object-cover -z-10"
                    />

                  )}


                  {plan.featured && (
                    <div className="absolute inset-0 bg-black/60 -z-10" />
                  )}


                  <h4 className="text-xl font-semibold mb-3">
                    {plan.name}
                  </h4>


                  <div className="flex items-end gap-2">

                    <h2 className="text-4xl font-bold">
                      ${plan.price}
                    </h2>

                    <span>
                      / {billing === "monthly" ? "Month" : "Year"}
                    </span>

                  </div>


                  <p className="mt-4 opacity-80">
                    Premium tile installation with expert craftsmanship.
                  </p>


                </div>



                {/* BODY */}
                <div className="p-8 flex flex-col flex-grow">


                  <ul className="space-y-4 mb-8">

                    {features.map((feature, i) => (

                      <li key={i} className="flex items-center gap-3">

                        <Check
                          size={18}
                          className="text-[var(--color-primary)]"
                        />

                        {feature}

                      </li>

                    ))}

                  </ul>



                  {/* BUTTON */}
                  <button
                    className="
                    mt-auto
                    w-full
                    py-4
                    rounded-lg
                    font-semibold
                    transition
                    bg-[var(--color-primary)]
                    text-[var(--color-primary-foreground)]
                    hover:bg-[var(--primary-hover)]
                    "
                  >
                    BUY THIS PLAN
                  </button>


                </div>


              </div>

            </Reveal>

          ))}


        </div>


      </div>


    </section>
  );
}