import Image from 'next/image';
import { TRUCK_BRAND_GROUPS } from '../lib/commercial.constants';
import { CheckCircle, Package, Truck } from 'lucide-react';

export default function TruckBrandsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Commercial Truck Brands We Serve
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Quality-tested engines and transmissions for major commercial vehicle manufacturers
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {TRUCK_BRAND_GROUPS.map((group, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={group.id}
                className="bg-gray-50 rounded-3xl shadow-xl overflow-hidden"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative h-64 sm:h-80 lg:h-auto min-h-[400px] ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <Image
                      src={group.image}
                      alt={`${group.title} Commercial Trucks`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div
                    className={`p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 self-start">
                      <Truck className="w-3.5 h-3.5" />
                      {group.brands.join(' & ')}
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                      Used {group.title} Engines & Transmissions
                    </h3>

                    {/* Engines */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="w-5 h-5 text-red-600" />
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                          Used Engines
                        </h4>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {group.engineDescription}
                      </p>
                    </div>

                    {/* Transmissions */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="w-5 h-5 text-red-600" />
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                              Used Transmissions
                        </h4>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {group.transmissionDescription}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2.5">
                      {group.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 leading-relaxed">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}