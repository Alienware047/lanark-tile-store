"use client";

import { useState } from "react";
import Reveal from "@/components/UI/Reveal";

export default function ContactFormSection() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <section className="py-24">

      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT TEXT */}
          <Reveal>
            <div>

              <h2 className="text-4xl font-bold mb-6">
                Let’s Talk About Your Project
              </h2>

              <p className="text-[var(--text-muted)] mb-6">
                We are ready to help you achieve your flooring goals.
                Send us a message and our team will respond quickly.
              </p>

            </div>
          </Reveal>


          {/* FORM */}
          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--color-card)] p-10 rounded-2xl border border-[var(--color-border)] shadow-lg space-y-6"
            >

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:border-[var(--color-primary)] outline-none"
                />

                <input
                  name="email"
                  placeholder="Your Email"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:border-[var(--color-primary)] outline-none"
                />

              </div>

              <input
                name="subject"
                placeholder="Subject"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:border-[var(--color-primary)] outline-none"
              />

              <textarea
                name="message"
                rows={5}
                placeholder="Write Your Message"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:border-[var(--color-primary)] outline-none"
              />

              <button
                type="submit"
                className="
                w-full
                bg-[var(--color-primary)]
                text-[var(--color-primary-foreground)]
                py-3
                rounded-lg
                font-semibold
                hover:bg-[var(--primary-hover)]
                transition"
              >
                Send Message
              </button>

            </form>
          </Reveal>

        </div>

      </div>

    </section>
  );
}