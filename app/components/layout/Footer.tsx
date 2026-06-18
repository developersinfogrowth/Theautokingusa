import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { BRANDING } from '@/app/components/constants/branding';

// ─── Constants ────────────────────────────────────────────────────────────────

export const FOOTER_PHONE_RAW     = '+18664865915';
export const FOOTER_PHONE_DISPLAY = '+1 (866) 486-5915';

interface FooterLink      { label: string; href: string }
interface FooterLinkGroup { heading: string; links: FooterLink[] }

/** Mirrors NAV_ITEMS exactly */
export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    heading: 'Quick Links',
    links: [
      { label: 'Home',         href: '/'                    },
      { label: 'Used Engine',  href: '/used-engine'         },
      { label: 'Transmission', href: '/used-transmission'   },
      { label: 'Commercial',   href: '/commercial-vehicles' },
      { label: 'Blogs',        href: '/blogs'               },
      { label: 'About Us',     href: '/about'               },
      { label: 'Contact',      href: '/contact-us'          },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { label: 'Privacy Policy',         href: '/policies/privacy-policy'       },
      { label: 'Shipping Policy',        href: '/policies/shipping-policy'      },
      { label: 'Warranty Policy',        href: '/policies/warranty-policy'      },
      { label: 'Terms & Conditions',     href: '/policies/terms-and-conditions' },
      { label: 'Return & Refund Policy', href: '/policies/return-refund-policy' },
    ],
  },
];

export const FOOTER_BADGES: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Shield, label: '1-Month Warranty' },
  { icon: Truck,  label: 'Free Shipping'    },
];

export const CONTACT_ITEMS: Array<{
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}> = [
  {
    icon:  Phone,
    label: 'Phone',
    value: FOOTER_PHONE_DISPLAY,
    href:  `tel:${FOOTER_PHONE_RAW}`,
  },
  {
    icon:  Mail,
    label: 'Email',
    value: 'sales@theautokingsusa.com',
    href:  'mailto:sales@theautokingsusa.com',
  },
  {
    icon:  MapPin,
    label: 'Address',
    value: '1031 N Tehama St, Willows, CA 95988',
    href:  'https://maps.google.com/?q=1031+N+Tehama+St,+Willows,+CA+95988',
  },
  {
    icon:  Clock,
    label: 'Hours',
    value: 'Mon – Sun · 8:30 AM – 4:30 PM PST',
    href:  null,
  },
];

// ─── Footer ──────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">

      {/* ── Top red accent bar ── */}
      <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/*
          Grid layout
          ─────────────────────────────────────────────────────────────
          mobile  < sm  : 1 col, fully stacked
          tablet  sm–lg : 2 cols  (brand spans both)
          desktop ≥ lg  : [2fr brand] [1fr links] [1fr policies] [1.4fr contact] [1.4fr offer]
                          The brand col is deliberately wider (2fr) so the tall logo
                          never squeezes the other columns.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr_1.4fr] gap-10 lg:gap-8 items-start">

          {/* ══ Col 1 — Brand ════════════════════════════════════════════════ */}
          {/*
            sm:col-span-2  → spans full width on tablet so the logo has plenty of room
            lg:col-span-1  → snaps back to its own column on desktop
          */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">

            {/* ── Logo link — identical Image props to the navbar Logo component ── */}
            <Link
              href="/"
              className="inline-flex items-center shrink-0 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-red-500 rounded-md py-1
                         w-fit"
            >
              <Image
                src={BRANDING.logo.src}
                alt={BRANDING.logo.alt}
                width={BRANDING.logo.width}
                height={BRANDING.logo.height}
                priority
                sizes="(max-width: 767px) 180px, (max-width: 1023px) 200px, 300px"
                className="h-[88px] w-auto md:h-24 lg:h-[96px] object-contain select-none"
                style={{ width: 'auto' }}
              />
            </Link>

            {/* Tagline */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
              Providing quality used engines and transmissions since&nbsp;2019.
              Your trusted partner for auto parts — tested, warrantied, and
              shipped nationwide.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2.5">
              {FOOTER_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 bg-gray-800 border border-gray-700
                             rounded-full px-3 py-1.5 text-xs text-gray-300 select-none"
                >
                  <Icon className="h-3.5 w-3.5 text-red-500 shrink-0" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ══ Cols 2–3 — Link groups (Quick Links + Policies) ══════════════ */}
          {FOOTER_LINK_GROUPS.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-4">
                {heading}
              </h4>
              <span className="block w-8 h-0.5 bg-red-600 rounded-full mb-4" />

              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-gray-400 hover:text-red-400 text-sm transition-colors
                                 duration-150 flex items-center gap-1.5 group"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-red-600 opacity-0
                                   group-hover:opacity-100 transition-opacity shrink-0"
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ══ Col 4 — Contact ══════════════════════════════════════════════ */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-4">
              Contact Us
            </h4>
            <span className="block w-8 h-0.5 bg-red-600 rounded-full mb-4" />

            <ul className="space-y-4">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 w-8 h-8 rounded-lg bg-gray-800 border border-gray-700
                                flex items-center justify-center shrink-0"
                  >
                    <Icon className="h-4 w-4 text-red-500" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-300 mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-gray-400 hover:text-red-400 text-sm
                                   transition-colors duration-150 break-words"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-sm">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ══ Col 5 — Special Offer ════════════════════════════════════════ */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-4">
              Special Offer
            </h4>
            <span className="block w-8 h-0.5 bg-red-600 rounded-full mb-4" />

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 space-y-3">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-1.5 bg-red-600/15 border
                            border-red-600/30 rounded-full px-3 py-1 text-xs
                            text-red-400 font-semibold tracking-wide"
              >
                🎉 Limited Time
              </div>

              <p className="text-yellow-400 font-extrabold text-2xl tracking-tight">
                10% OFF
              </p>

              <p className="text-gray-300 text-sm leading-relaxed">
                On your first order. Call now to claim your discount before it expires.
              </p>

              <a
                href={`tel:${FOOTER_PHONE_RAW}`}
                className="flex items-center justify-center gap-2 w-full mt-2 py-2.5
                           bg-red-600 hover:bg-red-700 active:bg-red-800 text-white
                           text-sm font-bold rounded-lg transition-colors duration-150"
              >
                Call to Claim
              </a>

              <p className="text-center text-xs text-gray-500">{FOOTER_PHONE_DISPLAY}</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
                      flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-gray-500 text-xs text-center sm:text-left">
            &copy; {year} TheAutoKingUSA. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs text-center sm:text-right">
            Quality used engines &amp; transmissions at unbeatable prices.
          </p>
        </div>
      </div>

    </footer>
  );
}