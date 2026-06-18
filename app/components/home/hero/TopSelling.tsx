"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Cpu,
  Settings2,
  MapPin,
  Zap,
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PHONE_RAW } from "@/app/components/home.constants";
import { TypeToggle, type PartType } from "@/app/components/TypeToggle";

// ─── Constants ────────────────────────────────────────────────────────────────
const PER_PAGE = 8; // total cards per page — spotlight cards count toward this
const SPOTLIGHT_COUNT = 3; // how many of page 1's newest items get the "NEW" badge

// ─── Types ────────────────────────────────────────────────────────────────────
type Product = {
  id: string;
  slug: string;
  type: string;
  title: string;
  description: string | null;
  image: string | null;
  created_at: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getUrl(product: Product) {
  if (product.type === "engine") return `/used-engine/${product.slug}`;
  if (product.type === "transmission") return `/used-transmission/${product.slug}`;
  return `/${product.slug}`;
}

function getTypeIcon(type: string, size = "h-6 w-6") {
  if (type === "engine") return <Cpu className={size} />;
  if (type === "transmission") return <Settings2 className={size} />;
  return <MapPin className={size} />;
}

function getTypeBadgeColor(type: string) {
  if (type === "engine")
    return "bg-blue-50 text-blue-700 border-blue-200";
  if (type === "transmission")
    return "bg-violet-50 text-violet-700 border-violet-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

function getTypeLabel(type: string) {
  if (type === "engine") return "Used Engine";
  if (type === "transmission") return "Used Transmission";
  return "Location";
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
      <div className="h-7 bg-gray-100 rounded-full w-28 mb-4" />
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <div className="flex-1 h-8 bg-gray-100 rounded-lg" />
        <div className="flex-1 h-8 bg-red-100 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ filter }: { filter: PartType }) {
  const labels: Record<PartType, string> = {
    all: "products",
    engine: "engines",
    transmission: "transmissions",
    location: "location listings",
  };

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
        <Zap className="h-9 w-9 text-red-300" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">Coming Soon</h3>
      <p className="text-sm text-gray-500 max-w-xs">
        We&apos;re adding new {labels[filter]} — check back shortly or call us for
        availability.
      </p>
      <a
        href={`tel:${PHONE_RAW}`}
        className="mt-6 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700
                   text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
      >
        <Phone className="h-4 w-4" />
        Call for Availability
      </a>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  isNew = false,
}: {
  product: Product;
  isNew?: boolean;
}) {
  return (
    <div
      className={`
        group relative bg-white border rounded-2xl p-5 flex flex-col
        hover:-translate-y-1 hover:shadow-lg transition-all duration-200
        ${isNew ? "border-red-200 shadow-sm shadow-red-50" : "border-gray-100"}
      `}
    >
      {/* New badge */}
      {isNew && (
        <span
          className="absolute -top-2.5 -right-2.5 inline-flex items-center gap-1
                       bg-red-600 text-white text-[10px] font-bold px-2 py-0.5
                       rounded-full shadow"
        >
          <Sparkles className="h-2.5 w-2.5" />
          NEW
        </span>
      )}

      {/* Header: icon + title */}
      <div className="flex items-start gap-3 mb-3">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-gray-100"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center
              ${product.type === "engine" ? "bg-blue-50 text-blue-600" :
                product.type === "transmission" ? "bg-violet-50 text-violet-600" :
                "bg-emerald-50 text-emerald-600"}`}
          >
            {getTypeIcon(product.type)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
            {product.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
      )}

      {/* Type badge */}
      <div
        className={`
          inline-flex items-center gap-1.5 border rounded-full px-2.5 py-1
          text-[10px] font-semibold w-fit mb-4
          ${getTypeBadgeColor(product.type)}
        `}
      >
        <Shield className="h-3 w-3" />
        {getTypeLabel(product.type)}
      </div>

      {/* CTA */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2">
        <a
          href={getUrl(product)}
          className="flex-1 inline-flex items-center justify-center gap-1
                     text-xs text-red-600 font-semibold border border-red-200
                     hover:border-red-500 hover:bg-red-50
                     px-3 py-2 rounded-xl transition-all duration-150"
        >
          Read More
          <ArrowRight className="h-3 w-3" />
        </a>
        <a
          href={`tel:${PHONE_RAW}`}
          className="flex-1 inline-flex items-center justify-center gap-1
                     text-xs bg-red-600 hover:bg-red-700
                     text-white font-semibold px-3 py-2 rounded-xl transition-all duration-150"
        >
          <Phone className="h-3 w-3" />
          Call Now
        </a>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function TopSelling() {
  const [activeFilter, setActiveFilter] = useState<PartType>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // Switch filter + jump back to page 1 in a single state update
  function handleFilterChange(value: PartType) {
    setActiveFilter(value);
    setPage(0);
  }

  // Single paginated fetch — 8 items per page, spotlight cards are part of that 8
  useEffect(() => {
    async function fetchPage() {
      setLoading(true);

      const from = page * PER_PAGE;
      const to = from + PER_PAGE - 1;

      let q = supabase
        .from("autoking_brands")
        .select("id, slug, type, title, description, image, created_at", {
          count: "exact",
        })
        .eq("status", "published");

      // Applied inline (instead of via a generic helper) so TypeScript infers
      // q's type directly from the Supabase chain — no extra generic layer
      // for it to recurse through.
      q =
        activeFilter === "all"
          ? q.in("type", ["engine", "transmission", "location"])
          : q.eq("type", activeFilter);

      const { data, count } = await q
        .order("created_at", { ascending: false })
        .range(from, to);

      setProducts(data ?? []);
      setTotal(count ?? 0);
      setLoading(false);
    }

    fetchPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, page]);

  const totalPages = Math.ceil(total / PER_PAGE);

  // Only page 1 carves out a "Latest Arrivals" spotlight — it's a subset of
  // the same 8 items fetched for that page, not an extra fetch on top.
  const spotlightItems = page === 0 ? products.slice(0, SPOTLIGHT_COUNT) : [];
  const gridItems = page === 0 ? products.slice(SPOTLIGHT_COUNT) : products;

  const hasAnyContent = !loading && products.length === 0;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col items-center gap-5 mb-10">
          <div className="text-center">
            <p className="text-xs font-semibold text-red-600 tracking-widest uppercase mb-1.5">
              Most Popular
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Barlow',sans-serif]">
              Top Selling Engines &amp; Transmissions
            </h2>
          </div>

          {/* ── Toggle ── */}
          <TypeToggle
            show={["engine", "transmission", "location"]}
            showAll
            value={activeFilter}
            onChange={handleFilterChange}
          />
        </div>

        {/* ── Spotlight (page 1 only, still counted within the 8-per-page total) ── */}
        {page === 0 && (loading || spotlightItems.length > 0) && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-red-500" />
              <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                Latest Arrivals
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {loading
                ? Array.from({ length: SPOTLIGHT_COUNT }).map((_, i) => (
                    <CardSkeleton key={i} />
                  ))
                : spotlightItems.map((product) => (
                    <ProductCard key={product.id} product={product} isNew />
                  ))}
            </div>
          </div>
        )}

        {/* ── Divider ── */}
        {!loading && spotlightItems.length > 0 && gridItems.length > 0 && (
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">More Products</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
        )}

        {/* ── Grid (remaining cards on page 1, full 8 on every other page) ── */}
        {hasAnyContent ? (
          <div className="grid grid-cols-1">
            <EmptyState filter={activeFilter} />
          </div>
        ) : (
          (loading || gridItems.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {loading
                ? Array.from({
                    length: page === 0 ? PER_PAGE - SPOTLIGHT_COUNT : PER_PAGE,
                  }).map((_, i) => <CardSkeleton key={i} />)
                : gridItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>
          )
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 text-sm rounded-xl border border-gray-200
                         hover:border-red-400 hover:text-red-600 disabled:opacity-40
                         disabled:cursor-not-allowed transition font-medium"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-9 h-9 text-sm rounded-xl border font-semibold transition
                  ${
                    page === i
                      ? "bg-red-600 text-white border-red-600"
                      : "border-gray-200 hover:border-red-400 hover:text-red-600"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-4 py-2 text-sm rounded-xl border border-gray-200
                         hover:border-red-400 hover:text-red-600 disabled:opacity-40
                         disabled:cursor-not-allowed transition font-medium"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}