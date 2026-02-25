"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Reveal from "@/components/UI/Reveal";

export default function ContactInfo() {
  return (
    <section className="py-20 bg-[var(--surface)]">

      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {/* PHONE */}
          <Reveal>
            <div className="bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)] text-center hover:shadow-xl transition">

              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                <Phone />
              </div>

              <h3 className="font-semibold text-lg mb-2">
                Call Us
              </h3>

              <p className="text-[var(--text-muted)]">
                +233 000 000 000
              </p>

            </div>
          </Reveal>


          {/* EMAIL */}
          <Reveal delay={0.2}>
            <div className="bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)] text-center hover:shadow-xl transition">

              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                <Mail />
              </div>

              <h3 className="font-semibold text-lg mb-2">
                Email Address
              </h3>

              <p className="text-[var(--text-muted)]">
                info@yourcompany.com
              </p>

            </div>
          </Reveal>


          {/* LOCATION */}
          <Reveal delay={0.4}>
            <div className="bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)] text-center hover:shadow-xl transition">

              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                <MapPin />
              </div>

              <h3 className="font-semibold text-lg mb-2">
                Our Location
              </h3>

              <p className="text-[var(--text-muted)]">
                Accra, Ghana
              </p>

            </div>
          </Reveal>

        </div>

      </div>

    </section>
  );
}