"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, type Variants, type Transition } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Search, ShoppingCart, MapPin, Mail, Clock } from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";
import CartModal from "@/components/layout/CartModal";
import { useCart } from "@/components/layout/CartContext";

// ─── Animation variants ──────────────────────────────────────────────────────

const sidebarVariants: Variants = {
  hidden: (dir: "left" | "right") => ({
    x: dir === "left" ? "-100%" : "100%",
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 38,
      mass: 0.9,
      when: "beforeChildren",
      staggerChildren: 0.045,
    } as Transition,
  },
  exit: (dir: "left" | "right") => ({
    x: dir === "left" ? "-100%" : "100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 42,
    } as Transition,
  }),
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } as Transition },
  exit:    { opacity: 0, transition: { duration: 0.22 } as Transition },
};

const childItem: Variants = {
  hidden: { opacity: 0, x: -18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 380, damping: 32 } as Transition,
  },
};

const rightChildItem: Variants = {
  hidden: { opacity: 0, x: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 380, damping: 32 } as Transition,
  },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 32,
      when: "beforeChildren",
      staggerChildren: 0.04,
    } as Transition,
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.14 } as Transition,
  },
};

const dropdownItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  },
};

const megaVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 30,
      when: "beforeChildren",
      staggerChildren: 0.06,
    } as Transition,
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.15 } as Transition,
  },
};

const megaCol: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 360, damping: 28 } as Transition,
  },
};

// ─── Accordion item for mobile ───────────────────────────────────────────────

function MobileAccordion({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={childItem}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <ChevronDown className="w-4 h-4 opacity-60" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { type: "spring", stiffness: 400, damping: 36 },
                opacity: { duration: 0.2 },
              } as Transition,
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.22 } as Transition,
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="ml-4 mt-1 mb-1 flex flex-col border-l-2 border-[var(--color-primary)] pl-3 space-y-0.5">
              {links.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: i * 0.04,
                      type: "spring",
                      stiffness: 380,
                      damping: 28,
                    } as Transition,
                  }}
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Desktop dropdown ────────────────────────────────────────────────────────

