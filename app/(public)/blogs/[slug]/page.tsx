// app/(public)/blogs/[slug]/page.tsx
import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AutoKingBlogDetailPage from "@/app/components/Blogs/AutoKingBlogDetailPage";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.theautokingusa.com";

const defaultBlogImage = `${baseUrl}/default-blog.jpg`;

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
  const { data } = await supabase
    .from("blogs_autoking")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data;
}

function parseFaqs(raw: unknown): FAQItem[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as FAQItem[];
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as FAQItem[];
    } catch {
      return [];
    }
  }
  return [];
}

function getValidImageUrl(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    return defaultBlogImage;
  }

  const imageUrl = value.trim();

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return new URL(imageUrl, baseUrl).toString();
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from("blogs_autoking")
    .select("slug")
    .eq("is_published", true);
  return (data ?? []).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return {};

  const coverImage = getValidImageUrl(blog.cover_image);

  return {
    metadataBase: new URL(baseUrl),
    title: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt,
    keywords: blog.seo_keywords?.join(", "),
    alternates: { canonical: `${baseUrl}/blogs/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt,
      url: `${baseUrl}/blogs/${slug}`,
      siteName: "The AutoKing USA",
      type: "article",
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: blog.title || "The AutoKing USA blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt,
      images: [coverImage],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const url = `${baseUrl}/blogs/${slug}`;
  const faqs = parseFaqs(blog.faqs);
  const coverImage = getValidImageUrl(blog.cover_image);

  // ── BreadcrumbList ────────────────────────────────────────────────────────
  // https://schema.org/BreadcrumbList
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
        name: "Blog",
        item: `${baseUrl}/blogs/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: url,
      },
    ],
  };

  // ── BlogPosting ───────────────────────────────────────────────────────────
  // Required by Google: headline, image, datePublished, author
  // https://developers.google.com/search/docs/appearance/structured-data/article
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title, // required, max 110 chars
    description: blog.seo_description || blog.excerpt || "",
    image: [coverImage], // required — array form preferred
    author: {
      "@type": "Person", // Person preferred over Org for bylines
      name: blog.author_name || "The AutoKing USA Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "The AutoKing USA",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/branding/logo1.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: blog.created_at, // required — ISO 8601
    dateModified: blog.updated_at || blog.created_at, // recommended
    keywords: blog.seo_keywords?.join(", ") || "",
    url,
  };

  // ── FAQPage ───────────────────────────────────────────────────────────────
  // Only inject if FAQs exist — empty FAQPage schema is invalid
  // https://developers.google.com/search/docs/appearance/structured-data/faqpage
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* All three schemas injected server-side — Googlebot sees them without JS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <AutoKingBlogDetailPage blog={blog} />
    </>
  );
}