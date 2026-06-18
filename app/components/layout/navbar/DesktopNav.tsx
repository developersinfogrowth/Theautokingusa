'use client';

import { useState } from 'react';
import Link         from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

import { NAV_ITEMS, NavItem } from './nav.config';

export function DesktopNav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="hidden md:flex items-center gap-0.5 lg:gap-1 h-full">
      {NAV_ITEMS.map((item: NavItem) => {
        const active = pathname === item.href || item.children?.some(c => pathname === c.href);
        const isOpen = openDropdown === item.name;

        if (item.children) {
          return (
            <div 
              key={item.name} 
              className="relative flex items-center h-full"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {/* CHANGED: Converted from a button to an active, clickable Link component */}
              <Link
                href={item.href}
                className={`
                  relative flex items-center gap-1
                  px-2.5 lg:px-3.5 py-2
                  text-[13px] lg:text-[14px] font-semibold
                  rounded-md whitespace-nowrap
                  transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                  ${active || isOpen ? 'text-red-500' : 'text-white/75 hover:text-white hover:bg-white/[0.07]'}
                `}
              >
                {item.name}
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 w-5 h-[2px] rounded-full bg-red-500"
                  />
                )}
              </Link>

              {/* Dropdown panel */}
              {isOpen && (
                <div
                  className="
                    absolute top-full left-0 mt-1
                    min-w-[230px]
                    bg-[#111] border border-white/[0.10]
                    rounded-xl shadow-2xl shadow-black/80
                    py-2 px-1
                    z-50
                    animate-in fade-in slide-in-from-top-2 duration-150
                  "
                >
                  {item.children.map((child) => {
                    const childActive = pathname === child.href;
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`
                          flex items-center gap-2
                          px-3 py-2 rounded-lg
                          text-[13px] font-medium
                          transition-colors duration-100
                          ${childActive
                            ? 'text-red-400 bg-red-600/10'
                            : 'text-white/70 hover:text-white hover:bg-white/[0.07]'
                          }
                        `}
                      >
                        <span 
                          className={`w-1 h-1 rounded-full bg-red-500 shrink-0 transition-transform ${
                            childActive ? 'scale-100' : 'scale-0'
                          }`} 
                          aria-hidden="true" 
                        />
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              relative
              px-2.5 lg:px-3.5 py-2
              text-[13px] lg:text-[14px] font-semibold
              rounded-md whitespace-nowrap
              transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
              ${active ? 'text-red-500' : 'text-white/75 hover:text-white hover:bg-white/[0.07]'}
            `}
          >
            {item.name}
            {active && (
              <span
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-5 h-[2px] rounded-full bg-red-500"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}