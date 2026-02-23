"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/UI/Reveal";

type Fact = {
  number: number;
  label: string;
};

const facts: Fact[] = [
  { number: 1000, label: "Saving Water by Recycling" },
  { number: 12, label: "Product Categories" },
  { number: 6, label: "Exclusive Display Centers" },
  { number: 2000, label: "Project Completion" },
  { number: 160, label: "Dealers" },
];

export default function FactsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStart(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-theme-secondary text-white overflow-hidden"
    >
      <div className="container mx-auto px-6">

        {/* Title Reveal */}
        <Reveal type="slide-up" duration={800}>
          <h2 className="text-4xl font-bold mb-14 text-center">
            Fact & Figures
          </h2>
        </Reveal>


        {/* Facts */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center">

          {facts.map((fact, i) => (
            <Reveal
              key={i}
              type="slide-up"
              delay={i * 200}
              duration={800}
            >
              <FactBox
                number={fact.number}
                label={fact.label}
                start={start}
              />
            </Reveal>
          ))}

        </div>

      </div>
    </section>
  );
}



function FactBox({
  number,
  label,
  start,
}: {
  number: number;
  label: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    const duration = 1500;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);

      setCount(Math.floor(progress * number));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

  }, [start, number]);



  return (
    <div className="group transition duration-500 hover:scale-110">

      <h3 className="text-4xl font-bold text-theme-primary">
        {count}+
      </h3>

      <p className="mt-2 text-white/80 group-hover:text-white transition">
        {label}
      </p>

    </div>
  );
}