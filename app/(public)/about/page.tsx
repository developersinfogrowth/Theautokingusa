import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Mail, CheckCircle, Shield, Users, Eye, Award, Clock, DollarSign, RotateCcw } from 'lucide-react';

// ─── Constants (inline for self-contained file) ───────────────────────────────
const PHONE_NUMBER = '+18664865915';
const PHONE_DISPLAY = '+1 (866) 486-5915';

const STATS = [
  { value: '2018', label: 'Founded' },
  { value: '50+', label: 'States Served' },
  { value: '10,000+', label: 'Parts Delivered' },
  { value: '98%', label: 'Customer Satisfaction' },
];

const BRANDS = [
  'Chevrolet', 'Ford', 'Toyota', 'Honda', 'BMW', 'Audi',
  'Nissan', 'Jeep', 'Volkswagen', 'Lexus', 'Mercedes-Benz',
  'Dodge', 'GMC', 'Chrysler',
];

const ADVANTAGES = [
  {
    title: 'Great Deals While They Last',
    description:
      'Save more on quality automotive parts without paying dealership prices. TheAutoKingUSA offers affordable used engines, used transmissions, and replacement parts that help you repair your vehicle while staying within budget.',
  },
  {
    title: 'Reliable Nationwide Delivery',
    description:
      'We provide fast, secure, and dependable shipping across the United States. Your required engine, transmission, or auto part is packed carefully and delivered safely to your preferred location.',
  },
  {
    title: 'Benefits of Purchasing With Us',
    description:
      'Every purchase is designed to deliver value. We focus on OEM and high-quality replacement parts that offer strong compatibility, long service life, and dependable performance.',
  },
];

const CORE_VALUES = [
  {
    icon: Shield,
    title: 'Quality First',
    description: 'Every used engine and transmission is carefully inspected and tested for dependable performance.',
  },
  {
    icon: Users,
    title: 'Customer Satisfaction',
    description: 'Your satisfaction matters. We respond quickly and work hard to ensure you get the right part.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Clear product details, straightforward pricing, and no hidden surprises.',
  },
  {
    icon: Award,
    title: 'Reliability',
    description: 'Trusted by customers nationwide for reliable parts and consistent service.',
  },
  {
    icon: Clock,
    title: 'Fast Service',
    description: 'Quick order processing and efficient nationwide shipping.',
  },
  {
    icon: DollarSign,
    title: 'Fair Pricing',
    description: 'Competitive prices on quality parts without compromising value.',
  },
];

const WHO_WE_ARE_POINTS = [
  {
    icon: Shield,
    title: 'Carefully Inspected',
    description: 'Every part is tested and inspected for performance and reliability.',
  },
  {
    icon: MapPin,
    title: 'Nationwide Delivery',
    description: 'Fast and secure shipping to all 50 states.',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Dependable parts backed by warranty for peace of mind.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Our team is here to help you find the right part, every time.',
  },
];

