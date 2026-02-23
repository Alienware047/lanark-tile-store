"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function SkillsSection() {
  return (
    <section className="skills-section relative py-24 bg-theme-secondary overflow-hidden">

      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* Subtitle */}
            <Reveal>
              <div className="flex items-center gap-2 text-theme-primary font-semibold mb-4">
                <Image
                  src="/assets/images/shape/titleShape1_1.png"
                  alt="icon"
                  width={22}
                  height={22}
                />
                EXPERTISE
              </div>
            </Reveal>


            {/* Title */}
            <Reveal delay={0.2}>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-theme-dark">
                Skilled Flooring Installers for your House
              </h2>
            </Reveal>


            {/* Description */}
            <Reveal delay={0.3}>
              <p className="text-theme-text mb-10">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form,
                injected humour, or randomised words.
              </p>
            </Reveal>


            {/* Checklist */}
            <div className="grid grid-cols-2 gap-6">

              <Checklist delay={0.4} text="More Expensive" />
              <Checklist delay={0.5} text="Heat-Resistant" />
              <Checklist delay={0.6} text="Less Maintenance" />
              <Checklist delay={0.7} text="Elegant Vein Patterns" />

            </div>

          </div>



          {/* RIGHT IMAGES */}
          <div className="relative">

            {/* Main Image */}
            <Reveal direction="right">
              <div className="relative">

                <Image
                  src="/assets/images/skills/skillsThumb2_1.jpg"
                  alt="skill"
                  width={500}
                  height={600}
                  className="rounded-xl shadow-xl"
                />

              </div>
            </Reveal>



            {/* Floating Image */}
            <Reveal delay={0.3}>
              <div className="absolute -bottom-10 -left-10">

                <Image
                  src="/assets/images/skills/skillsThumb2_2.jpg"
                  alt="skill"
                  width={250}
                  height={300}
                  className="rounded-xl shadow-xl border-8 border-white"
                />

              </div>
            </Reveal>



            {/* Counter Box */}
            <Reveal delay={0.6}>
              <ExperienceCounter />
            </Reveal>


          </div>

        </div>

      </div>

    </section>
  );
}



function Checklist({ text, delay }: any) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-center gap-3">

        <Check className="text-theme-primary" size={22} />

        <span className="text-theme-dark font-medium">
          {text}
        </span>

      </div>
    </Reveal>
  );
}



function ExperienceCounter() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    let start = 0;
    const end = 25;
    const duration = 2000;

    const step = () => {

      start++;

      setCount(start);

      if (start < end)
        setTimeout(step, duration / end);

    };

    step();

  }, []);



  return (
    <div className="absolute top-10 right-0 bg-[var(--color-primary)] text-white px-8 py-6 rounded-xl shadow-xl">

      <div className="text-4xl font-bold">
        {count}+
      </div>

      <div className="text-sm">
        Years Of Experience
      </div>

    </div>
  );
}