"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Cog,
  MapPin,
  Phone,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { PHONE_RAW } from "@/app/components/home.constants";
import {
  TypeToggle,
  type PartType,
} from "@/app/components/TypeToggle";

const PER_PAGE = 8;
const NEW_ITEM_COUNT = 4;

type InventoryType = Exclude<PartType, "all">;

const DEFAULT_ALLOWED_TYPES: InventoryType[] = [
  "engine",
  "transmission",
  "location",
];

type Product = {
  id: string;
  slug: string;
  type: string;
  title: string;
  description: string | null;
  image: string | null;
  created_at: string;
};

export interface TopSellingProps {
  defaultFilter?: PartType;
  allowedTypes?: InventoryType[];
  showToggle?: boolean;
  showAllOption?: boolean;
  eyebrow?: string;
  heading?: ReactNode;
  description?: string;
  firstPageLabel?: string;
  laterPageLabel?: string;
  className?: string;
}

function getUrl(product: Product) {
  if (product.type === "engine") return `/used-engine/${product.slug}`;

  if (product.type === "transmission") {
    return `/used-transmission/${product.slug}`;
  }

  if (product.type === "location") {
    // Locations now resolve at /used-engine/[slug] (their canonical
    // home) rather than /location/[slug].
    const cleanSlug = product.slug.replace(/^location\//, "");
    return `/used-engine/${cleanSlug}`;
  }

  return `/${product.slug}`;
}

const GENERIC_SLUG_WORDS = new Set([
  "used",
  "engine",
  "engines",
  "transmission",
  "transmissions",
  "unit",
  "units",
  "part",
  "parts",
  "for",
  "sale",
]);

function getShortTitle(product: Product) {
  // Slugs are short and consistent by nature (they're built for URLs),
  // so deriving the card title from the slug keeps every card the same
  // shape instead of depending on however the full `title` was written.
  const rawSlug =
    product.type === "location"
      ? product.slug.replace(/^location\//, "")
      : product.slug;

  const words = rawSlug
    .split("-")
    .map((word) => word.trim())
    .filter(Boolean);

  // Strip generic words (used/engine/transmission/etc.) so we can rebuild
  // a single consistent "Used {Brand} Engine" style label from any slug
  // shape, and fold the type into the title itself instead of repeating
  // it in a separate badge below.
  const brandWords = words.filter(
    (word) => !GENERIC_SLUG_WORDS.has(word.toLowerCase())
  );

  const brand = (brandWords.length > 0 ? brandWords : words)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!brand) {
    return product.title.trim();
  }

  if (product.type === "engine") return `Used ${brand} Engine`;
  if (product.type === "transmission") return `Used ${brand} Transmission`;
  if (product.type === "location") return `Used Parts in ${brand}`;

  return brand;
}

function getShortDescription(product: Product) {
  const description = product.description?.trim();

  if (!description) {
    if (product.type === "engine") {
      return "Quality-tested used engine with warranty options and nationwide shipping.";
    }

    if (product.type === "transmission") {
      return "Quality-tested used transmission with warranty options and nationwide shipping.";
    }

    return "Browse available inventory, compatibility details, and delivery options.";
  }

  const sentences = description
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const compact = sentences.slice(0, 2).join(" ");

  if (compact.length <= 155) {
    return compact;
  }

  const words = compact.split(/\s+/).filter(Boolean);
  let result = "";

  for (const word of words) {
    const next = result ? `${result} ${word}` : word;

    if (next.length > 150) break;

    result = next;
  }

  return result ? `${result.replace(/[.,;:!?]+$/, "")}.` : compact;
}

function getTypeIcon(type: string, size = "h-5 w-5") {
  if (type === "engine") {
    return <Wrench className={size} aria-hidden="true" />;
  }

  if (type === "transmission") {
    return <Cog className={size} aria-hidden="true" />;
  }

  if (type === "location") {
    return <MapPin className={size} aria-hidden="true" />;
  }

  return <Boxes className={size} aria-hidden="true" />;
}

function getTypeIconContainer(type: string) {
  if (type === "engine") {
    return "border-blue-100 bg-blue-50 text-blue-700";
  }

  if (type === "transmission") {
    return "border-amber-100 bg-amber-50 text-amber-700";
  }

  if (type === "location") {
    return "border-emerald-100 bg-emerald-50 text-emerald-700";
  }

  return "border-gray-200 bg-gray-50 text-gray-700";
}

function CardSkeleton() {
  return (
    <div className="flex min-h-[270px] h-full animate-pulse flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-gray-100" />

        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 w-4/5 rounded bg-gray-100" />
          <div className="h-4 w-3/5 rounded bg-gray-100" />
        </div>
      </div>

      <div className="mb-4 space-y-2.5">
        <div className="h-3.5 w-full rounded bg-gray-100" />
        <div className="h-3.5 w-full rounded bg-gray-100" />
        <div className="h-3.5 w-4/5 rounded bg-gray-100" />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
        <div className="h-9 rounded-xl bg-gray-100" />
        <div className="h-9 rounded-xl bg-red-100" />
      </div>
    </div>
  );
}

function EmptyState({ filter }: { filter: PartType }) {
  const labels: Record<PartType, string> = {
    all: "products",
    engine: "engines",
    transmission: "transmissions",
    location: "location listings",
  };

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center sm:py-20">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
        <Zap className="h-9 w-9 text-red-300" aria-hidden="true" />
      </div>

      <h3 className="mb-2 text-xl font-bold text-gray-900">
        Coming Soon
      </h3>

      <p className="max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
        We&apos;re adding new {labels[filter]}. Check back shortly or call us
        for current availability.
      </p>

      <a
        href={`tel:${PHONE_RAW}`}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call for Availability
      </a>
    </div>
  );
}

