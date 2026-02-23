"use client";

import Image from "next/image";
import Reveal from "@/components/UI/Reveal";
import {
  Facebook,
  Twitter,
  Linkedin,
  Share2
} from "lucide-react";

import { useEffect, useRef } from "react";

const team = [
  {
    name: "Jenny Wilson",
    role: "Marketing Manager",
    image: "/assets/images/team/teamThumb2_5.jpg",
  },
  {
    name: "Guy Hawkins",
    role: "Development Head",
    image: "/assets/images/team/teamThumb2_1.jpg",
  },
  {
    name: "Leslie Alexander",
    role: "Head Manager",
    image: "/assets/images/team/teamThumb2_2.jpg",
  },
  {
    name: "Brooklyn Simmons",
    role: "Design Manager",
    image: "/assets/images/team/teamThumb2_3.jpg",
  },
  {
    name: "Masirul Islam",
    role: "Manager Controller",
    image: "/assets/images/team/teamThumb2_4.jpg",
  },
];


export default function TeamSection() {

  const trackRef = useRef<HTMLDivElement>(null);


  /* Infinite Auto Slide */
  useEffect(() => {

    const track = trackRef.current;

    if (!track) return;

    let animationFrame: number;
    let position = 0;

    const speed = 0.3;

    const animate = () => {

      position -= speed;

      if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
      }

      track.style.transform = `translateX(${position}px)`;

      animationFrame = requestAnimationFrame(animate);

    };

    animate();

    return () => cancelAnimationFrame(animationFrame);

  }, []);


  return (

    <section
      className="
      py-24
      bg-cover
      bg-center
      overflow-hidden
      "
      style={{
        backgroundImage:
          "url('/assets/images/bg/teamBg.jpg')",
      }}
    >


      <div className="container mx-auto px-6">


        {/* TITLE */}

        <Reveal>

          <div className="text-center mb-16 max-w-xl mx-auto">

            <p className="text-theme-primary font-semibold uppercase">

              OUR TEAM

            </p>

            <h2 className="text-4xl font-bold text-[var(--color-primary)] mt-3">

              Meet the Members of Our Best Team

            </h2>

          </div>

        </Reveal>



        {/* SLIDER */}

        <div className="relative overflow-hidden">


          <div
            ref={trackRef}
            className="flex gap-6 w-max"
          >


            {[...team, ...team].map((member, index) => (


              <Reveal key={index} delay={index * 0.1}>


                <TeamCard member={member} />


              </Reveal>


            ))}


          </div>

        </div>

      </div>

    </section>

  );

}



/* CARD */

function TeamCard({ member }: any) {

  return (

    <div
      className="
      w-[280px]
      bg-[var(--color-primary)]
      rounded-xl
      overflow-hidden
      shadow-lg
      group
      relative
      "
    >


      {/* IMAGE */}

      <div className="relative h-[320px] overflow-hidden">

        <Image
          src={member.image}
          alt={member.name}
          fill
          className="
          object-cover
          group-hover:scale-110
          transition duration-700
          "
        />

      </div>



      {/* CONTENT */}

      <div className="p-6 text-center">

        <h3 className="font-semibold text-lg">

          {member.name}

        </h3>

        <p className="text-theme-primary text-sm">

          {member.role}

        </p>

      </div>



      {/* SOCIAL */}

      <div
        className="
        absolute
        right-4
        bottom-24
        flex
        flex-col
        gap-2
        opacity-0
        group-hover:opacity-100
        translate-y-6
        group-hover:translate-y-0
        transition
        "
      >

        <SocialIcon icon={<Facebook size={16} />} />

        <SocialIcon icon={<Twitter size={16} />} />

        <SocialIcon icon={<Linkedin size={16} />} />

      </div>



      {/* SHARE BUTTON */}

      <div
        className="
        absolute
        right-4
        bottom-4
        w-10
        h-10
        bg-[var(--color-secondary)]
        text-white
        flex
        items-center
        justify-center
        rounded-full
        cursor-pointer
        "
      >

        <Share2 size={16} />

      </div>


    </div>

  );

}



/* SOCIAL ICON */

function SocialIcon({ icon }: any) {

  return (

    <div
      className="
      w-9
      h-9
      bg-[var(--color-secondary)]
      shadow
      rounded-full
      flex
      items-center
      justify-center
      cursor-pointer
      hover:bg-[var(--color-primary)]
      hover:text-white
      transition
      "
    >

      {icon}

    </div>

  );

}