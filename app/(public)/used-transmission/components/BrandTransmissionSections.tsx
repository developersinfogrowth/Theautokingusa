import Image from 'next/image';
import { BRAND_SECTIONS } from '../lib/transmission.constants';
import { CheckCircle, Shield, Award } from 'lucide-react';

export default function BrandTransmissionSections() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
        {BRAND_SECTIONS.map((brand, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={brand.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                
                {/* Image - Optimized for 1024x1536 portrait images */}
                <div className={`relative w-full ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Mobile and Tablet: Aspect ratio container */}
                  <div className="block lg:hidden relative w-full" style={{ paddingBottom: '150%' }}>
                    <Image
                      src={brand.image}
                      alt={`${brand.brand} Transmission`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  {/* Desktop: Full height with proper aspect ratio */}
                  <div className="hidden lg:block relative w-full h-full min-h-[600px]">
                    <Image
                      src={brand.image}
                      alt={`${brand.brand} Transmission`}
                      fill
                      sizes="50vw"
                      className="object-cover object-center"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 self-start">
                    <Award className="w-3.5 h-3.5" />
                    {brand.brand}
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                    {brand.title}
                  </h2>

                  <div className="space-y-5 mb-8">
                    <p className="text-sm sm:text-[15px] lg:text-base text-gray-600 leading-7">
                      {brand.intro}
                    </p>

                    <p className="text-sm sm:text-[15px] lg:text-base text-gray-600 leading-7">
                      {brand.mainContent}
                    </p>

                    {brand.whyTitle && (
                      <div className="pt-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                          {brand.whyTitle}
                        </h3>

                        <p className="text-sm sm:text-[15px] lg:text-base text-gray-600 leading-7">
                          {brand.whyContent}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Popular Models */}
                  <div className="mb-6">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Popular Models
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {brand.models.map((model, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2.5 mb-6">
                    {brand.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-xs font-semibold">
                      <Shield className="w-4 h-4" />
                      Warranty Available
                    </div>
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-xs font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Compatibility Verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}