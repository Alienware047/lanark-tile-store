"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const skills = [
  { title: "Hardwood Floor Repair", percentage: 95 },
  { title: "Custom Projects With Unique Designs", percentage: 85 },
];

export default function ExpertiseSection() {
  return (
    <section className="relative bg-theme2 bg-cover bg-center py-28" style={{ backgroundImage: "url('/images/bg/skillsBg1_1.jpg')" }}>
      
      {/* Decorative Shape */}
      <div className="hidden d-xxl-block absolute left-0 top-0">
        <Image
          src="/images/shape/skillsShape1_1.png"
          width={200}
          height={200}
          alt="shape"
          className="animate-left-fade"
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-24 items-center">

          {/* Left Image */}
          <motion.div
            className="xl:w-5/12 rounded overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/skills/skillsThumb1_1.jpg"
              width={600}
              height={600}
              alt="Skills Thumbnail"
              className="rounded-lg"
            />
          </motion.div>

          {/* Right Content */}
          <div className="xl:w-7/12 max-w-xl">
            <div className="section-title mb-8">
              <motion.div
                className="flex items-center gap-2 text-[var(--primary)] font-semibold tracking-widest mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Image src="/images/shape/titleShape1_1.png" width={20} height={20} alt="icon" />
                EXPERTISE
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Professionals to Install Flooring in Your Home
              </motion.h2>
            </div>

            <motion.p
              className="mb-8 "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
            </motion.p>

            {/* Progress Bars */}
            <div className="flex flex-col gap-6">
              {skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.3 }}
                  viewport={{ once: true }}
                  className="w-full"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold ">{skill.title}</span>
                    <span className="font-bold text-[var(--primary)]">{skill.percentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-300 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[var(--primary)] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}