import { Metadata } from 'next';
import Hero from '@/app/components/home/hero/Hero';
import FAQAccordion from '@/app/components/shared/FAQAccordion';
import { COMMERCIAL_VEHICLES_FAQS } from './lib/faqData';
import {
  CommercialIntro,
  WhyChooseCalifornia,
  TruckBrandsSection,
  WhyChooseUs,
} from './components';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Commercial Vehicle Parts  Used Engines, Used Transmissions in California',
  description:
    'Find commercial vehicle parts & used engines and used transmissions in California for trucks, vans, and fleet vehicles. Quality-tested replacements with fast statewide shipping.',
  keywords: [
    'Commercial Vehicle Parts in California',
    'Used Engines in California',
    'Used Transmissions in California',
    'Commercial Vehicle Engines California',
    'Commercial Vehicle Transmissions California',
    'Used Truck Engines California',
    'Used Truck Transmissions California',
    'Fleet Vehicle Parts California',
    'Heavy Duty Truck Engines California',
    'Commercial Auto Parts California',
    'Diesel Engines California',
    'Replacement Transmissions California',
    'Freightliner Engines California',
    'Mack Engines California',
    'Peterbilt Engines California',
    'Volvo Truck Engines California',
    'International Truck Engines California',
  ].join(', '),
  openGraph: {
    title: 'Commercial Vehicle Parts & Used Engines, Used Transmissions in California',
    description:
      'Find commercial vehicle parts & used engines and used transmissions in California for trucks, vans, and fleet vehicles. Quality-tested replacements with fast statewide shipping.',
    url: 'https://theautokingusa.com/commercial-vehicles',
    siteName: 'The Auto King USA',
    images: [
      {
        url: '/images/commercial-vehicles-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Commercial Vehicle Parts California',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Vehicle Parts & Used Engines, Used Transmissions in California',
    description:
      'Find commercial vehicle parts & used engines and used transmissions in California for trucks, vans, and fleet vehicles.',
    images: ['/images/commercial-vehicles-hero.jpg'],
  },
  alternates: {
    canonical: 'https://theautokingusa.com/commercial-vehicles',
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
  name: 'The Auto King USA - Commercial Vehicle Parts California',
  description:
    'Commercial vehicle parts, used engines, and used transmissions in California for trucks, vans, and fleet vehicles.',
  url: 'https://theautokingusa.com/commercial-vehicles',
  telephone: '+1-866-486-5915',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'California',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'State',
    name: 'California',
  },
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '850',
  },
  offers: {
    '@type': 'AggregateOffer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    itemCondition: 'https://schema.org/UsedCondition',
  },
};

export default function CommercialVehiclesPage() {
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
      Used Commercial{' '}
      <span className="text-red-500 italic">Diesel Engines</span><br />
      for Sale | Tested Truck<br />
      Motors for Major Brands
    </>
  }
/>

        {/* Page Sections */}
        <CommercialIntro />
        <WhyChooseCalifornia />
        <TruckBrandsSection />
        <WhyChooseUs />

        {/* FAQ Section - Reusable Component */}
        <FAQAccordion
          faqs={COMMERCIAL_VEHICLES_FAQS}
          title="FAQs – Commercial Used Engines & Used Transmissions"
          subtitle="Everything you need to know about commercial vehicle parts"
          showCTA={true}
          ctaText="Need help with commercial parts?"
          ctaSubtext="Our fleet specialists are ready to assist with bulk orders and technical support."
          phoneNumber="+18664865915"
          phoneDisplay="+1 (866) 486-5915"
        />
      </div>
    </>
  );
}