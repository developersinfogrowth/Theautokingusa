"use client";

import Image from "next/image";
import { MapPin, ShieldCheck, Truck, BadgeCheck, Phone } from "lucide-react";

export default function TransmissionIntro() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col">
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-transmission.jpg"
          alt="Transmission background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark gradient overlay — left side stays readable, right stays vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/92 via-gray-950/70 to-gray-950/30" />
        {/* Subtle red vignette at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#7f1d1d]/40 to-transparent" />
      </div>

      {/* ── Top accent bar ── */}
      <div className="relative z-10 h-1.5 w-full bg-gradient-to-r from-[#b91c1c] via-[#ef4444] to-[#b91c1c]" />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ────────── LEFT COLUMN ────────── */}
        <div className="flex flex-col items-start text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-500/40 backdrop-blur-sm mb-7">
            <Truck className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold text-red-300 tracking-widest uppercase">
              Nationwide Shipping Available
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black leading-[1.06] tracking-[-0.02em] text-white">
            Find a{" "}
            <span className="text-[#f87171] drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
              Dependable
            </span>
            <br />
            Used Transmission
            <br />
            <span className="text-gray-300">for Your Vehicle</span>
          </h1>

          {/* Divider + subheading */}
          <div className="flex items-center gap-3 mt-6 mb-5">
            <div className="h-[2px] w-10 bg-[#ef4444]" />
            <p className="text-base sm:text-lg font-semibold text-gray-300">
              Nationwide Availability and Fast Delivery
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-[15px] sm:text-base leading-[1.75] max-w-xl mb-4">
            When a transmission begins slipping between gears, hesitating under 
            acceleration, shuddering at highway speeds, or fails entirely without 
            warning, the cost and disruption of replacing it can feel overwhelming 
            for any vehicle owner.
          </p>
          
          <p className="text-gray-400 text-[15px] sm:text-base leading-[1.75] max-w-xl">
            A brand-new OEM transmission replacement carries a price tag that 
            frequently reaches several thousand dollars before installation labor, 
            fluid service, and programming costs are factored into the final repair 
            bill — an expense that simply does not make financial sense for millions 
            of vehicle owners across the country whose vehicles are otherwise 
            dependable and well-maintained.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { icon: ShieldCheck, label: "Warranty Included" },
              { icon: Truck,        label: "Fast Shipping"     },
              { icon: BadgeCheck,   label: "Tested Units"      },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.11] border border-white/10 backdrop-blur-sm rounded-xl px-5 py-3 transition-colors duration-200"
              >
                <Icon className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-sm font-semibold text-gray-100 whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mt-10">
            <button className="flex items-center gap-2.5 bg-[#c1121f] hover:bg-[#a50e18] text-white font-bold text-sm tracking-wide px-7 py-4 rounded-xl shadow-[0_4px_24px_rgba(193,18,31,0.45)] transition-all duration-200 hover:scale-[1.02] active:scale-95">
              <Phone className="w-4 h-4" />
              Call Now — (866) 486‑5915
            </button>
          </div>
        </div>

        

      </div>

      {/* ── Bottom red strip ── */}
      <div className="relative z-10 h-1 w-full bg-gradient-to-r from-transparent via-[#b91c1c] to-transparent opacity-60" />
    </section>
  );
}