"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal";

export default function CompanySection() {
  return (
    <section className="py-24 bg-[var(--body)] overflow-hidden">
      <div className="container mx-auto px-6">

        <div className="max-w-6xl mx-auto">

          {/* Section Title */}
          <Reveal type="fade" duration={600} delay={0}>
            <h2 className="
            text-4xl
            font-bold
            mb-16
            text-center
            text-[var(--text-main)]
            ">
              Company History
            </h2>
          </Reveal>

          <div className="grid xl:grid-cols-2 gap-16 items-center">

            {/* LEFT IMAGE */}
            <Reveal type="slide-left" duration={600} delay={200}>
              <div className="relative w-full h-[420px]">

                <Image
                  src="/assets/images/history/history1_1.jpg"
                  alt="Company history"
                  fill
                  className="
                  object-cover
                  rounded-2xl
                  shadow-2xl
                  "
                />

              </div>
            </Reveal>

            {/* RIGHT CONTENT */}
            <Reveal type="slide-right" duration={600} delay={400}>
              <div>

                <h2 className="
                text-3xl
                font-bold
                mb-6
                text-theme-primary
                ">
                  MEGA LAUNCHING ON 16TH MAY 2024
                </h2>


                <p className="
                text-gray-600
                leading-relaxed
                ">
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled and demoralized by the charms
                  of pleasure of the moment, so blinded by    
                  desire, that they cannot foresee the pain and trouble that are  
                  bound to ensue; and equal blame belongs to those who fail in
                  </p>
              </div>
            </Reveal>

        </div>
        </div>
    </div>
    </section>
  );
}   