"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";

const PHONE_DISPLAY = "(888) 318-2840";
const PHONE_LINK = "+18883182840";

const FEATURES = [
  {
    icon: ShieldCheck,
    label: "Warranty Included",
  },
  {
    icon: BadgeCheck,
    label: "Quality Tested",
  },
  {
    icon: Truck,
    label: "Fast Shipping",
  },
];

export default function TransmissionIntro() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050505]">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/trasnmission.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-[72%_center]
            sm:object-[68%_center]
            lg:object-center
          "
        />
      </div>

      {/* Mobile and tablet overlay */}
      <div
        className="
          absolute inset-0 -z-10
          bg-black/80
          sm:bg-black/75
          lg:bg-transparent
        "
      />

      {/* Desktop overlay */}
      <div
        className="
          absolute inset-0 -z-10
          hidden lg:block
          bg-gradient-to-r
          from-black
          from-0%
          via-black/95
          via-52%
          to-black/20
          to-100%
        "
      />

      {/* Vertical contrast protection */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-black/30
          via-transparent
          to-black/75
        "
      />

      {/* Subtle red atmosphere */}
      <div
        className="
          absolute inset-x-0 bottom-0 -z-10
          h-40
          bg-gradient-to-t
          from-red-950/30
          to-transparent
        "
      />

      {/* Top accent */}
      <div
        className="
          h-1 w-full
          bg-gradient-to-r
          from-red-950
          via-red-500
          to-red-950
        "
      />

      {/* Main content */}
      <div
        className="
          mx-auto flex w-full max-w-[1440px]
          items-start
          px-4 pb-14 pt-14
          sm:px-6 sm:pb-16 sm:pt-16
          lg:min-h-[700px] lg:items-center lg:px-10 lg:py-16
          xl:min-h-[740px] xl:px-12
        "
      >
        <div
          className="
            w-full
            max-w-[680px]
            lg:max-w-[980px]
            xl:max-w-[1080px]
          "
        >
          {/* Badge */}
          <div
            className="
              mb-5 inline-flex max-w-full items-center gap-2
              rounded-full
              border border-red-400/40
              bg-red-950/45
              px-3.5 py-2
              backdrop-blur-md
              sm:mb-6 sm:px-4
            "
          >
            <Truck
              className="h-4 w-4 shrink-0 text-red-400"
              aria-hidden="true"
            />

            <span
              className="
                text-[10px] font-bold uppercase
                tracking-[0.12em] text-red-100
                sm:text-xs sm:tracking-[0.18em]
              "
            >
              Nationwide Shipping Available
            </span>
          </div>

          {/* Mobile and tablet heading */}
          <h2
            className="
              max-w-[18ch]
              text-[clamp(2.35rem,10vw,3rem)]
              font-black
              leading-[1.04]
              tracking-[-0.04em]
              text-white
              sm:max-w-[18ch]
              sm:text-[clamp(3rem,7vw,4rem)]
              lg:hidden
            "
          >
            Find a{" "}
            <span className="text-red-400">
              Dependable
            </span>{" "}
            Used Transmission{" "}
            <span className="text-gray-200">
              for Your Vehicle
            </span>
          </h2>

          {/* Desktop heading — exactly two lines */}
          <h2
            className="
              hidden
              max-w-[980px]
              text-[52px]
              font-black
              leading-[1.02]
              tracking-[-0.04em]
              text-white
              lg:block
              xl:max-w-[1080px]
              xl:text-[60px]
              2xl:text-[64px]
            "
          >
            <span className="block whitespace-nowrap">
              Find a{" "}
              <span className="text-red-400">
                Dependable
              </span>{" "}
              Used Transmission
            </span>

            <span className="mt-1 block text-gray-200">
              for Your Vehicle
            </span>
          </h2>

          {/* Supporting line */}
          <div
            className="
              mt-6 flex items-start gap-3
              sm:items-center
              lg:mt-7
            "
          >
            <div
              className="
                mt-3 h-0.5 w-10 shrink-0
                bg-red-500
                sm:mt-0 sm:w-12
              "
            />

            <p
              className="
                max-w-xl
                text-sm font-semibold
                leading-6 text-gray-100
                sm:text-base sm:leading-7
                lg:max-w-2xl lg:text-lg
              "
            >
              Nationwide availability, quality-tested units, and fast delivery.
            </p>
          </div>

          {/* Description */}
          <p
            className="
              mt-5 max-w-xl
              text-sm font-normal
              leading-7 text-gray-200
              sm:mt-6 sm:text-base sm:leading-8
              lg:max-w-2xl
            "
          >
            Find a quality-tested used transmission matched to your vehicle,
            backed by warranty options and delivered nationwide by an
            experienced automotive parts team.
          </p>

          {/* Feature cards */}
          <div
            className="
              mt-7 grid grid-cols-1 gap-2.5
              min-[430px]:grid-cols-3
              sm:mt-8 sm:gap-3
              lg:max-w-2xl
            "
          >
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="
                  flex min-h-12 items-center gap-2.5
                  rounded-xl
                  border border-white/15
                  bg-black/40
                  px-3.5 py-3
                  backdrop-blur-md
                  transition-colors duration-200
                  hover:border-red-400/35
                  hover:bg-white/10
                "
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-red-400"
                  aria-hidden="true"
                />

                <span
                  className="
                    text-xs font-semibold
                    leading-5 text-gray-100
                    sm:text-[13px]
                  "
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="
              mt-8 flex flex-col gap-3
              sm:mt-9 sm:flex-row sm:items-center
            "
          >
            <a
              href={`tel:${PHONE_LINK}`}
              aria-label={`Call The AutoKing USA at ${PHONE_DISPLAY}`}
              className="
                inline-flex min-h-12 w-full
                items-center justify-center gap-2.5
                rounded-xl
                bg-red-600
                px-6 py-3.5
                text-sm font-bold
                tracking-wide text-white
                shadow-[0_10px_30px_rgba(220,38,38,0.35)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-red-700
                active:translate-y-0
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black
                sm:w-auto sm:px-7
              "
            >
              <Phone
                className="h-4 w-4"
                aria-hidden="true"
              />

              <span className="sm:hidden">
                Call Now
              </span>

              <span className="hidden sm:inline">
                Call Now — {PHONE_DISPLAY}
              </span>
            </a>

            <span
              className="
                text-center text-xs
                font-medium text-gray-300
                sm:text-left sm:text-sm
              "
            >
              Speak with a parts specialist
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="
          h-px w-full
          bg-gradient-to-r
          from-transparent
          via-red-600/80
          to-transparent
        "
      />
    </section>
  );
}