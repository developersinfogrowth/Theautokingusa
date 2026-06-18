import type { Metadata } from 'next';

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
