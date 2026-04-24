'use client';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import {
  Shield, Truck, Clock, Award, Star, CheckCircle,
  Phone, ChevronRight, Zap, Package, ThumbsUp, Headphones,
  ArrowRight, MapPin, Quote, DollarSign,
} from 'lucide-react';
import opacImage from './images/OPAC.jpg';
import radioImage from './images/radio.jpg';
import waterproofImage from './images/waterproof.jpg';
import blindSpotMirrorImage from './images/blind spot mirror.jpg';
import beastEyesImage from './images/beast-eyes.webp';
import absPumpImage from './images/Porsche-911-Carrera-ABS-Pump.jpg';
import headlightImage from './images/headlight.webp';
import fuelPumpImage from './images/image.png';

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Badge = 'In Stock' | 'Ships Today' | 'Limited';

const badgeStyles: Record<Badge, string> = {
  'In Stock':    'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Ships Today': 'bg-blue-50 text-blue-700 border-blue-200',
  'Limited':     'bg-amber-50 text-amber-700 border-amber-200',
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const trustItems = [
  { icon: <Award className="h-4 w-4" />, label: '20+ Years Experience' },
  { icon: <Package className="h-4 w-4" />, label: '10,000+ Parts Sold' },
  { icon: <Shield className="h-4 w-4" />, label: '1-Year Warranty' },
  { icon: <Truck className="h-4 w-4" />, label: 'Fast Nationwide Shipping' },
  { icon: <CheckCircle className="h-4 w-4" />, label: 'Verified & Tested Parts' },
];

const categories = [
  {
    icon: '🔧',
    title: 'Used Engines',
    desc: 'OEM-grade engines, tested & certified. All major makes & models available.',
    href: '/used-engine',
    count: '2,400+ listings',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: '⚙️',
    title: 'Used Transmissions',
    desc: 'Auto & manual transmissions with full inspection reports included.',
    href: '/used-transmission',
    count: '1,800+ listings',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: '🚛',
    title: 'Commercial Vehicles',
    desc: 'Heavy-duty parts for trucks, vans & fleet vehicles. Volume pricing available.',
    href: '/commercial-vehicles',
    count: '950+ listings',
    color: 'bg-slate-50 text-slate-600',
  },
  {
    icon: '🚗',
    title: 'SUVs & Sedans',
    desc: 'Passenger vehicle parts for domestic & import cars. Ships same day.',
    href: '/inventory',
    count: '3,100+ listings',
    color: 'bg-emerald-50 text-emerald-600',
  },
];

const whyUs = [
  { icon: <Shield className="h-5 w-5" />, title: 'Inspected & Tested', desc: 'Every part passes a 50-point quality check before shipping.' },
  { icon: <Truck className="h-5 w-5" />, title: 'Same-Day Shipping', desc: 'Orders placed before 3 PM PST ship the same business day.' },
  { icon: <Award className="h-5 w-5" />, title: '1-Year Warranty', desc: 'All engines and transmissions come with our full warranty.' },
  { icon: <Headphones className="h-5 w-5" />, title: 'Expert Support', desc: 'Speak with a trained auto specialist — not a call center.' },
  { icon: <ThumbsUp className="h-5 w-5" />, title: 'Free Shipping $500+', desc: 'No surprise fees. Free ground shipping on qualifying orders.' },
  { icon: <Zap className="h-5 w-5" />, title: 'Fast Nationwide', desc: 'Delivery to all 50 states in 2–5 business days on average.' },
];

const popularParts: { make: string; model: string; year: string; type: string; price: string; badge: Badge }[] = [
  { make: 'Toyota',    model: 'Camry',     year: '2015-2020', type: 'Engine 2.5L',        price: '$1,299', badge: 'In Stock' },
  { make: 'Honda',     model: 'Accord',    year: '2013-2017', type: 'Engine 2.4L',        price: '$1,199', badge: 'Ships Today' },
  { make: 'Ford',      model: 'F-150',     year: '2015-2020', type: 'Engine 5.0L',        price: '$1,899', badge: 'In Stock' },
  { make: 'Chevrolet', model: 'Silverado', year: '2014-2018', type: 'Transmission 6-Spd', price: '$1,799', badge: 'Limited' },
  { make: 'BMW',       model: '3 Series',  year: '2012-2015', type: 'Engine 2.0L',        price: '$2,499', badge: 'In Stock' },
];

// Real product images bundled from the local app/(public)/images folder
const featuredProducts: {
  name: string; category: string; price: string; badge: Badge; image: StaticImageData; alt: string;
}[] = [
  {
    name: 'Carbon Fibre Tail Throat Exhaust Tip',
    category: 'Exhaust',
    price: '$89',
    badge: 'In Stock',
    image: opacImage,
    alt: 'Carbon fibre exhaust tip',
  },
  {
    name: '10.25" Car Radio For BMW X5',
    category: 'Electronics',
    price: '$349',
    badge: 'Ships Today',
    image: radioImage,
    alt: 'BMW X5 car radio',
  },
  {
    name: 'Rainproof Clear Film Rearview Mirror',
    category: 'Accessories',
    price: '$29',
    badge: 'In Stock',
    image: waterproofImage,
    alt: 'Rainproof rearview mirror film',
  },
  {
    name: 'Blind Spot Mirror Frameless',
    category: 'Safety',
    price: '$19',
    badge: 'In Stock',
    image: blindSpotMirrorImage,
    alt: 'Frameless blind spot mirror',
  },
  {
    name: '3D Beast Eyes Car Sticker',
    category: 'Styling',
    price: '$12',
    badge: 'Ships Today',
    image: beastEyesImage,
    alt: '3D beast eyes car sticker',
  },
  {
    name: '2007 Porsche 911 Carrera ABS Pump',
    category: 'Brakes',
    price: '$1,249',
    badge: 'Limited',
    image: absPumpImage,
    alt: 'Porsche 911 Carrera ABS pump',
  },
  {
    name: '2009 Chevrolet Silverado Headlamp Assembly (Right)',
    category: 'Lighting',
    price: '$189',
    badge: 'In Stock',
    image: headlightImage,
    alt: 'Chevrolet Silverado headlamp assembly',
  },
  {
    name: 'Fuel Pump / Fuel Tank 2.0L VIN 6 8TH',
    category: 'Fuel System',
    price: '$229',
    badge: 'In Stock',
    image: fuelPumpImage,
    alt: 'Fuel pump fuel tank assembly',
  },
];

const steps = [
  { n: '01', icon: '🔍', title: 'Browse Parts',         desc: 'Search our inventory by make, model, or part type.' },
  { n: '02', icon: '📞', title: 'Request Availability', desc: 'Call or message us to confirm the part is ready to ship.' },
  { n: '03', icon: '✅', title: 'Confirm Order',         desc: 'Secure checkout with warranty documentation provided.' },
  { n: '04', icon: '🚚', title: 'Fast Delivery',         desc: 'Parts shipped nationwide, typically 2–5 business days.' },
];

const testimonials = [
  {
    quote: "Got my Toyota Camry engine in 3 days. Runs perfectly — better than I expected for a used part. Will definitely order again.",
    name: 'Marcus T.',
    location: 'Dallas, TX',
    stars: 5,
  },
  {
    quote: "The team helped me find the exact transmission for my Silverado. Great communication, fair price, and it came with a warranty.",
    name: 'Sandra R.',
    location: 'Phoenix, AZ',
    stars: 5,
  },
  {
    quote: "Ordered an ABS pump — arrived well-packaged and exactly as described. Saved me $800 vs the dealership. Highly recommended.",
    name: 'James L.',
    location: 'Chicago, IL',
    stars: 5,
  },
];

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function HomePage() {
  const phoneNumber = '+18664865915';
  const displayPhone = '(866) 486-5915';

  return (
    <main className="font-['DM_Sans',sans-serif] text-gray-800 bg-white">

      {/* ══════════════════════════════════════════════════════════════
          HERO — Original gradient + cross pattern + wave SVG preserved.
                 Left column: refined content from new design.
                 Right column: Instant Quote form from original Hero.
         ══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-r from-gray-900 to-blue-900 text-white overflow-hidden">

        {/* Original cross/plus background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Soft blue glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT — new refined content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-3 py-1.5 text-xs text-blue-300 font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Trusted Since 2005 · 10,000+ Parts Delivered
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight font-['Barlow',sans-serif]">
                Get Quality Used Engine<br />and Transmission in
                <span className="text-blue-400 block mt-1">&quot;A&quot; Grade Condition</span>
              </h1>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
                Every part inspected, tested, and backed by a{' '}
                <strong className="text-white">1-year warranty</strong>. Secure your purchase with a{' '}
                <span className="font-bold text-yellow-400">10% OFF</span> on your first order!
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold text-base px-7 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-900/40"
                >
                  <Phone className="h-5 w-5" />
                  Click Here to Talk
                </a>
                <div>
                  <div className="text-xl md:text-2xl font-bold tracking-wide">{displayPhone}</div>
                  <p className="text-gray-400 text-xs mt-0.5">Mon – Sun · 6 AM – 9 PM PST</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {[
                  { icon: <Truck className="h-4 w-4 text-blue-400" />, label: 'Free Shipping' },
                  { icon: <Shield className="h-4 w-4 text-blue-400" />, label: '1-Year Warranty' },
                  { icon: <Clock className="h-4 w-4 text-blue-400" />, label: 'Same Day Shipping' },
                  { icon: <DollarSign className="h-4 w-4 text-blue-400" />, label: 'Best Price Guarantee' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {f.icon}
                    <span className="text-sm text-gray-300">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — original Instant Quote form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-1">Instant Quote</h3>
                <p className="text-gray-300 text-sm">Get your engine/transmission price in 10 minutes</p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Vehicle Make</label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500">
                    <option>Select Make</option>
                    <option>Toyota</option>
                    <option>Honda</option>
                    <option>Ford</option>
                    <option>Chevrolet</option>
                    <option>BMW</option>
                    <option>Nissan</option>
                    <option>Dodge</option>
                    <option>Jeep</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Vehicle Model</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Camry, F-150"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Year</label>
                  <input
                    type="number"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 2020"
                    min="1990"
                    max="2025"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-300">Part Needed</label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500">
                    <option>Select Part</option>
                    <option>Engine</option>
                    <option>Transmission</option>
                    <option>Both</option>
                    <option>Other</option>
                  </select>
                </div>

                <a
                  href={`tel:${phoneNumber}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5 mt-2"
                >
                  GET INSTANT QUOTE
                </a>

                <p className="text-center text-xs text-gray-400 pt-1">
                  Or call us:{' '}
                  <a href={`tel:${phoneNumber}`} className="text-blue-400 hover:underline">
                    {displayPhone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Original wave SVG — preserved exactly */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══ TRUST BAR ════════════════════════════════════════════════════ */}
      <section className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center py-3 gap-4">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <span className="text-blue-400">{item.icon}</span>
                <span className="text-xs font-medium tracking-wide">{item.label}</span>
                {i < trustItems.length - 1 && (
                  <span className="hidden md:block w-px h-4 bg-gray-700 ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SHOP BY CATEGORY ══════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Barlow',sans-serif]">Shop by Category</h2>
            <p className="text-gray-500 text-sm mt-2">All inventory in-house — ships from our warehouse directly to you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="group bg-white border border-gray-100 rounded-xl p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className={`w-11 h-11 rounded-lg ${cat.color} flex items-center justify-center text-xl mb-4`}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-base mb-1.5">{cat.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-4">{cat.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{cat.count}</span>
                  <span className="text-xs text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ChevronRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SEE OUR COLLECTION — FEATURED PRODUCTS ══════════════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-3">
            <div>
              <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-1.5">See Our Collection</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Barlow',sans-serif]">Featured Products</h2>
            </div>
            <Link
              href="/inventory"
              className="text-sm text-gray-500 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors shrink-0"
            >
              View all products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Real product image */}
                <div className="relative h-44 bg-gray-50 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className={`absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-sm ${badgeStyles[product.badge]}`}>
                    {product.badge}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1">{product.category}</p>
                  <h3 className="text-sm font-semibold text-gray-800 leading-snug flex-1 mb-3">{product.name}</h3>
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900">{product.price}</span>
                    <a
                      href={`tel:${phoneNumber}`}
                      className="text-xs text-blue-600 font-semibold hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-2.5 py-1 rounded-md transition-all duration-150"
                    >
                      Inquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Barlow',sans-serif]">How It Works</h2>
            <p className="text-gray-500 text-sm mt-2">Getting the right part is simple — we handle the rest</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-gray-200 z-0" />
                )}
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center text-2xl mb-4 shadow-sm">
                  {step.icon}
                </div>
                <p className="text-[10px] font-bold tracking-widest text-blue-500 uppercase mb-1">{step.n}</p>
                <h3 className="font-semibold text-gray-900 text-sm mb-1.5">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POPULAR PARTS ════════════════════════════════════════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Barlow',sans-serif]">Popular Parts In Stock</h2>
            <p className="text-gray-500 text-sm mt-2">Tested, warehoused, and ready to ship today</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {popularParts.map((part, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="mb-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyles[part.badge]}`}>
                    {part.badge}
                  </span>
                </div>
                <div className="border-b border-gray-100 pb-3 mb-3">
                  <p className="text-base font-bold text-blue-600">{part.make}</p>
                  <p className="text-sm font-semibold text-gray-800">{part.model}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{part.type}</p>
                  <p className="text-xs text-gray-400">{part.year}</p>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-3">{part.price}</p>
                <div className="flex flex-col gap-2 mt-auto">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-xs text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
                  >
                    Inquire Now
                  </a>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-xs text-center font-medium text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-300 px-3 py-1.5 rounded-md transition-all"
                  >
                    Check Availability
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ════════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Barlow',sans-serif]">Why Choose The Auto King USA?</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Every part is inspected and tested before shipping — that&apos;s our commitment to quality, not just a claim.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <div key={i} className="flex gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:shadow-sm transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WARRANTY & QUALITY ═══════════════════════════════════════════ */}
      <section className="py-14 bg-blue-950 text-white overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '28px 28px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-blue-400 tracking-widest uppercase mb-3">Our Promise</p>
              <h2 className="text-2xl md:text-3xl font-bold font-['Barlow',sans-serif] mb-5">
                Built on Quality.<br />Backed by Warranty.
              </h2>
              <div className="space-y-4">
                {[
                  { icon: <Shield className="h-4 w-4" />, title: '1-Year Warranty',   desc: 'Full coverage on all engines and transmissions — no fine print.' },
                  { icon: <CheckCircle className="h-4 w-4" />, title: 'Tested & Verified', desc: '50+ inspection points run on every part before it leaves our facility.' },
                  { icon: <Headphones className="h-4 w-4" />, title: 'Dedicated Support',  desc: 'A real specialist handles your order start to finish, 7 days a week.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-md bg-blue-800/60 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{item.title}</p>
                      <p className="text-blue-200 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-900/50 border border-blue-800/60 rounded-2xl p-8 space-y-5">
              {[
                { label: 'Years in Business',      value: '20+' },
                { label: 'Parts Sold & Delivered', value: '10,000+' },
                { label: 'Customer Satisfaction',  value: '98%' },
                { label: 'States We Ship To',      value: '50' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between border-b border-blue-800/40 pb-4 last:border-0 last:pb-0">
                  <p className="text-blue-200 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white font-['Barlow',sans-serif]">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Barlow',sans-serif]">What Customers Say</h2>
            <p className="text-gray-500 text-sm mt-2">Real orders. Real results. Read by real people.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-gray-200 mb-2" />
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.quote}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{t.name}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-0.5">
                      <MapPin size={9} /> {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-xs text-green-400 font-medium mb-5 tracking-wide">
            🎉 Limited Time Offer
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-['Barlow',sans-serif] mb-3">
            Ready to Get Your Part?
          </h2>
          <p className="text-gray-300 text-sm mb-7 max-w-md mx-auto">
            Call now and get <strong className="text-yellow-400">10% OFF</strong> your first order.
            Speak with a specialist in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-7 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-900/40"
            >
              <Phone size={16} />
              Call Now: {displayPhone}
            </a>
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm px-7 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Get a Free Quote
            </a>
          </div>
          <p className="mt-5 text-xs text-gray-500">Mon – Sun · 6 AM – 9 PM PST · No hold music, no bots</p>
        </div>
      </section>

    </main>
  );
}
