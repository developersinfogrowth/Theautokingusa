"use client";

interface HeroSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    image?: string;
    ctaText?: string;
  };
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="py-20 text-center">
      {data?.title && <h1 className="text-4xl font-bold">{data.title}</h1>}
      {data?.subtitle && <p className="mt-2 text-gray-600">{data.subtitle}</p>}
    </section>
  );
}