function ProductCard({
  product,
  isNew = false,
}: {
  product: Product;
  isNew?: boolean;
}) {
  const shortTitle = getShortTitle(product);
  const shortDescription = getShortDescription(product);

  return (
    <article
      className={`group relative flex min-h-[270px] h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isNew
          ? "border-red-200"
          : "border-gray-200 hover:border-red-200"
      }`}
    >
      {isNew && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-0.5 rounded-full bg-red-600 px-1.5 py-[3px] text-[7px] font-bold uppercase tracking-[0.04em] text-white shadow-sm">
          <Sparkles className="h-2 w-2" aria-hidden="true" />
          New
        </span>
      )}

      <div className={`mb-4 flex items-start gap-3 ${isNew ? "pr-10" : ""}`}>
        <div
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border ${getTypeIconContainer(
            product.type
          )}`}
        >
          {getTypeIcon(product.type, "h-6 w-6")}
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <h3 className="text-[17px] font-bold leading-6 tracking-[-0.01em] text-gray-900">
            {shortTitle}
          </h3>
        </div>
      </div>

      <p className="mb-4 min-h-[72px] text-sm leading-6 text-gray-600">
        {shortDescription}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
        <a
          href={getUrl(product)}
          className="inline-flex min-h-9 items-center justify-center gap-1 rounded-xl border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-700 transition-all duration-200 hover:border-red-400 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:text-sm"
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>

        <a
          href={`tel:${PHONE_RAW}`}
          className="inline-flex min-h-9 items-center justify-center gap-1 rounded-xl bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:text-sm"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          Call Now
        </a>
      </div>
    </article>
  );
}

export function TopSelling({
  defaultFilter = "all",
  allowedTypes = DEFAULT_ALLOWED_TYPES,
  showToggle = true,
  showAllOption = true,
  eyebrow = "Most Popular",
  heading = "Top Selling Engines & Transmissions",
  description = "Browse our latest quality-tested used engines, transmissions, and location-based inventory.",
  firstPageLabel = "Latest Arrivals",
  laterPageLabel = "Available Products",
  className = "",
}: TopSellingProps) {
  const allowedTypesKey = allowedTypes.join(",");

  const normalizedAllowedTypes = useMemo<InventoryType[]>(() => {
    const validTypes = allowedTypes.filter(
      (type): type is InventoryType =>
        type === "engine" ||
        type === "transmission" ||
        type === "location"
    );

    return validTypes.length > 0
      ? Array.from(new Set(validTypes))
      : DEFAULT_ALLOWED_TYPES;
  }, [allowedTypesKey]);

  const normalizedDefaultFilter: PartType =
    defaultFilter === "all"
      ? showAllOption
        ? "all"
        : normalizedAllowedTypes[0] ?? "engine"
      : normalizedAllowedTypes.includes(defaultFilter)
        ? defaultFilter
        : normalizedAllowedTypes[0] ?? "engine";

  const [activeFilter, setActiveFilter] = useState<PartType>(
    normalizedDefaultFilter
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveFilter(normalizedDefaultFilter);
    setPage(0);
  }, [normalizedDefaultFilter]);

  function handleFilterChange(value: PartType) {
    if (
      value !== "all" &&
      !normalizedAllowedTypes.includes(value)
    ) {
      return;
    }

    setActiveFilter(value);
    setPage(0);
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchPage() {
      setLoading(true);

      const supabase = createClient();
      const from = page * PER_PAGE;
      const to = from + PER_PAGE - 1;

      let query = supabase
        .from("autoking_brands")
        .select(
          "id, slug, type, title, description, image, created_at",
          { count: "exact" }
        )
        .eq("status", "published");

      query =
        activeFilter === "all"
          ? query.in("type", normalizedAllowedTypes)
          : query.eq("type", activeFilter);

      const { data, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (cancelled) return;

      setProducts(data ?? []);
      setTotal(count ?? 0);
      setLoading(false);
    }

    fetchPage();

    return () => {
      cancelled = true;
    };
  }, [activeFilter, page, allowedTypesKey]);

  const totalPages = Math.ceil(total / PER_PAGE);
  const hasNoContent = !loading && products.length === 0;

  return (
    <section className={`bg-white py-14 sm:py-16 lg:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col gap-6 sm:mb-11 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-red-600" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-600 sm:text-sm">
                {eyebrow}
              </p>
              <span className="h-px w-8 bg-red-600" />
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[42px]">
              {heading}
            </h2>

            {description && (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                {description}
              </p>
            )}
          </div>

          {showToggle && (
            <div className="flex-shrink-0">
              <TypeToggle
                show={normalizedAllowedTypes}
                showAll={showAllOption}
                value={activeFilter}
                onChange={handleFilterChange}
              />
            </div>
          )}
        </div>

        {!hasNoContent && (
          <div className="mb-5 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles
                className="h-4 w-4 text-red-500"
                aria-hidden="true"
              />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500 sm:text-[13px]">
                {page === 0 ? firstPageLabel : laterPageLabel}
              </span>
            </div>

            <div className="h-px flex-1 bg-gray-200" />
          </div>
        )}

        {hasNoContent ? (
          <div className="grid grid-cols-1">
            <EmptyState filter={activeFilter} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {loading
              ? Array.from({ length: PER_PAGE }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              : products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isNew={page === 0 && index < NEW_ITEM_COUNT}
                  />
                ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12">
            <button
              type="button"
              onClick={() =>
                setPage((currentPage) => Math.max(0, currentPage - 1))
              }
              disabled={page === 0}
              className="min-h-10 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-red-400 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                aria-label={`Go to page ${index + 1}`}
                aria-current={page === index ? "page" : undefined}
                className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors ${
                  page === index
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-600"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setPage((currentPage) =>
                  Math.min(totalPages - 1, currentPage + 1)
                )
              }
              disabled={page === totalPages - 1}
              className="min-h-10 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-red-400 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}