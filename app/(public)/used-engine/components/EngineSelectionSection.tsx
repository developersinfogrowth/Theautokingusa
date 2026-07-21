import { CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface EngineType {
  title: string
  label: string
  description: string
  image: string
  models: string[]
  features: string[]
}

const engineTypes: EngineType[] = [
  {
    title: 'Toyota Engines from Japan',
    label: 'Premium JDM Selection',
    description:
      'Low-mileage Toyota engines imported from Japan and selected for dependable performance and compatibility.',
    image: '/images/Toyota-japan-engine.webp',
    models: ['Camry', 'Corolla', 'Tacoma', 'Tundra', 'Prius', 'RAV4'],
    features: ['JDM Quality', 'Low Mileage', 'OEM Fit'],
  },
  {
    title: 'Domestic Engines',
    label: 'American Vehicles',
    description:
      'Reliable replacement engines for popular American cars, SUVs, pickup trucks, and commercial vehicles.',
    image: '/images/Domestic-engines.webp',
    models: ['Ford', 'Chevrolet', 'Dodge', 'GMC', 'Jeep', 'Chrysler'],
    features: ['Factory Specs', 'Tested', 'Warranty'],
  },
  {
    title: 'Import Engines',
    label: 'Popular Import Brands',
    description:
      'Professionally inspected replacement engines for leading Japanese and Korean vehicle manufacturers.',
    image: '/images/imported-engines.webp',
    models: ['Honda', 'Nissan', 'Mazda', 'Subaru', 'Hyundai', 'Kia'],
    features: ['Inspected', 'Verified', 'Guaranteed'],
  },
]

export default function EngineSelectionSection() {
  return (
    <>
      {/* Engine Types Section — Updated */}
      <section className="relative overflow-hidden bg-black px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Subtle background treatment */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-red-600/[0.07] blur-[130px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_42%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              <div className="hidden h-px w-12 bg-gradient-to-r from-transparent to-red-600 sm:block lg:w-16" />

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[42px]">
                Our Engine Selection
              </h2>

              <div className="hidden h-px w-12 bg-gradient-to-l from-transparent to-red-600 sm:block lg:w-16" />
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
              Explore Japanese, domestic and imported replacement engines
              selected for quality, compatibility and dependable performance.
            </p>
          </div>

          {/* Engine Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {engineTypes.map((type, index) => (
              <article
                key={type.title}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d] shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-[0_24px_65px_rgba(0,0,0,0.55)]"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Light image overlay only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

                  {/* Category Label */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex rounded-full border border-red-500/30 bg-black/75 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.13em] text-red-400 backdrop-blur-md">
                      {type.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                    {type.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {type.description}
                  </p>

                  {/* Popular Models */}
                  <div className="mt-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Popular Models
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {type.models.slice(0, 5).map((model) => (
                        <span
                          key={model}
                          className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
                        >
                          {model}
                        </span>
                      ))}

                      {type.models.length > 5 && (
                        <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">
                          +{type.models.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6 grid grid-cols-1 gap-2.5 border-t border-white/10 pt-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {type.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-red-500"
                        />

                        <span className="text-xs font-medium text-zinc-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Toyota Engines Highlight — Unchanged */}
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
                  Premium Used Toyota{' '}
                  <span className="text-red-500">
                    Engines from Japan
                  </span>
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
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-red-600 shadow-lg flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>

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

                {/* Floating Badge */}
                <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md px-5 py-4 shadow-2xl">
                  <p className="text-sm font-semibold text-white">
                    Low Mileage Engines
                  </p>

                  <p className="text-xs text-gray-300 mt-1">
                    Imported &amp; Professionally Tested
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}