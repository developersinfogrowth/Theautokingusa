import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Truck, Award, Scale, RefreshCw, CheckCircle2, ShieldAlert, CreditCard, Phone } from 'lucide-react';

/* ✅ SEO METADATA (App Router BEST PRACTICE) */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "TheAutoKingUSA - Quality Used Engines & Transmissions | TheAutoKingUSA",
    description: "Get quality used engines and transmissions in A Grade condition.",
    keywords: [
      "used engines",
      "used transmissions",
      "A grade engines",
      "auto parts USA",
      "The Auto King USA",
      "engine replacement",
      "transmission replacement"
    ],
    authors: [{ name: "The Auto King USA" }],
    publisher: "The Auto King USA",
    robots: "index, follow",
    alternates: {
      canonical: "http://localhost:3000/policies",
    },
    openGraph: {
      title: "TheAutoKingUSA - Quality Used Engines & Transmissions",
      description: "Get quality used engines and transmissions in A Grade condition.",
      url: "http://localhost:3000/policies",
      siteName: "The Auto King USA",
      type: "website",
    }
  };
}

export default function PoliciesPage() {
  const hideReadMore = [
    "quality-assurance",
    "compatibility-guarantee",
    "payment-security",
  ];

  const policies = [
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      icon: Shield,
      content:
        "Your personal information is protected and never shared with third parties. We use industry-standard SSL encryption for all transactions. Your contact information is used solely for order fulfillment and customer support. You can opt out of promotional emails at any time."
    },
    {
      id: "shipping-policy",
      title: "Shipping & Delivery",
      icon: Truck,
      content:
        "The Auto King USA processes orders after payment confirmation by verifying availability and sharing product images for approval. Once approved, items ship via freight within 7–14 business days. Customers must provide accurate shipping details and inspect deliveries upon arrival. Return shipping costs apply, and a 35% restocking fee may be charged for returns."
    },
    {
      id: "warranty-policy",
      title: "Warranty Policy",
      icon: Award,
      content:
        "All engines and transmissions come with a comprehensive 2-year manufacturer warranty covering defects in materials and workmanship. Warranty covers parts and labor for repairs. Installation errors or misuse are not covered. Warranty is non-transferable and requires proper registration within 30 days of purchase."
    },
    {
      id: "terms-and-conditions",
      title: "Terms & Conditions",
      icon: Scale,
      content:
        "By purchasing from The Auto King USA, you agree to our terms and conditions. All products are sold as-is with the exception of the posted warranty. Prices are subject to change without notice. We reserve the right to refuse service to customers who violate our policies."
    },
    {
      id: "return-refund-policy",
      title: "Return Policy",
      icon: RefreshCw,
      content:
        "We offer a 30-day return policy on all products. Items must be unused and in original packaging. Return shipping is free for defective or incompatible items. Please contact our support team within 30 days of delivery to initiate a return. Refunds are processed within 5-7 business days after item inspection."
    },
    {
      id: "quality-assurance",
      title: "Product Quality Assurance",
      icon: CheckCircle2,
      content:
        "All our engines and transmissions undergo rigorous testing before shipment including pressure testing, compression testing, and visual inspection. Every product is certified as A-Grade condition. We maintain detailed service records and inspection reports for all items."
    },
    {
      id: "compatibility-guarantee",
      title: "Compatibility Guarantee",
      icon: ShieldAlert,
      content:
        "We ensure compatibility before shipping. Our team verifies vehicle specifications with every order. If compatibility issues arise, contact us within 30 days for a replacement or refund. We provide detailed compatibility information for all products."
    },
    {
      id: "payment-security",
      title: "Payment & Security",
      icon: CreditCard,
      content:
        "We accept all major payment methods and process transactions securely. Your payment information is encrypted and never stored. Payments are processed through PCI-compliant payment processors. Invoices and receipts are provided for all purchases."
    }
  ];

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white antialiased selection:bg-red-600 selection:text-white">

      <main>

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#161616] via-[#0f0f0f] to-[#0b0b0b] py-16 sm:py-24 border-b border-white/[0.04]">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-red-600/10 border border-red-600/30 text-red-500 mb-4">
              Legal & Transparency
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Policies & Information
            </h1>

            <p className="text-gray-400">
              Transparency, absolute quality assurance, and customer protection are our core priorities.
            </p>
          </div>
        </section>

        {/* POLICIES */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">

            {policies.map((policy) => {
              const Icon = policy.icon;

              return (
                <article
                  key={policy.id}
                  id={policy.id}
                  className="bg-[#121212] border border-white/[0.06] rounded-2xl p-6"
                >
                  <div className="flex gap-4">

                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.03]">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">{policy.title}</h2>
                      <p className="text-gray-400 mt-2">{policy.content}</p>

                      {!hideReadMore.includes(policy.id) && (
                        <Link
                          href={`/policies/${policy.id}`}
                          className="text-red-500 text-sm mt-3 inline-block"
                        >
                          Read Full Sub-Policy →
                        </Link>
                      )}
                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        </section>

        {/* SUPPORT */}
        <section className="border-t border-white/[0.05] py-16 text-center">
          <h2 className="text-2xl font-bold">Questions About Our Policies?</h2>
          <p className="text-gray-400 mt-2">
            Our support team is ready to help.
          </p>

          <a
            href="tel:+18664865915"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-red-600 rounded-xl"
          >
            <Phone size={18} />
            Call Us Now
          </a>
        </section>

      </main>

    </div>
  );
}