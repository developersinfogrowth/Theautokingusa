import Link from 'next/link';
import { ArrowLeft, Shield, EyeOff, Lock, RefreshCw, FileText, Mail, Phone } from 'lucide-react';

import { BRANDING } from '@/app/components/constants/branding';
import { Metadata } from 'next';



export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "TheAutoKingUSA - Quality Used Engines & Transmissions | TheAutoKingUSA",
    description: "Get quality used engines and transmissions in A Grade condition.",
    keywords: [
      "used engines",
      "used transmissions",
      "A Grade engines",
      "auto parts USA",
      "The Auto King USA",
      "engine warranty",
      "privacy policy"
    ],
    authors: [{ name: "The Auto King USA" }],
    publisher: "The Auto King USA",
    robots: "index, follow",

    alternates: {
      canonical: "http://localhost:3000/policies/privacy-policy",
    },

    openGraph: {
      title: "Privacy Policy | TheAutoKingUSA",
      description: "Get quality used engines and transmissions in A Grade condition.",
      url: "http://localhost:3000/policies/privacy-policy",
      siteName: "The Auto King USA",
      type: "article",
    },

    other: {
      language: "en",
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white antialiased selection:bg-red-600 selection:text-white">
     
      <main className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Back button removed per user request */}

          {/* Article Header */}
          <header className="border-b border-white/[0.08] pb-8 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-red-600/10 border border-red-600/30 text-red-500 mb-3">
              Security & Trust
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-medium">
              Your Information, Our Absolute Commitment.
            </p>
          </header>

          {/* Article Body Content */}
          <div className="space-y-10 text-gray-300 leading-relaxed text-[15px] sm:text-[16px]">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <p>
                At <strong className="text-white">The Auto King USA</strong>, safeguarding your privacy is our primary concern. We recognize the importance of trust when you provide personal information online, and we are completely dedicated to protecting it. This Privacy Policy explains our rigorous data collection, usage, and security measures.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4 bg-[#121212] border border-white/[0.04] p-6 sm:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Shield size={20} className="text-red-500" />
                Information We Collect
              </h2>
              <p>
                We collect personal information that you voluntarily share with us when using our web platform, including:
              </p>
              <ul className="space-y-3 mt-2 pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Part Request Form:</strong> Your name and email address are safely collected to process your specific component inquiries and facilitate quick, direct communication.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Order Information:</strong> We gather fundamental contact details and your verified billing address to confirm your purchase pipeline, process payments securely, and ensure timely freight logistics of your auto parts.
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-wide">
                How We Use Your Information
              </h2>
              <div className="grid grid-cols-1 gap-4 pt-2">
                <div className="border-l-2 border-red-600/40 pl-4 py-1">
                  <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-1">Processing Requests</h3>
                  <p className="text-gray-400 text-[14px]">Your contact details are essential for communicating regarding your part availability, checking configuration data, and ensuring smooth transactions.</p>
                </div>
                <div className="border-l-2 border-red-600/40 pl-4 py-1">
                  <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-1">Order Fulfillment</h3>
                  <p className="text-gray-400 text-[14px]">We utilize your data to confirm logistics pipelines, verify credit metrics for fast secure checkouts, and dispatch powertrain units immediately.</p>
                </div>
                <div className="border-l-2 border-red-600/40 pl-4 py-1">
                  <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-1">Website Improvement</h3>
                  <p className="text-gray-400 text-[14px]">We may analyze anonymous, aggregated user metrics to optimize application speed, content layout, and cross-browser integration. This metadata cannot identify specific users.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <EyeOff size={20} className="text-red-500" />
                We Do Not Sell Your Information
              </h2>
              <p>
                We do not engage in the sale, rental, or sharing of your personal data records with third-party tracking corporations. However, we may securely disclose information in highly constrained contexts such as:
              </p>
              <p className="text-gray-400 bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-[14px]">
                <strong className="text-white font-medium">Fulfillment Partners:</strong> Hand-picked, trusted freight and logistics partners who assist with automated order processing and secure terminal delivery. These networks are bound by strict legal agreements to safeguard your information completely.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4 bg-gradient-to-br from-[#141414] to-[#111] border border-white/[0.06] p-6 sm:p-8 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Lock size={20} className="text-red-500" />
                Security Measures
              </h2>
              <p>
                We employ advanced Secure Sockets Layer (SSL) technology with high-grade encryption parameters for online transactions to guarantee maximum perimeter protection. This protocol instantly encrypts data packets prior to transit.
              </p>
              <p>
                <strong className="text-white">The Auto King USA</strong> continuously maintains strict PCI Compliance validation matrices to ensure all user payment data flows securely through protected gateways without exposure risks.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <RefreshCw size={18} className="text-red-500" />
                Policy Updates
              </h2>
              <p>
                Any strategic structural adjustments to this Privacy Policy architecture will be instantly updated on our website’s primary domain layout at <span className="text-red-400 font-medium">theautokingusa.com</span> to ensure our client base remains completely informed regarding data collection handling.
              </p>
            </section>

            {/* Section 7 - Interactive Footer Contact Target */}
            <section className="border-t border-white/[0.08] pt-10 mt-6 space-y-4">
              <h2 className="text-xl font-bold text-white">Contact Our Privacy Team</h2>
              <p className="text-gray-400">
                For any immediate administrative queries, data deletion requests, or security validation concerns regarding this documentation, connect with us directly:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="tel:+18664865915"
                  className="flex items-center gap-3 bg-[#161616] border border-white/[0.08] hover:border-red-600/40 rounded-xl p-4 flex-1 transition-all group focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-950/30 border border-red-900/30 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Call Directly</div>
                    <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">+1 (866) 486-5915</div>
                  </div>
                </a>
                <a
                  href="mailto:support@theautokingusa.com"
                  className="flex items-center gap-3 bg-[#161616] border border-white/[0.08] hover:border-red-600/40 rounded-xl p-4 flex-1 transition-all group focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-950/30 border border-red-900/30 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Inquiry</div>
                    <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">support@theautokingusa.com</div>
                  </div>
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

    </div>
  );
}