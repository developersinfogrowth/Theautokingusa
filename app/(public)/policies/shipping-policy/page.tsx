
import Link from 'next/link';
import { ArrowLeft, Truck, Clock, ShieldAlert, MapPin, Search, AlertOctagon, HelpCircle, Phone } from 'lucide-react';
import { Metadata } from 'next';



export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "TheAutoKingUSA - Quality Used Engines & Transmissions | TheAutoKingUSA",
    description: "Get quality used engines and transmissions in A Grade condition.",
    keywords: [
      "used engines",
      "used transmissions",
      "shipping policy",
      "auto parts USA",
      "The Auto King USA",
      "engine shipping",
      "freight delivery"
    ],
    authors: [{ name: "The Auto King USA" }],
    publisher: "The Auto King USA",
    robots: "index, follow",

    alternates: {
      canonical: "http://localhost:3000/policies/shipping-policy",
    },

    openGraph: {
      title: "Shipping Policy | TheAutoKingUSA",
      description: "Fast, reliable shipping for heavy-duty auto parts.",
      url: "http://localhost:3000/policies/shipping-policy",
      siteName: "The Auto King USA",
      type: "article",
    },

    other: {
      language: "en",
    },
  };
}


export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white antialiased selection:bg-red-600 selection:text-white">
     
     

      <main className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Back button removed per user request */}

          {/* Header Section */}
          <header className="border-b border-white/[0.08] pb-8 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-red-600/10 border border-red-600/30 text-red-500 mb-3">
              Logistics & Fulfillment
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Shipping Policy
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-medium">
              Fast, Reliable Shipping for Your Heavy-Duty Auto Parts
            </p>
          </header>

          {/* Body Content */}
          <div className="space-y-10 text-gray-300 leading-relaxed text-[15px] sm:text-[16px]">
            
            {/* Context Summary */}
            <p>
              At <strong className="text-white">The Auto King USA</strong>, we aim to provide a seamless and secure shipping pipeline for all freight components. This Shipping Policy comprehensively outlines how freight configurations are handled, dispatch schedules, and your key verification milestones upon delivery.
            </p>

            {/* Section 1: Timelines */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Clock size={20} className="text-red-500" />
                Order Processing & Shipment Timeline
              </h2>
              <p>
                Once payment authorization is cleared, our fulfillment grid coordinates instantly with our core distribution supply lines to physically verify the exact availability, cosmetic state, and structural road-readiness of your requested unit.
              </p>
              <div className="bg-[#121212] border border-white/[0.05] rounded-2xl p-5 space-y-3">
                <p className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">·</span>
                  <span>All large assemblies are carefully crated and managed via established, professional third-party freight networks.</span>
                </p>
                <p className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">·</span>
                  <span>Because our systems deal in genuine, specialized auto parts, delicate uninstallation safeguards can occasionally lead to slight dispatch delays.</span>
                </p>
                <p className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">·</span>
                  <span>Standard terminal transit intervals typically range from **7–14 business days**, depending on weather and carrier routes.</span>
                </p>
              </div>
            </section>

            {/* Section 2: Tracking */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Search size={20} className="text-red-500" />
                Shipping Confirmation & Tracking
              </h2>
              <p>
                The minute your asset passes inspection and departs our docks, an automated notification is sent directly to your registered contact channel, containing:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-sm font-semibold text-white">
                <li className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl text-center">Unique Tracking Key</li>
                <li className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl text-center">Freight Carrier Portfolio</li>
                <li className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl text-center">Target Destination ETAs</li>
              </ul>
            </section>

            {/* Section 3: Commercial Delivery Requirements */}
            <section className="space-y-4 bg-gradient-to-r from-[#121212] to-[#161616] border border-white/[0.06] p-6 sm:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <MapPin size={20} className="text-red-500" />
                Commercial Address Delivery Requirements
              </h2>
              <p className="text-sm text-gray-400">
                To manage pallet freight profiles efficiently, clear compliance metrics must be satisfied:
              </p>
              <ul className="space-y-3 text-sm pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Commercial Only:</strong> Large footprint items including complete engines and transmissions must be routed directly to verified commercial addresses.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Unloading Machinery:</strong> Your delivery point must features a standard loading dock, forklift, or functional liftgate apparatus.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Liftgate Surcharge:</strong> If unloading equipment is completely missing at the location, an auxiliary **$100–$150 freight surcharge** will be charged within 30–45 days by our merchant gateway.</span>
                </li>
              </ul>
            </section>

            {/* Section 4: Customer Responsibilities */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <ShieldAlert size={19} className="text-red-500" />
                Address Accuracy & Refusal Fees
              </h2>
              <p>
                Providing strict precision on all destination delivery lines is mandatory. If an invalid or incorrect coordinate block results in localized freight delivery failure, a **40% restocking fee** plus all associated round-trip return shipping freight costs will be applied to the account ledger.
              </p>
            </section>

            {/* Section 5: Inspection Matrix */}
            <section className="space-y-4 border-l-2 border-red-600 pl-4 py-1">
              <h2 className="text-xl font-bold text-white uppercase tracking-wide text-sm text-red-500">
                Critical Checklist: Shipment Inspection & Damage Rules
              </h2>
              <p className="text-sm">
                You must visually audit the crate framework **immediately upon terminal arrival** before signing your official Bill of Lading (BOL). If structural damage or liquid leakage is discovered:
              </p>
              <ol className="space-y-2 text-sm text-gray-400 list-decimal pl-4">
                <li>Explicitly detail the specific breakage across the physically presented Bill of Lading.</li>
                <li>Retain a clear duplicate of that noted manifest sheet for legal recourse.</li>
                <li>File an alert with our customer response dashboard within **2 business days**, including clear high-resolution photos/videos and complete engine diagnostic DTC tracking files.</li>
              </ol>
            </section>

            {/* Section 6: Liability limits */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <AlertOctagon size={20} className="text-red-500" />
                Shipping Claims & Carrier Liability Limits
              </h2>
              <p>
                The Auto King USA acts strictly as the shipper; we are not directly liable for mid-transit cargo damage or terminal losses caused by independent transit companies. If a client attempts to bypass or reschedule a preset carrier window unilaterally, we cannot assume liability over missing freight or asset damage.
              </p>
              <p>
                If a component shows signs of transit damage at delivery, the client should **accept the package configuration** and instantly report the file to our service desks within **1–2 business days** to preserve claims options.
              </p>
            </section>

            {/* Section 7: Financial Penalties & Cancellations */}
            <section className="space-y-4 bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl">
              <h2 className="text-base font-bold text-white uppercase tracking-wider text-center border-b border-white/[0.05] pb-3">
                Fulfillment Penalties & Cancellation Matrices
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-2">
                  <div className="text-2xl font-extrabold text-red-500">35%</div>
                  <div className="text-xs uppercase text-gray-400 font-bold mt-1">Standard Restocking Fee</div>
                </div>
                <div className="p-2 border-t sm:border-t-0 sm:border-x border-white/[0.05]">
                  <div className="text-2xl font-extrabold text-red-500">20%</div>
                  <div className="text-xs uppercase text-gray-400 font-bold mt-1">Pre-Dispatch Cancellation</div>
                </div>
                <div className="p-2 border-t sm:border-t-0">
                  <div className="text-2xl font-extrabold text-red-500">50%</div>
                  <div className="text-xs uppercase text-gray-400 font-bold mt-1">Post-Dispatch Cancellation</div>
                </div>
              </div>
            </section>

            {/* Section 8: Support Callout */}
            <section className="border-t border-white/[0.08] pt-10 mt-6 space-y-4 text-center">
              <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <HelpCircle size={20} className="text-red-500" />
                Questions Regarding Your Logistics?
              </h2>
              <p className="text-gray-400 max-w-md mx-auto text-sm">
                Our logistics coordinators are available to clarify freight configurations, shipping routes, or cargo fees.
              </p>
              <div className="pt-2">
                <a
                  href="tel:+18664865915"
                  className="inline-flex items-center justify-center gap-2 bg-[#161616] border border-white/[0.08] hover:border-red-600/50 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all group focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  <Phone size={15} fill="currentColor" stroke="none" className="text-red-500 group-hover:scale-110 transition-transform" />
                  <span>Call Dispatch Support: +1 (866) 486-5915</span>
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

     
    </div>
  );
}