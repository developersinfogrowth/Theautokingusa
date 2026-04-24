import {  Shield, Truck, Clock } from 'lucide-react';

export default function UsedEnginePage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-20">
        <div className="section-padding text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Quality Used Engines</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get premium quality used engines in "A" Grade condition with 1-year warranty
          </p>
        </div>
      </div>

      <div className="section-padding py-16">
        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Engine Selection</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700">Engines in Stock</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-700">Success Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">1-Year</div>
              <div className="text-gray-700">Warranty</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Get Your Engine Today!</h3>
            <p className="text-gray-700 mb-6">
              Call now and mention code <span className="font-bold text-green-600">"ENGINE10"</span> for 
              <span className="font-bold text-green-600 ml-1">10% OFF</span>
            </p>
            <a 
              href="tel:+18664865915"
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              Call: +18664865915
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}