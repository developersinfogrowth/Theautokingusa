import { CALIFORNIA_STATS } from '../lib/transmission.constants';
import { MapPin, TrendingUp, Clock, Award } from 'lucide-react';

export default function CaliforniaBenefits() {
  const benefits = [
    {
      icon: MapPin,
      title: 'California Traffic Ready',
      description:
        'Tested for LA stop-and-go, Bay Area commutes, and I-5 highway demands. Our transmissions handle California\'s unique driving conditions.',
    },
    {
      icon: TrendingUp,
      title: 'Heat Tested',
      description:
        'Verified performance in Central Valley summers, desert heat, and mountain passes. Every unit ready for extreme temperature operation.',
    },
    {
      icon: Clock,
      title: 'Fast California Delivery',
      description:
        'Quick shipping to Los Angeles, San Francisco, San Diego, Sacramento, and all major California cities with tracking.',
    },
    {
      icon: Award,
      title: 'Emissions Compliant',
      description:
        'California emissions-ready transmissions that meet strict state requirements for all vehicle types and model years.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            California-Focused <span className="text-red-600">Transmission Solutions</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built for the demanding conditions California drivers face every day
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {CALIFORNIA_STATS.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 text-center border border-red-100"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-red-600 text-white rounded-xl mb-5">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
