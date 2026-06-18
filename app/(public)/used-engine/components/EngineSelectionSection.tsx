import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function EngineSelectionSection() {
  const engineTypes = [
    {
      title: "Toyota Engines from Japan",
      image: "/images/toyota-engines-from-japan.jpg",
      models: ["Camry", "Corolla", "Tacoma", "Tundra", "Prius", "RAV4"],
      features: ["JDM Quality", "Low Mileage", "OEM Fit"]
    },
    {
      title: "Domestic Engines",
      image: "/images/domestic-engines.jpg",
      models: ["Ford", "Chevrolet", "Dodge", "GMC", "Jeep", "Chrysler"],
      features: ["Factory Specs", "Tested", "Warranty"]
    },
    {
      title: "Import Engines",
      image: "/images/import-engines .jpg",
      models: ["Honda", "Nissan", "Mazda", "Subaru", "Hyundai", "Kia"],
      features: ["Inspected", "Verified", "Guaranteed"]
    }
  ];

  return (
    <>
      {/* Engine Types Section */}
   <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto">
  {/* SECTION TITLE */}
  <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10 sm:mb-12 lg:mb-14">
    
    {/* LEFT RED LINE */}
    <div className="hidden sm:block h-[2px] w-12 lg:w-16 bg-red-600 rounded-full" />

    {/* TITLE */}
    <h2 className="relative text-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-none">
      Our Engine Selection
    </h2>

    {/* RIGHT RED LINE */}
    <div className="hidden sm:block h-[2px] w-12 lg:w-16 bg-red-600 rounded-full" />
  </div>
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {engineTypes.map((type, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Image Container - Fixed aspect ratio */}
                <div className="relative w-full aspect-square bg-gray-200">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    {type.title}
                  </h3>
                  <div className="mb-4">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">Popular Models:</p>
                    <div className="flex flex-wrap gap-2">
                      {type.models.map((model, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toyota Engines Highlight */}
      <section className="relative overflow-hidden bg-[#050505] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
  {/* Background Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_40%)]" />

  <div className="relative max-w-7xl mx-auto">
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0b] shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        
        {/* LEFT CONTENT */}
        <div className="order-2 lg:order-1 p-7 sm:p-10 lg:p-12 xl:p-14">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 mb-5">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />

            <span className="text-xs font-semibold tracking-wide text-red-400 uppercase">
              Premium JDM Engines
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.1] text-white">
  Premium Used Toyota <span className="text-red-500">Engines from Japan</span>
  <br />
  Available in California
</h2>

          {/* Description */}
          <p className="mt-6 text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl">
            Our JDM Toyota engines are imported directly from Japan,
            offering excellent reliability, low mileage, and strong
            long-term performance. Perfect for replacements, rebuilds,
            and daily-driving vehicles across California.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-4">
            {[
              'Reliable long-term performance',
              'Clean internal condition from regulated maintenance markets',
              'Strong availability for older and newer models',
              'Cost-effective replacement options',
            ].map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                {/* Icon */}
                <div className="mt-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-red-600 shadow-lg flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>

                {/* Text */}
                <span className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Highlight Box */}
          <div className="mt-8 max-w-lg rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-[#1a1a1a] to-[#121212] p-5">
            <h4 className="text-sm sm:text-base font-bold text-yellow-400 mb-2">
              Important Compatibility Check
            </h4>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Always verify compatibility with your VIN, emissions
              requirements, transmission type, and model year before
              installation.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative order-1 lg:order-2 min-h-[320px] sm:min-h-[420px] lg:min-h-[100%]">
          <Image
            src="/images/toyota-engine-japan.jpg"
            alt="Toyota Engine from Japan"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/30" />

          {/* Floating Badge */}
          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md px-5 py-4 shadow-2xl">
            <p className="text-sm font-semibold text-white">
              Low Mileage Engines
            </p>

            <p className="text-xs text-gray-300 mt-1">
              Imported & Professionally Tested
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}