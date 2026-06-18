import Link from 'next/link';
import { ArrowLeft, Award, ShieldCheck, Ban, ClipboardList, RefreshCw, Scale, AlertOctagon, Phone, Mail } from 'lucide-react';




import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "TheAutoKingUSA - Warranty Policy | 30-Day Engine & Transmission Warranty",
    description:
      "Learn about The Auto King USA warranty policy for used engines and transmissions. Covers 30-day protection, exclusions, and claim process.",
    keywords: [
      "warranty policy",
      "used engine warranty",
      "transmission warranty",
      "auto parts warranty USA",
      "The Auto King USA warranty",
      "30 day engine warranty",
      "used engine protection plan"
    ],
    authors: [{ name: "The Auto King USA" }],
    publisher: "The Auto King USA",
    robots: "index, follow",

    alternates: {
      canonical: "http://localhost:3000/policies/warranty-policy",
    },

    openGraph: {
      title: "Warranty Policy | TheAutoKingUSA",
      description:
        "30-day warranty coverage for used engines and transmissions with clear claim rules and exclusions.",
      url: "http://localhost:3000/policies/warranty-policy",
      siteName: "The Auto King USA",
      type: "article",
    },

    twitter: {
      card: "summary",
      title: "Warranty Policy | TheAutoKingUSA",
      description:
        "30-day warranty coverage for engines & transmissions with clear terms and exclusions.",
    },

    other: {
      language: "en",
    },
  };
}

