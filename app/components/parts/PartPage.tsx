"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CheckCircle, Shield, Award, Truck, ChevronRight, Settings,
} from "lucide-react";
import QuoteForm from "@/app/components/home/hero/QuoteForm";
import Link from "next/link";

interface Props {
  slug: string;
  type: string;
}

// ── BrandIcon ─────────────────────────────────────────────────
function BrandIcon({ title }: { title: string }) {
  const knownBrands = [
    "toyota", "honda", "ford", "chevrolet", "bmw", "mercedes",
    "nissan", "hyundai", "kia", "lexus", "subaru", "mazda",
    "mitsubishi", "volkswagen", "audi", "jeep", "dodge",
    "chrysler", "gmc", "buick", "cadillac", "infiniti",
    "acura", "volvo", "land rover", "jaguar", "porsche",
    "ram", "tesla", "lincoln", "mercury", "pontiac",
    "saturn", "oldsmobile", "hummer", "scion",
  ];

  const titleLower = title.toLowerCase();
  const matched = knownBrands.find((brand) => titleLower.includes(brand));

  if (!matched) {
    return <Settings className="w-7 h-7 text-red-600" />;
  }

  const fileMap: Record<string, string> = {
    "mercedes": "mercedes-benz",
    "land rover": "land-rover",
  };

  const fileName = fileMap[matched] ?? matched;

  return (
    <img
      src={`/car-brands/${fileName}.svg`}
      alt={matched}
      width={38}
      height={38}
      className="object-contain"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

// ── PartPage ──────────────────────────────────────────────────
export default function PartPage({ slug, type }: Props) {
  const [part, setPart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const res = await fetch(`/api/parts/detail?slug=${slug}&type=${type}`);
        if (!res.ok) return;
        const json = await res.json();
        setPart(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPart();
  }, [slug, type]);

  // ── Loading ───────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f]">
      <img
        src="/branding/logo1.webp"
        alt="AutoKing"
        style={{ width: "120px", height: "auto" }}
        className="object-contain animate-pulse"
      />
      <p className="mt-4 text-sm text-white/50">Loading...</p>
      <div className="mt-6 w-10 h-10 border-4 border-red-900 border-t-red-600 rounded-full animate-spin" />
    </div>
  );

  if (!part) return notFound();

  // ── Derived values ────────────────────────────────────────
  const typeLabel =
    type === "engine" ? "Engine"
    : type === "transmission" ? "Transmission"
    : "Part";

  const partTypeHref =
    type === "engine" ? "/used-engines"
    : type === "transmission" ? "/used-transmissions"
    : "/used-engines";

  const heroImageMap: Record<string, string> = {
    engine: "/Hero/engine-image.png",
    transmission: "/Hero/transmission-image.png",
  };
  const heroImage = heroImageMap[type] || heroImageMap["engine"];

  const specs = [
    { label: "Condition", value: "Tested & Inspected",   icon: CheckCircle },
    { label: "Warranty",  value: part.warranty || "Up to 3 Years", icon: Shield },
    { label: "Delivery",  value: "7–10 Days Nationwide",  icon: Truck },
    { label: "Quality",   value: "OEM Certified",         icon: Award },
  ];

  return (
    <main className="min-h-screen bg-[#F4F6FA]">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5 text-[13px]">
          <a href="/" className="text-gray-400 hover:text-red-600 transition-colors">
            Home
          </a>
          <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />
          <a href={partTypeHref} className="text-gray-400 hover:text-red-600 capitalize transition-colors">
            Used {typeLabel}s
          </a>
          <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />
          <span className="text-red-600 font-semibold truncate max-w-[280px]">
            {part.title}
          </span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="grid lg:grid-cols-12 gap-8 xl:gap-10 items-start">

            {/* LEFT — Part info */}
            <div className="lg:col-span-7 flex flex-col gap-7">

              {/* Badge pill */}
              <div className="inline-flex items-center gap-2 self-start
                              bg-red-50 border border-red-200 rounded-full px-3.5 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-red-600 text-[11px] font-bold uppercase tracking-[1.8px]">
                  Genuine {typeLabel} Parts
                </span>
              </div>

              {/* Brand icon + Title */}
              <div className="flex items-center gap-5">
                <div className="shrink-0 w-14 h-14 bg-gray-50 border border-gray-200
                                rounded-xl flex items-center justify-center shadow-sm
                                overflow-hidden p-1">
                  <BrandIcon title={part.title} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold tracking-[2px] text-gray-400 uppercase">
                    Premium Quality
                  </p>
                  <h1 className="text-[1.7rem] sm:text-[2rem] md:text-[2.1rem]
                                 font-bold text-gray-900 leading-snug">
                    {part.title}
                  </h1>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-[14.5px] md:text-[15px] leading-relaxed max-w-2xl">
                {part.description ||
                  `Get the best performance with our certified ${typeLabel.toLowerCase()} units.
                   Save up to 40% compared to buying new while getting OEM quality.`}
              </p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-[#F4F6FA] border border-gray-200 rounded-xl p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <spec.icon className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">
                        {spec.label}
                      </span>
                    </div>
                    <p className="text-[13px] font-bold text-red-600">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="flex gap-3 lg:hidden">
                <a
                  href="tel:+18664865915"
                  className="flex-1 text-center bg-red-600 hover:bg-red-700
                             text-white font-semibold py-3 px-6 rounded-lg transition text-sm"
                >
                  📞 Call Now
                </a>
              </div>

            </div>

            {/* RIGHT — Quote form */}
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div className="bg-[#111111] rounded-2xl border border-white/10
                                shadow-[0_4px_24px_rgba(0,0,0,0.3)] overflow-hidden">
                  <QuoteForm onClose={() => {}} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CONTENT + SIDEBAR ── */}
      <section className="py-10 md:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 xl:gap-10 items-start">

            {/* Rich HTML content */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                <div className="flex items-center gap-3 px-6 md:px-8 py-4
                                border-b border-gray-100 bg-gray-50/60">
                  <div className="w-[3px] h-5 rounded-full bg-red-600" />
                  <span className="text-[11px] font-semibold text-red-600 uppercase tracking-[1.6px]">
                    {typeLabel} Details
                  </span>
                </div>

                <div className="px-6 md:px-8 py-6">
                  <div
                    className="
                     // AFTER
  prose max-w-none
  prose-headings:font-bold
  prose-headings:leading-snug
  prose-h2:text-red-600
  prose-h2:text-[18px] md:prose-h2:text-[20px]
  prose-h2:mt-6 prose-h2:mb-2 prose-h2:pb-1.5
  prose-h2:border-b prose-h2:border-red-100
  prose-h3:text-red-600
  prose-h3:text-[15px] prose-h3:mt-5 prose-h3:mb-1.5
  prose-p:text-gray-600 prose-p:text-[14px]
  prose-p:leading-relaxed prose-p:my-2
  prose-li:text-gray-600 prose-li:text-[14px] prose-li:leading-relaxed
  prose-strong:text-gray-800 prose-strong:font-semibold
  prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
  prose-hr:border-gray-100 prose-hr:my-4
  prose-ul:my-2 prose-ol:my-2
"
                    
                    dangerouslySetInnerHTML={{ __html: part.rich_content }}
                  />
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="sticky top-20 flex flex-col gap-4">

                {/* Part image card */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                  <div className="flex items-center justify-between px-5 py-3
                                  border-b border-gray-100 bg-gray-50/60">
                    <div className="flex items-center gap-2">
                      <div className="w-[3px] h-4 rounded-full bg-red-600" />
                      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[1.6px]">
                        {typeLabel} Assembly
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200
                                    rounded-full px-2.5 py-0.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span className="text-[10px] font-semibold text-emerald-700 tracking-wide uppercase">
                        OEM Certified
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-b from-[#f4f6fa] to-white flex items-center
                               justify-center px-6 py-6 min-h-[200px] cursor-pointer
                               hover:opacity-95 transition"
                  >
                    {part.image ? (
                      <img
                        src={part.image}
                        alt={part.title}
                        style={{ width: "100%", height: "auto", maxHeight: "210px" }}
                        className="object-contain drop-shadow-lg"
                      />
                    ) : (
                      <Image
                        src={heroImage}
                        alt={typeLabel}
                        width={320}
                        height={240}
                        style={{ width: "100%", height: "auto" }}
                        className="object-contain max-h-[210px] drop-shadow-lg"
                      />
                    )}
                  </div>

                  <div className="border-t border-gray-100 bg-gray-50/60 px-5 py-3">
                    <p className="text-[10px] text-gray-400 uppercase tracking-[1.6px] font-semibold mb-0.5">
                      {typeLabel} Unit
                    </p>
                    <p className="text-[13px] font-semibold text-gray-700 leading-snug">
                      {part.title}
                    </p>
                  </div>
                </div>

                <RecentPages type={type} currentSlug={slug} />

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Quote form popup ── */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#111111] rounded-2xl border border-white/10 overflow-hidden">
              <QuoteForm onClose={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
function RecentPages({
  type,
  currentSlug,
}: {
  type: string;
  currentSlug: string;
}) {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      const res = await fetch(
        `/api/parts/recent?type=${type}&exclude=${currentSlug}`
      );

      if (!res.ok) return;

      const json = await res.json();
      setPages(json.data ?? []);
    };

    fetchPages();
  }, [type, currentSlug]);

  if (pages.length === 0) return null;

  const viewAllHref =
    type === "engine"
      ? "/used-engine"
      : "/used-transmission";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/60">
        <div className="w-[3px] h-4 rounded-full bg-red-600" />

        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          More {type === "engine" ? "Engines" : "Transmissions"}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2">
        {pages.map((page, i) => (
          <Link
            key={i}
            href={`/${
              type === "engine"
                ? "used-engine"
                : "used-transmission"
            }/${page.slug}`}
            className="group flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-2.5 hover:border-red-200 hover:shadow-md transition-all"
          >
            <div className="shrink-0 w-10 h-10 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-red-600" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[13px] font-bold text-gray-700 group-hover:text-red-600 transition-colors line-clamp-1">
                {page.title}
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-colors" />
          </Link>
        ))}

        <div className="mt-2 pt-3 border-t border-gray-100">
          <Link
            href={viewAllHref}
            className="flex items-center justify-center gap-1 text-[12px] font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}