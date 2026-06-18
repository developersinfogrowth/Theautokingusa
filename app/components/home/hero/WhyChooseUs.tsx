"use client";

import { Phone, Shield, Users, Truck, CheckCircle } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "TESTED & INSPECTED",
    description: "Every engine is rigorously tested for performance and reliability.",
  },
  {
    icon: Shield,
    title: "WARRANTY INCLUDED",
    description: "All parts come with a standard 6-month warranty.",
  },
  {
    icon: Users,
    title: "REAL PEOPLE, REAL HELP",
    description: "Mon – Sun · 8:30 AM – 4:30 PM PST",
  },
  {
    icon: Truck,
    title: "FAST & RELIABLE SHIPPING",
    description: "Most orders ship within 1-2 business days anywhere in the USA.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-[#1a1a1a] overflow-hidden">
      {/* Dark textured background overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10">
        {/* Features Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-xs font-bold tracking-wider uppercase mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Strip with diagonal design */}
        <div className="relative">
          {/* Diagonal background */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#e8e4df] via-[#d4cfc8] to-[#c5bfb8]"
              style={{
                clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
              }}
            />
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 pt-16 pb-6 md:pt-12 md:pb-8">
              {/* Car Image */}
              <div className="hidden md:block flex-shrink-0 w-48 lg:w-64">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKWJ2FIy6a9vxqb3KbvIrxrAIWuUT0.png"
                  alt="Classic muscle car"
                  className="w-full h-auto object-contain opacity-0"
                />
                {/* Using a placeholder since we can't extract the car */}
                <div className="absolute bottom-4 left-4 lg:left-8 w-40 lg:w-56">
                  <svg viewBox="0 0 200 80" className="w-full h-auto">
                    <defs>
                      <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2d2d2d" />
                        <stop offset="100%" stopColor="#1a1a1a" />
                      </linearGradient>
                    </defs>
                    {/* Simplified classic car silhouette */}
                    <path
                      d="M10 50 L25 50 L30 35 L50 30 L70 25 L120 25 L150 30 L170 35 L180 50 L190 50 L190 55 L180 55 L175 60 L160 60 L155 55 L55 55 L50 60 L35 60 L30 55 L10 55 Z"
                      fill="url(#carGradient)"
                    />
                    {/* Windows */}
                    <path
                      d="M55 32 L70 28 L115 28 L130 32 L125 42 L60 42 Z"
                      fill="#4a5568"
                      opacity="0.6"
                    />
                    {/* Wheels */}
                    <circle cx="45" cy="55" r="12" fill="#1a1a1a" />
                    <circle cx="45" cy="55" r="8" fill="#374151" />
                    <circle cx="45" cy="55" r="4" fill="#1a1a1a" />
                    <circle cx="165" cy="55" r="12" fill="#1a1a1a" />
                    <circle cx="165" cy="55" r="8" fill="#374151" />
                    <circle cx="165" cy="55" r="4" fill="#1a1a1a" />
                    {/* Headlights */}
                    <circle cx="178" cy="42" r="3" fill="#fbbf24" opacity="0.8" />
                    <rect x="12" y="42" width="8" height="4" rx="1" fill="#ef4444" opacity="0.8" />
                  </svg>
                </div>
              </div>

              {/* CTA Content */}
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-lg px-5 py-4 shadow-lg w-full md:w-auto md:ml-auto">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm">
                  <p className="text-gray-700 font-medium">
                    Have a question before you order?
                  </p>
                  <p className="text-gray-600">
                    Call us:{" "}
                    <a
                      href="tel:8664856915"
                      className="text-red-600 font-bold hover:underline"
                    >
                      (866) 485-6915
                    </a>
                    {" "}— specialists ready to help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;