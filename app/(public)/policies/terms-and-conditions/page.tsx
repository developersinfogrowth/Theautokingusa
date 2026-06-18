import Link from 'next/link';
import { ArrowLeft, FileText, ShieldCheck, ShoppingCart, CreditCard, Truck, RefreshCw, AlertTriangle, Hammer, Scale, Phone, Mail } from 'lucide-react';


import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "TheAutoKingUSA - Terms & Conditions | Legal & Usage Policy",
    description:
      "Read The Auto King USA Terms & Conditions covering product purchases, payments, shipping rules, cancellations, and legal usage policies.",
    keywords: [
      "terms and conditions",
      "auto parts terms",
      "The Auto King USA legal policy",
      "used engine purchase terms",
      "transmission purchase policy",
      "shipping terms auto parts",
      "refund and cancellation policy USA"
    ],
    authors: [{ name: "The Auto King USA" }],
    publisher: "The Auto King USA",
    robots: "index, follow",

    alternates: {
      canonical: "http://localhost:3000/policies/terms-conditions",
    },

    openGraph: {
      title: "Terms & Conditions | TheAutoKingUSA",
      description:
        "Legal terms governing purchases, shipping, payments, cancellations, and usage of The Auto King USA services.",
      url: "http://localhost:3000/policies/terms-conditions",
      siteName: "The Auto King USA",
      type: "article",
    },

    twitter: {
      card: "summary",
      title: "Terms & Conditions | TheAutoKingUSA",
      description:
        "Read legal terms for buying engines & transmissions from The Auto King USA.",
    },

    other: {
      language: "en",
    },
  };
}


