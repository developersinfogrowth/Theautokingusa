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

// ─── Types ────────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  heading: string;
  links: FooterLink[];
}

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}

// ─── Footer data ──────────────────────────────────────────────────────────────
export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    heading: 'Quick Links',
    links: [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'Used Engine',
        href: '/used-engine',
      },
      {
        label: 'Used Transmission',
        href: '/used-transmission',
      },
      {
        label: 'Commercial Vehicles',
        href: '/commercial-vehicles',
      },
      {
        label: 'Blogs',
        href: '/blogs',
      },
      {
        label: 'About Us',
        href: '/about',
      },
      {
        label: 'Contact',
        href: '/contact-us',
      },
    ],
  },
  {
    heading: 'Policies',
    links: [
      {
        label: 'Privacy Policy',
        href: '/policies/privacy-policy',
      },
      {
        label: 'Shipping Policy',
        href: '/policies/shipping-policy',
      },
      {
        label: 'Warranty Policy',
        href: '/policies/warranty-policy',
      },
      {
        label: 'Terms & Conditions',
        href: '/policies/terms-and-conditions',
      },
      {
        label: 'Return & Refund Policy',
        href: '/policies/return-refund-policy',
      },
    ],
  },
];

export const FOOTER_BADGES: Array<{
  icon: LucideIcon;
  label: string;
}> = [
  {
    icon: Shield,
    label: '1-Month Warranty',
  },
  {
    icon: Truck,
    label: 'Free Shipping',
  },
];

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: Phone,
    label: 'Phone',
    value: BRANDING.phone.display,
    href: BRANDING.phone.href,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sales@theautokingsusa.com',
    href: 'mailto:sales@theautokingsusa.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '1031 N Tehama St, Willows, CA 95988',
    href: 'https://maps.google.com/?q=1031+N+Tehama+St,+Willows,+CA+95988',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon – Sun · 8:30 AM – 4:30 PM PST',
    href: null,
  },
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top red accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div
          className="
            grid grid-cols-1 items-start gap-10
            sm:grid-cols-2
            lg:grid-cols-[2fr_1fr_1fr_1.4fr_1.4fr]
            lg:gap-8
          "
        >
          {/* Brand column */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Auto King USA home"
              className="
                inline-flex w-fit shrink-0 items-center rounded-md
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
              "
            >
              <Image
                src={BRANDING.logo.src}
                alt={BRANDING.logo.alt}
                width={BRANDING.logo.width}
                height={BRANDING.logo.height}
                sizes="
                  (max-width: 767px) 240px,
                  (max-width: 1023px) 270px,
                  310px
                "
                className="
                  h-[112px] w-auto select-none object-contain
                  md:h-[120px]
                  lg:h-[124px]
                "
              />
            </Link>

            <p className="max-w-[300px] text-sm leading-relaxed text-gray-400">
            Providing quality used engines and transmissions since 2019. Your trusted partner for tested used engines & used transmissions, warrantied and shipped nationwide.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {FOOTER_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="
                    flex select-none items-center gap-1.5 rounded-full
                    border border-gray-700 bg-gray-800
                    px-3 py-1.5 text-xs text-gray-300
                  "
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-red-500"
                    aria-hidden="true"
                  />

                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links and policy links */}
          {FOOTER_LINK_GROUPS.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-300">
                {heading}
              </h4>

              <span className="mb-4 block h-0.5 w-8 rounded-full bg-red-600" />

              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="
                        group flex items-center gap-1.5 text-sm text-gray-400
                        transition-colors duration-150
                        hover:text-red-400
                      "
                    >
                      <span
                        className="
                          h-1 w-1 shrink-0 rounded-full bg-red-600
                          opacity-0 transition-opacity
                          group-hover:opacity-100
                        "
                        aria-hidden="true"
                      />

                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-300">
              Contact Us
            </h4>

            <span className="mb-4 block h-0.5 w-8 rounded-full bg-red-600" />

            <ul className="space-y-4">
              {CONTACT_ITEMS.map(
                ({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div
                      className="
                        mt-0.5 flex h-8 w-8 shrink-0 items-center
                        justify-center rounded-lg border border-gray-700
                        bg-gray-800
                      "
                    >
                      <Icon
                        className="h-4 w-4 text-red-500"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-0.5 text-xs font-semibold text-gray-300">
                        {label}
                      </p>

                      {href ? (
                        <a
                          href={href}
                          className="
                            break-words text-sm text-gray-400
                            transition-colors duration-150
                            hover:text-red-400
                          "
                          target={
                            label === 'Address' ? '_blank' : undefined
                          }
                          rel={
                            label === 'Address'
                              ? 'noopener noreferrer'
                              : undefined
                          }
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-400">{value}</p>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Special offer */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-300">
              Special Offer
            </h4>

            <span className="mb-4 block h-0.5 w-8 rounded-full bg-red-600" />

            <div className="space-y-3 rounded-xl border border-gray-700 bg-gray-800 p-5">
              <div
                className="
                  inline-flex items-center gap-1.5 rounded-full
                  border border-red-600/30 bg-red-600/15
                  px-3 py-1 text-xs font-semibold tracking-wide
                  text-red-400
                "
              >
                🎉 Limited Time
              </div>

              <p className="text-2xl font-extrabold tracking-tight text-yellow-400">
                10% OFF
              </p>

              <p className="text-sm leading-relaxed text-gray-300">
                On your first order. Call now to claim your discount before it
                expires.
              </p>

              <a
                href={BRANDING.phone.href}
                aria-label={`Call Auto King USA at ${BRANDING.phone.display}`}
                className="
                  mt-2 flex w-full items-center justify-center gap-2
                  rounded-lg bg-red-600 py-2.5
                  text-sm font-bold text-white
                  transition-colors duration-150
                  hover:bg-red-700
                  active:bg-red-800
                "
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call to Claim
              </a>

              <p className="text-center text-xs text-gray-400">
                {BRANDING.phone.display}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div
          className="
            mx-auto flex max-w-7xl flex-col items-center justify-between
            gap-3 px-4 py-5
            sm:flex-row sm:px-6
            lg:px-8
          "
        >
          <p className="text-center text-xs text-gray-500 sm:text-left">
            &copy; {year} TheAutoKingUSA. All rights reserved.
          </p>

          <p className="text-center text-xs text-gray-600 sm:text-right">
            Quality used engines &amp; transmissions at unbeatable prices.
          </p>
        </div>
      </div>
    </footer>
  );
}