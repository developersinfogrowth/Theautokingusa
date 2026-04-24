import { Award, Users, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-teal-900 text-white py-20">
        <div className="section-padding text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About theautokingusaA</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted partner for quality used engines and transmissions since 2005
          </p>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2005, theautokingusaA started with a simple mission: to provide 
              high-quality used engines and transmissions at affordable prices. Today, 
              we serve thousands of customers across the United States with our 
              commitment to quality and customer satisfaction.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              To provide reliable, quality auto parts that help keep vehicles on the 
              road while saving our customers money. We believe in sustainable 
              automotive solutions through quality used parts.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <Users className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">15,000+</div>
                <div className="text-gray-600">Customers Served</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <Award className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">18 Years</div>
                <div className="text-gray-600">of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
