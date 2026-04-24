import { Truck, Wrench, Users, Building } from 'lucide-react';

export default function CommercialVehiclesPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-orange-900 text-white py-20">
        <div className="section-padding text-center">
          <Truck className="h-20 w-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Commercial Vehicle Parts</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Specialized parts for commercial vehicles, fleet maintenance, and heavy-duty applications
          </p>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Commercial Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Building className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Fleet Services</h3>
              <p className="text-gray-600">
                Complete parts solutions for commercial fleets with volume discounts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Business Accounts</h3>
              <p className="text-gray-600">
                Special pricing and terms for registered businesses and repair shops.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-orange-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Commercial Inquiries</h3>
            <p className="text-gray-700 mb-6">
              Get special pricing for bulk orders and fleet accounts
            </p>
            <a 
              href="tel:+18664865915"
              className="btn-primary bg-orange-600 hover:bg-orange-700 text-lg px-8 py-4 inline-block"
            >
              Call Commercial Sales: +18664865915
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}