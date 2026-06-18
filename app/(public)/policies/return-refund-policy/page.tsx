import Link from 'next/link';
import { ArrowLeft, RotateCcw, FileCheck, Ban, ShieldAlert, DollarSign, HelpCircle, Phone, Mail, ClipboardList } from 'lucide-react';

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "TheAutoKingUSA - Return & Refund Policy | Easy Returns on Auto Parts",
    description:
      "Read The Auto King USA return and refund policy for used engines and transmissions. Learn about eligibility, refunds, RMA process, and restocking fees.",
    keywords: [
      "return policy",
      "refund policy",
      "auto parts return USA",
      "engine return policy",
      "transmission refund policy",
      "The Auto King USA returns",
      "RMA policy auto parts",
      "used engine refund rules"
    ],
    authors: [{ name: "The Auto King USA" }],
    publisher: "The Auto King USA",
    robots: "index, follow",

    alternates: {
      canonical: "http://localhost:3000/policies/return-refund-policy",
    },

    openGraph: {
      title: "Return & Refund Policy | TheAutoKingUSA",
      description:
        "Understand return eligibility, RMA process, refund timelines, and restocking fees for The Auto King USA products.",
      url: "http://localhost:3000/policies/return-refund-policy",
      siteName: "The Auto King USA",
      type: "article",
    },

    twitter: {
      card: "summary",
      title: "Return & Refund Policy | TheAutoKingUSA",
      description:
        "Clear return & refund rules for used engines and transmissions.",
    },

    other: {
      language: "en",
    },
  };
}


