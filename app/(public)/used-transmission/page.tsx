import { Cog, Shield, Truck, Clock } from 'lucide-react';

export default function UsedTransmissionPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-20">
        <div className="section-padding text-center">
          <Cog className="h-20 w-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Quality Used Transmissions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get premium quality used transmissions in "A" Grade condition with comprehensive warranty
          </p>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Transmission Selection</h2>
          
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Why Choose Our Transmissions?</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Fully tested and inspected</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span>Free shipping available</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span>Same-day shipping</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need a Transmission?</h3>
            <p className="text-gray-700 mb-6">
              Call now for <span className="font-bold text-purple-600">10% OFF</span> your transmission order!
            </p>
            <a 
              href="tel:+18664865915"
              className="btn-primary bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4 inline-block"
            >
              Call: +18664865915
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}