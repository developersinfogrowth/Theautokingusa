'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

import { NAV_ITEMS, NavItem } from './nav.config';

export function DesktopNav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="hidden h-full items-center gap-0 md:flex lg:gap-0.5">
      {NAV_ITEMS.map((item: NavItem) => {
        const active =
          pathname === item.href ||
          item.children?.some((child) => pathname === child.href);

        const isOpen = openDropdown === item.name;

        if (item.children) {
          return (
            <div
              key={item.name}
              className="relative flex h-full items-center"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={`
                  relative flex items-center gap-1
                  whitespace-nowrap rounded-md
                  px-2 py-2
                  text-[13px] font-semibold
                  transition-all duration-150
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-red-500
                  ${
                    active || isOpen
                      ? 'text-red-500'
                      : 'text-white/75 hover:bg-white/[0.07] hover:text-white'
                  }
                `}
              >
                {item.name}

                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  className={`
                    transition-transform duration-200
                    ${isOpen ? 'rotate-180' : ''}
                  `}
                  aria-hidden="true"
                />

                {active && (
                  <span
                    aria-hidden="true"
                    className="
                      absolute bottom-0 left-1/2
                      h-[2px] w-5
                      -translate-x-1/2
                      rounded-full bg-red-500
                    "
                  />
                )}
              </Link>

              {isOpen && (
                <div
                  className="
                    absolute left-0 top-full z-50
                    mt-1 min-w-[230px]
                    animate-in rounded-xl
                    border border-white/[0.10]
                    bg-[#111] px-1 py-2
                    shadow-2xl shadow-black/80
                    fade-in slide-in-from-top-2
                    duration-150
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
                          rounded-lg px-3 py-2
                          text-[13px] font-medium
                          transition-colors duration-100
                          ${
                            childActive
                              ? 'bg-red-600/10 text-red-400'
                              : 'text-white/70 hover:bg-white/[0.07] hover:text-white'
                          }
                        `}
                      >
                        <span
                          className={`
                            h-1 w-1 shrink-0
                            rounded-full bg-red-500
                            transition-transform
                            ${childActive ? 'scale-100' : 'scale-0'}
                          `}
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
              relative flex min-h-[42px] items-center justify-center
              whitespace-nowrap rounded-md
              px-2 py-2
              text-center text-[13px] font-semibold
              leading-tight
              transition-all duration-150
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
              ${
                active
                  ? 'text-red-500'
                  : 'text-white/75 hover:bg-white/[0.07] hover:text-white'
              }
            `}
          >
            {item.name}

            {active && (
              <span
                aria-hidden="true"
                className="
                  absolute bottom-0 left-1/2
                  h-[2px] w-5
                  -translate-x-1/2
                  rounded-full bg-red-500
                "
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}