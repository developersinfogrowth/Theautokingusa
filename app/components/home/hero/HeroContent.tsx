'use client';

import { Phone, Shield } from 'lucide-react';
import { FeaturePills }  from './FeaturePills';
import { PHONE, PHONE_RAW } from './hero.constants';

/**
 * HeroContent
 * Left column of the Hero grid:
 *   - Quality Guaranteed badge
 *   - Main heading + grade tag
 *   - 10% OFF description
 *   - CTA button + phone number
 *   - Feature pills
 */
export function HeroContent() {
  const handleCall = () => {
    window.location.href = `tel:${PHONE_RAW}`;
  };

  return (
    <div className="space-y-8">

   

      {/* ── Headline ── */}
      <div className="space-y-3">
        <h1
         className="font-black tracking-tight leading-[1.06]"
style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
        >
          Quality Used Engine
          <br />& Transmission
          <span className="block text-gray-400 font-light text-3xl md:text-4xl mt-1">
            "A" Grade Condition
          </span>
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed">
          Secure your purchase with a&nbsp;
          <span className="font-bold text-yellow-400">10% OFF</span>
          &nbsp;on your order today!
        </p>
      </div>

      {/* ── CTA Row ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <button
          onClick={handleCall}
          className="flex items-center gap-3 bg-red-600 hover:bg-red-700 active:scale-95
                     text-white font-bold text-base px-7 py-4 rounded-xl
                     shadow-xl shadow-red-900/50 transition-all duration-150 group"
        >
          <Phone className="h-5 w-5 group-hover:animate-pulse" />
          Click Here to Talk
        </button>

        <div>
          <p className="text-2xl font-bold tracking-widest text-white">{PHONE}</p>
          <p className="text-sm text-gray-500 mt-0.5">24 / 7 Customer Support</p>
        </div>
      </div>

      {/* ── Feature Pills ── */}
      <FeaturePills />

    </div>
  );
}