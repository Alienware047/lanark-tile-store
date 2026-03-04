"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/UI/Reveal";
import { serviceCards, type ServiceCard } from "@/lib/serviceData";

export default function ServiceSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {serviceCards.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.15}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: ServiceCard }) {
  return (
    <div className="relative group rounded-2xl overflow-hidden h-[420px] bg-[var(--primary-light)] shadow-md hover:shadow-xl transition duration-500">

      {/* Background Image */}
      <Image
        src={service.bg}
        alt={service.title}
        fill
        className="object-cover opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-end transition duration-500">

        {/* Number */}
        <div className="text-5xl font-bold mb-4 text-gray-300 group-hover:text-[var(--color-primary)] transition duration-500">
          {service.number}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-white transition duration-500">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-gray-600 group-hover:text-white/80 transition duration-500">
          {service.description}
        </p>

        {/* Button — Link to /services/[slug] */}
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition w-fit"
        >
          Learn More
        </Link>

      </div>
    </div>
  );
}