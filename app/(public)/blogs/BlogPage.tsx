'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QuoteForm from '@/app/components/home/hero/QuoteForm';

// ─────────────────────────────────────────────────────────────────────────────
// Types — exact match to public.blogs_autoking schema
// ─────────────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  rich_content: string | null;
  cover_image: string | null;
  author_name: string | null;
  author_role: string | null;
  author_avatar: string | null;
  categories: string[] | null;
  tags: string[] | null;
  brand: string | null;
  rating: number | null;
  views: number | null;
  featured: boolean | null;
  read_time: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  seo: Record<string, unknown> | null;
  content: unknown[] | null;
  faqs: unknown[] | null;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_LIMIT = 9;

const CAT_BADGE: Record<string, { bg: string; text: string }> = {
  Engines:           { bg: '#C41E3A', text: '#fff' },
  Transmissions:     { bg: '#1D4ED8', text: '#fff' },
  Maintenance:       { bg: '#059669', text: '#fff' },
  'Buying Guides':   { bg: '#D97706', text: '#fff' },
  Warranty:          { bg: '#7C3AED', text: '#fff' },
  'Industry News':   { bg: '#0891B2', text: '#fff' },
  'Product Reviews': { bg: '#DB2777', text: '#fff' },
  General:           { bg: '#6B7280', text: '#fff' },
};

