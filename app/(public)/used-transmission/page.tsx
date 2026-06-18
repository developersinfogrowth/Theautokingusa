import { Metadata } from 'next';
import Hero from '@/app/components/home/hero/Hero';
import FAQAccordion from '@/app/components/shared/FAQAccordion';
import { USED_TRANSMISSION_FAQS } from './lib/faqData';
import CTASection from './components/CTASection';
import {
  TransmissionIntro,
  WhyUsedTransmission,
  InspectionProcess,
  WarrantyCoverage,
  BrandTransmissionSections,
  CaliforniaBenefits,
  TransmissionTypes,
  ShopSupport,
} from './components';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Dependable Quality-Tested Used Transmissions for All Makes and Models',
  description:
    'Shop quality used transmissions online with confidence. Every unit is inspected, compatibility-matched, and ready for fast nationwide shipping. Affordable replacement transmissions for all makes and models across the USA.',
  keywords: [
    'Used Transmissions',
    'Used Transmission for Sale',
    'Used Auto Transmissions',
    'Used Manual Transmissions',
    'Low Mileage Used Transmissions',
    'Quality Tested Used Transmissions',
    'Affordable Used Transmissions',
    'Replacement Transmissions',
    'Used Car Transmissions',
    'Used Truck Transmissions',
    'Used SUV Transmissions',
    'Used Transmission with Warranty',
    'Buy Used Transmission Online',
    'Used Transmission Shop',
    'Nationwide Used Transmissions',
    'OEM Used Transmissions',
    'Reliable Used Transmissions',
    'Discount Used Transmissions',
  ].join(', '),
  openGraph: {
    title: 'Dependable Quality-Tested Used Transmissions for All Makes and Models',
    description:
      'Shop quality used transmissions online with confidence. Every unit is inspected, compatibility-matched, and ready for fast nationwide shipping.',
    url: 'https://theautokingusa.com/used-transmission',
    siteName: 'The Auto King USA',
    images: [
      {
        url: '/images/transmission-page.jpg',
        width: 1200,
        height: 630,
        alt: 'Quality Used Transmissions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dependable Quality-Tested Used Transmissions for All Makes and Models',
    description:
      'Shop quality used transmissions online with confidence. Every unit is inspected, compatibility-matched, and ready for fast nationwide shipping.',
    images: ['/images/transmission-page.jpg'],
  },
  alternates: {
    canonical: 'https://theautokingusa.com/used-transmission',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Schema Markup
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: 'The Auto King USA - Used Transmissions',
  description:
    'Quality used transmissions for all makes and models with nationwide shipping and warranty options.',
  url: 'https://theautokingusa.com/used-transmission',
  telephone: '+1-866-486-5915',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  areaServed: 'US',
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '1250',
  },
  offers: {
    '@type': 'AggregateOffer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    itemCondition: 'https://schema.org/UsedCondition',
  },
};

export default function UsedTransmissionPage() {
  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Common Reusable Component */}
        <Hero
          heading={
            <>
              California's Trusted Source<br />
              for Tested Used{' '}
              <span className="text-red-500 italic">Transmissions</span>
            </>
          }
        />

        {/* Page Sections */}
        <TransmissionIntro />
        <WhyUsedTransmission />
        <InspectionProcess />
        <WarrantyCoverage />
        <BrandTransmissionSections />
        <CaliforniaBenefits />
        <TransmissionTypes />
        <ShopSupport />

        {/* FAQ Section - Reusable Component */}
        <FAQAccordion
          faqs={USED_TRANSMISSION_FAQS}
          title="FAQs About Buying Used Transmissions in the USA"
          subtitle="Common questions answered about used transmission replacement"
          showCTA={true}
          phoneNumber="+18664865915"
          phoneDisplay="+1 (866) 486-5915"
        />

        {/* Final CTA */}
        <CTASection />
      </div>
    </>
  );
}
