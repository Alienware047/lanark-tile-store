"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone, Search, ShoppingCart, MapPin, Mail, Clock } from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";
import CartItem from "@/components/layout/CartItem";
import CartModal from "@/components/layout/CartModal";
import { useCart } from "@/components/layout/CartContext";

export default function PremiumHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [infoOffcanvasOpen, setInfoOffcanvasOpen] = useState(false);
  const { cart, open: cartOpen, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-card)] border-b border-[var(--border-strong)] shadow-sm">

      {/* CONTAINER */}
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img
            src="/assets/images/logo/logo.svg"
            alt="Logo"
            className="h-11 w-auto"
          />
        </Link>


        {/* DESKTOP MENU */}
        <nav className="hidden xl:flex items-center space-x-2">

          {/* HOME */}
          <div className="relative group">

            <Link
              href="/"
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm"
            >
              Home

              <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition" />

            </Link>


            {/* MEGA MENU */}
            <div className="absolute left-0 top-full mt-3 w-[700px]
            bg-[var(--color-card)]
            border border-[var(--color-border)]
            shadow-lg
            rounded-xl
            opacity-0 invisible
            group-hover:visible group-hover:opacity-100
            transition-all duration-300
            p-6
            grid grid-cols-3 gap-6">


              {/* ITEM */}
              <MegaItem
                img="/assets/images/header/home-1.png"
                title="Home 01"
                links={[
                  { name: "Multi Page", href: "/" },
                  { name: "One Page", href: "/index-one-page" },
                  { name: "Dark Page", href: "/index-dark" },
                ]}
              />

              <MegaItem
                img="/assets/images/header/home-2.png"
                title="Home 02"
                links={[
                  { name: "Multi Page", href: "/index2" },
                  { name: "One Page", href: "/index-two-page" },
                  { name: "Dark Page", href: "/index-2-dark" },
                ]}
              />

              <MegaItem
                img="/assets/images/header/home-3.png"
                title="Home 03"
                links={[
                  { name: "Multi Page", href: "/index3" },
                  { name: "One Page", href: "/index-three-page" },
                  { name: "Dark Page", href: "/index-3-dark" },
                ]}
              />


            </div>

          </div>


          {/* SIMPLE LINKS */}

          <NavLink href="/about">About</NavLink>


          {/* SERVICES */}
          <Dropdown
            title="Services"
            links={[
              { name: "All Services", href: "/services" },
              { name: "Service Details", href: "/service-details" },
            ]}
          />


          {/* PAGES */}
          <Dropdown
            title="Pages"
            links={[
              { name: "Project", href: "/project" },
              { name: "Team", href: "/team" },
              { name: "Pricing", href: "/pricing" },
              { name: "Gallery", href: "/gallery" },
              { name: "FAQ", href: "/faq" },
              { name: "Login", href: "/login" },
            ]}
          />

          {/* PAGES */}
          <Dropdown
            title="Shop"
            links={[
              { name: "Shop", href: "/shop" },
              { name: "Shop Details", href: "/shop-details" },
              { name: "Checkout", href: "/checkout" },
              // { name: "Gallery", href: "/gallery" },
              // { name: "FAQ", href: "/faq" },
              // { name: "Login", href: "/login" },
            ]}
          />


          <NavLink href="/contact">Contact</NavLink>


        </nav>


        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* CONTACT INFO - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--primary-light)]">
              <Phone className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[var(--text-muted)]">Request A Call</span>
              <Link
                href="tel:+16845550102"
                className="font-semibold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition"
              >
                (684) 555-0102
              </Link>
            </div>
          </div>

          <ThemeToggle />

          {/* SEARCH TRIGGER */}
          <button className="p-2 rounded-lg hover:bg-[var(--primary-light)] transition">
            <Search className="w-5 h-5 text-[var(--color-foreground)] hover:text-[var(--color-primary)]" />
          </button>

          {/* INFO OFFCANVAS TRIGGER - Large screens */}
          {/* <button
            onClick={() => setInfoOffcanvasOpen(!infoOffcanvasOpen)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-[var(--primary-light)] transition items-center justify-center"
            title="Contact Information"
          >
            <svg className="w-5 h-5 text-[var(--color-foreground)] hover:text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button> */}

          {/* CART BUTTON */}
          <button
            onClick={toggleCart}
            className="hidden lg:flex p-2 rounded-lg hover:bg-[var(--primary-light)] transition relative"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-[var(--color-foreground)] hover:text-[var(--color-primary)]" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {cart.length}
              </span>
            )}
          </button>

          {/* INFO OFFCANVAS TRIGGER - Large screens */}
          <button
            onClick={() => setInfoOffcanvasOpen(!infoOffcanvasOpen)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-[var(--primary-light)] transition items-center justify-center"
            title="Contact Information"
          >
            <svg className="w-5 h-5 text-[var(--color-foreground)] hover:text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* BUTTON */}
          {/* <Link
            href="/quote"
            className="hidden xl:inline-flex px-6 py-2.5 rounded-lg
            bg-[var(--color-primary)]
            text-[var(--color-primary-foreground)]
            hover:bg-[var(--primary-hover)]
            transition
            font-semibold
            text-sm
            shadow-md hover:shadow-lg"
          >
            GET A QUOTE
          </Link> */}

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOffcanvasOpen(!offcanvasOpen)}
            className="xl:hidden p-2 rounded-lg
            bg-[var(--surface)]
            border border-[var(--color-border)]"
          >
            <Menu size={24} />
          </button>

        </div>


      </div>



      {/* OFF-CANVAS SIDEBAR */}
      {offcanvasOpen && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/50 z-40 xl:hidden"
            onClick={() => setOffcanvasOpen(false)}
          />

          {/* OFF-CANVAS PANEL */}
          <div className="fixed left-0 top-0 h-full w-80 bg-[var(--color-card)] border-r border-[var(--color-border)] shadow-lg z-50 overflow-y-auto">
            <div className="p-6">
              {/* TOP - LOGO AND CLOSE */}
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="flex items-center">
                  <img
                    src="/assets/images/logo/logo.svg"
                    alt="Logo"
                    className="h-10 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setOffcanvasOpen(false)}
                  className="p-2 hover:bg-[var(--primary-light)] rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-[var(--text-muted)] mb-6 hidden lg:block">
                Nullam dignissim, ante scelerisque the is euismod fermentum odio sem semper the is erat, a feugiat leo urna eget eros.
              </p>

              {/* MOBILE MENU */}
              <nav className="flex flex-col space-y-2 mb-6">
                <MobileLink href="/">Home</MobileLink>
                <MobileLink href="/about">About</MobileLink>
                <MobileLink href="/services">Services</MobileLink>
                <MobileLink href="/shop">Shop</MobileLink>
                <MobileLink href="/contact">Contact</MobileLink>
              </nav>

              {/* CONTACT INFO */}
              <div className="mb-6">
                <h4 className="font-bold text-[var(--color-foreground)] mb-4">Contact Info</h4>
                <ul className="space-y-3">
                  {/* ADDRESS */}
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 text-[var(--color-primary)] mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition"
                      >
                        Main Street, Melbourne, Australia
                      </a>
                    </div>
                  </li>

                  {/* EMAIL */}
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 text-[var(--color-primary)] mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <a
                        href="mailto:info@example.com"
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition"
                      >
                        info@example.com
                      </a>
                    </div>
                  </li>

                  {/* HOURS */}
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 text-[var(--color-primary)] mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm text-[var(--text-muted)]">Mon-Friday, 09am - 05pm</span>
                    </div>
                  </li>

                  {/* PHONE */}
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 text-[var(--color-primary)] mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <a
                        href="tel:+11002345909"
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition"
                      >
                        +1 (100) 234-5909
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* CTA BUTTON */}
              <Link
                href="/quote"
                className="block w-full px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition font-semibold text-center mb-6"
              >
                Get A Quote
              </Link>

              {/* SOCIAL ICONS */}
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition"
                  title="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition"
                  title="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7-2.25 1.125-4.5 1.125-6-2.125" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition"
                  title="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.663 1.191-1.608 2.905-1.608 2.126 0 3.719 1.395 3.719 4.391v5.499zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.771-1.71 1.958-1.71 1.187 0 1.914.755 1.939 1.71 0 .951-.752 1.71-1.982 1.71zm1.581 11.597H3.635V9.861h3.283v10.591zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* INFO OFFCANVAS SIDEBAR - Large screens */}
      {infoOffcanvasOpen && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setInfoOffcanvasOpen(false)}
          />

          {/* OFF-CANVAS PANEL */}
          <div className="fixed right-0 top-0 h-full w-96 bg-[var(--color-card)] border-l border-[var(--color-border)] shadow-lg z-50 overflow-y-auto">
            <div className="p-8">
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setInfoOffcanvasOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-[var(--primary-light)] rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* TITLE */}
              <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-8 mt-4">Contact Info</h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-[var(--text-muted)] mb-8">
                Get in touch with us for any inquiries or assistance. We're here to help!
              </p>

              {/* CONTACT ITEMS */}
              <div className="space-y-6 mb-8">
                {/* ADDRESS */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--primary-light)]">
                    <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Address</h4>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition"
                    >
                      Main Street, Melbourne, Australia
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--primary-light)]">
                    <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Email</h4>
                    <a
                      href="mailto:info@example.com"
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition"
                    >
                      info@example.com
                    </a>
                  </div>
                </div>

                {/* HOURS */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--primary-light)]">
                    <Clock className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Hours</h4>
                    <p className="text-sm text-[var(--text-muted)]">Monday - Friday</p>
                    <p className="text-sm text-[var(--text-muted)]">09:00 AM - 05:00 PM</p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--primary-light)]">
                    <Phone className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Phone</h4>
                    <a
                      href="tel:+11002345909"
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition"
                    >
                      +1 (100) 234-5909
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA BUTTON */}
              <Link
                href="/quote"
                className="block w-full px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition font-semibold text-center mb-8"
              >
                Get A Quote
              </Link>

              {/* DIVIDER */}
              <div className="border-t border-[var(--color-border)] pt-8 mb-4" />

              {/* SOCIAL TITLE */}
              <h4 className="font-semibold text-[var(--color-foreground)] mb-4">Follow Us</h4>

              {/* SOCIAL ICONS */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition font-medium text-sm"
                  title="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  <span>Facebook</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition font-medium text-sm"
                  title="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7-2.25 1.125-4.5 1.125-6-2.125" />
                  </svg>
                  <span>Twitter</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition font-medium text-sm"
                  title="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition font-medium text-sm"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.663 1.191-1.608 2.905-1.608 2.126 0 3.719 1.395 3.719 4.391v5.499zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.771-1.71 1.958-1.71 1.187 0 1.914.755 1.939 1.71 0 .951-.752 1.71-1.982 1.71zm1.581 11.597H3.635V9.861h3.283v10.591zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CART MODAL */}
      {cartOpen && <CartModal />}


    </header>
  );
}



