import { createClient } from "@supabase/supabase-js";
import PartPage from "@/app/components/parts/PartPage";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function generateStaticParams() {
  const { data } = await supabase
    .from("autoking_brands").select("slug").eq("type", "engine");
  return (data ?? []).map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { data } = await supabase
    .from("autoking_brands")
    .select("seo_title, seo_description, seo_keywords, title, image")
    .eq("slug", slug).eq("type", "engine").single();
  if (!data) return {};
  return {
    title: data.seo_title || data.title,
    description: data.seo_description,
    keywords: data.seo_keywords?.join(", "),
    alternates: { canonical: `${baseUrl}/used-engine/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: data.seo_title || data.title,
      description: data.seo_description ?? undefined,
      images: [{ url: data.image ?? `${baseUrl}/default-engine.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function EngineDetailPage({
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
    .eq("type", "engine")
    .single();

  if (!part) return null;

  const url = `${baseUrl}/used-engine/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Used Engines", item: `${baseUrl}/used-engines/` },
      { "@type": "ListItem", position: 3, name: part.title, item: url },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: part.title,
    description: part.seo_description || part.description,
    image: part.image ?? `${baseUrl}/default-engine.png`,
    brand: { "@type": "Brand", name: "AutoKing" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: "AutoKing" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <PartPage slug={slug} type="engine" />
    </>
  );
}