"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Legendary Motors hooked me up with a low mileage 5.3L for my Silverado. Runs perfect. Great price and fast shipping!",
    name: "Michael T.",
    location: "Dallas, TX",
    stars: 5,
  },
  {
    id: 2,
    quote:
      "The transmission I ordered was in excellent condition and fit like a glove. Highly recommend!",
    name: "Sarah B.",
    location: "Phoenix, AZ",
    stars: 5,
  },
  {
    id: 3,
    quote:
      "Customer service was awesome. Answered all my questions and made the process easy.",
    name: "James L.",
    location: "Chicago, IL",
    stars: 5,
  },
  {
    id: 4,
    quote:
      "Found the exact engine I needed at a great price. Delivery was quick and the quality exceeded expectations.",
    name: "David R.",
    location: "Houston, TX",
    stars: 5,
  },
  {
    id: 5,
    quote:
      "Best experience buying a used transmission. The team was helpful and the part arrived in perfect condition.",
    name: "Emily K.",
    location: "Los Angeles, CA",
    stars: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () =>
      window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(
    testimonials.length - visibleCount,
    0
  );

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? maxIndex : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  return (
    <section className="relative">
      {/* Header */}
      <div className="bg-zinc-900 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
            <span className="text-white">— WHAT </span>
            <span className="text-red-600">CUSTOMERS</span>
            <span className="text-white"> SAY —</span>
          </h2>
        </div>
      </div>

      {/* Content */}
      <div
        className="relative py-10 sm:py-14 md:py-16 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundColor: "#f5f3ef",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Slider */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / visibleCount)
                  }%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0 p-2"
                    style={{
                      width: `${100 / visibleCount}%`,
                    }}
                  >
                    <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 h-full">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({
                          length: testimonial.stars,
                        }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-gray-700 italic leading-relaxed min-h-[120px]">
                        "{testimonial.quote}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="font-semibold text-gray-600">
                            {testimonial.name[0]}
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({
              length: maxIndex + 1,
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full ${
                  currentIndex === i
                    ? "bg-red-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}