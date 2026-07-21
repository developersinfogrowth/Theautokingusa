import { WHY_CHOOSE_FEATURES } from '../lib/commercial.constants';
import { CheckCircle } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
       <div className="text-center mb-10 sm:mb-14">
  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
    Why Choose{" "}
    <span className="text-red-500">The AutoKing USA</span>?
  </h2>

  <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
    Trusted nationwide for tested used engines, quality transmissions, dependable warranties, and fast delivery
  </p>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {WHY_CHOOSE_FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}