"use client";

import { Shield, Truck, ThumbsUp, Headphones, ClipboardCheck, Briefcase, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function HowToChooseSection() {
  const cities = [
    "Los Angeles", "San Diego", "San Jose", "San Francisco", 
    "Sacramento", "Fresno", "Long Beach", "Oakland", "Riverside"
  ];

  const features = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Check Vehicle Details",
      description: "Know your vehicle's make, model, year & engine size."
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "Get Expert Advice",
      description: "Talk to our specialists for the best engine match."
    },
    {
      icon: <ClipboardCheck className="w-5 h-5" />,
      title: "Compare Condition",
      description: "We test and verify quality before delivery."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Warranty Coverage",
      description: "Choose engines with warranty for peace of mind."
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Shipping & Delivery",
      description: "Fast & safe delivery anywhere in California."
    },
    {
      icon: <ThumbsUp className="w-5 h-5" />,
      title: "Supplier Reputation",
      description: "Buy from a trusted source with great reviews & support."
    }
  ];

  return (
    <>
      {/* How to Choose Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Title with decorative lines */}
          <div className="flex items-center justify-center gap-4 mb-10 sm:mb-12 lg:mb-14">
            <div className="hidden sm:block h-[2px] w-12 md:w-20 bg-red-700" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-gray-900">
              How to Choose the Right Used Engine
            </h2>
            <div className="hidden sm:block h-[2px] w-12 md:w-20 bg-red-700" />
          </div>
          
          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 sm:p-5 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-red-700 text-white rounded-lg">
                  {feature.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serving Drivers Across California */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-red-700 fill-red-700" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                Serving Drivers Across California
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Local pickup and nationwide delivery available.
            </p>
          </div>
          
          {/* California Map and Cities */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
            {/* California Map SVG */}
            <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 flex-shrink-0">
              <svg
                viewBox="0 0 200 300"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* California State Outline */}
                <path
                  d="M45 10 L75 8 L85 15 L95 12 L110 18 L125 15 L140 22 L155 20 L165 28 L175 35 L180 50 L178 65 L182 80 L180 95 L175 110 L178 125 L175 140 L170 155 L165 170 L158 185 L150 200 L142 215 L130 230 L118 242 L105 252 L90 260 L75 265 L60 268 L45 270 L35 265 L28 255 L22 240 L18 225 L15 210 L12 195 L10 180 L12 165 L15 150 L18 135 L22 120 L25 105 L28 90 L32 75 L35 60 L38 45 L42 30 L45 10 Z"
                  fill="#e5e7eb"
                  stroke="#d1d5db"
                  strokeWidth="2"
                />
                
                {/* Location Markers */}
                {/* Los Angeles */}
                <g transform="translate(85, 220)">
                  <circle cx="0" cy="0" r="4" fill="#b91c1c" />
                  <path d="M0 -12 C-5 -12 -8 -8 -8 -4 C-8 2 0 8 0 8 C0 8 8 2 8 -4 C8 -8 5 -12 0 -12 Z" fill="#b91c1c" />
                </g>
                
                {/* San Diego */}
                <g transform="translate(95, 255)">
                  <circle cx="0" cy="0" r="3" fill="#b91c1c" />
                  <path d="M0 -10 C-4 -10 -6 -7 -6 -3 C-6 2 0 6 0 6 C0 6 6 2 6 -3 C6 -7 4 -10 0 -10 Z" fill="#b91c1c" />
                </g>
                
                {/* San Jose */}
                <g transform="translate(55, 130)">
                  <circle cx="0" cy="0" r="3" fill="#b91c1c" />
                  <path d="M0 -10 C-4 -10 -6 -7 -6 -3 C-6 2 0 6 0 6 C0 6 6 2 6 -3 C6 -7 4 -10 0 -10 Z" fill="#b91c1c" />
                </g>
                
                {/* San Francisco */}
                <g transform="translate(40, 115)">
                  <circle cx="0" cy="0" r="3" fill="#b91c1c" />
                  <path d="M0 -10 C-4 -10 -6 -7 -6 -3 C-6 2 0 6 0 6 C0 6 6 2 6 -3 C6 -7 4 -10 0 -10 Z" fill="#b91c1c" />
                </g>
                
                {/* Sacramento */}
                <g transform="translate(60, 95)">
                  <circle cx="0" cy="0" r="3" fill="#b91c1c" />
                  <path d="M0 -10 C-4 -10 -6 -7 -6 -3 C-6 2 0 6 0 6 C0 6 6 2 6 -3 C6 -7 4 -10 0 -10 Z" fill="#b91c1c" />
                </g>
                
                {/* Fresno */}
                <g transform="translate(80, 165)">
                  <circle cx="0" cy="0" r="3" fill="#b91c1c" />
                  <path d="M0 -10 C-4 -10 -6 -7 -6 -3 C-6 2 0 6 0 6 C0 6 6 2 6 -3 C6 -7 4 -10 0 -10 Z" fill="#b91c1c" />
                </g>
                
                {/* Oakland */}
                <g transform="translate(45, 120)">
                  <circle cx="0" cy="0" r="2" fill="#b91c1c" />
                </g>
                
                {/* Long Beach */}
                <g transform="translate(90, 230)">
                  <circle cx="0" cy="0" r="2" fill="#b91c1c" />
                </g>
              </svg>
            </div>
            
            {/* City Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 max-w-md lg:max-w-sm">
              {cities.map((city, index) => (
                <span 
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-700 rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300 cursor-default text-xs sm:text-sm font-medium"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
          
         
          
        </div>
      </section>
    </>
  );
}