export default function WarrantyPolicyPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white antialiased selection:bg-red-600 selection:text-white">
     
  

      <main className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Back button removed per user request */}

          {/* Document Header Section */}
          <header className="border-b border-white/[0.08] pb-8 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-red-600/10 border border-red-600/30 text-red-500 mb-3">
              Protection Plan
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Warranty Policy
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-medium">
              Reliable Warranty Coverage for Your Auto Parts
            </p>
          </header>

          {/* Main Legal Content Stack */}
          <div className="space-y-10 text-gray-300 leading-relaxed text-[15px] sm:text-[16px]">
            
            {/* Opening Clause */}
            <p>
              <strong className="text-white">The Auto King USA</strong> provides a **30-day standard warranty** from the physical date of delivery on all pre-owned components. This comprehensive warranty roadmap ensures part reliability while strictly defining liability thresholds for both parties under explicitly transparent parameters.
            </p>

            {/* Section 1: Coverage Metrics */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-red-500" />
                Warranty Coverage Grid
              </h2>
              <p>
                To maintain active coverage status during your **30-calendar-day interval**, the ordered component must be installed exclusively by an ASE-certified technician or a fully licensed automotive mechanical facility.
              </p>
              
              <div className="bg-[#121212] border border-white/[0.05] rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold tracking-wider text-white uppercase text-red-400">Core Asset Scope Limit</h3>
                <p className="text-sm text-gray-400">
                  The Auto King USA strictly warrants the underlying <strong className="text-white">engine blocks and structural transmission casings</strong>. Auxiliary bolt-on elements—such as alternators, starters, power steering pumps, A/C compressors, complex sensory wiring looms, intake/exhaust manifolds, or torque converters—may be left on the unit complementarily for shipping convenience, but are explicitly **excluded from all warranty adjustments**.
                </p>
                <div className="border-t border-white/[0.05] pt-3 text-xs text-gray-500">
                  Warranty coverage parameters apply only to structural fractures, internal block mechanical failure, or broken casing grids verified by our engineering desk.
                </div>
              </div>

              <p className="text-sm text-gray-400">
                Your coverage matrix is **completely digitized** within our network logs—no physical card is required. To initiate validation checks, connect with our service desks providing your registered order tracking name, contact phone, or unique order verification ID token.
              </p>
            </section>

            {/* Section 2: Technical Condition Requirements */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-wide">Technical Condition Protocols</h2>
              <p>
                To maintain standard claims eligibility, verification steps must satisfy these two structural conditions:
              </p>
              <ul className="space-y-2 text-sm pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>The mechanical component must remain completely in its pristine, unaltered physical structure and original crating envelope.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>Brand new main gaskets, technical dynamic seals, and manufacturer-specified fluids must be fully replaced and documented at the point of installation.</span>
                </li>
              </ul>
              <p className="text-sm text-gray-400 pt-1">
                If structural structural defects are authenticated by our desk, remediation resolves via a matching grade <strong className="text-white">Replacement Component Allocation</strong>. If a matching model cannot be secured, a clean refund will be issued straight back to the original funding source.
              </p>
              <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4 text-[14px] text-red-400 font-medium">
                ⚠️ Labor fees—including mechanics workshop hours, removal processes, towing costs, car rentals, or external field diagnostic assessments—are absolutely non-reimbursable under any structural context.
              </div>
            </section>

            {/* Section 3: Warranty Exclusions */}
            <section className="space-y-4 bg-[#121212] border border-white/[0.04] p-6 sm:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Ban size={20} className="text-red-500" />
                Warranty Exclusions & Void Vectors
              </h2>
              <p className="text-sm text-gray-400">
                Your protection framework becomes instantly void and non-actionable under any of the following processing scenarios:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-gray-400">
                <li className="bg-white/[0.01] border border-white/[0.05] p-3 rounded-xl flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 shrink-0" /> Missing clear mechanic DTC diagnostic code reports.
                </li>
                <li className="bg-white/[0.01] border border-white/[0.05] p-3 rounded-xl flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 shrink-0" /> DIY or non-licensed workshop setups.
                </li>
                <li className="bg-white/[0.01] border border-white/[0.05] p-3 rounded-xl flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 shrink-0" /> Failure to document fresh fluid/gasket swaps.
                </li>
                <li className="bg-white/[0.01] border border-white/[0.05] p-3 rounded-xl flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 shrink-0" /> Starvation of lubrication or heat damage.
                </li>
                <li className="bg-white/[0.01] border border-white/[0.05] p-3 rounded-xl flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 shrink-0" /> Internal parts alteration or missing casing cores.
                </li>
                <li className="bg-white/[0.01] border border-white/[0.05] p-3 rounded-xl flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 shrink-0" /> Exceeding the 30-day temporal window limit.
                </li>
              </ul>
            </section>

            {/* Section 4: Claims Process Checklist */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <ClipboardList size={20} className="text-red-500" />
                Administrative Claims Protocol
              </h2>
              <p>
                To initialize an active validation review, your technician must prepare a processing portfolio containing:
              </p>
              <ul className="space-y-2 text-sm pl-4 list-decimal text-gray-400">
                <li>Your master digital <strong className="text-white">Order Reference Identifier</strong>.</li>
                <li>A formal diagnostic data readout printout detailing specific active <strong className="text-white">Diagnostic Trouble Codes (DTC)</strong>.</li>
                <li>High-resolution photographic capture or video footage capturing the structural component fault.</li>
              </ul>
              <p className="text-sm text-gray-400">
                The Auto King USA reserves the right to request core return transport for structural verification. Diagnostics require **7–14 business days** to clear processing channels before delivery instructions or replacement assets pass dispatch control.
              </p>
            </section>

            {/* Section 5: Return Window Details */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <RefreshCw size={18} className="text-red-500" />
                Return Window & Processing Levies
              </h2>
              <p>
                Damaged or missing components must be documented and submitted within **7–14 business days** following terminal freight handoff. If an asset is signed for on the official Proof of Delivery (POD) manifest acknowledging clean condition despite visible freight crate structural compromises, future adjustments may be denied.
              </p>
              <p className="text-sm text-gray-400">
                Approved customer-reversal returns that do not present inherent core manufacturing failures are subject to an administrative **40% restocking levy** to absorb engineering test and configuration handling overheads.
              </p>
            </section>

            {/* Section 6: Liability Ceilings */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Scale size={19} className="text-red-500" />
                Consequential Liability Ceilings
              </h2>
              <p>
                Because our company inventories genuine, high-caliber recycled assemblies, minor cosmetic superficial rust elements or engine grime are normal properties. The Auto King USA assumes zero liability over:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <li className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">Mid-Transit Delays</li>
                <li className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">Missed Garage Slots</li>
                <li className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">Wrong Drop Coordinates</li>
              </ul>
              <p className="text-sm text-gray-400">
                Our ultimate operational liability profile is tightly confined to either issuing a ledger adjustment refund or arranging a direct physical component exchange.
              </p>
            </section>

            {/* Section 7: Chargeback Arbitration Protection Banner */}
            <section className="bg-gradient-to-br from-[#1c1212] to-[#120d0d] border border-red-950/60 p-6 sm:p-8 rounded-2xl space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 text-red-500">
                <AlertOctagon size={20} />
                Chargeback Waiver & Direct Arbitration Clause
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                By processing your order and authorization checkout sequence through our merchant environment, the buyer explicitly agrees to settle any warranty disputes directly through our technical support frameworks. <strong className="text-white">Customers knowingly waive any rights to file credit card processing chargebacks</strong> regarding warranty assessments without first granting our claims dispatch desk a full window to review and resolve the administrative profile.
              </p>
            </section>

            {/* Section 8: Support Routing Actions */}
            <section className="border-t border-white/[0.08] pt-10 mt-6 text-center space-y-4">
              <h2 className="text-xl font-bold text-white">Connect With Our Warranty Technicians</h2>
              <p className="text-gray-400 max-w-md mx-auto text-sm">
                Need to document diagnostic readouts, verify coverage logs, or request part exchange routing steps? Reach out immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-2">
                <a
                  href="tel:+18664865915"
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl flex-1 transition-colors shadow-lg shadow-red-950/30 focus:outline-none"
                >
                  <Phone size={15} fill="currentColor" stroke="none" />
                  <span>+1 (866) 486-5915</span>
                </a>
                <a
                  href="mailto:support@theautokingusa.com"
                  className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-white font-bold text-sm px-6 py-3.5 rounded-xl flex-1 transition-colors focus:outline-none"
                >
                  <Mail size={15} />
                  <span>Email Processing</span>
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

    </div>
  );
}