export default function ReturnRefundPolicyPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white antialiased selection:bg-red-600 selection:text-white">
      
      

      <main className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Back button removed per user request */}

          {/* Document Header Section */}
          <header className="border-b border-white/[0.08] pb-8 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-red-600/10 border border-red-600/30 text-red-500 mb-3">
              Reversals & Dispersals
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Return & Refund Policy
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-medium">
              Transparent Return Processes for The Auto King USA Customers
            </p>
          </header>

          {/* Main Legal Content Stack */}
          <div className="space-y-10 text-gray-300 leading-relaxed text-[15px] sm:text-[16px]">
            
            {/* Opening Statement */}
            <p>
              At <strong className="text-white">The Auto King USA</strong>, we are committed to sustaining a structured, transparent, and legally sound asset return matrix. This policy ensures full alignment with our technical quality protocols and baseline warranty conditions. Please review these parameters thoroughly before arranging return transit.
            </p>

            {/* Section 1: Return Eligibility Framework */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <RotateCcw size={20} className="text-red-500" />
                Return Eligibility Parameters
              </h2>
              <p>
                Core inventory allocations are authorized for return assessment within a strict window of **7 business days** post-delivery. Components must arrive entirely unused, un-altered, and packed securely inside their initial freight configuration structures. All outbound and return shipping logistics overheads remain the absolute financial obligation of the customer.
              </p>
              
              <div className="bg-[#121212] border border-white/[0.05] rounded-2xl p-5 space-y-3 text-sm">
                <p className="font-semibold text-white">To secure validation, the following credentials must be submitted within 2 business days of package unboxing:</p>
                <ul className="space-y-2 list-disc pl-4 text-gray-400">
                  <li>Comprehensive diagnostic readout paperwork from an active ASE-certified automotive technician.</li>
                  <li>Clear, high-resolution photographic captures or video files detailing the unit issue.</li>
                  <li>Complete diagnostic tracking data, including specific <strong className="text-white">Diagnostic Trouble Codes (DTC)</strong> profiles.</li>
                </ul>
                <div className="text-xs text-red-400 font-medium pt-1">
                  ⚠️ Direct item reversals lacking proper mechanical telemetry records will be automatically declined.
                </div>
              </div>
            </section>

            {/* Section 2: Mandatory Pre-Installation Checklist */}
            <section className="space-y-3 bg-gradient-to-r from-[#121212] to-[#161616] border border-white/[0.06] p-6 rounded-2xl">
              <h2 className="text-base font-bold text-white uppercase tracking-wider text-red-500 flex items-center gap-2">
                <FileCheck size={18} />
                Pre-Installation Requirements (Mandatory)
              </h2>
              <p className="text-sm text-gray-400">
                Before attempting to bolt or link any recycled powertrain element to a vehicle chassis, your mechanic must execute these validation steps:
              </p>
              <ul className="space-y-2 text-xs text-gray-400 pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Produce an official diagnostic letterhead assessment signed by a licensed mechanical workshop.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Capture high-definition multi-angle footage showcasing assembly integrity before hoist operations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Ensure original shipping fluids are thoroughly flushed and fresh technical seals are positioned.</span>
                </li>
              </ul>
            </section>

            {/* Section 3: Non-Returnable Items Grid */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Ban size={20} className="text-red-500" />
                Non-Returnable Thresholds & Exclusions
              </h2>
              <p>
                To maintain standard operational safety, certain item conditions cannot enter our reverse logistics framework. Return claims will be permanently denied if an asset exhibits any of the following parameters:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400">
                <div className="p-3.5 bg-white/[0.01] border border-white/[0.05] rounded-xl">
                  <strong className="text-white block mb-0.5">Broken Seals / Gaskets</strong>
                  Modifying or cracking factory fluid boundary components voids claims.
                </div>
                <div className="p-3.5 bg-white/[0.01] border border-white/[0.05] rounded-xl">
                  <strong className="text-white block mb-0.5">Environmental Rust Damage</strong>
                  Oxidization or chemical corrosion occurring post-delivery is non-returnable.
                </div>
                <div className="p-3.5 bg-white/[0.01] border border-white/[0.05] rounded-xl">
                  <strong className="text-white block mb-0.5">Uncertified DIY Labor</strong>
                  Damage resulting from home mechanic setups or un-certified garages.
                </div>
                <div className="p-3.5 bg-white/[0.01] border border-white/[0.05] rounded-xl">
                  <strong className="text-white block mb-0.5">Temporal Window Exceedance</strong>
                  Any claims filed beyond a 30-calendar-day timeline are locked out.
                </div>
                <div className="p-3.5 bg-white/[0.01] border border-white/[0.05] rounded-xl sm:col-span-2">
                  <strong className="text-white block mb-0.5">Electrical / Superficial Elements</strong>
                  Electrical sub-harness modules are non-refundable unless verified defective directly by our technical desk. Minor scuffs, surface scrapes, or dead plug sensors do not qualify for component replacements and must be resolved at the client's expense.
                </div>
              </div>
            </section>

            {/* Section 4: Return Authorization (RMA) Steps */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <ClipboardList size={20} className="text-red-500" />
                The Reverse Processing Protocol
              </h2>
              <p>
                To officially register a claim file, connect directly with our dispatch department using our verified toll-free infrastructure. Once your diagnostic portfolio clears inspection steps, our staff will issue a formal <strong className="text-white">Return Merchandise Authorization (RMA) Number</strong>.
              </p>
              <div className="bg-red-950/10 border border-red-900/20 p-4 rounded-xl text-sm text-gray-400">
                ⚠️ Cargo arriving at our unloading bays lacking an active, registered RMA tracking code will be systematically refused and turned back at the gate.
              </div>
            </section>

            {/* Section 5: Financial Restocking Levies & Refunds */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <DollarSign size={20} className="text-red-500" />
                Refund Timelines & Restocking Levies
              </h2>
              <p>
                Once returned hardware elements clear our physical engineering validation loops, an automated status ledger update will route to your dashboard. Authenticated refund balances take **7–14 business days** to process back to the original source.
              </p>
              <p className="text-sm text-gray-400">
                Please note that standard customer-remitted reversals are subject to an industry-standard **40% administrative restocking fee** to mitigate technician testing time and freight preparation costs. Initial procurement shipping charges are non-refundable under any context.
              </p>
            </section>

            {/* Section 6: Chargeback Waiver Protections */}
            <section className="bg-gradient-to-br from-[#1c1212] to-[#120d0d] border border-red-950/60 p-6 rounded-2xl space-y-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 text-red-500">
                <ShieldAlert size={20} />
                Chargeback Prevention Arbitration Provision
              </h2>
              <p className="text-sm text-gray-300">
                By processing authorization credit tokens across our point-of-sale environments, buyers explicitly agree to navigate any refund disputes through our internal customer care networks. <strong className="text-white">Buyers knowingly waive any rights to engage financial entities in payment chargebacks</strong> without first permitting our claims office to conclude a technical assessment.
              </p>
            </section>

            {/* Section 7: Delayed Processing Checks */}
            <section className="space-y-2 text-sm text-gray-400">
              <h3 className="text-base font-bold text-white">Delayed or Missing Ledger Credits</h3>
              <p>
                If your technical refund window has exceeded 14 business days without appearing on your balance sheet, verify your bank ledger statement closely. Next, connect directly with your bank's card management services department, as financial processing cycles can vary. If the credit line remains unposted, escalate the profile to our support division.
              </p>
            </section>

            {/* Section 8: Support Callout Control */}
            <section className="border-t border-white/[0.08] pt-10 mt-6 text-center space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <HelpCircle size={20} className="text-red-500" />
                Questions Regarding Your Reverse Order Routing?
              </h2>
              <p className="text-gray-400 max-w-md mx-auto text-sm">
                Our administrative team is here to walk you through RMA generation, mechanic report templates, or shipping parameters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-2">
                <a
                  href="tel:+18664865915"
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl flex-1 transition-colors focus:outline-none"
                >
                  <Phone size={15} fill="currentColor" stroke="none" />
                  <span>+1 (866) 486-5915</span>
                </a>
                <a
                  href="mailto:support@theautokingusa.com"
                  className="flex items-center justify-center gap-2 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.06] text-white font-bold text-sm px-6 py-3.5 rounded-xl flex-1 transition-colors focus:outline-none"
                >
                  <Mail size={15} />
                  <span>Email Logistics</span>
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

     
    </div>
  );
}