export default function TermsConditionsPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white antialiased selection:bg-red-600 selection:text-white">
      
    

      <main className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Back button removed per user request */}

          {/* Header Section */}
          <header className="border-b border-white/[0.08] pb-8 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-red-600/10 border border-red-600/30 text-red-500 mb-3">
              Legal Framework
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Terms & Conditions
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-medium">
              Terms Governing the Use of The Auto King USA Services
            </p>
          </header>

          {/* Core Content Stack */}
          <div className="space-y-10 text-gray-300 leading-relaxed text-[15px] sm:text-[16px]">
            
            {/* Context Summary */}
            <p>
              By accessing the <strong className="text-white">The Auto King USA</strong> digital commerce platform, engaging our consulting staff, or finalizing a component purchase order, you expressly consent to align with and be bound by the following master Terms and Conditions. Please analyze these protocols thoroughly before authorizing a transaction.
            </p>

            {/* Section 1: General Terms */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <FileText size={20} className="text-red-500" />
                General Terms of Service
              </h2>
              <p>
                Navigating our online catalog or submitting an authenticated checkout token constitutes binding contractual acceptance of these Terms and Conditions. These rules apply universally to all digital procurement records, invoice logs, and operational communications with The Auto King USA.
              </p>
            </section>

            {/* Section 2: Product Specifications */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-red-500" />
                Product Information & Description Metrics
              </h2>
              <p>
                Our inventory group exercises maximum caution to list accurate physical descriptions, tech specs, and pricing structures. However, The Auto King USA does not legally guarantee that product details are entirely error-free. We reserve express authority to correct clear typos, catalog mismatches, or adjust invoice tallies retroactively without prior notice.
              </p>
            </section>

            {/* Section 3: Order Cancellations */}
            <section className="space-y-4 bg-[#121212] border border-white/[0.04] p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <ShoppingCart size={20} className="text-red-500" />
                Order Acceptance & Cancellation Guidelines
              </h2>
              <p className="text-sm text-gray-400">
                Receipt of automated order validation keys does not establish absolute order fulfillment commitment. We explicitly reserve the right to decline or suspend any transaction profile at our singular operational discretion.
              </p>
              
              {/* Cancellation Matrix Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-gray-400">
                <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <span className="text-red-500 font-bold block mb-1">24-Hour Horizon Limit</span>
                  Orders cannot be altered or self-canceled after 24 hours of initialization.
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <span className="text-red-500 font-bold block mb-1">Pre-Shipment Penalty</span>
                  Cancellations approved prior to warehouse dispatch incur a 20% processing fee.
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl sm:col-span-2 text-center">
                  <span className="text-red-500 font-bold block mb-1">Post-Shipment Lockout (50% Fee)</span>
                  Orders that have processed through freight carrier loading bays are entirely locked. Any approved mid-route cancellation forces a 50% handling containment penalty.
                </div>
              </div>
            </section>

            {/* Section 4: Pricing & Ledger Policy */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-wide">Pricing Adjustments</h2>
              <p>
                Market inventory pricing remains fluid and subject to change without notification. In the rare event a component displays a gross configuration calculation error, The Auto King USA maintains the explicit authority to cancel the transaction loop and execute a total financial reversal to the purchasing card.
              </p>
            </section>

            {/* Section 5: Secure Payment & Chargeback Waivers */}
            <section className="space-y-3 border-l-2 border-red-600 pl-4 py-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <CreditCard size={19} className="text-red-500" />
                Payment Processing & Chargeback Waivers
              </h2>
              <p>
                Complete payment authorization must be finalized before components transition to physical testing phases. By completing an acquisition transaction, the buyer explicitly agrees **not to register independent chargebacks** or payment disputes with credit card brands. All post-sale complaints must follow our designated operational resolution paths.
              </p>
            </section>

            {/* Section 6: Shipping and Commercial Demands */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Truck size={20} className="text-red-500" />
                Shipping Timelines & Commercial Drop Specifications
              </h2>
              <p>
                Freight consolidation arrangements typically span across **7–14 business days** post payment clearing. Tracking telemetry parameters will be broadcast within 2 business days from core dispatch windows. 
              </p>
              <p className="text-sm text-gray-400">
                Heavy powertrain assemblies require drop coordinates tied to commercial zones containing functional liftgates or forklifts. If auxiliary unloading mechanisms are completely absent during unboxing, an independent **$100–$150 freight access surcharge** will be collected within 30–45 days via our authorized merchant gateway.
              </p>
            </section>

            {/* Section 7: Returns Matrix */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <RefreshCw size={18} className="text-red-500" />
                Returns & Restocking Framework
              </h2>
              <p>
                Defective, missing, or shorted components must be formally reported within a strict **7 business days** tracking window from physical arrival. Returns are evaluated within 7-14 business days following warehouse inspection and require high-resolution photos and trouble code diagnostics. Approved returns not linked to structural product errors will sustain a **20% to 50% restocking fee** based on the specific core volume, alongside complete return shipping overheads.
              </p>
            </section>

            {/* Section 8: Liability Caps */}
            <section className="space-y-3 bg-[#121212] border border-white/[0.04] p-5 rounded-xl">
              <h2 className="text-base font-bold text-white uppercase tracking-wider text-red-400">
                Limitation of Operational Liability
              </h2>
              <p className="text-sm text-gray-400">
                The Auto King USA disclaims all liability regarding indirect, incidental, or consequential financial damages. We assume no legal responsibility for freight delays arising from faulty buyer address lines, nor do we reimburse mechanic garage costs, shop fees, or losses exceeding the baseline acquisition cost of the invoiced item.
              </p>
            </section>

            {/* Section 9: Installation Responsibility */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Hammer size={19} className="text-red-500" />
                Installation Protocols & Certification Rules
              </h2>
              <p>
                All powertrain modules undergo rigorous quality assurance testing before crating. Components are thoroughly drained of engine oil and coolants for transit regulatory compliance. 
              </p>
              <p className="text-sm text-gray-400">
                The buyer assumes complete responsibility to install brand new gaskets, engine seals, oil filters, and manufacturer-recommended fluid formulations. Installation **must be managed exclusively by a licensed automotive repair facility**. Self-executed or uncertified garage builds instantly void all coverage terms.
              </p>
            </section>

            {/* Section 10: Legal Boilerplate */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400 border-t border-white/[0.08] pt-8">
              <div>
                <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Intellectual Property</h4>
                All graphic design layout structures, text blocks, code strings, logos, and digital branding elements are the exclusive asset property of The Auto King USA. Alternate distribution without authorization is prohibited.
              </div>
              <div>
                <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Governing Judicial Law</h4>
                These Terms and Conditions are built under and governed by the laws of the operating state of corporate establishment. Any escalated legal resolution paths are confined to corresponding federal or local state court districts.
              </div>
            </section>

            {/* Section 11: Support Routing Panel */}
            <section className="border-t border-white/[0.08] pt-10 mt-6 text-center space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <Scale size={20} className="text-red-500" />
                Need Clarification on Our Terms?
              </h2>
              <p className="text-gray-400 max-w-md mx-auto text-sm">
                Our support division is open to clarify any of our sales policies, procurement parameters, or billing guidelines.
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
                  <span>Email Inquiries</span>
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

     
    </div>
  );
}