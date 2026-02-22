"use client";

import Image from "next/image";
import { MapPin, Phone, Mail, ChevronRight, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const brandLogos = [
    "/assets/images/logo/clientLogo2_1.png",
    "/assets/images/logo/clientLogo2_2.png",
    "/assets/images/logo/clientLogo2_3.png",
    "/assets/images/logo/clientLogo2_4.png",
    "/assets/images/logo/clientLogo2_5.png",
  ];

  const exploreLinks = [
    { name: "About Us", href: "about.html" },
    { name: "Services", href: "services.html" },
    { name: "Our Blogs", href: "blog.html" },
    { name: "Team Members", href: "team.html" },
    { name: "Contact Us", href: "contact.html" },
  ];

  const servicesLinks = [
    "Carpets & rugs",
    "industrial flooring",
    "Tiling & concrete",
    "Vein Patterns",
    "Vinyl Plank",
  ];

  const bottomLinks = [
    { name: "Terms & Condition", href: "contact.html" },
    { name: "Privacy Policy", href: "contact.html" },
    { name: "Contact Us", href: "contact.html" },
  ];

  return (
    <footer className="footer-section relative bg-color1 text-[var(--text-main)]">

      {/* Top Brand Logos Row */}
      <div className="container mx-auto py-6 flex flex-wrap justify-center gap-4">
        {brandLogos.map((logo, idx) => (
          <div key={idx} className="flex-shrink-0 w-20 h-12 relative">
            <Image src={logo} alt={`brand-${idx}`} fill style={{ objectFit: "contain" }} />
          </div>
        ))}
      </div>


      {/* Footer Widgets */}
      <div className="footer-widgets-wrapper py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">


          {/* Logo + About */}
          <div>
            <div className="mb-4">
              <Image src="/assets/images/logo/logo4.svg" alt="logo" width={150} height={50} />
            </div>

            <p className="mb-4 text-[var(--text-muted)]">
              There are many variations of passages of Lorem Ipsum available
            </p>

            <div className="flex space-x-3">

              <a className="text-[var(--text-main)] hover:text-[var(--theme-primary)] transition">
                <Facebook size={20} />
              </a>

              <a className="text-[var(--text-main)] hover:text-[var(--theme-primary)] transition">
                <Twitter size={20} />
              </a>

              <a className="text-[var(--text-main)] hover:text-[var(--theme-primary)] transition">
                <Linkedin size={20} />
              </a>

              <a className="text-[var(--text-main)] hover:text-[var(--theme-primary)] transition">
                <Youtube size={20} />
              </a>

            </div>
          </div>



          {/* Explore */}
          <div>

            <h3 className="flex items-center mb-4 font-semibold">

              <Image
                src="/assets/images/shape/footertitleShape1_1.png"
                alt=""
                width={20}
                height={20}
                className="mr-2"
              />

              Explore

            </h3>


            <ul className="space-y-2">

              {exploreLinks.map((link, idx) => (

                <li key={idx}>

                  <a className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition">

                    <ChevronRight
                      size={16}
                      className="text-[var(--theme-primary)]"
                    />

                    {link.name}

                  </a>

                </li>

              ))}

            </ul>

          </div>



          {/* Services */}
          <div>

            <h3 className="flex items-center mb-4 font-semibold">

              <Image
                src="/assets/images/shape/footertitleShape1_1.png"
                alt=""
                width={20}
                height={20}
                className="mr-2"
              />

              Services

            </h3>


            <ul className="space-y-2">

              {servicesLinks.map((service, idx) => (

                <li key={idx}>

                  <a className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition">

                    <ChevronRight
                      size={16}
                      className="text-[var(--theme-primary)]"
                    />

                    {service}

                  </a>

                </li>

              ))}

            </ul>

          </div>



          {/* Contact */}
          <div>

            <h3 className="flex items-center mb-4 font-semibold">

              <Image
                src="/assets/images/shape/footertitleShape1_1.png"
                alt=""
                width={20}
                height={20}
                className="mr-2"
              />

              Get In Touch

            </h3>


            <ul className="space-y-3">


              <li>

                <a className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition">

                  <MapPin
                    size={18}
                    className="text-[var(--theme-primary)]"
                  />

                  6391 Elgin St. Celina, USA

                </a>

              </li>



              <li>

                <a className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition">

                  <Phone
                    size={18}
                    className="text-[var(--theme-primary)]"
                  />

                  +208-666-0112

                </a>

              </li>



              <li>

                <a className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition">

                  <Mail
                    size={18}
                    className="text-[var(--theme-primary)]"
                  />

                  floremh@gmail.com

                </a>

              </li>


            </ul>

          </div>


        </div>
      </div>



      {/* Bottom */}
      <div className="footer-bottom bg-color2 py-4">

        <div className="container mx-auto flex justify-between items-center">

          <p className="text-[var(--text-muted)]">
            © All Copyright 2024 by Florem
          </p>


          <div className="flex gap-4">

            {bottomLinks.map((link, idx) => (

              <a
                key={idx}
                className="text-[var(--text-muted)] hover:text-[var(--theme-secondary)] transition"
              >
                {link.name}
              </a>

            ))}

          </div>

        </div>

      </div>

    </footer>
  );
}