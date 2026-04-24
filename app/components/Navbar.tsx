'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Used Engines', href: '/used-engine' },
  { name: 'Transmissions', href: '/used-transmission' },
  { name: 'Commercial', href: '/commercial-vehicles' },
  { name: 'Contact', href: '/contact-us' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/>
                <rect x="9" y="11" width="14" height="10" rx="2"/>
                <circle cx="12" cy="17.5" r="1.5"/>
                <circle cx="20" cy="17.5" r="1.5"/>
              </svg>
            </div>
            <div className="leading-none">
              <p className="text-[15px] font-bold tracking-wide uppercase text-gray-900 font-['Barlow',sans-serif]">
                The Auto King <span className="text-blue-600">USA</span>
              </p>
              <p className="text-[10px] text-gray-400 font-normal mt-0.5">
                Quality Parts Since 2005
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-[13.5px] font-medium px-3 py-1.5 rounded-md transition-all duration-150
                    ${active
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-5 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/used-engine"
              className="text-[13px] font-medium text-gray-600 px-3.5 py-1.5 rounded-md border border-gray-200
                hover:border-blue-400 hover:text-blue-600 transition-all duration-150"
            >
              Browse Parts
            </Link>

            <a
              href="tel:+18664865915"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-white
                bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-md transition-all duration-150"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Call Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block text-[14px] font-medium px-2 py-2.5 rounded-md border-b border-gray-50
                transition-colors duration-150
                ${pathname === item.href
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              {item.name}
            </Link>
          ))}

          <a
            href="tel:+18664865915"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600
              text-white text-[14px] font-semibold rounded-lg transition-colors hover:bg-blue-700"
          >
            <Phone size={15} />
            Call Now: +1 (866) 486-5915
          </a>
        </div>
      )}
    </nav>
  );
}
