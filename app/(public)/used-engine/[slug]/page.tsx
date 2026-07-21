import { createClient } from "@supabase/supabase-js";
import PartPage from "@/app/components/parts/PartPage";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Helpers ───────────────────────────────────────────────────
// Locations now live under /used-engine/[slug] (their canonical home),
// alongside engines. We fetch each type with its own original filter
// (engines: no status check, as before — locations: status=published,
// as before) rather than one merged query, so neither type's existing
// visibility rules change.
async function fetchEnginePart(slug: string) {
  const { data } = await supabase
    .from("autoking_brands")
    .select("*")
    .eq("slug", slug)
    .eq("type", "engine")
    .single();

  return data;
}

async function fetchLocationPart(slug: string) {
  const { data } = await supabase
    .from("autoking_brands")
    .select("*")
    .eq("slug", slug)
    .eq("type", "location")
    .eq("status", "published")
    .single();

  return data;
}

// ── Static params ─────────────────────────────────────────────
export async function generateStaticParams() {
  const [{ data: engines, error: engineError }, { data: locations, error: locationError }] =
    await Promise.all([
      supabase.from("autoking_brands").select("slug").eq("type", "engine"),
      supabase
        .from("autoking_brands")
        .select("slug")
        .eq("type", "location")
        .eq("status", "published"),
    ]);

  if (engineError) {
    console.error("Used-engine static params error:", engineError);
  }

  if (locationError) {
    console.error("Location static params error:", locationError);
  }

  const engineSlugs = engines ?? [];
  const locationSlugs = locations ?? [];

  return [...engineSlugs, ...locationSlugs].map((row) => ({ slug: row.slug }));
}

// ── SEO Metadata ──────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const part = (await fetchEnginePart(slug)) ?? (await fetchLocationPart(slug));

  if (!part) return {};

  const isLocation = part.type === "location";
  const url = `${baseUrl}/used-engine/${slug}`;
  const defaultImage = isLocation
    ? `${baseUrl}/default-location.png`
    : `${baseUrl}/default-engine.png`;

  return {
    title: part.seo_title || part.title,
    description: part.seo_description || part.description,
    keywords: Array.isArray(part.seo_keywords)
      ? part.seo_keywords.join(", ")
      : part.seo_keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: part.seo_title || part.title,
      description: part.seo_description || part.description || undefined,
      url,
      siteName: "AutoKing",
      type: "website",
      images: [
        {
          url: part.image ?? defaultImage,
          width: 1200,
          height: 630,
          alt: part.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: part.seo_title || part.title,
      description: part.seo_description || part.description || undefined,
      images: [part.image ?? defaultImage],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────
export default async function UsedEnginePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const part = (await fetchEnginePart(slug)) ?? (await fetchLocationPart(slug));

  if (!part) return null;

  const isLocation = part.type === "location";
  const url = `${baseUrl}/used-engine/${slug}`;

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
        name: isLocation ? "Locations" : "Used Engines",
        item: isLocation
          ? `${baseUrl}/location/`
          : `${baseUrl}/used-engines/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: part.title,
        item: url,
      },
    ],
  };

  const detailSchema = isLocation
    ? {
        "@context": "https://schema.org",
        "@type": "AutoPartsStore",
        name: part.title,
        description: part.seo_description || part.description,
        image: part.image ?? `${baseUrl}/default-location.png`,
        url,
        brand: { "@type": "Brand", name: "AutoKing" },
        areaServed: { "@type": "AdministrativeArea", name: part.title },
        provider: { "@type": "Organization", name: "AutoKing" },
      }
    : {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(detailSchema) }}
      />

      <PartPage slug={slug} type={part.type} />
    </>
  );
}