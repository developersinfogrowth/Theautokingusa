'use client'

import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import {
  User, Phone, Mail, MessageSquare, Tag, MapPin, Clock,
  ArrowRight, CheckCircle, ExternalLink, Shield, Zap, Headphones, Send
} from 'lucide-react'

/* ─────────────────────────────────────────────
   LOCATION DATA
───────────────────────────────────────────── */
const location = {
  label: 'California',
  city: 'Willows, CA 95988',
  address: '1031 N Tehama St, Willows, CA 95988',
  mapsUrl: 'https://maps.google.com/?q=1031+N+Tehama+St+Willows+CA+95988',
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.346!2d-122.19543!3d39.52398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809b2d0000000001%3A0x0000000000000001!2s1031+N+Tehama+St%2C+Willows%2C+CA+95988!5e0!3m2!1sen!2sus!4v1700000000000',
}

/* ─────────────────────────────────────────────
   CONTACT DETAIL CARDS
───────────────────────────────────────────── */
const contactDetails = [
  {
    title: 'Phone',
    value: '+1 (866) 486-5915',
    href: 'tel:+18664865915',
    icon: Phone,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    borderColor: 'border-red-100',
    external: false,
  },
  {
    title: 'Email',
    value: 'sales@theautokingsusa.com',
    href: 'mailto:sales@theautokingsusa.com',
    icon: Mail,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-100',
    external: false,
  },
  {
    title: 'Business Hours',
    value: 'Mon – Sun · 8:30 AM – 4:30 PM PST',
    href: null,
    icon: Clock,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-100',
    external: false,
  },
  {
    title: 'Our Location',
    value: '1031 N Tehama St, Willows, CA 95988',
    href: 'https://maps.google.com/?q=1031+N+Tehama+St+Willows+CA+95988',
    icon: MapPin,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderColor: 'border-violet-100',
    external: true,
  },
]

/* ─────────────────────────────────────────────
   TRUST BADGES
───────────────────────────────────────────── */
const trustBadges = [
  { icon: Shield,      label: '1-Month Warranty' },
  { icon: Zap,         label: 'Fast Nationwide Shipping' },
  { icon: Headphones,  label: '7-Day Support' },
  { icon: CheckCircle, label: 'Inspected Parts' },
]

/* ─────────────────────────────────────────────
   FAQS
───────────────────────────────────────────── */
const faqs = [
  { q: 'How long does shipping take?', a: '3–7 business days nationwide with real-time tracking.' },
  { q: "What's your warranty?",        a: '1-month comprehensive warranty on all engines & transmissions.' },
  { q: 'Do you accept returns?',       a: 'Yes — hassle-free 30-day return policy, no questions asked.' },
  { q: 'What payment methods?',        a: 'All major credit cards, ACH, and digital payments accepted.' },
]

/* ─────────────────────────────────────────────
   QUICK INFO ITEMS (no truncate — full text)
───────────────────────────────────────────── */
const quickInfo = [
  { icon: Phone, label: 'Phone',  value: '+1 (866) 486-5915',         color: 'text-red-600' },
  { icon: Clock, label: 'Hours',  value: 'Mon – Sun · 8:30 AM – 4:30 PM PST', color: 'text-amber-600' },
  { icon: MapPin, label: 'City',  value: 'Willows, CA 95988',          color: 'text-violet-600' },
]

