import Hero from '@/app/components/Hero';
import { Check, Truck, Shield, Clock, Users, Award } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Guaranteed",
      description: "All parts go through 50+ point inspection process"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Shipping",
      description: "Free shipping on all orders over $500"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Same Day Shipping",
      description: "Orders placed before 3 PM ship same day"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Support",
      description: "24/7 customer support from auto experts"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Warranty Included",
      description: "1-year warranty on all engines and transmissions"
    }
  ];

  const popularParts = [
    { make: "Toyota", model: "Camry", year: "2015-2020", price: "$1,299" },
    { make: "Honda", model: "Accord", year: "2013-2017", price: "$1,199" },
    { make: "Ford", model: "F-150", year: "2015-2020", price: "$1,899" },
    { make: "Chevrolet", model: "Silverado", year: "2014-2018", price: "$1,799" },
    { make: "BMW", model: "3 Series", year: "2012-2015", price: "$2,499" },
  ];

  return (
    <>
      <Hero />
      
      {/* Features Section */}
      <section className="section-padding py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Rock AutoCare?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide top-quality used engines and transmissions with comprehensive warranties and expert support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Parts */}
      <section className="bg-gray-50 py-16">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Parts In Stock
            </h2>
            <p className="text-gray-600">Ready to ship today!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {popularParts.map((part, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{part.make}</div>
                  <div className="text-lg font-semibold mb-1">{part.model}</div>
                  <div className="text-gray-600 mb-4">{part.year}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-4">{part.price}</div>
                  <a 
                    href="tel:+1-888-505-3697"
                    className="btn-secondary w-full"
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Your Quality Part?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Call now and get <span className="font-bold text-yellow-400">10% OFF</span> your first order!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="tel:+1-888-505-3697"
              className="btn-primary bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
            >
              Call Now: +1-888-505-3697
            </a>
            <p className="text-gray-300">
              Monday - Sunday: 6 AM - 9 PM PST
            </p>
          </div>
        </div>
      </section>
    </>
  );
}