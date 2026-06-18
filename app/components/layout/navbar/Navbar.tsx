'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

import { Logo }             from './Logo';
import { DesktopNav }       from './DesktopNav';
import { MobileNav }        from './MobileNav';
import { MobileMenuButton } from './MobileMenuButton';
import { BRANDING }         from '@/app/components/constants/branding';

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Shadow on scroll threshold trigger */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Prevent background scroll shifts while drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Close drawer on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`
          sticky top-0 z-50
          bg-black/95 backdrop-blur-md
          border-b border-white/[0.06]
          transition-all duration-300
          ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.6)] border-white/[0.09]' : 'shadow-none'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[100px] sm:h-[100px] lg:h-[112px]">

            {/* LEFT: Logo + Desktop Nav */}
            <div className="flex items-center gap-4 lg:gap-6 shrink-0 h-full">
              <Logo />
              <DesktopNav />
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">

              {/* MOBILE ONLY: Call chip */}
              <a
                href={BRANDING.phone.href}
                aria-label="Call us"
                className="
                  md:hidden
                  flex items-center gap-1.5
                  px-3 py-1.5
                  rounded-xl
                  bg-white/[0.06] hover:bg-white/[0.12]
                  border border-white/[0.08]
                  text-white/90 hover:text-white
                  text-[12px] font-bold
                  tracking-wide
                  transition-all duration-150
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" aria-hidden="true" />
                <Phone size={13} strokeWidth={2.5} aria-hidden="true" />
                <span>Call</span>
              </a>

              {/* TABLET / DESKTOP: Call Now button only */}
              <div className="hidden md:flex items-center">
                <a
                  href={BRANDING.phone.href}
                  className="
                    flex items-center gap-2
                    px-5 py-2.5 rounded-xl
                    bg-red-600 hover:bg-red-700 active:bg-red-800
                    text-white text-[13px] font-bold tracking-wide
                    whitespace-nowrap
                    transition-all duration-150
                    shadow-md shadow-red-950/10 hover:shadow-red-900/30
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" aria-hidden="true" />
                  <Phone size={14} strokeWidth={2.5} aria-hidden="true" />
                  <span className="hidden lg:inline">Call Now</span>
                  <span className="lg:hidden">{BRANDING.phone.display}</span>
                </a>
              </div>

              {/* Hamburger */}
              <MobileMenuButton
                isOpen={isOpen}
                onClick={() => setIsOpen((v) => !v)}
              />

            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <MobileNav onClose={() => setIsOpen(false)} />
        )}
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[4px] md:hidden"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}