/* ════════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════════ */
export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.error || 'Something went wrong'); return }
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    'w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all duration-200'

  return (
    <>
      {/* ══════════════════════════════════════
          SEO HEAD
          — Title: 70 chars
          — Description: 160 chars
          — Full keywords list
          — Canonical URL
          — Open Graph + Twitter Card
          — JSON-LD AutoPartsStore + FAQPage
      ══════════════════════════════════════ */}
      <Head>
        {/* Primary */}
        <title>Contact Us | TheAutoKingUSA – Quality Used Engines &amp; Transmissions</title>
        <meta
          name="description"
          content="Contact TheAutoKingUSA for quality used engines and transmissions in A Grade condition. Call +1 (866) 486-5915, Mon–Sun 8:30AM–4:30PM PST. Located in Willows, CA."
        />
        <meta
          name="keywords"
          content="contact auto king, TheAutoKingUSA contact, used engines for sale, used transmissions for sale, buy used engine USA, used auto parts California, engine parts Willows CA, transmission parts near me, quality used engines, A grade used engines, used engines and transmissions, auto parts nationwide shipping, cheap used engines, replacement engine USA, replacement transmission USA, auto king phone number, auto parts customer support"
        />
        <meta name="robots"     content="index, follow" />
        <meta name="viewport"   content="width=device-width, initial-scale=1" />
        <meta name="author"     content="The Auto King USA" />
        <meta name="publisher"  content="The Auto King USA" />
        <meta httpEquiv="content-language" content="en" />
        <link rel="canonical"   href="https://www.theautokingsusa.com/contact-us" />

        {/* Open Graph */}
        <meta property="og:title"       content="Contact Us | TheAutoKingUSA – Used Engines & Transmissions" />
        <meta property="og:description" content="Get quality used engines and transmissions in A Grade condition. Expert team ready to help. Call +1 (866) 486-5915 today." />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://www.theautokingsusa.com/contact-us" />
        <meta property="og:image"       content="https://www.theautokingsusa.com/images/contact-us.jpg" />
        <meta property="og:image:alt"   content="Auto King engine and transmission parts facility" />
        <meta property="og:site_name"   content="TheAutoKingUSA – Engine & Transmission Parts" />
        <meta property="og:locale"      content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Contact TheAutoKingUSA – Used Engines & Transmissions" />
        <meta name="twitter:description" content="Quality used engines and transmissions in A Grade condition. Call +1 (866) 486-5915 for fast expert help." />
        <meta name="twitter:image"       content="https://www.theautokingsusa.com/images/contact-us.jpg" />

        {/* JSON-LD: AutoPartsStore */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AutoPartsStore',
              name: 'TheAutoKingUSA – Engine & Transmission Parts',
              url: 'https://www.theautokingsusa.com',
              telephone: '+18664865915',
              email: 'sales@theautokingsusa.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '1031 N Tehama St',
                addressLocality: 'Willows',
                addressRegion: 'CA',
                postalCode: '95988',
                addressCountry: 'US',
              },
              openingHours: 'Mo-Su 08:30-16:30',
              image: 'https://www.theautokingsusa.com/images/contact-us.jpg',
              description: 'TheAutoKingUSA specializes in A Grade used engines and transmissions for all vehicle makes across the USA.',
              priceRange: '$$',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+18664865915',
                contactType: 'customer service',
                areaServed: 'US',
                availableLanguage: 'English',
                hoursAvailable: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                  opens: '08:30',
                  closes: '16:30',
                },
              },
            }),
          }}
        />
        {/* JSON-LD: FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      </Head>

      <main itemScope itemType="https://schema.org/ContactPage">

        {/* ══════════════════════════════════════
            HERO — real image, NO overlay, NO gradient
        ══════════════════════════════════════ */}
        <section
          aria-labelledby="contact-hero-heading"
          className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[500px] flex items-center overflow-hidden bg-gray-950"
        >
          {/* Hero background image — NO overlay, pure image */}
          <div className="absolute inset-0">
            <Image
              src="/images/contact-us.jpg"
              alt="Auto King engine and transmission parts facility — contact us"
              fill
              className="object-cover object-center"
              priority
              quality={90}
              sizes="100vw"
            />
          </div>

          {/* Hero text content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
            <div className="max-w-lg">
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase text-red-400 mb-5">
                <span className="w-5 h-px bg-red-400" aria-hidden="true" />
                Get In Touch
              </span>

              <h1
                id="contact-hero-heading"
                itemProp="name"
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-tight mb-5 text-white"
              >
                Contact{' '}
                <span className="text-red-500">Auto King</span>
              </h1>

              <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Have questions about engines or transmissions? Our expert team is ready
                to help — fast response, real answers.
              </p>

              <a
                href="tel:+18664865915"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold text-base px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-red-900/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                +1 (866) 486-5915
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TRUST BADGES — white strip
        ══════════════════════════════════════ */}
        <div
          className="bg-white border-b border-gray-100 shadow-sm py-4 px-4 overflow-x-auto"
          aria-label="Trust signals"
        >
          <div className="max-w-5xl mx-auto flex items-center justify-start sm:justify-center lg:justify-between gap-6 sm:gap-8 min-w-max sm:min-w-0 px-2 sm:px-0">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-semibold text-gray-700 whitespace-nowrap">
                <Icon className="w-4 h-4 text-red-600 flex-shrink-0" aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            MAP + FORM — light gray bg
        ══════════════════════════════════════ */}
        <section
          className="py-14 sm:py-20 bg-gray-50 px-4"
          aria-labelledby="contact-form-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-stretch">

              {/* ── LEFT: Location card + map + quick info ── */}
              <div className="flex flex-col gap-4 sm:gap-5">

                {/* Location header card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="text-xl font-black text-gray-900 mb-1">Our Location</h2>
                      <p className="text-gray-500 text-sm leading-snug">{location.address}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <a
                        href={location.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open in Google Maps"
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                      <a
                        href={location.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Get directions"
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors"
                      >
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Google Maps embed */}
                <div
                  className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex-1 min-h-[300px] sm:min-h-[360px]"
                  role="region"
                  aria-label="Auto King California location map"
                >
                  <iframe
                    src={location.embedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    title="Auto King — Willows, California location on Google Maps"
                    aria-label={`Google Maps showing Auto King at ${location.address}`}
                  />
                  {/* Address pill overlay on the map */}
                  <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex items-start gap-3 max-w-[260px] border border-gray-100">
                    <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-[11px] font-bold text-gray-900">Auto King — California</p>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{location.address}</p>
                      <a
                        href={location.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-bold text-red-600 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>

                {/* ── Quick info strip — NO truncate, full text visible ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {quickInfo.map(({ icon: Icon, label, value, color }) => (
                    <div
                      key={label}
                      className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-start gap-3 shadow-sm"
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${color}`} aria-hidden="true" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide leading-tight">
                          {label}
                        </p>
                        <p className="text-xs font-semibold text-gray-800 leading-snug mt-0.5">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Contact Form ── */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-center">
                <h2
                  id="contact-form-heading"
                  className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 tracking-tight"
                >
                  Send Us a Message
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Our team responds within 1 business hour during operating hours.
                </p>

                {submitted && (
                  <div
                    role="alert"
                    className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-6 text-sm font-semibold"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    Message received! We&apos;ll be in touch shortly.
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  noValidate
                  aria-label="Contact form"
                >
                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className={inputBase}
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Phone <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Your phone number"
                        className={inputBase}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className={inputBase}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Subject <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
                      <select
                        id="contact-subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`${inputBase} appearance-none`}
                      >
                        <option value="">Select a subject</option>
                        <option value="engine">Engine Inquiry</option>
                        <option value="transmission">Transmission Inquiry</option>
                        <option value="quote">Request a Quote</option>
                        <option value="warranty">Warranty Claim</option>
                        <option value="support">Customer Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Message <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" aria-hidden="true" />
                      <textarea
                        id="contact-message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        placeholder="Tell us what you're looking for..."
                        className={`${inputBase} resize-none`}
                      />
                    </div>
                  </div>

                  {/* SMS Consent */}
                  <div className="sm:col-span-2 flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      className="mt-0.5 h-4 w-4 accent-red-600 flex-shrink-0 cursor-pointer rounded"
                    />
                    <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                      By checking this box, I consent to receive text messages from Auto King in
                      accordance with our{' '}
                      <a href="/policies/privacy-policy" className="text-red-600 font-semibold hover:underline underline-offset-2">
                        Privacy Policy
                      </a>.
                      {' '}I can opt out at any time by replying &quot;STOP&quot;.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-md shadow-red-200 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CONTACT DETAIL CARDS — white bg
        ══════════════════════════════════════ */}
        <section
          className="py-14 sm:py-16 bg-white px-4 border-t border-gray-100"
          aria-label="Contact information"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {contactDetails.map((item) => {
                const Icon = item.icon
                const card = (
                  <div className="h-full bg-gray-50 border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center ${item.iconBg} border ${item.borderColor}`}>
                        <Icon className={`w-5 h-5 ${item.iconColor}`} aria-hidden="true" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed break-words">{item.value}</p>
                  </div>
                )
                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={`${item.title}: ${item.value}`}
                    className="block h-full"
                  >
                    {card}
                  </a>
                ) : (
                  <div key={item.title} className="h-full">{card}</div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY CHOOSE US — gray bg + engine image
        ══════════════════════════════════════ */}
        <section
          className="py-14 sm:py-20 px-4 bg-gray-50 border-t border-gray-100"
          aria-labelledby="support-section-heading"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Engine/transmission warehouse image — fully visible, no overlay */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 aspect-video md:aspect-auto md:h-[380px]">
              <Image
                src="/images/contact-us-engine-trasnmission.jpg"
                alt="Quality used engines and transmissions stacked at Auto King warehouse in Willows, California"
                fill
                className="object-cover object-center"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                itemProp="image"
              />
            </div>

            {/* Text */}
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase text-red-600 mb-4">
                <span className="w-5 h-px bg-red-600" aria-hidden="true" />
                Why Choose Us
              </span>

              <h2
                id="support-section-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-5 leading-tight tracking-tight"
                itemProp="description"
              >
                Quality Used Engines &amp; Transmissions Across the USA
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4">
                We specialize in quality used engines and transmissions for a wide range of vehicles
                nationwide. Our team helps customers find reliable auto parts at competitive prices
                with expert guidance. If you need help locating the right part, contact us today.
              </p>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                Every engine and transmission is carefully inspected for dependable performance. With
                a large nationwide inventory, we make it easy to find the perfect fit for your car,
                truck, or SUV — backed by our warranty.
              </p>

              <ul className="flex flex-col gap-2 mb-7" aria-label="Key benefits">
                {[
                  '1-Month warranty on all parts',
                  'Free shipping nationwide',
                  'Expert support 7 days a week',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="tel:+18664865915"
                className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 hover:underline underline-offset-4 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call for fast support
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            QUICK ANSWERS / FAQ — white bg
        ══════════════════════════════════════ */}
        <section
          className="py-14 sm:py-20 px-4 bg-white border-t border-gray-100"
          aria-labelledby="quick-answers-heading"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase text-red-600 mb-3">
                <span className="w-5 h-px bg-red-600" aria-hidden="true" />
                FAQ
                <span className="w-5 h-px bg-red-600" aria-hidden="true" />
              </span>
              <h2
                id="quick-answers-heading"
                className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight"
              >
                Quick Answers
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mx-auto mb-4 shadow-sm shadow-red-200">
                    <span className="text-xs font-black">0{idx + 1}</span>
                  </div>
                  <h3 itemProp="name" className="font-bold text-gray-900 mb-2 text-sm leading-snug">
                    {faq.q}
                  </h3>
                  <p itemProp="acceptedAnswer" className="text-gray-500 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            EMERGENCY CTA STRIP — red
        ══════════════════════════════════════ */}
        <section
          className="py-10 sm:py-12 px-4 bg-red-600"
          aria-label="Emergency support"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div>
              <p className="text-white font-black text-xl sm:text-2xl tracking-tight">
                Need Immediate Help?
              </p>
              <p className="text-red-100 text-sm mt-1">
                Call our support line for urgent parts requests.
              </p>
            </div>
            <a
              href="tel:+18664865915"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-red-600 font-black text-sm sm:text-base px-7 py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              +1 (866) 486-5915
            </a>
          </div>
        </section>

      </main>
    </>
  )
}