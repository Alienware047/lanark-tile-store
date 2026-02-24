"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal";

export default function ProductGallery({ image }: any) {
  return (
    <Reveal>
      <div className="card bg-[var(--surface)] rounded-2xl p-10">
        <Image
          src={image}
          alt="product"
          width={500}
          height={500}
          className="mx-auto"
          priority
        />
      </div>
    </Reveal>
  );
}