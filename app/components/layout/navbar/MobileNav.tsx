'use client';

import { useState }    from 'react';
import Link            from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, ChevronDown } from 'lucide-react';

import { NAV_ITEMS }  from './nav.config';
import { BRANDING }   from '@/app/components/constants/branding';

interface MobileNavProps { onClose: () => void; }

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      className="md:hidden relative z-50 border-t border-white/[0.08] bg-[#0c0c0c] px-4 pb-6 pt-3 max-h-[calc(100vh-60px)] overflow-y-auto"
    >
      <nav aria-label="Mobile navigation">
        <ul className="space-y-1" role="list">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || item.children?.some(c => pathname === c.href);
            const isOpen = openAccordion === item.name;

            if (item.children) {
              return (
                <li key={item.name} role="listitem" className="block">
                  {/* CHANGED: Split container to allow both text link click AND separate accordion expansion */}
                  <div className={`
                    flex items-center justify-between
                    w-full rounded-xl border transition-all
                    ${active
                      ? 'text-white bg-red-600/15 border-red-600/30'
                      : 'text-white/80 border-transparent bg-white/[0.02]'
                    }
                  `}>
                    {/* Left: Clickable Text Link */}
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex-1 px-4 py-3 text-[14px] font-semibold tracking-wide focus-visible:outline-none"
                    >
                      {item.name}
                    </Link>

                    {/* Right: Isolated Toggle Button Trigger */}
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : item.name)}
                      aria-label={`Toggle ${item.name} options`}
                      aria-expanded={isOpen}
                      className="px-4 py-3 text-white/40 hover:text-white border-l border-white/[0.05] self-stretch flex items-center justify-center focus-visible:outline-none"
                    >
                      <ChevronDown
                        size={16}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-red-500' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Accordion subpages */}
                  {isOpen && (
                    <ul className="mt-1 ml-4 border-l-2 border-white/[0.08] pl-3 space-y-1 animate-in fade-in slide-in-from-top-1 duration-100">
                      {item.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className={`
                                flex items-center gap-2
                                px-4 py-3 rounded-lg
                                text-[13px] font-medium
                                transition-all duration-100
                                ${childActive
                                  ? 'text-red-400 bg-red-600/10 border border-red-600/20'
                                  : 'text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent'
                                }
                              `}
                            >
                              {childActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" aria-hidden="true" />
                              )}
                              {child.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.name} role="listitem">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center justify-between
                    w-full px-4 py-3 rounded-xl
                    text-[14px] font-semibold tracking-wide
                    transition-all duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                    ${active
                      ? 'text-white bg-red-600/15 border border-red-600/30'
                      : 'text-white/80 hover:text-white hover:bg-white/[0.05] border border-transparent'
                    }
                  `}
                >
                  <span>{item.name}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="my-4 border-t border-white/[0.08]" aria-hidden="true" />
      
      <a
        href={BRANDING.phone.href}
        onClick={onClose}
        className="
          flex items-center justify-center gap-2.5
          w-full py-3.5 rounded-xl
          bg-red-600 hover:bg-red-700 active:bg-red-800
          text-white text-[14px] font-bold tracking-wide
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
          shadow-lg shadow-red-950/20
        "
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" aria-hidden="true" />
        <Phone size={16} strokeWidth={2.5} aria-hidden="true" />
        <span>Call Us: {BRANDING.phone.display}</span>
      </a>

      <p className="mt-3.5 text-center text-[11px] text-white/40 font-medium tracking-wide">
        Mon – Sun  ·  8:30 AM – 4:30 PM PST
      </p>
    </div>
  );
}