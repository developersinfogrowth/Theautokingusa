import type { Metadata } from "next";

import Hero from "@/app/components/home/hero/Hero";
import ShopCategories from "@/app/components/home/hero/ShopCategories";
import { TopSelling } from "@/app/components/home/hero/TopSelling";
import { HowItWorks } from "@/app/components/home/hero/HowItWorks";
import { WhyChooseUs } from "@/app/components/home/hero/WhyChooseUs";
import Testimonials from "@/app/components/home/hero/Testimonials";
import { FAQAccordion } from "@/app/components/home/hero/FAQAccordion";



const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.theautokingusa.com";

const pageTitle =
  "Reliable Used Engines & Transmissions | The AutoKing USA";

const pageDescription =
  "Shop reliable used engines and transmissions for cars, trucks, and SUVs. Quality-tested auto parts, nationwide shipping, warranty options, and expert support from The AutoKing USA.";

const socialImage = `${baseUrl}/branding/logo1.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: pageTitle,

  description: pageDescription,

  keywords: [
    "used engines",
    "used transmissions",
    "used motors for sale",
    "used auto parts",
    "replacement engines",
    "replacement transmissions",
    "low mileage engines",
    "tested used transmissions",
    "affordable used engines",
    "used car engines",
    "used truck engines",
    "transmission for sale",
    "The AutoKing USA",
  ],

  alternates: {
    canonical: baseUrl,
  },

  openGraph: {
    title: pageTitle,

    description: pageDescription,

    url: baseUrl,

    siteName: "The AutoKing USA",

    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "The AutoKing USA",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: pageTitle,

    description: pageDescription,

    images: [socialImage],
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

export default function HomePage() {
  return (
    <main className="text-gray-800 bg-white">
      <Hero />
      <ShopCategories />
     <TopSelling
  defaultFilter="all"
  allowedTypes={["engine", "transmission", "location"]}
  showToggle
  showAllOption
  eyebrow="Most Popular"
  heading="Top Selling Engines & Transmissions"
  description="..."
/>
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQAccordion />
    </main>
  );
}