// ─── Types ────────────────────────────────────────────────────────────────────

export interface TermsSection {
  slug: string;
  title: string;
  content: TermsBlock[];
}

export type TermsBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string };

// ─── Meta ─────────────────────────────────────────────────────────────────────

export const termsMeta = {
  lastUpdated: "1 March 2025",
  effectiveDate: "1 March 2025",
  companyName: "Lanark Fine Tiles & Stone",
  companyAddress: "Boise, Idaho, USA",
  contactEmail: "floremh@gmail.com",
  contactPhone: "+208-666-0112",
};

// ─── Sections ─────────────────────────────────────────────────────────────────

export const termsSections: TermsSection[] = [
  {
    slug: "acceptance",
    title: "Acceptance of Terms",
    content: [
      {
        type: "paragraph",
        text: "By accessing or using the Lanark Fine Tiles & Stone website, requesting a quote, placing an order, or engaging our installation services, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions in their entirety.",
      },
      {
        type: "paragraph",
        text: "If you do not agree with any part of these terms, please do not use our website or services. Continued use of our services after any amendment to these terms constitutes acceptance of the revised terms.",
      },
      {
        type: "note",
        text: "These terms apply to all visitors, customers, and contractors engaging with Lanark Fine Tiles & Stone, whether in person, online, or via telephone.",
      },
    ],
  },
  {
    slug: "services",
    title: "Our Services",
    content: [
      {
        type: "paragraph",
        text: "Lanark Fine Tiles & Stone provides premium tile and natural stone supply, installation, restoration, and aftercare services for residential and commercial properties. Our services include but are not limited to:",
      },
      {
        type: "list",
        items: [
          "Supply and installation of porcelain, ceramic, marble, granite, slate, and travertine tiles",
          "Bathroom, kitchen, and living space tile installation",
          "Outdoor and landscaping stone work",
          "Tile restoration, re-grouting, and sealing",
          "Commercial flooring and feature wall installation",
          "Underfloor heating system integration",
          "Free consultation and project quoting",
        ],
      },
      {
        type: "paragraph",
        text: "All services are subject to site survey, material availability, and agreement on scope of works. We reserve the right to decline any project that falls outside our operational capacity or expertise.",
      },
    ],
  },
  {
    slug: "quotes-pricing",
    title: "Quotes & Pricing",
    content: [
      {
        type: "paragraph",
        text: "All quotes provided by Lanark Fine Tiles & Stone are free of charge and carry no obligation. Written quotes are valid for 30 days from the date of issue unless otherwise stated.",
      },
      {
        type: "list",
        items: [
          "Quotes are based on the information provided at the time of consultation",
          "Prices may be subject to change if the scope of work changes after the quote is issued",
          "Material costs are subject to supplier price changes and availability",
          "VAT and applicable taxes will be itemised separately where required",
          "A deposit may be required before work commences — this will be stated in your written quote",
        ],
      },
      {
        type: "note",
        text: "Any verbal estimates provided during initial consultations are indicative only and do not constitute a binding quote.",
      },
    ],
  },
  {
    slug: "payment",
    title: "Payment Terms",
    content: [
      {
        type: "paragraph",
        text: "Payment terms are agreed upon at the time of accepting a written quote. Standard payment terms are as follows:",
      },
      {
        type: "list",
        items: [
          "A deposit of up to 50% may be required prior to commencement of works",
          "Interim payments may be required for larger projects at agreed milestones",
          "Final balance is due upon completion and sign-off of works",
          "Accepted payment methods include bank transfer, cheque, and major credit/debit cards",
          "Late payments may incur interest at a rate of 3% above the base rate per month",
        ],
      },
      {
        type: "paragraph",
        text: "Ownership of all materials supplied by Lanark Fine Tiles & Stone remains with us until payment in full has been received. We reserve the right to recover materials in the event of non-payment.",
      },
    ],
  },
  {
    slug: "cancellation",
    title: "Cancellation & Changes",
    content: [
      {
        type: "paragraph",
        text: "You may cancel or amend a booking by providing written notice to us. The following cancellation policy applies:",
      },
      {
        type: "list",
        items: [
          "Cancellation more than 14 days before scheduled start date: full deposit refund",
          "Cancellation 7–14 days before scheduled start date: 50% of deposit refunded",
          "Cancellation less than 7 days before scheduled start date: deposit is non-refundable",
          "Changes to scope of work must be agreed in writing and may affect pricing and timeline",
          "We reserve the right to cancel any booking due to circumstances beyond our control",
        ],
      },
      {
        type: "note",
        text: "In the event we cancel a booking, any deposit paid will be refunded in full within 5 working days.",
      },
    ],
  },
  {
    slug: "liability",
    title: "Limitation of Liability",
    content: [
      {
        type: "paragraph",
        text: "Lanark Fine Tiles & Stone carries full public liability insurance. However, our liability is limited in the following ways:",
      },
      {
        type: "list",
        items: [
          "We are not liable for pre-existing structural issues, damp, or substrate defects not identified during site survey",
          "We are not responsible for damage caused by third-party contractors working on the same site",
          "Our total liability shall not exceed the total value of the contract in question",
          "We are not liable for any indirect or consequential losses including loss of use or rental income",
          "Clients are responsible for removing personal belongings and furniture prior to works commencing",
        ],
      },
      {
        type: "paragraph",
        text: "Nothing in these terms shall limit our liability for death, personal injury, or fraud caused by our negligence.",
      },
    ],
  },
  {
    slug: "warranty",
    title: "Workmanship Warranty",
    content: [
      {
        type: "paragraph",
        text: "We stand behind the quality of our work. All installation work carried out by Lanark Fine Tiles & Stone is covered by our workmanship warranty:",
      },
      {
        type: "list",
        items: [
          "2-year workmanship warranty on all standard tile installation work",
          "5-year warranty on natural stone installations and specialist projects",
          "Warranty covers defects in installation, grout failure, and tile movement caused by our workmanship",
          "Warranty does not cover damage caused by misuse, chemical cleaning agents, subsidence, or third-party works",
          "Manufacturer warranties on materials are separate and subject to their own terms",
        ],
      },
      {
        type: "note",
        text: "To make a warranty claim, contact us in writing within the warranty period. We will arrange a site visit and remedy the issue at no additional cost where the defect falls within warranty scope.",
      },
    ],
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    content: [
      {
        type: "paragraph",
        text: "All content on the Lanark Fine Tiles & Stone website, including but not limited to text, photographs, logos, graphics, and design layouts, is the intellectual property of Lanark Fine Tiles & Stone or is used with permission.",
      },
      {
        type: "list",
        items: [
          "You may not reproduce, distribute, or use our content without prior written consent",
          "Project photographs taken by us remain our property and may be used in our portfolio",
          "You grant us permission to photograph completed works for promotional use unless you opt out in writing",
        ],
      },
    ],
  },
  {
    slug: "governing-law",
    title: "Governing Law",
    content: [
      {
        type: "paragraph",
        text: "These Terms and Conditions are governed by and construed in accordance with the laws of the State of Idaho, United States. Any disputes arising from these terms or from the provision of our services shall be subject to the exclusive jurisdiction of the courts of Idaho.",
      },
      {
        type: "paragraph",
        text: "If any provision of these terms is found to be unenforceable or invalid, the remaining provisions will continue in full force and effect.",
      },
    ],
  },
  {
    slug: "changes",
    title: "Changes to These Terms",
    content: [
      {
        type: "paragraph",
        text: "We reserve the right to update or modify these Terms and Conditions at any time. When we make changes, we will update the 'Last Updated' date at the top of this page. We encourage you to review these terms periodically.",
      },
      {
        type: "paragraph",
        text: "Your continued use of our website or services after any changes constitutes your acceptance of the new terms. If you have questions about these terms, please contact us at floremh@gmail.com.",
      },
    ],
  },
];