"use client";

import Image from "next/image";
import { offerings } from "@/lib/offerings";
import Reveal from "@/components/UI/Reveal";

export default function WhatWeOfferCard() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Heading */}
      <Reveal type="fade" duration={600}>
        <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
      </Reveal>
      <Reveal type="slide-up" duration={600} delay={100}>
        <p className="text-gray-600 mb-8">
          Explore our premium flooring solutions designed for elegance, durability, and style.
        </p>
      </Reveal>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {offerings.map((item, idx) => (
          <Reveal key={idx} type="slide-up" duration={600} delay={idx * 100}>
            <div className="group relative flex flex-col items-start p-6 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
              {/* Primary color overlay */}
              <div
                className="absolute inset-0 rounded-2xl z-0 transition-opacity duration-500 group-hover:opacity-0"
                style={{ backgroundColor: "var(--primary)" }}
              ></div>

              {/* Hover image sliding top to bottom */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden z-0 transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all ease-out duration-500">
                <Image
                  src={item.icon} // Replace with hover image if different
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Card content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Icon */}
                <Reveal type="scale" duration={500} delay={50}>
                  <div className="w-14 h-14 mb-4 p-3 bg-white/20 rounded-full flex items-center justify-center text-white">
                    <Image src={item.icon} alt={item.title} width={40} height={40} />
                  </div>
                </Reveal>

                {/* Title */}
                <Reveal type="slide-left" duration={500} delay={100}>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                </Reveal>

                {/* Description */}
                <Reveal type="slide-right" duration={500} delay={150}>
                  <p className="text-white/80 mb-4 text-lg">{item.description}</p>
                </Reveal>

                {/* Features */}
                <ul className="space-y-1">
                  {item.features.map((feat, i) => (
                    <Reveal
                      key={i}
                      type="fade"
                      duration={400}
                      delay={200 + i * 50}
                    >
                      <li className="text-lg font-medium text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full inline-block"></span>
                        {feat}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}