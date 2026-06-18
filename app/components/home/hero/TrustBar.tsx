import { TRUST_ITEMS } from '@/app/components/home.constants';


/**
 * TrustBar
 * Dark strip below the Hero listing trust signals.
 * No interactivity — no 'use client' needed.
 */
export function TrustBar() {
  return (
    <section className="bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center md:justify-between items-center py-3 gap-4">
          {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex items-center gap-2 text-gray-300">
              <Icon className="h-4 w-4 text-red-500" />
              <span className="text-xs font-medium tracking-wide">{label}</span>
              {i < TRUST_ITEMS.length - 1 && (
                <span className="hidden md:block w-px h-4 bg-gray-700 ml-2" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}