function Dropdown({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm">
        {title}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
        >
          <ChevronDown className="w-3 h-3 opacity-60" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 mt-2 w-56 bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg rounded-lg overflow-hidden z-50"
          >
            {links.map((link, i) => (
              <motion.li key={i} variants={dropdownItem}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-[var(--color-primary)] text-sm transition"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Desktop mega menu ───────────────────────────────────────────────────────

function MegaItem({ img, title, links }: { img: string; title: string; links: { name: string; href: string }[] }) {
  return (
    <motion.div variants={megaCol}>
      <img src={img} className="rounded-lg mb-3" alt={title} />
      <h4 className="font-semibold mb-2 text-sm text-[var(--color-foreground)]">{title}</h4>
      <div className="flex flex-col gap-1">
        {links.map((link, i) => (
          <Link key={i} href={link.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition">
            {link.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function HomeDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm">
        Home
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
        >
          <ChevronDown className="w-3 h-3 opacity-60" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={megaVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-full mt-3 w-[700px] bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg rounded-xl p-6 grid grid-cols-3 gap-6 z-50"
          >
            <MegaItem img="/assets/images/header/home-1.png" title="Home 01" links={[{ name: "Multi Page", href: "/" }, { name: "One Page", href: "/index-one-page" }, { name: "Dark Page", href: "/index-dark" }]} />
            <MegaItem img="/assets/images/header/home-2.png" title="Home 02" links={[{ name: "Multi Page", href: "/index2" }, { name: "One Page", href: "/index-two-page" }, { name: "Dark Page", href: "/index-2-dark" }]} />
            <MegaItem img="/assets/images/header/home-3.png" title="Home 03" links={[{ name: "Multi Page", href: "/index3" }, { name: "One Page", href: "/index-three-page" }, { name: "Dark Page", href: "/index-3-dark" }]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Social icons data ───────────────────────────────────────────────────────

const SOCIALS = [
  { title: "Facebook", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
  { title: "Twitter", d: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7-2.25 1.125-4.5 1.125-6-2.125" },
  { title: "YouTube", d: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { title: "LinkedIn", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.663 1.191-1.608 2.905-1.608 2.126 0 3.719 1.395 3.719 4.391v5.499zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.771-1.71 1.958-1.71 1.187 0 1.914.755 1.939 1.71 0 .951-.752 1.71-1.982 1.71zm1.581 11.597H3.635V9.861h3.283v10.591zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
];

// ─── Main header ─────────────────────────────────────────────────────────────

export default function PremiumHeader() {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [infoOpen, setInfoOpen]           = useState(false);
  const { cart, open: cartOpen, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-card)] border-b border-[var(--border-strong)] shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img src="/assets/images/logo/logo.svg" alt="Logo" className="h-11 w-auto" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center space-x-2">
          <HomeDropdown />
          <Link href="/about" className="px-4 py-2 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm">About</Link>
          <Link href="/services" className="px-4 py-2 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm">Services</Link>
          <Dropdown title="Pages" links={[{ name: "Project", href: "/project" }, { name: "Team", href: "/team" }, { name: "Pricing", href: "/pricing" }, { name: "Gallery", href: "/gallery" }, { name: "FAQ", href: "/faq" }, { name: "Login", href: "/login" }]} />
          <Dropdown title="Shop" links={[{ name: "Shop", href: "/shop" }, { name: "Checkout", href: "/checkout" }]} />
          <Link href="/contact" className="px-4 py-2 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm">Contact</Link>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--primary-light)]">
              <Phone className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[var(--text-muted)]">Request A Call</span>
              <Link href="tel:+16845550102" className="font-semibold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition">(684) 555-0102</Link>
            </div>
          </div>

          <ThemeToggle />

          <button className="p-2 rounded-lg hover:bg-[var(--primary-light)] transition">
            <Search className="w-5 h-5 text-[var(--color-foreground)] hover:text-[var(--color-primary)]" />
          </button>

          <button
            onClick={toggleCart}
            className="hidden lg:flex p-2 rounded-lg hover:bg-[var(--primary-light)] transition relative"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-[var(--color-foreground)] hover:text-[var(--color-primary)]" />
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 22 } as Transition }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-0 right-0 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-semibold"
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-[var(--primary-light)] transition items-center justify-center"
            title="Contact Information"
          >
            <svg className="w-5 h-5 text-[var(--color-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Hamburger — animated icon swap */}
          <button
            onClick={() => setOffcanvasOpen(!offcanvasOpen)}
            className="xl:hidden p-2 rounded-lg bg-[var(--surface)] border border-[var(--color-border)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {offcanvasOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── MOBILE OFF-CANVAS (LEFT) ─────────────────────────────────────────── */}
      <AnimatePresence>
        {offcanvasOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 z-40 xl:hidden"
              onClick={() => setOffcanvasOpen(false)}
            />
            <motion.div
              key="mobile-sidebar"
              custom="left"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed left-0 top-0 h-full w-80 bg-[var(--color-card)] border-r border-[var(--color-border)] shadow-lg z-50 overflow-y-auto"
            >
              <div className="p-6">
                <motion.div variants={childItem} className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center">
                    <img src="/assets/images/logo/logo.svg" alt="Logo" className="h-10 w-auto" />
                  </Link>
                  <button onClick={() => setOffcanvasOpen(false)} className="p-2 hover:bg-[var(--primary-light)] rounded-lg transition">
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>

                <motion.nav className="flex flex-col space-y-1 mb-6">
                  <MobileAccordion
                    title="Home"
                    links={[
                      { name: "Home 01 – Multi Page", href: "/" },
                      { name: "Home 01 – One Page", href: "/index-one-page" },
                      { name: "Home 01 – Dark", href: "/index-dark" },
                      { name: "Home 02 – Multi Page", href: "/index2" },
                      { name: "Home 02 – One Page", href: "/index-two-page" },
                      { name: "Home 02 – Dark", href: "/index-2-dark" },
                      { name: "Home 03 – Multi Page", href: "/index3" },
                      { name: "Home 03 – One Page", href: "/index-three-page" },
                      { name: "Home 03 – Dark", href: "/index-3-dark" },
                    ]}
                  />
                  {[
                    { label: "About", href: "/about" },
                    { label: "Services", href: "/services" },
                  ].map(({ label, href }) => (
                    <motion.div key={label} variants={childItem}>
                      <Link href={href} className="block px-4 py-3 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm">
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                  <MobileAccordion
                    title="Pages"
                    links={[{ name: "Project", href: "/project" }, { name: "Team", href: "/team" }, { name: "Pricing", href: "/pricing" }, { name: "Gallery", href: "/gallery" }, { name: "FAQ", href: "/faq" }, { name: "Login", href: "/login" }]}
                  />
                  <MobileAccordion
                    title="Shop"
                    links={[{ name: "Shop", href: "/shop" }, { name: "Checkout", href: "/checkout" }]}
                  />
                  <motion.div variants={childItem}>
                    <Link href="/contact" className="block px-4 py-3 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm">
                      Contact
                    </Link>
                  </motion.div>
                </motion.nav>

                <motion.div variants={childItem} className="mb-6">
                  <h4 className="font-bold text-[var(--color-foreground)] mb-4">Contact Info</h4>
                  <ul className="space-y-3">
                    {[
                      { Icon: MapPin, content: <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition">Main Street, Melbourne, Australia</a> },
                      { Icon: Mail, content: <a href="mailto:info@example.com" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition">info@example.com</a> },
                      { Icon: Clock, content: <span className="text-sm text-[var(--text-muted)]">Mon–Friday, 09am – 05pm</span> },
                      { Icon: Phone, content: <a href="tel:+11002345909" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition">+1 (100) 234-5909</a> },
                    ].map(({ Icon, content }, i) => (
                      <li key={i} className="flex gap-3">
                        <Icon className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                        {content}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={childItem}>
                  <Link href="/quote" className="block w-full px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition font-semibold text-center mb-6">
                    Get A Quote
                  </Link>
                </motion.div>

                <motion.div variants={childItem} className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
                  {SOCIALS.map(({ title, d }) => (
                    <a key={title} href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition" title={title}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={d} /></svg>
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── INFO OFF-CANVAS (RIGHT) ──────────────────────────────────────────── */}
      <AnimatePresence>
        {infoOpen && (
          <>
            <motion.div
              key="info-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setInfoOpen(false)}
            />
            <motion.div
              key="info-sidebar"
              custom="right"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 h-full w-96 bg-[var(--color-card)] border-l border-[var(--color-border)] shadow-lg z-50 overflow-y-auto"
            >
              <div className="p-8">
                <motion.button
                  variants={rightChildItem}
                  onClick={() => setInfoOpen(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-[var(--primary-light)] rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <motion.h3 variants={rightChildItem} className="text-2xl font-bold text-[var(--color-foreground)] mb-4 mt-4">
                  Contact Info
                </motion.h3>
                <motion.p variants={rightChildItem} className="text-sm text-[var(--text-muted)] mb-8">
                  Get in touch with us for any inquiries or assistance. We&apos;re here to help!
                </motion.p>

                <motion.div variants={rightChildItem} className="space-y-6 mb-8">
                  {[
                    { Icon: MapPin, label: "Address", content: <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition">Main Street, Melbourne, Australia</a> },
                    { Icon: Mail, label: "Email", content: <a href="mailto:info@example.com" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition">info@example.com</a> },
                    { Icon: Clock, label: "Hours", content: <><p className="text-sm text-[var(--text-muted)]">Monday – Friday</p><p className="text-sm text-[var(--text-muted)]">09:00 AM – 05:00 PM</p></> },
                    { Icon: Phone, label: "Phone", content: <a href="tel:+11002345909" className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition">+1 (100) 234-5909</a> },
                  ].map(({ Icon, label, content }) => (
                    <div key={label} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--primary-light)]">
                        <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--color-foreground)] mb-1">{label}</h4>
                        {content}
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={rightChildItem}>
                  <Link href="/quote" className="block w-full px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition font-semibold text-center mb-8">
                    Get A Quote
                  </Link>
                </motion.div>

                <motion.div variants={rightChildItem} className="border-t border-[var(--color-border)] pt-8 mb-4" />
                <motion.h4 variants={rightChildItem} className="font-semibold text-[var(--color-foreground)] mb-4">Follow Us</motion.h4>
                <motion.div variants={rightChildItem} className="grid grid-cols-2 gap-3">
                  {SOCIALS.map(({ title, d }) => (
                    <a key={title} href="#" className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition font-medium text-sm" title={title}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={d} /></svg>
                      <span>{title}</span>
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CART MODAL */}
      {cartOpen && <CartModal />}
    </header>
  );
}