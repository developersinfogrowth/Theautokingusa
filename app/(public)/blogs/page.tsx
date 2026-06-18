import BlogPage from "./BlogPage";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata = {
  title: "Auto Parts Blogs, Buying Guides & Maintenance Tips | AutoKing",
  description:
    "Explore expert articles on used engines, transmissions, auto parts, vehicle maintenance, buying guides, and repair solutions from AutoKing.",
  keywords: [
    "used engines",
    "used transmissions",
    "engine replacement blogs",
    "transmission replacement",
    "auto parts blogs",
    "vehicle engine guide",
    "engine compatibility",
    "transmission compatibility",
    "used auto parts",
    "engine maintenance",
    "transmission maintenance",
    "AutoKing",
    "TheAutoKingUSA",
    "automotive blogs",
    "car engine blogs",
    "vehicle repair guides",
    "auto repair tips",
    "used OEM parts",
    "engine troubleshooting",
    "transmission troubleshooting",
  ],
  alternates: {
    canonical: `${baseUrl}/blogs`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [
    {
      name: "AutoKing",
      url: `${baseUrl}`,
    },
  ],
  publisher: "AutoKing",
  openGraph: {
    title: "Used Engines & Transmissions Blogs | AutoKing",
    description:
      "Read automotive blogs covering used engines, transmissions, replacement guides, auto parts insights, and vehicle repair solutions from AutoKing.",
    url: `${baseUrl}/blogs`,
    siteName: "AutoKing",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/og-blog-cover.webp`,
        width: 1200,
        height: 630,
        alt: "AutoKing Resource Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Engines & Transmissions Blogs | AutoKing",
    description:
      "Explore expert blogs on used engines, transmissions, automotive parts, and vehicle repair solutions from AutoKing.",
    site: "@theautokingusa",
    images: [`${baseUrl}/images/og-blog-cover.webp`],
  },
};

const blogsStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Used Engines & Transmissions Blogs",
  description:
    "Browse automotive blogs about used engines, transmissions, vehicle maintenance, replacement guides, and auto parts from AutoKing.",
  url: `${baseUrl}/blogs`,
  publisher: {
    "@type": "Organization",
    name: "AutoKing",
    url: `${baseUrl}`,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
    },
  },
};

export default function Page() {
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
        name: "Blogs",
        item: `${baseUrl}/blogs`,
      },
    ],
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* Blogs Collection Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogsStructuredData),
        }}
      />
      <BlogPage />
    </>
  );
}