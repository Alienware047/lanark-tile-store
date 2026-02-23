"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  bgImage: string;
  breadcrumbs?: Breadcrumb[];
  overlay?: string; // optional overlay opacity
}

export default function PageHero({
  title,
  bgImage,
  breadcrumbs = [],
  overlay = "bg-black/60",
}: PageHeroProps) {
  return (
    <section className="relative py-28 overflow-hidden">

      {/* Background */}
      <Image
        src={bgImage}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlay}`} />


      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">

        <div className="text-center">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>


          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="flex justify-center items-center gap-3 text-sm flex-wrap">

              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center gap-3">

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-white hover:text-[var(--theme-primary)] transition"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[var(--theme-primary)]">
                      {item.label}
                    </span>
                  )}

                  {index !== breadcrumbs.length - 1 && (
                    <ChevronRight className="text-white" size={16} />
                  )}

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </section>
  );
}