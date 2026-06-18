import { Phone } from 'lucide-react';
import { PHONE_RAW, PHONE_DISPLAY } from '@/app/components/home.constants';

/**
 * FinalCTA
 * Dark section with 10% OFF offer and dual call buttons.
 */
export function FinalCTA() {
  return (
    <section className="py-20 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20
                        rounded-full px-3 py-1 text-xs text-green-400 font-medium mb-5 tracking-wide">
          🎉 Limited Time Offer
        </div>

        <h2 className="text-2xl md:text-3xl font-bold font-['Barlow',sans-serif] mb-3">
          Ready to Get Your Part?
        </h2>

        <p className="text-gray-300 text-sm mb-7 max-w-md mx-auto">
          Call now and get{' '}
          <strong className="text-yellow-400">10% OFF</strong>{' '}
          your first order. Speak with a specialist in under 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${PHONE_RAW}`}
            className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400
                       text-white font-semibold text-sm px-7 py-3 rounded-lg
                       transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-900/40"
          >
            <Phone size={16} />
            Call Now: {PHONE_DISPLAY}
          </a>

          <a
            href={`tel:${PHONE_RAW}`}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20
                       border border-white/20 text-white font-medium text-sm px-7 py-3
                       rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Get a Free Quote
          </a>
        </div>

        <p className="mt-5 text-xs text-gray-500">
          Mon – Sun · 8:30 AM – 4:30 PM PST · No hold music, no bots
        </p>

      </div>
    </section>
  );
}