'use client';

import { useEffect, useState } from 'react';
import { Phone, ChevronRight } from 'lucide-react';
import QuoteForm from './QuoteForm';

const PHONE     = '+1 (866) 486-5915';
const PHONE_RAW = '+18664865915';

const TRUST_STATS = [
  { value: '6+',   label: 'Years Experience' },
  { value: '10K+', label: 'Parts Sold'       },
  { value: '4.9★', label: 'Customer Rating'  },
];

interface HeroProps {
  heading?: React.ReactNode;
}

export default function Hero({ heading }: HeroProps) {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = formOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [formOpen]);

  return (
    <>
      

      <section
  className="relative flex items-start lg:items-center overflow-hidden isolate
             bg-[#0a0a0a] lg:min-h-screen lg:max-h-screen"
>
  {/* Background — desktop only */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat
               will-change-transform hidden lg:block"
    style={{ backgroundImage: "url('/branding/hero-bg.jpg')" }}
  />

  {/* Dark overlay — desktop only */}
  <div className="absolute inset-0 bg-black/40 hidden lg:block" />

  {/* Content grid */}
  <div
    className="relative z-10 w-full max-w-7xl mx-auto
               px-5 sm:px-6 lg:px-12
               pt-6 pb-8 sm:pt-10 sm:pb-10 lg:pt-0 lg:pb-0"
  >
    <div
      className="grid grid-cols-1 lg:grid-cols-[1fr_400px]
                 gap-4 lg:gap-14 items-start lg:items-center"
    >

      {/* MOBILE H1 */}
      <div className="block lg:hidden order-1">
        <h1
          className="text-white font-black tracking-tight leading-[1.08]"
          style={{ fontSize: 'clamp(1.45rem, 5.5vw, 2.2rem)' }}
        >
          {heading ?? (
            <>
              Premium Quality Reliable Used{' '}
              <span className="text-red-500 italic">Engines</span>
              <span className="text-white/75 font-light"> &amp; </span>
              Transmissions
            </>
          )}
        </h1>
      </div>

      {/* MOBILE SUBTEXT */}
      <div className="block lg:hidden order-2">
        <p className="text-white/80 text-[14px] leading-relaxed font-medium">
          All parts are test-driven before delivery and come with a{' '}
          <span className="text-white font-bold">1-month warranty</span>.
          Get an extra{' '}
          <span className="text-yellow-400 font-extrabold">10% OFF</span>{' '}
          on your first order.
        </p>
      </div>

      {/* MOBILE STATS */}
      <div className="block lg:hidden order-3">
        <div className="flex flex-wrap items-center gap-4">
          {TRUST_STATS.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-[1.3rem] font-black text-white leading-none">
                  {value}
                </p>
                <p className="text-[12px] text-white/80 mt-1 font-medium whitespace-nowrap">
                  {label}
                </p>
              </div>
              {i < TRUST_STATS.length - 1 && (
                <div className="w-px h-8 bg-white/25" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div
        id="hero-quote-form"
        className="order-4 lg:order-2 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-8"
      >
        <div
          className="w-full rounded-2xl border border-white/10
                     bg-black/80 lg:bg-black/60 backdrop-blur-xl
                     shadow-2xl shadow-black/60 flex flex-col overflow-hidden"
          style={{ height: 'min(600px, 80vh)' }}
        >
          <QuoteForm onClose={() => {}} />
        </div>
      </div>

      {/* DESKTOP LEFT */}
      <div
        className="hidden lg:flex lg:flex-col lg:space-y-6
                   lg:order-1 lg:col-start-1 lg:row-start-1"
      >

        <h1
          className="text-white font-black tracking-tight leading-[1.08]"
          style={{ fontSize: 'clamp(1.4rem, 3.8vw, 3rem)' }}
        >
          {heading ?? (
            <>
              Premium Quality<br />
              Reliable Used<br />
              <span className="text-red-500 italic">Engines</span>
              <span className="text-white/75 font-light"> &amp; </span>
              Transmissions
            </>
          )}
        </h1>

        <p className="text-white/80 text-[17px] leading-relaxed max-w-[520px] font-medium">
          All parts are test-driven before delivery and come with a{' '}
          <span className="text-white font-bold">1-month warranty</span>.
          Get an extra{' '}
          <span className="text-yellow-400 font-extrabold">10% OFF</span>{' '}
          on your first order.
        </p>

        {/* CTAs */}
        <div className="flex flex-row items-center gap-3 pt-1">

          <button
            onClick={() =>
              document.getElementById('hero-quote-form')
                ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }
            className="inline-flex items-center justify-center gap-2
                       bg-red-600 hover:bg-red-700 active:scale-[0.97]
                       text-white font-bold text-[14px] tracking-wide uppercase
                       px-7 py-3.5 rounded-xl shadow-xl shadow-red-900/40
                       transition-all duration-200"
          >
            Get Free Quote <ChevronRight className="w-4 h-4" />
          </button>

          {/* ✅ FIXED A TAG */}
          <a
            href={`tel:${PHONE_RAW}`}
            className="inline-flex items-center justify-center gap-2.5
                       border-2 border-white/25 hover:border-white/50
                       hover:bg-white/10 active:scale-[0.97]
                       backdrop-blur-sm text-white font-semibold text-[14px]
                       px-6 py-3.5 rounded-xl transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-red-400 shrink-0" />
            {PHONE}
          </a>

        </div>

        <p className="text-white/60 text-[13px] font-medium">
          Mon – Sun · 8:30 AM – 4:30 PM PST
        </p>
      </div>

    </div>
  </div>
</section>

      {/* MOBILE BOTTOM SHEET */}
      {formOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setFormOpen(false)}
          />
          <div
            className="relative bg-[#111111] border-t border-white/10
                        rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              height: '88svh',
              animation: 'sheetUp 0.3s cubic-bezier(0.32,0.72,0,1) forwards',
            }}
          >
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/15" />
            </div>
            <QuoteForm onClose={() => setFormOpen(false)} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes sheetUp {
          from { transform: translateY(100%); opacity: 0.8; }
          to   { transform: translateY(0);    opacity: 1;   }
        }
      `}</style>
    </>
  );
}