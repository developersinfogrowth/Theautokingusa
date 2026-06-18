"use client";

import { useState } from "react";
import { PhoneCall, ChevronDown, HelpCircle } from "lucide-react";
import { FAQS, PHONE_RAW, PHONE_DISPLAY } from "@/app/(public)/lib/constants";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Common Questions
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-gray-900 mb-3 text-balance">
            FAQs About Buying{" "}
            <span className="text-red-600">Used Engines</span> in the USA
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Everything you need to know before purchasing a used engine or
            transmission
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-xl border-2 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md
                  ${isOpen ? "border-red-400 shadow-md shadow-red-100" : "border-gray-100"}`}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 text-left
                             hover:bg-gray-50/50 transition-colors duration-150 group"
                >
                  <span
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center
                                    text-xs sm:text-sm font-bold shrink-0 transition-all duration-300
                                    ${isOpen ? "bg-red-600 text-white scale-110" : "bg-red-50 text-red-600 group-hover:bg-red-100"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-semibold text-sm sm:text-base lg:text-lg leading-snug pr-2 transition-colors
                                   ${isOpen ? "text-red-700" : "text-gray-800"}`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0
                                   transition-all duration-300
                                   ${isOpen ? "bg-red-600 text-white rotate-180" : "bg-gray-100 text-gray-500 group-hover:bg-red-50 group-hover:text-red-500"}`}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out
                  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-5">
                      <div className="bg-gradient-to-r from-gray-50 to-red-50/30 rounded-xl border-l-4 border-red-500 p-4 sm:p-5">
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div
          className="mt-8 md:mt-10 bg-gradient-to-r from-gray-900 to-gray-800 
                        rounded-2xl px-5 sm:px-8 py-6 sm:py-8 text-center sm:text-left"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className="text-white font-bold text-lg sm:text-xl mb-1">
                Still have questions?
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                Our specialists are ready to help — no bots, no scripts.
              </p>
            </div>

            <a
              href={`tel:${PHONE_RAW}`}
              className="inline-flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700
                         text-white text-sm sm:text-base font-bold px-6 sm:px-8 py-3.5 rounded-xl 
                         transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/30
                         whitespace-nowrap shrink-0"
            >
              <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

