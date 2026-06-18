import type { Metadata } from 'next';
import Hero from '@/app/components/home/hero/Hero';
import WhyChooseSection from './components/WhyChooseSection';
import EngineSelectionSection from './components/EngineSelectionSection';
import HowToChooseSection from './components/HowToChooseSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Used Engines in California | Tested Low-Mileage Motors for Sale',
  description: 'Find quality used engines in California for cars, trucks, and SUVs. Shop tested low-mileage motors with warranty options and fast shipping statewide.',
  keywords: [
    'used engines in California',
    'California used engines',
    'low mileage engines California',
    'tested used motors California',
    'replacement engines California',
    'used car engines California',
    'used truck engines California',
    'affordable used engines California'
  ].join(', '),
  openGraph: {
    title: 'Used Engines in California | Tested Low-Mileage Motors for Sale',
    description: 'Find quality used engines in California for cars, trucks, and SUVs. Shop tested low-mileage motors with warranty options and fast shipping statewide.',
    url: 'https://rockautocare.com/used-engine',
    siteName: 'Rock Auto Care',
    images: [
      {
        url: '/images/Toyota Engines-from-Japan.jpg',
        width: 1024,
        height: 1024,
        alt: 'Used Engines California',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Used Engines in California | Tested Low-Mileage Motors for Sale',
    description: 'Find quality used engines in California for cars, trucks, and SUVs.',
    images: ['/images/Toyota Engines-from-Japan.jpg'],
  },
  alternates: {
    canonical: 'https://www.theautokingusa.com/used-engine',
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

// Schema Markup for SEO
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: 'Rock Auto Care - Used Engines California',
  description: 'Quality used engines in California for cars, trucks, and SUVs with warranty options and fast shipping statewide.',
  url: 'https://www.theautokingusa.com/used-engine',
  telephone: '+1-866-486-5915',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'California',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '36.7783',
    longitude: '-119.4179',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Los Angeles',
    },
    {
      '@type': 'City',
      name: 'San Diego',
    },
    {
      '@type': 'City',
      name: 'San Jose',
    },
    {
      '@type': 'City',
      name: 'San Francisco',
    },
    {
      '@type': 'City',
      name: 'Sacramento',
    },
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:30',
      closes: '16:30',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '500',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    itemCondition: 'https://schema.org/UsedCondition',
  },
};

const faqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are used engines reliable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, a low-mileage tested used engine from a trusted supplier can be reliable. Choosing engines with warranty protection and proper inspection records greatly improves peace of mind.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a used engine last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A quality used engine can last many years when installed correctly and maintained with regular oil changes, cooling system care, and timely servicing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do used engines come with a warranty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many reputable USA suppliers offer warranties ranging from 30 days to several months. Always read the warranty coverage for parts, labor, and replacement conditions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What information do I need before buying a used engine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You should have your vehicle year, make, model, engine size, VIN number, and transmission type ready. This helps ensure the correct engine match.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I finance a used engine purchase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some online auto parts sellers and repair shops in the USA may offer financing or payment plans depending on the order amount and approval terms.',
      },
    },
  ],
};

export default function UsedEnginePage() {
  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Section 1: Hero Section (Common) */}
        <Hero
  heading={
    <>
      Quality Used Engines<br />
      in California –{' '}
      <span className="text-red-500 italic">Tested</span>,<br />
      Reliable &amp; Ready to Ship
    </>
  }
/>

        {/* Section 2: Why California Drivers Choose Used Engines */}
        <WhyChooseSection />

        {/* Section 3: Our Engine Selection + Toyota Engines */}
        <EngineSelectionSection />

        {/* Section 4: How to Choose + Service Areas */}
        <HowToChooseSection />

        {/* Section 5: FAQ Section */}
        <FAQSection />

        {/* Section 6: Final CTA */}
        <FinalCTA />
      </div>
    </>
  );
}