const OUR_PROMISE_POINTS = [
  'Thoroughly tested and inspected parts',
  'Honest pricing with no hidden fees',
  'Professional support before and after your purchase',
  '2-Year warranty on most engines & transmissions',
];

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'About Us - TheAutoKingUSA | Trusted Used Auto Parts Since 2018',
  description:
    'Learn about TheAutoKingUSA - your trusted source for quality used engines, transmissions, and OEM auto parts since 2018. Serving customers nationwide with reliable parts and exceptional service.',
  keywords: [
    'About TheAutoKingUSA',
    'Used Auto Parts Company',
    'Trusted Auto Parts Supplier',
    'Quality Used Engines',
    'Used Transmissions Supplier',
    'OEM Auto Parts',
    'Nationwide Auto Parts',
    'About Us Auto Parts',
    'Reliable Auto Parts Store',
    'Used Engines Company',
  ].join(', '),
  openGraph: {
    title: 'About Us - TheAutoKingUSA | Trusted Used Auto Parts Since 2018',
    description:
      'Learn about TheAutoKingUSA - your trusted source for quality used engines, transmissions, and OEM auto parts since 2018.',
    url: 'https://theautokingusa.com/about',
    siteName: 'TheAutoKingUSA',
    images: [
      {
        url: '/images/hero-bg-about-us.jpg',
        width: 1200,
        height: 630,
        alt: 'About TheAutoKingUSA',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - TheAutoKingUSA | Trusted Used Auto Parts Since 2018',
    description:
      'Learn about TheAutoKingUSA - your trusted source for quality used engines, transmissions, and OEM auto parts since 2018.',
    images: ['/images/hero-bg-about-us.jpg'],
  },
  alternates: {
    canonical: 'https://theautokingusa.com/about',
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

// ─── Schema Markup ────────────────────────────────────────────────────────────
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: 'TheAutoKingUSA',
  description:
    'Trusted source for quality used engines, transmissions, and OEM auto parts serving customers nationwide since 2018.',
  url: 'https://theautokingusa.com',
  telephone: +1-888-318-2840,
  foundingDate: '2018',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  areaServed: 'US',
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '2500',
  },
};

// ─── Page Component ───────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-white">

        {/* ── 1. HERO SECTION ─────────────────────────────────────────────── */}
        <section className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg-about-us.jpg"
              alt="Auto parts warehouse background"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
            {/* Dark overlay */}
           
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            {/* Badge */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 text-red-500 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                <span className="w-4 h-[2px] bg-red-500 inline-block" />
                About AutoKingUSA
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
              Built on Trust.{' '}
              <br className="hidden sm:block" />
              Driven by{' '}
              <span className="text-red-500">Quality.</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl leading-relaxed mb-10">
              AutoKingUSA is a leading nationwide supplier of high-quality used engines, transmissions, and auto parts. Since 2018, we&apos;ve helped thousands of customers get back on the road with dependable parts and unmatched service.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl sm:max-w-none">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. WHO WE ARE ───────────────────────────────────────────────── */}
        <section className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left: warehouse image */}
              <div className="relative h-72 sm:h-96 lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                <Image
                  src="/images/trusted-partner.jpg"
                  alt="AutoKingUSA trusted partner - auto parts warehouse"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Right: content */}
              <div className="order-1 lg:order-2">
                <p className="text-red-600 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
                  Who We Are
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
                  Your <span className="text-red-600">Trusted</span> Partner in
                  <br className="hidden sm:block" /> Used Auto Parts
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
                  We specialize in carefully inspected used engines, transmissions, and OEM replacement parts for a wide range of makes and models. Whether you&apos;re a repair shop, dealership, or vehicle owner, our mission is to deliver quality parts, fair prices, and reliable support you can count on.
                </p>

                {/* 4-point grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {WHO_WE_ARE_POINTS.map((pt, i) => {
                    const Icon = pt.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                          <Icon className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm mb-0.5">{pt.title}</p>
                          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{pt.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. BRANDS WE SERVE ──────────────────────────────────────────── */}
        <section className="py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-red-600 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">
                Brands We Serve
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
                We inventory parts for all major brands — all in one place.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {BRANDS.map((brand, i) => (
                <span
                  key={i}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 text-xs sm:text-sm font-semibold shadow-sm hover:border-red-400 hover:text-red-600 transition-colors duration-200"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. WHY CHOOSE US / ADVANTAGE ────────────────────────────────── */}
        <section className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-red-600 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
                Why Choose Us
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900">
                The <span className="text-red-600">AutoKingUSA</span> Advantage
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {ADVANTAGES.map((adv, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-5">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. OUR PROMISE / BUILT ON TRUST ─────────────────────────────── */}
        <section className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left: content */}
              <div>
                <p className="text-red-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
                  Our Promise
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
                  Built on Trust,{' '}
                  <br className="hidden sm:block" />
                  Driven by{' '}
                  <span className="text-red-500">Quality</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                  Choosing AutoKingUSA means more than buying used parts — it means working with a team that values integrity, quality, and long-term relationships.
                </p>

                {/* Checklist */}
                <ul className="space-y-3 mb-8">
                  {OUR_PROMISE_POINTS.map((pt, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-300">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Phone className="w-5 h-5" />
                    Call {PHONE_DISPLAY}
                  </a>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/20 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Right: image */}
              <div className="relative h-72 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/quality.jpg"
                  alt="Quality used auto parts - mechanic working on engine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. CORE VALUES ──────────────────────────────────────────────── */}
        <section className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
                What Drives Us
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-4">
                Our Core <span className="text-red-500">Values</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
                The standards that guide our business every day — from inventory selection to customer support
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {CORE_VALUES.map((val, i) => {
                const Icon = val.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-red-600 group-hover:bg-red-500 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                      {val.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7. GET IN TOUCH CTA ─────────────────────────────────────────── */}
        <section className="py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-r from-red-600 to-red-700 rounded-3xl overflow-hidden shadow-2xl px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-16 text-center text-white">
              {/* Decorative bg pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/30" />
                <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-white/20" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3">
                  Ready to Find the Right Part?
                </h3>
                <p className="text-red-100 text-sm sm:text-base lg:text-lg mb-8">
                  Our team is here to help you get back on the road.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-gray-100 font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  >
                    <Phone className="w-5 h-5" />
                    Call {PHONE_DISPLAY}
                  </a>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Us
                  </Link>
                </div>

                {/* Trust badges row */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/90">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Nationwide Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>Easy Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure Checkout</span>
                  </div>
                </div>

                <p className="mt-6 text-red-100 text-xs sm:text-sm">
                  Mon – Sun · 8:30 AM – 4:30 PM PST
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}