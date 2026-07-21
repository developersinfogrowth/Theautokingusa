import type { Metadata } from "next";

import Hero from "@/app/components/home/hero/Hero";
import WhyChooseSection from "./components/WhyChooseSection";
import EngineSelectionSection from "./components/EngineSelectionSection";
import HowToChooseSection from "./components/HowToChooseSection";
import FAQSection from "./components/FAQSection";
import FinalCTA from "./components/FinalCTA";
import { TopSelling } from "@/app/components/home/hero/TopSelling";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.theautokingusa.com";

const pageUrl = `${baseUrl}/used-engine`;
const socialImageUrl = `${baseUrl}/images/Toyota%20Engines-from-Japan.jpg`;

const pageTitle =
  "Used Engines in California | Tested Low-Mileage Motors for Sale";

const pageDescription =
  "Find quality used engines in California for cars, trucks, and SUVs. Shop tested low-mileage motors with warranty options and fast shipping statewide.";

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: pageTitle,

  description: pageDescription,

  keywords: [
    "used engines in California",
    "California used engines",
    "low mileage engines California",
    "tested used motors California",
    "replacement engines California",
    "used car engines California",
    "used truck engines California",
    "affordable used engines California",
  ],

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    title: pageTitle,

    description: pageDescription,

    url: pageUrl,

    siteName: "The AutoKing USA",

    images: [
      {
        url: socialImageUrl,
        width: 1024,
        height: 1024,
        alt: "Used engines available in California from The AutoKing USA",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: pageTitle,

    description:
      "Find quality tested used engines in California for cars, trucks, and SUVs.",

    images: [socialImageUrl],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Business Schema Markup
const schemaData = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",

  name: "The AutoKing USA - Used Engines California",

  description:
    "Quality used engines in California for cars, trucks, and SUVs with warranty options and fast shipping statewide.",

  url: pageUrl,

  image: socialImageUrl,

  telephone: "+1-866-486-5915",

  address: {
    "@type": "PostalAddress",
    addressRegion: "California",
    addressCountry: "US",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: "36.7783",
    longitude: "-119.4179",
  },

  areaServed: [
    {
      "@type": "City",
      name: "Los Angeles",
    },
    {
      "@type": "City",
      name: "San Diego",
    },
    {
      "@type": "City",
      name: "San Jose",
    },
    {
      "@type": "City",
      name: "San Francisco",
    },
    {
      "@type": "City",
      name: "Sacramento",
    },
  ],

  priceRange: "$$",

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",

      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],

      opens: "08:30",
      closes: "16:30",
    },
  ],

  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "500",
  },

  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
    itemCondition: "https://schema.org/UsedCondition",
  },
};

// FAQ Schema Markup
const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: [
    {
      "@type": "Question",
      name: "Are used engines reliable?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a low-mileage tested used engine from a trusted supplier can be reliable. Choosing engines with warranty protection and proper inspection records greatly improves peace of mind.",
      },
    },

    {
      "@type": "Question",
      name: "How long does a used engine last?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "A quality used engine can last many years when installed correctly and maintained with regular oil changes, cooling system care, and timely servicing.",
      },
    },

    {
      "@type": "Question",
      name: "Do used engines come with a warranty?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Many reputable USA suppliers offer warranties ranging from 30 days to several months. Always read the warranty coverage for parts, labor, and replacement conditions.",
      },
    },

    {
      "@type": "Question",
      name: "What information do I need before buying a used engine?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "You should have your vehicle year, make, model, engine size, VIN number, and transmission type ready. This helps ensure the correct engine match.",
      },
    },

    {
      "@type": "Question",
      name: "Can I finance a used engine purchase?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Some online auto parts sellers and repair shops in the USA may offer financing or payment plans depending on the order amount and approval terms.",
      },
    },
  ],
};

export default function UsedEnginePage() {
  return (
    <>
      {/* Business JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchemaData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Section 1: Hero */}
        <Hero
          heading={
            <>
              Quality Used Engines
              <br />
              in California –{" "}
              <span className="text-red-500 italic">Tested</span>,
              <br />
              Reliable &amp; Ready to Ship
            </>
          }
        />
<TopSelling
  defaultFilter="engine"
  allowedTypes={["engine"]}
  showToggle={false}
  showAllOption={false}
  eyebrow="Our Inventory"
  heading={
    <>
      Top-Selling{" "}
      <span className="text-blue-700">Used Engines</span>
    </>
  }
  description="Inspected inventory with condition grading and warranty coverage."
/>
        {/* Section 2: Why California Drivers Choose Used Engines */}
        <WhyChooseSection />

        {/* Section 3: Engine Selection */}
        <EngineSelectionSection />

        {/* Section 4: Choosing an Engine and Service Areas */}
        <HowToChooseSection />

        {/* Section 5: FAQ */}
        <FAQSection />

        {/* Section 6: Final CTA */}
        <FinalCTA />
      </div>
    </>
  );
}