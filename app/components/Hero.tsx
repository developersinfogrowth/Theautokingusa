'use client';

import { Phone, Shield, Truck, Clock } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
  const [phoneNumber] = useState('+1-888-505-3697');

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-blue-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="section-padding relative z-10 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">Quality Guaranteed</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Get Quality Used Engine and Transmission in 
                <span className="text-blue-400 block">"A" Grade Condition</span>
              </h1>
              
              <p className="text-xl text-gray-300">
                Secure your purchase with a 
                <span className="font-bold text-yellow-400 ml-2">10% OFF</span> 
                on your order!
              </p>
            </div>

            {/* Call to Action */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={handleCall}
                  className="btn-primary bg-green-600 hover:bg-green-700 text-lg px-8 py-4 flex items-center space-x-3 group"
                >
                  <Phone className="h-6 w-6 group-hover:animate-pulse" />
                  <span className="text-xl font-bold">Click Here to Talk</span>
                </button>
                
                <div className="text-center sm:text-left">
                  <div className="text-2xl md:text-3xl font-bold tracking-wide">
                    {phoneNumber}
                  </div>
                  <p className="text-gray-300 mt-1">24/7 Customer Support</p>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">1-Year Warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">Same Day Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 text-center text-blue-400 font-bold">$</div>
                  <span className="text-sm">Best Price Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image/Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Instant Quote</h3>
              <p className="text-gray-300">Get your engine/transmission price in 10 minutes</p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Vehicle Make</label>
                <select className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white">
                  <option>Select Make</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>Ford</option>
                  <option>Chevrolet</option>
                  <option>BMW</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Vehicle Model</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  placeholder="Enter model"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  placeholder="e.g., 2020"
                  min="1990"
                  max="2024"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Part Needed</label>
                <select className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white">
                  <option>Select Part</option>
                  <option>Engine</option>
                  <option>Transmission</option>
                  <option>Both</option>
                </select>
              </div>
              
              <button 
                type="button" 
                onClick={handleCall}
                className="w-full btn-primary bg-blue-600 hover:bg-blue-700 py-3 text-lg font-bold mt-6"
              >
                GET INSTANT QUOTE
              </button>
              
              <p className="text-center text-sm text-gray-300 mt-4">
                Or call us directly: {phoneNumber}
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;