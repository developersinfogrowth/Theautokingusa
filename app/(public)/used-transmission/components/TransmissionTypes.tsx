import { TRANSMISSION_TYPES } from '../lib/transmission.constants';
import { Settings, Gauge, Zap, Cog, Truck } from 'lucide-react';

const typeIcons = [Settings, Gauge, Zap, Cog, Truck];

export default function TransmissionTypes() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Transmission Types Available
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive inventory covering all transmission configurations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TRANSMISSION_TYPES.map((type, index) => {
            const Icon = typeIcons[index];
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-200"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl mb-5">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {type.type}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  {type.description}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  {type.compatibility}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}