function NavLink({ href, children }: any) {

  return (

    <Link
      href={href}
      className="px-4 py-2 rounded-lg
      text-[var(--color-foreground)]
      hover:text-[var(--color-primary)]
      hover:bg-[var(--primary-light)]
      transition font-medium text-sm"
    >
      {children}
    </Link>

  );

}



function MobileLink({ href, children }: any) {

  return (

    <Link
      href={href}
      className="px-4 py-3 rounded-lg
      text-[var(--color-foreground)]
      hover:text-[var(--color-primary)]
      hover:bg-[var(--primary-light)]"
    >
      {children}
    </Link>

  );

}



function Dropdown({ title, links }: any) {

  return (

    <div className="relative group">

      <button
        className="flex items-center gap-1 px-4 py-2 rounded-lg
        text-[var(--color-foreground)]
        hover:text-[var(--color-primary)]
        hover:bg-[var(--primary-light)]
        transition font-medium text-sm"
      >
        {title}

        <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition" />

      </button>


      <ul className="
      absolute top-full left-0 mt-2 w-56
      bg-[var(--color-card)]
      border border-[var(--color-border)]
      shadow-lg
      rounded-lg
      opacity-0 invisible
      group-hover:visible group-hover:opacity-100
      transition
      ">

        {links.map((link: any, i: number) => (

          <li key={i}>

            <Link
              href={link.href}
              className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-[var(--color-primary)]"
            >
              {link.name}
            </Link>

          </li>

        ))}

      </ul>

    </div>

  );

}



function MegaItem({ img, title, links }: any) {

  return (

    <div>

      <img
        src={img}
        className="rounded-lg mb-3"
      />

      <h4 className="font-semibold mb-2">{title}</h4>


      <div className="flex flex-col gap-1">

        {links.map((link: any, i: number) => (

          <Link
            key={i}
            href={link.href}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)]"
          >
            {link.name}
          </Link>

        ))}

      </div>

    </div>

  );

}