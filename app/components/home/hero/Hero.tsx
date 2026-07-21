'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, Phone } from 'lucide-react';

import { BRANDING } from '@/app/components/constants/branding';
import QuoteForm from './QuoteForm';

const TRUST_STATS = [
  {
    value: '6+',
    label: 'Years Experience',
  },
  {
    value: '10K+',
    label: 'Parts Sold',
  },
  {
    value: '4.9★',
    label: 'Customer Rating',
  },
];

interface HeroProps {
  heading?: React.ReactNode;
}

export default function Hero({ heading }: HeroProps) {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = formOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [formOpen]);

  const scrollToQuoteForm = () => {
    document
      .getElementById('hero-quote-form')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
  };

  return (
    <>
      <section
        className="
          relative isolate flex items-start overflow-hidden
          bg-[#0a0a0a]
          lg:min-h-screen lg:max-h-screen lg:items-center
        "
      >
        {/* Background — desktop only */}
        <div
          className="
            absolute inset-0 hidden bg-cover bg-center bg-no-repeat
            will-change-transform
            lg:block
          "
          style={{
            backgroundImage: "url('/branding/hero-bg.jpg')",
          }}
          aria-hidden="true"
        />

        {/* Dark overlay — desktop only */}
        <div
          className="absolute inset-0 hidden bg-black/40 lg:block"
          aria-hidden="true"
        />

        {/* Content */}
        <div
          className="
            relative z-10 mx-auto w-full max-w-7xl
            px-5 pb-8 pt-6
            sm:px-6 sm:pb-10 sm:pt-10
            lg:px-12 lg:pb-0 lg:pt-0
          "
        >
          <div
            className="
              grid grid-cols-1 items-start gap-4
              lg:grid-cols-[1fr_400px] lg:items-center lg:gap-14
            "
          >
            {/* Shared left content */}
            <div
              className="
                order-1 flex flex-col
                lg:col-start-1 lg:row-start-1 lg:space-y-6
              "
            >
              {/* Only homepage H1 */}
              <h1
                className="
                  font-black leading-[1.08] tracking-tight text-white
                  lg:text-[clamp(1.4rem,3.8vw,3rem)]
                "
                style={{
                  fontSize: 'clamp(1.45rem, 5.5vw, 2.2rem)',
                }}
              >
                {heading ?? (
                  <>
                    <span className="lg:hidden">
                      Premium Quality Reliable Used{' '}
                      <span className="italic text-red-500">
                        Engines
                      </span>

                      <span className="font-light text-white/75">
                        {' '}
                        &amp;{' '}
                      </span>

                      Transmissions
                    </span>

                    <span className="hidden lg:inline">
                      Premium Quality
                      <br />

                      Reliable Used
                      <br />

                      <span className="italic text-red-500">
                        Engines
                      </span>

                      <span className="font-light text-white/75">
                        {' '}
                        &amp;{' '}
                      </span>

                      Transmissions
                    </span>
                  </>
                )}
              </h1>

              {/* Shared description */}
              <p
                className="
                  mt-4 text-[14px] font-medium leading-relaxed text-white/80
                  lg:mt-0 lg:max-w-[520px] lg:text-[17px]
                "
              >
                All parts are test-driven before delivery and come with a{' '}
                <span className="font-bold text-white">
                  1-month warranty
                </span>
                . Get an extra{' '}
                <span className="font-extrabold text-yellow-400">
                  10% OFF
                </span>{' '}
                on your first order.
              </p>

              {/* Mobile stats */}
              <div className="mt-4 block lg:hidden">
                <div className="flex flex-wrap items-center gap-4">
                  {TRUST_STATS.map(({ value, label }, index) => (
                    <div
                      key={label}
                      className="flex items-center gap-4"
                    >
                      <div className="text-center">
                        <p className="text-[1.3rem] font-black leading-none text-white">
                          {value}
                        </p>

                        <p className="mt-1 whitespace-nowrap text-[12px] font-medium text-white/80">
                          {label}
                        </p>
                      </div>

                      {index < TRUST_STATS.length - 1 && (
                        <div
                          className="h-8 w-px bg-white/25"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop CTAs */}
              <div className="hidden flex-row items-center gap-3 pt-1 lg:flex">
                <button
                  type="button"
                  onClick={scrollToQuoteForm}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl bg-red-600 px-7 py-3.5
                    text-[14px] font-bold uppercase tracking-wide text-white
                    shadow-xl shadow-red-900/40
                    transition-all duration-200
                    hover:bg-red-700
                    active:scale-[0.97]
                  "
                >
                  Get Free Quote

                  <ChevronRight
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </button>

                <a
                  href={BRANDING.phone.href}
                  aria-label={`Call Auto King USA at ${BRANDING.phone.display}`}
                  className="
                    inline-flex items-center justify-center gap-2.5
                    rounded-xl border-2 border-white/25
                    px-6 py-3.5
                    text-[14px] font-semibold text-white
                    backdrop-blur-sm
                    transition-all duration-200
                    hover:border-white/50 hover:bg-white/10
                    active:scale-[0.97]
                  "
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-red-400"
                    aria-hidden="true"
                  />

                  {BRANDING.phone.display}
                </a>
              </div>

              {/* Desktop business hours */}
              <p className="hidden text-[13px] font-medium text-white/60 lg:block">
                Mon – Sun · 8:30 AM – 4:30 PM PST
              </p>
            </div>

            {/* Quote form */}
            <div
              id="hero-quote-form"
              className="
                order-2
                lg:col-start-2 lg:row-start-1 lg:sticky lg:top-8
              "
            >
              <div
                className="
                  flex w-full flex-col overflow-hidden
                  rounded-2xl border border-white/10
                  bg-black/80
                  shadow-2xl shadow-black/60
                  backdrop-blur-xl
                  lg:bg-black/60
                "
                style={{
                  height: 'min(600px, 80vh)',
                }}
              >
                <QuoteForm onClose={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile bottom sheet */}
      {formOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col justify-end lg:hidden">
          <button
            type="button"
            aria-label="Close quote form"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setFormOpen(false)}
          />

          <div
            className="
              relative flex flex-col overflow-hidden
              rounded-t-3xl border-t border-white/10
              bg-[#111111] shadow-2xl
            "
            style={{
              height: '88svh',
              animation:
                'sheetUp 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards',
            }}
          >
            <div className="flex shrink-0 justify-center pb-1 pt-3">
              <div
                className="h-1 w-10 rounded-full bg-white/15"
                aria-hidden="true"
              />
            </div>

            <QuoteForm onClose={() => setFormOpen(false)} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes sheetUp {
          from {
            transform: translateY(100%);
            opacity: 0.8;
          }

          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}