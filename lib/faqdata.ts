// ─── Types ────────────────────────────────────────────────────────────────────

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  title: string;       // Display name, e.g. "Installation"
  slug: string;        // URL-safe anchor, e.g. "installation"
  icon: string;        // SVG asset path
  description: string; // Short intro shown above the questions
  items: FaqItem[];
}

// ─── Full FAQ data (used by /faq/page.tsx) ────────────────────────────────────

export const allFaqCategories: FaqCategory[] = [
  {
    title: "Installation",
    slug: "installation",
    icon: "/assets/images/icon/serviceCardIcon1_3.svg",
    description:
      "Everything you need to know before, during, and after we arrive on site.",
    items: [
      {
        q: "How long does a typical installation take?",
        a: "Timescales vary by service. Vinyl plank in a standard room takes 1–2 days, full carpet fitting 1 day, epoxy coatings 2–4 days, and industrial flooring 2–5 days. We'll give you a precise schedule at quote stage.",
      },
      {
        q: "Do I need to clear the room before you arrive?",
        a: "Yes — we ask that furniture and loose items are removed before our team arrives. For large commercial projects we can coordinate phased clearance to minimise disruption.",
      },
      {
        q: "What subfloor conditions do you require?",
        a: "Subfloors must be structurally sound, dry, and level to within 3mm over 1.8m. We carry out a full subfloor assessment and will advise on any remedial work needed before installation begins.",
      },
      {
        q: "Can you install over existing flooring?",
        a: "In many cases yes — subject to our site assessment. Vinyl plank and epoxy can often go over existing concrete or screed. Tile-over-tile is assessed case by case.",
      },
      {
        q: "Do you work weekends or out of hours?",
        a: "Yes. For commercial clients especially, we offer weekend and overnight installation windows to keep your operation running.",
      },
    ],
  },
  {
    title: "Materials & Products",
    slug: "materials",
    icon: "/assets/images/icon/serviceCardIcon1_1.svg",
    description:
      "Questions about the brands, grades, and specifications of the products we supply and install.",
    items: [
      {
        q: "Which flooring brands do you work with?",
        a: "We source from a curated panel of European manufacturers known for consistency and sustainability. Specific brands can be discussed during your consultation — we match products to your budget and performance requirements.",
      },
      {
        q: "Are your products suitable for underfloor heating?",
        a: "Yes. Engineered oak, luxury vinyl plank, and most tile systems we install are compatible with underfloor heating. We'll specify the correct product and advise on maximum temperature ratings.",
      },
      {
        q: "What's the difference between solid and engineered oak?",
        a: "Solid oak is a single piece of timber and can be sanded and refinished many times. Engineered oak has a real hardwood veneer over a stable plywood core — it's better suited to underfloor heating and humid environments like kitchens.",
      },
      {
        q: "How do I choose between polished, honed, and brushed finishes?",
        a: "Polished finishes give a high-gloss reflective look but show scratches more readily. Honed is matte and more forgiving. Brushed textures add tactile character and excellent slip resistance. We bring samples to every in-home consultation.",
      },
      {
        q: "Do you offer sustainable or recycled material options?",
        a: "Yes. We stock products certified to FSC, PEFC, and Floorscore standards. Ask about our low-VOC adhesives and recycled-content luxury vinyl options.",
      },
    ],
  },
  {
    title: "Pricing & Quotes",
    slug: "pricing",
    icon: "/assets/images/icon/serviceCardIcon1_4.svg",
    description:
      "Transparent answers on how our quotes work and what affects the final price.",
    items: [
      {
        q: "Is the initial quote free?",
        a: "Yes. We offer free, no-obligation site visits and written quotes for all residential and commercial projects.",
      },
      {
        q: "What factors affect the cost of installation?",
        a: "Key variables include floor area, subfloor condition, product grade, room complexity (stairs, angles, doorways), and access. Our written quote breaks each element down clearly.",
      },
      {
        q: "Do you charge for subfloor preparation separately?",
        a: "Subfloor preparation is quoted as a separate line item so you can see exactly what's included. Work like levelling, damp-proofing, or old-floor removal is never hidden in the product price.",
      },
      {
        q: "Can I supply my own materials?",
        a: "We prefer to supply materials ourselves to guarantee quality and maintain our warranty. In some cases we can install customer-supplied products — please ask us at quote stage.",
      },
      {
        q: "Do you offer payment plans?",
        a: "For larger projects we can structure staged payments tied to project milestones. Please discuss this at consultation and we'll find an arrangement that works.",
      },
    ],
  },
  {
    title: "Aftercare & Warranty",
    slug: "aftercare",
    icon: "/assets/images/icon/serviceCardIcon1_2.svg",
    description:
      "How to look after your new floor, and what happens if something goes wrong.",
    items: [
      {
        q: "What warranty do you provide on installation?",
        a: "We offer a minimum 2-year installation workmanship warranty across all services. Product manufacturer warranties run alongside this — typically 10–25 years depending on the product.",
      },
      {
        q: "How should I clean and maintain my new floor?",
        a: "General care is simple: sweep regularly and mop with a damp (not wet) cloth using a pH-neutral cleaner. Avoid steam mops on wood and vinyl. We provide a written aftercare guide with every installation.",
      },
      {
        q: "What should I do if a tile cracks or a plank lifts?",
        a: "Contact us directly. Minor issues caused by installation defects are covered under our workmanship warranty. We carry off-cuts for most projects to enable like-for-like repairs.",
      },
      {
        q: "Can hardwood floors be sanded and refinished?",
        a: "Solid oak can be sanded and refinished multiple times over its lifespan. Engineered oak can typically be lightly sanded 1–2 times depending on veneer thickness. We offer a professional on-site sanding and re-oiling service.",
      },
      {
        q: "How soon can I walk on the floor after installation?",
        a: "Vinyl plank and carpet are ready to walk on immediately. Epoxy floors typically need 24 hours before light foot traffic and 72 hours before heavy use. Oiled and lacquered hardwood needs 24–48 hours. We advise precisely at handover.",
      },
    ],
  },
  {
    title: "Commercial Projects",
    slug: "commercial",
    icon: "/assets/images/icon/serviceCardIcon1_3.svg",
    description:
      "Specific considerations for offices, hospitality, retail, and industrial environments.",
    items: [
      {
        q: "Do you handle large commercial contracts?",
        a: "Yes. We regularly work with contractors, developers, and facilities managers on projects from single offices to multi-site retail and industrial programmes.",
      },
      {
        q: "Can you provide RAMS and insurance documentation?",
        a: "Yes. We carry full public liability and employer's liability insurance, and produce project-specific RAMS (Risk Assessment & Method Statements) for all commercial sites.",
      },
      {
        q: "Do you offer sectional or phased installation?",
        a: "Absolutely. For occupied premises we plan phased programmes that allow areas to remain operational throughout the project. This is common in offices, hotels, and healthcare facilities.",
      },
      {
        q: "What flooring is best for high-traffic commercial areas?",
        a: "For very high-traffic environments we recommend epoxy, polyurethane, or heavy-duty commercial carpet tiles. All can be specified with anti-slip ratings, chemical resistance, and sector-specific certifications.",
      },
      {
        q: "Can you match existing flooring in a partial refurbishment?",
        a: "We'll do our best. We carry a wide range of in-stock materials and work with our supply chain to source discontinued patterns. Send us photos and we'll advise on match feasibility.",
      },
    ],
  },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────
// Flat list of all FAQ items tagged with their parent category — useful for
// a global search or "popular questions" feature.

export interface FaqItemWithCategory extends FaqItem {
  categoryTitle: string;
  categorySlug: string;
}

export const allFaqItems: FaqItemWithCategory[] = allFaqCategories.flatMap((cat) =>
  cat.items.map((item) => ({
    ...item,
    categoryTitle: cat.title,
    categorySlug: cat.slug,
  }))
);