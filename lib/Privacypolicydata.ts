// ─── Types ────────────────────────────────────────────────────────────────────

export interface PrivacySection {
  slug: string;
  title: string;
  content: PrivacyBlock[];
}

export type PrivacyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string };

// ─── Meta ─────────────────────────────────────────────────────────────────────

export const privacyMeta = {
  lastUpdated: "1 March 2025",
  effectiveDate: "1 March 2025",
  companyName: "Lanark Fine Tiles & Stone",
  companyAddress: "Boise, Idaho, USA",
  contactEmail: "floremh@gmail.com",
  contactPhone: "+208-666-0112",
  dataController: "Lanark Fine Tiles & Stone",
};

// ─── Sections ─────────────────────────────────────────────────────────────────

export const privacySections: PrivacySection[] = [
  {
    slug: "introduction",
    title: "Who We Are",
    content: [
      {
        type: "paragraph",
        text: "Lanark Fine Tiles & Stone ('we', 'us', 'our') is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website, contact us, or use our services.",
      },
      {
        type: "paragraph",
        text: "We are the data controller responsible for your personal information. If you have any questions about how we handle your data, please contact us at floremh@gmail.com or call +208-666-0112.",
      },
      {
        type: "note",
        text: "We will never sell your personal data to third parties. Your information is used solely to deliver and improve our services.",
      },
    ],
  },
  {
    slug: "data-collected",
    title: "Information We Collect",
    content: [
      {
        type: "paragraph",
        text: "We collect different types of information depending on how you interact with us:",
      },
      {
        type: "list",
        items: [
          "Name, email address, and phone number — when you contact us or request a quote",
          "Property address — when you request a site visit or installation service",
          "Project details and preferences — to scope and deliver your work accurately",
          "Payment information — processed securely via third-party payment providers (we do not store card details)",
          "Account credentials — if you create an account on our website (email and encrypted password only)",
          "Website usage data — pages visited, time on site, referring URL, and device information via cookies",
          "Communications — emails, contact form submissions, and notes from phone calls",
        ],
      },
      {
        type: "paragraph",
        text: "We only collect information that is necessary and relevant to providing you with our services.",
      },
    ],
  },
  {
    slug: "how-we-use",
    title: "How We Use Your Information",
    content: [
      {
        type: "paragraph",
        text: "We use the information we collect for the following purposes:",
      },
      {
        type: "list",
        items: [
          "To respond to your enquiries and provide quotes for our services",
          "To schedule and manage installation appointments and site visits",
          "To process payments and send invoices",
          "To manage your account if you register on our website",
          "To send service-related communications such as appointment confirmations and aftercare guidance",
          "To improve our website and services based on usage analytics",
          "To comply with legal obligations including tax records and insurance requirements",
          "To send marketing communications — only with your explicit consent",
        ],
      },
      {
        type: "note",
        text: "We will only send you marketing emails if you have opted in. You can unsubscribe at any time using the link in any marketing email or by contacting us directly.",
      },
    ],
  },
  {
    slug: "legal-basis",
    title: "Legal Basis for Processing",
    content: [
      {
        type: "paragraph",
        text: "We process your personal data on the following legal grounds:",
      },
      {
        type: "list",
        items: [
          "Contract performance — to fulfil a service contract or take steps at your request before entering a contract",
          "Legitimate interests — to operate and improve our business, respond to enquiries, and prevent fraud",
          "Legal obligation — to comply with applicable laws, tax regulations, and insurance requirements",
          "Consent — for marketing communications and non-essential cookies, where you have given explicit consent",
        ],
      },
    ],
  },
  {
    slug: "data-sharing",
    title: "Who We Share Your Data With",
    content: [
      {
        type: "paragraph",
        text: "We do not sell, rent, or trade your personal information. We may share your data with trusted third parties only where necessary:",
      },
      {
        type: "list",
        items: [
          "Payment processors — to securely handle transactions (e.g. Stripe, Square)",
          "Cloud storage providers — to store project files and communications securely",
          "Email service providers — to send transactional and marketing emails",
          "Analytics providers — such as Google Analytics, to understand website usage (anonymised where possible)",
          "Legal or regulatory authorities — if required by law or court order",
          "Professional advisors — such as accountants or solicitors, under strict confidentiality",
        ],
      },
      {
        type: "paragraph",
        text: "All third parties with whom we share data are required to handle it securely and in accordance with applicable data protection law.",
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookies & Tracking",
    content: [
      {
        type: "paragraph",
        text: "Our website uses cookies to improve your experience and help us understand how visitors use the site. Cookies are small text files stored on your device.",
      },
      {
        type: "list",
        items: [
          "Essential cookies — required for the website to function (e.g. session management, security)",
          "Analytics cookies — help us understand visitor behaviour to improve content and layout",
          "Preference cookies — remember your settings such as language and theme preferences",
          "Marketing cookies — used to show relevant adverts; only set with your consent",
        ],
      },
      {
        type: "paragraph",
        text: "You can control cookie settings through your browser preferences or our cookie consent tool. Disabling non-essential cookies will not affect core website functionality.",
      },
    ],
  },
  {
    slug: "data-retention",
    title: "How Long We Keep Your Data",
    content: [
      {
        type: "paragraph",
        text: "We retain personal data only for as long as necessary for the purposes it was collected:",
      },
      {
        type: "list",
        items: [
          "Customer records and project files — 7 years following project completion (for legal and tax purposes)",
          "Marketing contact lists — until you unsubscribe or withdraw consent",
          "Website enquiries — 2 years if no project proceeds",
          "Account data — for as long as your account is active, plus 12 months after deletion request",
          "Payment records — 7 years as required by financial regulations",
        ],
      },
      {
        type: "note",
        text: "When data is no longer required, we securely delete or anonymise it in accordance with our data retention policy.",
      },
    ],
  },
  {
    slug: "your-rights",
    title: "Your Rights",
    content: [
      {
        type: "paragraph",
        text: "You have the following rights regarding your personal data:",
      },
      {
        type: "list",
        items: [
          "Right of access — request a copy of the personal data we hold about you",
          "Right to rectification — ask us to correct inaccurate or incomplete data",
          "Right to erasure — request deletion of your data where we no longer have a legal basis to hold it",
          "Right to restrict processing — ask us to limit how we use your data in certain circumstances",
          "Right to data portability — receive your data in a structured, machine-readable format",
          "Right to object — object to processing based on legitimate interests or for direct marketing",
          "Right to withdraw consent — withdraw any consent you previously gave, at any time",
        ],
      },
      {
        type: "paragraph",
        text: "To exercise any of these rights, contact us at floremh@gmail.com. We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.",
      },
    ],
  },
  {
    slug: "security",
    title: "Data Security",
    content: [
      {
        type: "paragraph",
        text: "We take the security of your personal data seriously and implement appropriate technical and organisational measures to protect it against unauthorised access, loss, or destruction.",
      },
      {
        type: "list",
        items: [
          "All data transmitted via our website is encrypted using SSL/TLS",
          "Access to customer data is restricted to authorised personnel only",
          "Passwords are stored using industry-standard hashing algorithms",
          "We conduct regular security reviews of our systems and processes",
          "In the event of a data breach, we will notify affected individuals and authorities as required by law",
        ],
      },
    ],
  },
  {
    slug: "third-party-links",
    title: "Third-Party Links",
    content: [
      {
        type: "paragraph",
        text: "Our website may contain links to third-party websites, social media platforms, or supplier pages. We are not responsible for the privacy practices or content of these external sites.",
      },
      {
        type: "paragraph",
        text: "We encourage you to read the privacy policies of any third-party sites you visit. Clicking external links from our website is done entirely at your own discretion.",
      },
    ],
  },
  {
    slug: "changes",
    title: "Changes to This Policy",
    content: [
      {
        type: "paragraph",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will update the 'Last Updated' date at the top of this page.",
      },
      {
        type: "paragraph",
        text: "We encourage you to review this policy periodically. If you have questions or concerns about how we handle your data, please contact us at floremh@gmail.com or call +208-666-0112.",
      },
    ],
  },
];