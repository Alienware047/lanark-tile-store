"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal";

export default function CTASection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[var(--color-primary)]">

      {/* Shapes */}
      <Image
        src="/assets/images/shape/ctaShape2_1.png"
        alt=""
        width={180}
        height={180}
        className="absolute left-0 top-0 opacity-20 hidden md:block"
      />

      <Image
        src="/assets/images/shape/ctaShape2_2.png"
        alt=""
        width={180}
        height={180}
        className="absolute right-0 bottom-0 opacity-20 hidden md:block"
      />


      <div className="container mx-auto px-6">

        {/* FIXED GRID */}
        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
          lg:gap-16
          items-center
        ">


          {/* IMAGE */}
          <Reveal >
            <div className="
              flex
              justify-center
              lg:justify-start
              order-1
              lg:order-none
            ">

              <Image
                src="/assets/images/cta/ctaThumb2_1.png"
                alt="Flooring"
                width={420}
                height={420}
                className="
                  w-[260px]
                  sm:w-[320px]
                  md:w-[360px]
                  lg:w-[420px]
                  h-auto
                "
              />

            </div>
          </Reveal>



          {/* CONTENT */}
          <Reveal delay={0.2}>

            <div className="
              text-center
              lg:text-left
              max-w-xl
              mx-auto
              lg:mx-0
            ">


              {/* Subtitle */}
              <div className="
                flex
                items-center
                justify-center
                lg:justify-start
                gap-3
                text-white
                uppercase
                tracking-widest
                font-semibold
                text-sm
                mb-4
                flex-wrap
              ">

                <Image
                  src="/assets/images/shape/titleShapeWhite1_2.png"
                  alt=""
                  width={18}
                  height={18}
                />

                LET US CHANGE YOUR HOME LOOK

                <Image
                  src="/assets/images/shape/titleShapeWhite1_2.png"
                  alt=""
                  width={18}
                  height={18}
                />

              </div>



              {/* TITLE FIX */}
              <h2 className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
                font-bold
                text-white
                leading-tight
              ">

                A Whole Approach to Realizing Your Flooring Goals

              </h2>



              {/* BUTTON */}
              <div className="
                mt-8
                flex
                justify-center
                lg:justify-start
              ">

                <button
                  className="
                  inline-flex
                  items-center
                  gap-4
                  px-8
                  py-4
                  border-2
                  border-white
                  text-white
                  rounded-full
                  hover:bg-white
                  hover:text-[var(--color-primary)]
                  transition
                  duration-300
                  "
                >
                  EXPLORE MORE

                  →
                </button>

              </div>


            </div>

          </Reveal>


        </div>

      </div>

    </section>
  );
}