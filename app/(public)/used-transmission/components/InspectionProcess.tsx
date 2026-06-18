import { INSPECTION_STEPS } from '../lib/transmission.constants';
import { Check } from 'lucide-react';

export default function InspectionProcess() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Transmission Inspection Process
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            What Every Unit Goes Through Before Shipping
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INSPECTION_STEPS.map((step, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 hover:border-red-300 transition-all duration-300 group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl sm:text-2xl font-bold">{step.step}</span>
              </div>

              {/* Check Icon */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Check className="w-5 h-5" />
              </div>

              <div className="mt-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}