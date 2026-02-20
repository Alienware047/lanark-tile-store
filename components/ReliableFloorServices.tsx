"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal";

export default function ReliableFloorServices() {
  return (
    <section className="py-28 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE IMAGES */}
          <Reveal type="slide-left" duration={1000}>
            <div className="relative w-full h-[520px]">

              {/* Main image */}
              <div className="absolute left-0 top-0 w-[75%] h-[420px] rounded-[28px] overflow-hidden shadow-2xl">

                <Image
                  src="/assets/images/wcu/wcuThumb1_1.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />

              </div>


              {/* Second overlapping image */}
              <div className="absolute right-0 bottom-0 w-[65%] h-[360px] rounded-[28px] overflow-hidden shadow-2xl border-8 border-white">

                <Image
                  src="/assets/images/wcu/wcuThumb1_2.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />

              </div>


              {/* Floating Shapes */}

              <Image
                src="/assets/images/shape/wcuThumbShape1_1.png"
                alt=""
                width={80}
                height={80}
                className="absolute bottom-20 left-10 animate-pulse"
              />

              <Image
                src="/assets/images/shape/wcuThumbShape1_2.png"
                alt=""
                width={20}
                height={10}
                className="absolute top-10 right-0 animate-bounce"
              />

              <Image
                src="/assets/images/shape/wcuThumbShape1_3.png"
                alt=""
                width={20}
                height={10}
                className="absolute top-10 right-10 animate-bounce"
              />

            </div>
          </Reveal>



          {/* RIGHT SIDE CONTENT */}
          <div>

            <Reveal type="fade">
              <p className="text-[var(--primary)] font-semibold tracking-widest mb-4 flex items-center gap-2">
                <Image
                  src="/assets/images/shape/titleShape1_1.png"
                  alt=""
                  width={20}
                  height={20}
                />
                RELIABLE
              </p>
            </Reveal>


            <Reveal type="slide-up" delay={200}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                We Offer Dependable Floor Services
              </h2>
            </Reveal>


            <Reveal type="slide-up" delay={400}>
              <p className="text-gray-600 mb-10">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by injected humour.
              </p>
            </Reveal>



            {/* Feature 1 */}
            <Reveal type="slide-right" delay={500}>
              <div className="flex gap-5 mb-8">

                <Image
                  src="/assets/images/icon/wcuIcon1_1.svg"
                  alt=""
                  width={50}
                  height={50}
                />

                <div>
                  <h4 className="font-semibold text-xl mb-2">
                    Superior Flooring Solutions
                  </h4>

                  <p className="text-gray-600">
                    There are many variations of passages of flooring available.
                  </p>

                </div>

              </div>
            </Reveal>



            {/* Feature 2 */}
            <Reveal type="slide-right" delay={700}>
              <div className="flex gap-5">

                <Image
                  src="/assets/images/icon/wcuIcon1_2.svg"
                  alt=""
                  width={50}
                  height={50}
                />

                <div>
                  <h4 className="font-semibold text-xl mb-2">
                    Top Flooring Providers
                  </h4>

                  <p className="text-gray-600">
                    There are many variations of passages of flooring available.
                  </p>

                </div>

              </div>
            </Reveal>


          </div>

        </div>

      </div>

    </section>
  );
}