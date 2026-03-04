// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceStat {
  label: string;
  value: string;
}

export interface Service {
  title: string;
  slug: string;
  icon: string;
  thumb: string;
  heroImg: string;
  tagline: string;
  description: string;
  features: string[];
  process: ServiceProcess[];
  faqs: ServiceFaq[];
  stats: ServiceStat[];
  category: string;
}

// Card-only data (used by ServiceSection.tsx cards on the homepage/services listing)
export interface ServiceCard {
  number: string;
  title: string;
  slug: string;
  description: string;
  bg: string;
}

// ─── Full service detail data (used by /services/[slug]/page.tsx) ─────────────

export const allServices: Service[] = [
  {
    title: "Industrial Flooring",
    slug: "industrial-flooring",
    icon: "/assets/images/icon/serviceCardIcon1_3.svg",
    thumb: "/assets/images/service/serviceThumb1_3.jpg",
    heroImg: "/assets/images/bg/serviceCardBg2_1.jpg",
    tagline: "Built for endurance. Engineered for impact.",
    description:
      "Industrial flooring demands more than aesthetics — it must withstand heavy machinery, chemical exposure, high foot traffic, and extreme temperature changes. Our industrial flooring solutions combine cutting-edge materials with precision installation techniques to deliver surfaces that last decades.",
    features: [
      "Heavy-load bearing capacity up to 10 tonnes/m²",
      "Chemical and oil-resistant coatings",
      "Anti-slip surface treatments",
      "Dust-free epoxy and polyurethane finishes",
      "Fast-cure options for minimal downtime",
      "Custom colour and marking systems",
    ],
    process: [
      { step: "01", title: "Site Assessment", desc: "We evaluate your existing substrate, load requirements, and environmental conditions." },
      { step: "02", title: "Material Selection", desc: "Choose from epoxy, polyurethane, or concrete systems tailored to your use case." },
      { step: "03", title: "Surface Preparation", desc: "Diamond grinding and shot blasting ensure perfect adhesion." },
      { step: "04", title: "Professional Installation", desc: "Seamless application by certified installers with precision equipment." },
    ],
    faqs: [
      { q: "How long does installation take?", a: "Typical industrial floors are installed in 2–5 days depending on size. Fast-cure systems can be operational within 24 hours." },
      { q: "What maintenance is required?", a: "Our coatings are low-maintenance. Regular sweeping and occasional wet mopping is all that's needed." },
      { q: "Can you work around our operating hours?", a: "Yes. We offer weekend and night installations to minimise operational disruption." },
    ],
    stats: [
      { label: "Projects Completed", value: "500+" },
      { label: "Years Experience", value: "15+" },
      { label: "Client Satisfaction", value: "98%" },
    ],
    category: "Commercial",
  },
  {
    title: "Tiling & Concrete",
    slug: "tiling-concrete",
    icon: "/assets/images/icon/serviceCardIcon1_1.svg",
    thumb: "/assets/images/service/serviceThumb1_1.jpg",
    heroImg: "/assets/images/bg/serviceCardBg2_1.jpg",
    tagline: "Timeless materials. Modern precision.",
    description:
      "From polished concrete floors to intricate tile layouts, we bring both craft and technical expertise to every project. Our tiling and concrete services cover residential kitchens to commercial lobbies, always with meticulous attention to grout lines, levelling, and long-term durability.",
    features: [
      "Precision tile cutting and layout planning",
      "Underfloor heating compatibility",
      "Waterproofing systems for wet areas",
      "Polished and honed concrete finishes",
      "Large-format tile installation specialists",
      "Custom grout colour matching",
    ],
    process: [
      { step: "01", title: "Design Consultation", desc: "We help you select tile patterns, sizes, and materials that suit your space and lifestyle." },
      { step: "02", title: "Substrate Preparation", desc: "Proper levelling and waterproofing to ensure tiles last a lifetime." },
      { step: "03", title: "Layout & Installation", desc: "Laser-guided lines ensure perfect alignment from the first tile." },
      { step: "04", title: "Grouting & Sealing", desc: "Professional grouting and sealant application for a flawless finish." },
    ],
    faqs: [
      { q: "How do I choose the right tile?", a: "We guide you through slip ratings, hardness grades, and aesthetic options during a free consultation." },
      { q: "Can you fix existing cracked tiles?", a: "Yes, we offer tile repair and replacement services with careful pattern matching." },
      { q: "Do you install heated floors?", a: "Absolutely. We integrate underfloor heating systems before laying tiles." },
    ],
    stats: [
      { label: "Tiles Installed", value: "2M+" },
      { label: "Years Experience", value: "15+" },
      { label: "Client Satisfaction", value: "97%" },
    ],
    category: "Residential & Commercial",
  },
  {
    title: "Epoxy Solutions",
    slug: "epoxy-solutions",
    icon: "/assets/images/icon/serviceCardIcon1_1.svg",
    thumb: "/assets/images/service/serviceThumb1_2.jpg",
    heroImg: "/assets/images/bg/serviceCardBg2_1.jpg",
    tagline: "Seamless. Durable. Spectacular.",
    description:
      "Epoxy flooring transforms ordinary concrete into a seamless, high-gloss surface that's as beautiful as it is tough. Our epoxy systems are available in hundreds of colours, metallic effects, and aggregate finishes — ideal for garages, showrooms, restaurants, and luxury homes.",
    features: [
      "Metallic and 3D epoxy design effects",
      "Self-levelling systems for perfectly flat floors",
      "UV-stable topcoats prevent yellowing",
      "FDA-approved food-safe options",
      "Seamless hygienic surface — no grout lines",
      "Scratch and impact resistant",
    ],
    process: [
      { step: "01", title: "Consultation & Design", desc: "Pick your colour system, finish, and any decorative elements like flakes or metallics." },
      { step: "02", title: "Concrete Preparation", desc: "Diamond grinding removes contaminants and opens the concrete pores for adhesion." },
      { step: "03", title: "Primer Application", desc: "Specialist epoxy primer penetrates deeply for a mechanical bond." },
      { step: "04", title: "Topcoat & Polish", desc: "Multiple topcoat layers build thickness, gloss, and chemical resistance." },
    ],
    faqs: [
      { q: "Is epoxy suitable for residential homes?", a: "Absolutely. Epoxy is increasingly popular in modern homes for its sleek look and easy maintenance." },
      { q: "Will it yellow over time?", a: "Our systems use UV-stable polyaspartic topcoats that resist yellowing for 10+ years." },
      { q: "Can epoxy be applied over existing tiles?", a: "In many cases yes — we assess suitability during our site visit." },
    ],
    stats: [
      { label: "Sqm Installed", value: "1M+" },
      { label: "Years Experience", value: "15+" },
      { label: "Client Satisfaction", value: "99%" },
    ],
    category: "Residential & Commercial",
  },
  {
    title: "Vinyl Plank",
    slug: "vinyl-plank",
    icon: "/assets/images/icon/serviceCardIcon1_4.svg",
    thumb: "/assets/images/service/serviceThumb1_4.jpg",
    heroImg: "/assets/images/bg/serviceCardBg2_1.jpg",
    tagline: "The warmth of timber. The resilience of vinyl.",
    description:
      "Luxury vinyl plank (LVP) flooring delivers stunning wood-look aesthetics with the practical advantages of waterproofing, scratch resistance, and comfort underfoot. Perfect for families, pet owners, and high-traffic areas where real timber would struggle.",
    features: [
      "100% waterproof — ideal for kitchens and bathrooms",
      "Wear layer up to 12mm for heavy traffic",
      "Realistic wood and stone embossed textures",
      "Floating installation — no glue or nails",
      "Comfortable acoustic underlay included",
      "Compatible with underfloor heating",
    ],
    process: [
      { step: "01", title: "Sample Selection", desc: "Choose from 50+ timber and stone-look designs in our showroom." },
      { step: "02", title: "Subfloor Assessment", desc: "We check for moisture, levelness, and structural integrity." },
      { step: "03", title: "Acclimatisation", desc: "Planks acclimatise to room temperature for 48 hours before installation." },
      { step: "04", title: "Floating Installation", desc: "Click-lock system installed with precision expansion gaps." },
    ],
    faqs: [
      { q: "How does it compare to real timber?", a: "LVP is more durable, waterproof, and lower cost than real timber, with very similar aesthetics." },
      { q: "Can it go over existing floors?", a: "Often yes, if the existing floor is level and structurally sound." },
      { q: "How long does it last?", a: "Quality LVP with a thick wear layer lasts 20–25 years with normal use." },
    ],
    stats: [
      { label: "Planks Installed", value: "5M+" },
      { label: "Years Experience", value: "15+" },
      { label: "Client Satisfaction", value: "98%" },
    ],
    category: "Residential",
  },
  {
    title: "Carpet & Rugs",
    slug: "carpets-rugs",
    icon: "/assets/images/icon/serviceCardIcon1_2.svg",
    thumb: "/assets/images/service/serviceThumb1_2.jpg",
    heroImg: "/assets/images/bg/serviceCardBg2_1.jpg",
    tagline: "Softness beneath every step.",
    description:
      "Nothing matches the warmth and acoustic comfort of a quality carpet. We supply and install premium carpet and rug solutions for bedrooms, living areas, offices, and hospitality spaces — with hundreds of textures, piles, and colours to choose from.",
    features: [
      "Stain-resistant and pet-friendly options",
      "Thick underlay for superior comfort",
      "Acoustic insulation — reduces noise by up to 35dB",
      "Custom-cut rugs and carpet runners",
      "Commercial carpet tiles for offices",
      "Allergy-safe anti-microbial treatments",
    ],
    process: [
      { step: "01", title: "Home Consultation", desc: "Bring samples to your space and see how they look in your lighting." },
      { step: "02", title: "Precise Measurement", desc: "We measure and plan cuts to minimise waste and seam visibility." },
      { step: "03", title: "Underlay Installation", desc: "Quality underlay is laid and secured for optimal feel and longevity." },
      { step: "04", title: "Carpet Fitting", desc: "Skilled fitters stretch and tuck the carpet for a seamless result." },
    ],
    faqs: [
      { q: "How often should carpet be replaced?", a: "Quality carpet lasts 10–15 years. We also offer professional deep cleaning to extend its life." },
      { q: "Do you offer commercial carpet tiles?", a: "Yes — modular tiles are ideal for offices as damaged sections can be replaced individually." },
      { q: "Can you remove old carpet?", a: "Yes, we handle full removal and disposal of existing floor coverings." },
    ],
    stats: [
      { label: "Rooms Carpeted", value: "20K+" },
      { label: "Years Experience", value: "15+" },
      { label: "Client Satisfaction", value: "97%" },
    ],
    category: "Residential & Commercial",
  },
  {
    title: "Vein Patterns",
    slug: "vein-patterns",
    icon: "/assets/images/icon/serviceCardIcon1_3.svg",
    thumb: "/assets/images/service/serviceThumb1_3.jpg",
    heroImg: "/assets/images/bg/serviceCardBg2_1.jpg",
    tagline: "Nature's artistry. Engineered to last.",
    description:
      "Vein-patterned stone and porcelain tiles capture the natural drama of marble and quartzite — with the practical benefits of modern tile technology. Our vein pattern collection is curated for statement floors, feature walls, and luxury bathrooms.",
    features: [
      "Bookmatched panels for continuous vein flow",
      "Large-format slabs up to 3200×1600mm",
      "Rectified edges for ultra-fine grout joints",
      "Polished, honed, and brushed finishes",
      "Indoor and outdoor slip-rated options",
      "10-year structural warranty",
    ],
    process: [
      { step: "01", title: "Pattern Planning", desc: "We digitally map the vein layout to ensure continuous flow across panels." },
      { step: "02", title: "Slab Selection", desc: "Hand-select from our warehouse stock for the best pattern match." },
      { step: "03", title: "Precision Cutting", desc: "CNC waterjet cutting ensures perfect angles and minimised waste." },
      { step: "04", title: "Expert Installation", desc: "Book-matched installation by our luxury tile specialists." },
    ],
    faqs: [
      { q: "What is bookmatching?", a: "Bookmatching mirrors adjacent slabs so veins flow continuously — like opening a book. It creates a dramatic, seamless effect." },
      { q: "Are vein tiles slippery?", a: "Polished finishes are best for walls. For floors we recommend honed or textured finishes with appropriate slip ratings." },
      { q: "Can large-format tiles crack?", a: "With proper substrate preparation and installation technique, large-format tiles are structurally sound." },
    ],
    stats: [
      { label: "Luxury Projects", value: "300+" },
      { label: "Years Experience", value: "15+" },
      { label: "Client Satisfaction", value: "99%" },
    ],
    category: "Luxury Residential",
  },
  {
    title: "Oak Flooring",
    slug: "oak-flooring",
    icon: "/assets/images/icon/serviceCardIcon1_2.svg",
    thumb: "/assets/images/service/serviceThumb1_2.jpg",
    heroImg: "/assets/images/bg/serviceCardBg2_1.jpg",
    tagline: "Real timber. Real character. Real lasting value.",
    description:
      "Engineered and solid oak flooring brings irreplaceable warmth and character to any interior. Each plank tells a story through its grain, knots, and natural colour variation. We supply and install premium European and American oak in a range of grades and finishes.",
    features: [
      "Solid and engineered oak options",
      "European and American oak grades",
      "Hand-scraped, brushed, and smoked finishes",
      "On-site sanding and finishing service",
      "Tongue-and-groove and click systems",
      "Can be refinished multiple times",
    ],
    process: [
      { step: "01", title: "Grade Selection", desc: "Choose from rustic, character, prime, or select grade oak to match your aesthetic." },
      { step: "02", title: "Moisture Testing", desc: "Subfloor and plank moisture levels are carefully checked before installation." },
      { step: "03", title: "Acclimatisation", desc: "Oak planks acclimatise in your space for 5–7 days before fitting." },
      { step: "04", title: "Installation & Finishing", desc: "Secret nailing or glue-down installation, then sanded and lacquered on site." },
    ],
    faqs: [
      { q: "Solid vs engineered oak — which is better?", a: "Engineered oak is more dimensionally stable and suited to underfloor heating. Solid oak can be sanded more times over its life." },
      { q: "How do I maintain oak floors?", a: "Regular sweeping and occasional oiling or re-lacquering keeps oak floors looking beautiful for generations." },
      { q: "Can oak be installed in kitchens?", a: "Engineered oak is suitable for kitchens with normal spill management. Solid oak is not recommended in wet rooms." },
    ],
    stats: [
      { label: "Sqm Installed", value: "800K+" },
      { label: "Years Experience", value: "15+" },
      { label: "Client Satisfaction", value: "98%" },
    ],
    category: "Residential",
  },
];

// ─── Card data for ServiceSection.tsx ────────────────────────────────────────
// Derived from allServices so slugs always stay in sync — no duplication.

export const serviceCards: ServiceCard[] = allServices
  .filter((s) => s.slug !== "oak-flooring") // oak-flooring is slider-only
  .map((s, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: s.title,
    slug: s.slug,
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered.",
    bg: "/assets/images/bg/serviceCardBg2_1.jpg",
  }));

// ─── Slider data (used by ServicesSection carousel) ──────────────────────────
// A subset used for the homepage slider — maps to the Service shape the
// carousel component expects ({ title, icon, thumb, link }).

export const defaultServices = allServices.map((s) => ({
  title: s.title,
  slug: s.slug,
  icon: s.icon,
  thumb: s.thumb,
  link: `/services/${s.slug}`,
}));