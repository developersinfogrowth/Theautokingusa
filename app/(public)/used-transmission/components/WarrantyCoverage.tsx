import { Shield, Truck, HeadphonesIcon, RefreshCw } from 'lucide-react';

export default function WarrantyCoverage() {
  const warranties = [
    {
      icon: Shield,
      title: 'Warranty Protection',
      description: 'Select units include comprehensive warranty coverage for peace of mind after installation.',
    },
    {
      icon: Truck,
      title: 'Shipping Support',
      description: 'Professional handling and complete tracking on every nationwide shipment.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Customer Confidence',
      description: 'Dedicated support team available to answer questions and provide technical assistance.',
    },
    {
      icon: RefreshCw,
      title: 'Return Support',
      description: 'Fair return policy on unused units with clear terms and professional service.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-4 h-4" />
            Warranty Coverage
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            What You Need to Know
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            One of the most important factors separating this source from a standard salvage yard or unverified online parts seller is the availability of genuine warranty coverage on select transmission units across the nationwide inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {warranties.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-red-600 text-white rounded-xl mb-5">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}