import { createClient } from "@supabase/supabase-js";
import PartPage from "@/app/components/parts/PartPage";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Static params ─────────────────────────────────────────────
export async function generateStaticParams() {
  const { data } = await supabase
    .from("autoking_brands")
    .select("slug")
    .eq("type", "transmission");

  return (data ?? []).map((row) => ({ slug: row.slug }));
}

// ── SEO Metadata ──────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { data: part } = await supabase
    .from("autoking_brands")
    .select("*")
    .eq("slug", slug)
    .eq("type", "transmission")
    .single();

  if (!part) return {};

  const url = `${baseUrl}/used-transmission/${slug}`;

  return {
    title: part.seo_title || part.title,
    description: part.seo_description,
    keywords: part.seo_keywords?.join(", "),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: part.seo_title || part.title,
      description: part.seo_description ?? undefined,
      url,
      siteName: "AutoKing",
      type: "website",
      images: [{
        url: part.image ?? `${baseUrl}/default-transmission.png`,
        width: 1200,
        height: 630,
        alt: part.title,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: part.seo_title || part.title,
      description: part.seo_description ?? undefined,
      images: [part.image ?? `${baseUrl}/default-transmission.png`],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────
export default async function TransmissionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { data: part } = await supabase
    .from("autoking_brands")
    .select("*")
    .eq("slug", slug)
    .eq("type", "transmission")
    .single();

  if (!part) return null;

  const url = `${baseUrl}/used-transmissions/${slug}`;

  // ── Breadcrumb Schema (JSON-LD) ── good for Google SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Used Transmissions",
        item: `${baseUrl}/used-transmissions/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: part.title,
        item: url,
      },
    ],
  };

  // ── Product Schema ── helps Google show rich results
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: part.title,
    description: part.seo_description || part.description,
    image: part.image ?? `${baseUrl}/default-transmission.png`,
    brand: {
      "@type": "Brand",
      name: "AutoKing",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "AutoKing",
      },
    },
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <PartPage slug={slug} type="transmission" />
    </>
  );
}