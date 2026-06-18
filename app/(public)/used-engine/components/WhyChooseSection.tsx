"use client"

import { Shield, Gauge, Truck, Award, CheckCircle, Settings, ShieldCheck } from "lucide-react"

export default function WhyChooseSection() {
  const stats = [
    {
      icon: <Settings className="w-6 h-6" />,
      value: "500+",
      label: "Engines in Stock",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      value: "98%",
      label: "Success Rate",
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "1-Year",
      label: "Warranty",
    },
  ]

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Tested",
      description: "Every engine is tested and inspected for reliable performance.",
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Low Mileage",
      description: "Carefully selected engines with low miles for longer life.",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Quick nationwide & local delivery to get you back on the road.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Warranty Included",
      description: "Up to 1-year warranty on eligible engines for extra peace of mind.",
    },
  ]

  const benefits = [
    "Lower cost than new engines",
    "Reliable performance with proper testing",
    "OEM quality from trusted brands",
    "Available for many makes and models",
    "Eco-friendly option that recycles and reduces waste",
  ]

  return (
    <div className="w-full">
      {/* Stats Section */}
      <section className="bg-gray-100 py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#b91c1c] flex items-center justify-center text-white">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why California Drivers Section */}
      <section className="bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why <span className="text-[#b91c1c]">California</span> Drivers Choose Used Engines
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We provide high-quality, low-mileage used engines that deliver reliable performance
              at the best value. Every engine is carefully selected and tested to ensure
              long-lasting results you can depend on.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#b91c1c] text-white rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
            Benefits of Buying Used Engines:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#b91c1c] flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <span className="text-sm md:text-base text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}