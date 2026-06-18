import { Phone } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Get Your Engine Today!
            </h3>
            <p className="text-base sm:text-lg md:text-xl mb-2 text-red-100">
              Call now and mention code
            </p>
            <p className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              <span className="bg-white text-red-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full inline-block">
                ENGINE10
              </span>
            </p>
            <p className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-yellow-300">
              for 10% OFF your purchase!
            </p>
            <a 
              href="tel:+18664865915"
              className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-white text-red-600 hover:bg-gray-100 font-bold text-base sm:text-lg md:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Call: 1-866-486-5915</span>
            </a>
            <p className="mt-4 sm:mt-6 text-red-100 text-xs sm:text-sm">
              Mon – Sun · 8:30 AM – 4:30 PM PST
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}