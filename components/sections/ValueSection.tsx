"use client";

import Reveal from "@/components/UI/Reveal";
import {
  ShieldCheck,
  Lightbulb,
  Award,
  Users
} from "lucide-react";

export default function ValuesSection() {
  return (
    <section className="py-24 bg-theme-secondary">

      <div className="container mx-auto px-6">

        {/* Title */}
        <Reveal>
          <div className="mb-16">
            <span className="text-theme-primary font-semibold uppercase tracking-wider">
              Our Values
            </span>

            <h2 className="text-4xl font-bold text-theme-dark mt-2">
              The Principles That Guide Us
            </h2>
          </div>
        </Reveal>


        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          <Reveal delay={0.2}>
            <ValueCard
              title="Integrity"
              description="We uphold honesty and strong moral principles in everything we do, ensuring trust and transparency."
              icon={<ShieldCheck size={28} />}
            />
          </Reveal>


          <Reveal delay={0.4}>
            <ValueCard
              title="Innovation"
              description="We embrace creativity and continuously improve through modern solutions."
              icon={<Lightbulb size={28} />}
            />
          </Reveal>


          <Reveal delay={0.6}>
            <ValueCard
              title="Quality"
              description="We deliver superior craftsmanship and premium products."
              icon={<Award size={28} />}
            />
          </Reveal>


          <Reveal delay={0.8}>
            <ValueCard
              title="Customer Focus"
              description="Our customers are at the heart of everything we do."
              icon={<Users size={28} />}
            />
          </Reveal>

        </div>

      </div>

    </section>
  );
}



function ValueCard({ title, description, icon }: any) {
  return (
    <div className="
      flex gap-6
      bg-[var(--color-background)]
      p-8
      rounded-xl
      shadow-md
      hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1
    ">

      {/* Icon */}
      <div className="
        flex items-center justify-center
        w-16 h-16
        bg-[var(--color-primary)]
        text-[var(--color-text)]
        rounded-lg
        shrink-0
      ">
        {icon}
      </div>


      {/* Content */}
      <div>

        <h3 className="text-xl font-semibold text-theme-dark mb-2">
          {title}
        </h3>

        <p className="text-theme-text">
          {description}
        </p>

      </div>

    </div>
  );
}