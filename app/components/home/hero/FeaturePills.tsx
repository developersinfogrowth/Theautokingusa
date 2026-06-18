import { FEATURES } from './hero.constants';

/**
 * FeaturePills
 * Renders the 2×2 grid of feature highlight pills.
 * No client directive needed — purely presentational, no interactivity.
 */
export function FeaturePills() {
  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      {FEATURES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 bg-white/5 border border-white/10
                     rounded-lg px-3 py-2.5 text-sm text-gray-300"
        >
          <Icon className="h-4 w-4 text-red-500 shrink-0" />
          {label}
        </div>
      ))}
    </div>
  );
}