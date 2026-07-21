import Image from 'next/image';
import { TRUCK_BRAND_GROUPS } from '../lib/commercial.constants';
import { CheckCircle, Package, Truck } from 'lucide-react';

export default function TruckBrandsSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
            Commercial Truck Brands We Serve
          </h2>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Quality-tested engines and transmissions for major commercial
            vehicle manufacturers
          </p>
        </div>

        {/* Brand Sections */}
        <div className="space-y-10 sm:space-y-14 lg:space-y-16">
          {TRUCK_BRAND_GROUPS.map((group, index) => {
            const isEven = index % 2 === 0;

            return (
              <article
                key={group.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg sm:rounded-3xl"
              >
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                  {/* Image */}
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden bg-gray-100 sm:aspect-[16/10] lg:aspect-[4/3] ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <Image
                      src={group.image}
                      alt={`${group.title} engines and transmissions`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                      priority={index === 0}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex flex-col justify-center bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-9 lg:py-10 xl:px-11 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {/* Brand Badge */}
                    <div className="mb-5 inline-flex self-start items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-red-600 sm:text-sm">
                      <Truck className="h-4 w-4 flex-shrink-0" />
                      {group.brands.join(' & ')}
                    </div>

                    {/* Brand Heading */}
                    <h3 className="mb-5 max-w-xl text-2xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-3xl lg:text-[34px]">
                      Used {group.title} Engines &amp; Transmissions
                    </h3>

                    {/* Engines */}
                    <div className="mb-6">
                      <div className="mb-3 flex items-center gap-2">
                        <Package className="h-5 w-5 flex-shrink-0 text-red-600" />

                        <h4 className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
                          Used Engines
                        </h4>
                      </div>

                      <p className="max-w-2xl text-[15px] leading-7 text-gray-600 sm:text-base">
                        {group.engineDescription}
                      </p>
                    </div>

                    {/* Transmissions */}
                    <div className="mb-7">
                      <div className="mb-3 flex items-center gap-2">
                        <Package className="h-5 w-5 flex-shrink-0 text-red-600" />

                        <h4 className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
                          Used Transmissions
                        </h4>
                      </div>

                      <p className="max-w-2xl text-[15px] leading-7 text-gray-600 sm:text-base">
                        {group.transmissionDescription}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-3">
                      {group.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

                          <span className="text-sm leading-6 text-gray-700 sm:text-[15px]">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}