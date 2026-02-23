"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal";
import { Phone, Search, Check } from "lucide-react";
import { useState } from "react";

export default function ServiceDetailsSection() {
  return (
    <section className="py-24 bg-[var(--color-background)]">

      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-12 gap-10">


          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">

            <SearchWidget />

            <ServiceList />

            <ContactCard />

            <TagsWidget />

          </div>



          {/* MAIN CONTENT */}
          <div className="lg:col-span-8">

            <ServiceContent />

            <FAQ />

          </div>


        </div>

      </div>

    </section>
  );
}



////////////////////////////////////////////////////////////
//////////////// SEARCH
////////////////////////////////////////////////////////////

function SearchWidget() {
  return (

    <Reveal>

      <div className="bg-white p-6 rounded-xl shadow-sm">

        <h3 className="font-semibold text-lg mb-4">
          Search
        </h3>

        <div className="relative">

          <input
            placeholder="Search here"
            className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />

          <Search className="absolute right-4 top-3 text-gray-400" size={20} />

        </div>

      </div>

    </Reveal>

  );
}



////////////////////////////////////////////////////////////
//////////////// SERVICE LIST
////////////////////////////////////////////////////////////

function ServiceList() {

  const services = [
    "Industrial Flooring",
    "Oak Flooring",
    "Carpets & Rugs",
    "Vein Patterns",
    "Vinyl Plank",
  ];

  return (

    <Reveal delay={0.2}>

      <div className="bg-white p-6 rounded-xl shadow-sm">

        <h3 className="font-semibold text-lg mb-4">
          All Services
        </h3>


        <ul className="space-y-3">

          {services.map((item, index) => (

            <li key={index}>

              <a
                className="
                flex justify-between
                p-3 rounded-lg
                hover:bg-[var(--color-primary)]
                hover:text-[var(--color-primary-foreground)]
                transition
                "
              >
                {item}
                <span>(08)</span>
              </a>

            </li>

          ))}

        </ul>

      </div>

    </Reveal>

  );
}



////////////////////////////////////////////////////////////
//////////////// CONTACT CARD
////////////////////////////////////////////////////////////

function ContactCard() {

  return (

    <Reveal delay={0.3}>

      <div className="relative rounded-xl overflow-hidden">

        <Image
          src="/assets/images/service/serviceDetailsThumb1_3.jpg"
          alt=""
          width={500}
          height={400}
          className="object-cover w-full h-[250px]"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">

          <Phone size={32} className="mb-4 text-[var(--color-primary)]" />

          <h4 className="font-semibold">
            Need Help?
          </h4>

          <p className="text-lg font-bold">
            +208-555-0112
          </p>

        </div>

      </div>

    </Reveal>

  );

}



////////////////////////////////////////////////////////////
//////////////// TAGS
////////////////////////////////////////////////////////////

function TagsWidget() {

  const tags = ["Tiles", "Floor", "Interior", "Vinyl", "Design"];

  return (

    <Reveal delay={0.4}>

      <div className="bg-white p-6 rounded-xl shadow-sm">

        <h3 className="font-semibold mb-4">
          Tags
        </h3>


        <div className="flex flex-wrap gap-3">

          {tags.map((tag, index) => (

            <span
              key={index}
              className="
              px-4 py-2
              rounded-full
              bg-gray-100
              hover:bg-[var(--color-primary)]
              hover:text-white
              cursor-pointer
              transition
              "
            >
              {tag}
            </span>

          ))}

        </div>

      </div>

    </Reveal>

  );
}



////////////////////////////////////////////////////////////
//////////////// MAIN CONTENT
////////////////////////////////////////////////////////////

function ServiceContent() {

  return (

    <Reveal>

      <div>

        <Image
          src="/assets/images/service/serviceDetailsThumb1_1.jpg"
          alt=""
          width={900}
          height={500}
          className="rounded-xl mb-6"
        />


        <h2 className="text-3xl font-bold mb-4">
          Tiling & Concrete
        </h2>


        <p className="text-gray-600 mb-6">
          We deliver premium flooring solutions with professional
          craftsmanship and modern technology.
        </p>



        {/* BENEFITS */}
        <div className="grid md:grid-cols-2 gap-6">

          <Image
            src="/assets/images/service/serviceDetailsThumb1_2.jpg"
            alt=""
            width={500}
            height={400}
            className="rounded-xl"
          />


          <div>

            <h4 className="font-semibold mb-4">
              Benefits With Our Service
            </h4>


            {[
              "Instant Growth",
              "24/7 Support",
              "Easy Service",
              "Affordable Cost",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-3 mb-3"
              >

                <Check
                  className="text-[var(--color-primary)]"
                  size={18}
                />

                {item}

              </div>

            ))}

          </div>

        </div>

      </div>

    </Reveal>

  );

}



////////////////////////////////////////////////////////////
//////////////// FAQ
////////////////////////////////////////////////////////////

function FAQ() {

  const faq = [
    {
      q: "Which tiles can I get?",
      a: "We provide ceramic, porcelain and vinyl.",
    },
    {
      q: "How do I select tiles?",
      a: "Choose based on durability and style.",
    },
    {
      q: "Eco-friendly options?",
      a: "Yes, we provide eco materials.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (

    <div className="mt-16">

      <Reveal>

        <h2 className="text-3xl font-bold mb-6">
          FAQ
        </h2>

      </Reveal>


      <div className="space-y-4">

        {faq.map((item, index) => (

          <Reveal key={index} delay={index * 0.1}>

            <div className="border rounded-xl">

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="
                w-full text-left
                p-5
                font-semibold
                flex justify-between
                "
              >

                {item.q}

              </button>


              {open === index && (

                <div className="p-5 pt-0 text-gray-600">

                  {item.a}

                </div>

              )}

            </div>

          </Reveal>

        ))}

      </div>

    </div>

  );

}