// min value sent as min_rating param → API does WHERE rating >= min_rating
const RATING_OPTIONS = [
  { min: 4.5, label: '4.5 ★ only'   },
  { min: 4.0, label: '4 ★ & above'  },
  { min: 3.0, label: '3 ★ & above'  },
  { min: 2.0, label: '2 ★ & above'  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function primaryCategory(post: BlogPost): string {
  return post.categories?.[0] ?? 'General';
}

function catBadge(cat: string) {
  return CAT_BADGE[cat] ?? CAT_BADGE['General'];
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function fmtViews(v: number | null | undefined): string {
  if (!v) return '0';
  return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v);
}

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton Card
// ─────────────────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse shadow-sm">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 bg-gray-200 rounded-full w-16" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="flex gap-3 pt-1">
          <div className="h-3 bg-gray-100 rounded w-20" />
          <div className="h-3 bg-gray-100 rounded w-14" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Empty State
// ─────────────────────────────────────────────────────────────────────────────

function EmptyState({ query }: { query: string }) {
  return (
    <div className="col-span-full flex flex-col items-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#C41E3A" strokeWidth="1.5" fill="none" />
          <path d="M21 21l-4.35-4.35" stroke="#C41E3A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 11h6M11 8v6" stroke="#C41E3A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-gray-700 font-bold text-sm">
        {query ? `No results for "${query}"` : 'No articles match your filters'}
      </p>
      <p className="text-gray-400 text-xs mt-1">Try adjusting filters or clearing your search.</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog Card — vertical
// ─────────────────────────────────────────────────────────────────────────────

function BlogCard({ post }: { post: BlogPost }) {
  const cat    = primaryCategory(post);
  const badge  = catBadge(cat);
  const rating = post.rating ?? 0;

  return (
    <Link href={`/blogs/${post.slug}`} className="block group h-full">
      <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

        {/* Cover */}
        <div className="relative h-44 overflow-hidden shrink-0 bg-gray-100">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="opacity-20">
                <rect x="2" y="5" width="32" height="26" rx="2" stroke="#374151" strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="15" r="4" stroke="#374151" strokeWidth="1.5" fill="none"/>
                <path d="M2 28l10-9 7 7 5-5 12 12" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          )}
          <span
            className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ background: badge.bg, color: badge.text }}
          >
            {cat}
          </span>
          {post.featured && (
            <span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-400 text-yellow-900">
              Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1 gap-2">

          {post.brand && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
              {post.brand}
            </span>
          )}

          <h3 className="text-[12px] sm:text-[13px] font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#C41E3A] transition-colors">
            {post.title}
          </h3>

          <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed flex-1">
            {post.excerpt ?? ''}
          </p>

          {/* Stars — rendered from actual DB rating value */}
          {rating > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path
                      d="M5.5 1l1.04 2.11 2.33.34-1.69 1.64.4 2.32L5.5 6.25 3.42 7.41l.4-2.32L2.13 3.45l2.33-.34z"
                      fill={rating >= s ? '#C41E3A' : '#E5E7EB'}
                      stroke={rating >= s ? '#C41E3A' : '#D1D5DB'}
                      strokeWidth="0.4"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-[9px] text-gray-400 font-semibold">{rating.toFixed(1)}</span>
            </div>
          )}

          {/* Date + read time */}
          <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <svg width="9" height="9" viewBox="0 0 11 11" fill="none">
                <rect x="1" y="1.5" width="9" height="8.5" rx="1" stroke="#9CA3AF" strokeWidth="0.9" fill="none"/>
                <path d="M3.5 1v1.5M7.5 1v1.5M1 4.5h9" stroke="#9CA3AF" strokeWidth="0.9" strokeLinecap="round"/>
              </svg>
              {fmtDate(post.created_at)}
            </span>
            {post.read_time && (
              <span className="flex items-center gap-1">
                <svg width="9" height="9" viewBox="0 0 11 11" fill="none">
                  <circle cx="5.5" cy="5.5" r="4.5" stroke="#9CA3AF" strokeWidth="0.9" fill="none"/>
                  <path d="M5.5 3v3l2 1" stroke="#9CA3AF" strokeWidth="0.9" strokeLinecap="round"/>
                </svg>
                {post.read_time}
              </span>
            )}
          </div>

          {/* Author + views */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#C41E3A] shrink-0 overflow-hidden relative flex items-center justify-center">
                {post.author_avatar ? (
                  <Image src={post.author_avatar} alt={post.author_name ?? 'Author'} fill className="object-cover" unoptimized />
                ) : (
                  <span className="text-white text-[9px] font-bold">
                    {post.author_name?.[0]?.toUpperCase() ?? 'A'}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-gray-700 truncate">{post.author_name ?? 'AutoKing'}</p>
                {post.author_role && (
                  <p className="text-[9px] text-gray-400 truncate">{post.author_role}</p>
                )}
              </div>
            </div>
            <span className="text-[10px] text-gray-400 flex items-center gap-1 shrink-0">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1 6S3 2 6 2s5 4 5 4-2 4-5 4-5-4-5-4z" stroke="#9CA3AF" strokeWidth="1" fill="none"/>
                <circle cx="6" cy="6" r="1.5" fill="#9CA3AF"/>
              </svg>
              {fmtViews(post.views)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────────────────────

function Pagination({
  current, total, onChange,
}: { current: number; total: number; onChange: (p: number) => void }) {
  const pages = useMemo(() => {
    const arr: (number | '…')[] = [];
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) arr.push(i);
      else if (arr[arr.length - 1] !== '…') arr.push('…');
    }
    return arr;
  }, [current, total]);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="px-3.5 py-2 text-[11px] font-semibold border border-gray-200 rounded-xl text-gray-500 hover:border-[#C41E3A] hover:text-[#C41E3A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="text-gray-400 text-xs px-1">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`w-8 h-8 text-[11px] font-bold rounded-xl border transition-all ${
              current === p
                ? 'bg-[#C41E3A] text-white border-[#C41E3A] shadow-sm'
                : 'border-gray-200 text-gray-600 hover:border-[#C41E3A] hover:text-[#C41E3A]'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="px-3.5 py-2 text-[11px] font-semibold border border-gray-200 rounded-xl text-gray-500 hover:border-[#C41E3A] hover:text-[#C41E3A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AutoKingBlogPage() {

  const [posts,         setPosts]         = useState<BlogPost[]>([]);
  const [pagination,    setPagination]    = useState<PaginationMeta | null>(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);
  const [currentPage,   setCurrentPage]   = useState(1);

  // Brands: fetched from /api/blog/brands — distinct brand values from DB
  const [brands,        setBrands]        = useState<string[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);

  // selectedBrand: '' = no filter | exact brand string from DB
  const [selectedBrand,    setSelectedBrand]    = useState<string>('');
  // selectedMinRating: null = no filter | number = WHERE rating >= this value
  const [selectedMinRating,setSelectedMinRating]= useState<number | null>(null);
  const [sortMode,         setSortMode]         = useState<'latest' | 'popular'>('latest');
  const [searchQuery,      setSearchQuery]      = useState('');
  const [debouncedSearch,  setDebouncedSearch]  = useState('');
  const [quoteOpen,        setQuoteOpen]        = useState(false);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridRef        = useRef<HTMLDivElement>(null);

  // ── Fetch distinct brands ──────────────────────────────────────────────────
  // Route: app/api/blog/brands/route.ts
  // Query: SELECT DISTINCT brand FROM blogs_autoking WHERE is_published=true AND brand IS NOT NULL
  // Returns: { success: true, data: string[] }
  useEffect(() => {
    setBrandsLoading(true);
    fetch('/api/blog/brands')
      .then(r => r.json())
      .then(json => {
        if (json.success && Array.isArray(json.data)) {
          setBrands(json.data.filter((b: unknown) => typeof b === 'string' && b.trim() !== ''));
        }
      })
      .catch(() => {})
      .finally(() => setBrandsLoading(false));
  }, []);

  // ── Debounce search ────────────────────────────────────────────────────────
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
  }, [searchQuery]);

  // ── Reset to page 1 on any filter change ──────────────────────────────────
  useEffect(() => { setCurrentPage(1); }, [debouncedSearch, selectedBrand, selectedMinRating, sortMode]);

  // ── Build API URL ──────────────────────────────────────────────────────────
  // KEY FIX: sends min_rating (not rating) so the API does .gte('rating', value)
  // which means "3 & above" correctly returns 3.0, 3.5, 4.0, 4.5, 5.0
  const buildApiUrl = useCallback((page: number) => {
    const p = new URLSearchParams();
    p.set('limit',     String(PAGE_LIMIT));
    p.set('page',      String(page));
    p.set('published', 'true');
    p.set('sort',  sortMode === 'popular' ? 'views' : 'created_at');
    p.set('order', 'desc');

    if (debouncedSearch)         p.set('search',     debouncedSearch);
    if (selectedBrand)           p.set('brand',      selectedBrand);
    // FIXED: was 'rating' — now 'min_rating' so API does >= not exact match
    if (selectedMinRating !== null) p.set('min_rating', String(selectedMinRating));

    return `/api/blog?${p.toString()}`;
  }, [debouncedSearch, selectedBrand, selectedMinRating, sortMode]);

  // ── Fetch posts ────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(buildApiUrl(currentPage))
      .then(r => r.json())
      .then(json => {
        if (cancelled) return;
        if (!json.success) throw new Error(json.error || 'Fetch failed');
        setPosts(json.data ?? []);
        setPagination(json.pagination ?? null);
      })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [buildApiUrl, currentPage]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearAll = () => {
    setSelectedBrand('');
    setSelectedMinRating(null);
    setSearchQuery('');
    setSortMode('latest');
  };

  const hasFilters = selectedBrand !== '' || selectedMinRating !== null || searchQuery !== '';

  const brandOptions = useMemo(() =>
    brands.map(b => ({ value: b, label: b })),
  [brands]);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-6 h-0.5 bg-[#C41E3A]" />
                <span className="text-[#C41E3A] text-[10px] font-black uppercase tracking-[0.3em]">
                  AutoKing Resource Center
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.05] tracking-tight">
                AutoKing
                <br />
                <span className="text-[#C41E3A]">Knowledge Base</span>
              </h1>
              <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
                Expert automotive guides, engine insights, transmission reviews,
                and maintenance tips — created by professionals and trusted by
                vehicle owners across the United States.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -right-4 w-48 h-48 bg-red-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white">
                <img
                  src="/images/blog-hero.jpg"
                  alt="AutoKing Knowledge Base"
                  className="w-full h-[220px] sm:h-[300px] lg:h-[360px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH BAR — minimal, centred, max-w-lg ──────────────────────── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

          {/* Search — capped width so it doesn't stretch full page */}
          <div className="relative w-full max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              width="13" height="13" viewBox="0 0 14 14" fill="none"
            >
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-9 pr-8 py-2 text-[12px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A]/20 bg-gray-50 text-gray-800 placeholder-gray-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort — right side of search bar row */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-[10px] text-gray-400 font-semibold hidden sm:block">Sort:</span>
            <div className="relative">
              <select
                value={sortMode}
                onChange={e => setSortMode(e.target.value as 'latest' | 'popular')}
                className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-7 py-2 text-[11px] font-semibold text-gray-700 focus:outline-none focus:border-[#C41E3A] cursor-pointer transition-colors"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
              </select>
              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                width="9" height="9" viewBox="0 0 10 10" fill="none"
              >
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* ── SIDEBAR — Brand + Rating only ─────────────────────────────── */}
        <aside className="w-full lg:w-56 xl:w-60 shrink-0 order-2 lg:order-1 space-y-3">

          {/* Brand dropdown — populated from DB */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
              Brand
            </p>
            {brandsLoading ? (
              <div className="h-9 bg-gray-100 rounded-lg animate-pulse" />
            ) : brands.length === 0 ? (
              <p className="text-[10px] text-gray-400 py-1">No brands found</p>
            ) : (
              <>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={e => setSelectedBrand(e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-gray-700 focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A]/20 cursor-pointer pr-8 transition-colors"
                  >
                    <option value="">All Brands</option>
                    {brandOptions.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                  >
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                {selectedBrand && (
                  <button
                    onClick={() => setSelectedBrand('')}
                    className="mt-1.5 text-[10px] text-[#C41E3A] font-semibold hover:underline"
                  >
                    Clear
                  </button>
                )}
              </>
            )}
          </div>

          {/* Rating pills — sends min_rating to API for >= filter */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2.5">
              Rating
            </p>
            <div className="space-y-1.5">
              {RATING_OPTIONS.map(r => {
                const isActive = selectedMinRating === r.min;
                return (
                  <button
                    key={r.min}
                    onClick={() => setSelectedMinRating(isActive ? null : r.min)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-[11px] font-semibold transition-all ${
                      isActive
                        ? 'border-[#C41E3A] bg-red-50 text-[#C41E3A]'
                        : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {/* Star icons reflecting the min threshold */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <svg key={s} width="9" height="9" viewBox="0 0 11 11" fill="none">
                            <path
                              d="M5.5 1l1.04 2.11 2.33.34-1.69 1.64.4 2.32L5.5 6.25 3.42 7.41l.4-2.32L2.13 3.45l2.33-.34z"
                              fill={s <= Math.floor(r.min) ? (isActive ? '#C41E3A' : '#F59E0B') : '#E5E7EB'}
                              stroke={s <= Math.floor(r.min) ? (isActive ? '#C41E3A' : '#F59E0B') : '#D1D5DB'}
                              strokeWidth="0.4"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[10px]">{r.label}</span>
                    </div>
                    {isActive && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                        <path d="M2 5l2.5 2.5L8 2" stroke="#C41E3A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedMinRating !== null && (
              <button
                onClick={() => setSelectedMinRating(null)}
                className="mt-2 text-[10px] text-[#C41E3A] font-semibold hover:underline"
              >
                Clear rating
              </button>
            )}
          </div>

          {/* Quote CTA */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 text-white">
            <p className="text-[11px] font-bold mb-1">Need the Right Part?</p>
            <p className="text-[10px] text-white/50 leading-relaxed mb-3">
              Our specialists find your exact fit — fast &amp; guaranteed.
            </p>
            <button
              onClick={() => setQuoteOpen(true)}
              className="w-full bg-[#C41E3A] hover:bg-[#a01830] text-white text-[11px] font-bold py-2 rounded-lg transition-colors"
            >
              Request a Quote
            </button>
          </div>
        </aside>

        {/* ── BLOG GRID ────────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 order-1 lg:order-2" ref={gridRef}>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {!loading && (
                <p className="text-[11px] text-gray-400">
                  <span className="font-bold text-gray-700">{pagination?.total ?? posts.length}</span> articles
                </p>
              )}
              {selectedBrand && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 border border-red-200 text-[#C41E3A] px-2 py-0.5 rounded-full font-bold">
                  {selectedBrand}
                  <button onClick={() => setSelectedBrand('')} className="opacity-60 hover:opacity-100 leading-none">×</button>
                </span>
              )}
              {selectedMinRating !== null && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 border border-red-200 text-[#C41E3A] px-2 py-0.5 rounded-full font-bold">
                  ≥{selectedMinRating}★
                  <button onClick={() => setSelectedMinRating(null)} className="opacity-60 hover:opacity-100 leading-none">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold">
                  &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')} className="opacity-60 hover:opacity-100 leading-none">×</button>
                </span>
              )}
              {hasFilters && (
                <button onClick={clearAll} className="text-[10px] text-[#C41E3A] font-bold hover:underline">
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-[12px] text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
              Failed to load articles. Please try again.
            </div>
          )}

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-start">
            {loading
              ? Array.from({ length: PAGE_LIMIT }).map((_, i) => <SkeletonCard key={i} />)
              : posts.length === 0
              ? <EmptyState query={debouncedSearch} />
              : posts.map(post => <BlogCard key={post.id} post={post} />)
            }
          </div>

          {/* Pagination */}
          {!loading && pagination && pagination.pages > 1 && (
            <Pagination current={currentPage} total={pagination.pages} onChange={handlePageChange} />
          )}
        </main>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="max-w-lg">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#C41E3A] mb-2">
                Need Help Finding the Right Part?
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight mb-2">
                Our Specialists Are Here to Help
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Not sure which engine or transmission fits your vehicle? Our experts will guide you to the perfect match.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <a
                href="tel:18665065915"
                className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-[#a01830] text-white text-[12px] font-bold px-5 py-3 rounded-xl transition-colors shadow-sm"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M12.5 9.5l-2-2-1.5 1.5C7.5 8.5 5.5 6.5 5 5L6.5 3.5l-2-2L2 4c0 5 7 9 8.5 9l2-3.5z"
                    stroke="white" strokeWidth="1.3" fill="none" />
                </svg>
                Call (866) 486-5915
              </a>
              <button
                onClick={() => setQuoteOpen(true)}
                className="border border-gray-200 hover:border-[#C41E3A] text-gray-700 hover:text-[#C41E3A] text-[12px] font-semibold px-5 py-3 rounded-xl transition-all"
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE MODAL ───────────────────────────────────────────────────── */}
      {quoteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={e => { if (e.target === e.currentTarget) setQuoteOpen(false); }}
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setQuoteOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <QuoteForm onClose={() => setQuoteOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}