'use client';

import React, { useEffect, useState } from 'react';
import QuoteForm from '@/app/components/home/hero/QuoteForm';
import Image from 'next/image';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import QuoteFormWrapper from '@/app/(public)/used-engine/[slug]/QuoteFormWrapper';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
}

interface TipTapMark {
  type: 'bold' | 'italic' | 'underline' | 'strike' | 'code' | 'link' | string;
  attrs?: Record<string, unknown>;
}
interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  text?: string;
  marks?: TipTapMark[];
}
interface RawContentBlock {
  heading: string;
  content: { type: 'doc'; content: TipTapNode[] };
}
interface ListItem { id: string; heading: string; description: string; }
interface ContentSection { heading: string; body: string[]; listItems: ListItem[]; }
interface HtmlContentBlock { heading: string; content: string; }

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  rich_content?: string | null;
  content?: string | ContentSection[] | RawContentBlock[] | null;
  cover_image: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  categories: string[];
  tags: string[];
  brand: string;
  read_time: string;
  rating: string | number;
  views: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  faqs?: FAQItem[] | string | null;
}

interface BlogDetailPageProps {
  blog: BlogPost;
}

// ─── TipTap → React renderer ─────────────────────────────────────────────────

function applyMarks(child: React.ReactNode, marks: TipTapMark[], keyPrefix: string): React.ReactNode {
  return marks.reduce<React.ReactNode>((acc, mark, mi) => {
    const key = `${keyPrefix}-m${mi}`;
    switch (mark.type) {
      case 'bold':      return <strong key={key} className="font-semibold text-gray-900">{acc}</strong>;
      case 'italic':    return <em key={key} className="italic">{acc}</em>;
      case 'underline': return <u key={key} className="underline underline-offset-2">{acc}</u>;
      case 'strike':    return <s key={key} className="line-through text-gray-400">{acc}</s>;
      case 'code':
        return (
          <code key={key} className="bg-gray-100 text-[#C41E3A] text-[0.82em] font-mono px-1.5 py-0.5 rounded border border-gray-200">
            {acc}
          </code>
        );
      case 'link': {
        const href   = (mark.attrs?.href   as string) || '#';
        const target = (mark.attrs?.target as string) || '_blank';
        const rel    = (mark.attrs?.rel    as string) || 'noopener noreferrer';
        return (
          <a key={key} href={href} target={target} rel={rel}
            className="text-[#C41E3A] underline underline-offset-2 decoration-[#C41E3A]/40 hover:decoration-[#C41E3A] transition-all duration-150 font-medium">
            {acc}
          </a>
        );
      }
      default: return acc;
    }
  }, child);
}

function renderInlineNode(node: TipTapNode, key: string): React.ReactNode {
  if (node.type === 'hardBreak') return <br key={key} />;
  if (node.type === 'text') {
    const text: React.ReactNode = node.text ?? '';
    if (!node.marks?.length) return <React.Fragment key={key}>{text}</React.Fragment>;
    return <React.Fragment key={key}>{applyMarks(text, node.marks, key)}</React.Fragment>;
  }
  return <React.Fragment key={key}>{extractPlainText(node)}</React.Fragment>;
}

function renderInlineChildren(nodes: TipTapNode[], keyPrefix: string): React.ReactNode {
  return (nodes ?? []).map((n, i) => renderInlineNode(n, `${keyPrefix}-i${i}`));
}

function extractPlainText(node: TipTapNode): string {
  if (node.type === 'text')      return node.text ?? '';
  if (node.type === 'hardBreak') return '\n';
  return (node.content ?? []).map(extractPlainText).join('');
}

const HEADING_CLASS: Record<number, string> = {
  1: 'text-gray-900 font-bold text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.2] tracking-[-0.03em] mt-8 mb-3',
  2: 'text-gray-900 font-bold text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.25] tracking-[-0.025em] mt-7 mb-2',
  3: 'text-gray-900 font-semibold text-[clamp(1.05rem,1.8vw,1.3rem)] leading-[1.3] tracking-[-0.015em] mt-6 mb-2',
  4: 'text-gray-900 font-semibold text-[1rem] leading-[1.4] mt-5 mb-1.5',
  5: 'text-gray-900 font-semibold text-[0.95rem] leading-[1.4] mt-4 mb-1',
  6: 'text-gray-900 font-medium text-[0.9rem] leading-[1.4] mt-3 mb-1',
};
const headingMap = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const;

function renderListItemContent(nodes: TipTapNode[], keyPrefix: string): React.ReactNode {
  if (nodes.length === 1 && nodes[0].type === 'paragraph') {
    return renderInlineChildren(nodes[0].content ?? [], keyPrefix);
  }
  return nodes.map((n, i) => renderBlockNode(n, `${keyPrefix}-c${i}`));
}

function renderBlockNode(node: TipTapNode, keyPrefix: string): React.ReactNode {
  const key = keyPrefix;
  switch (node.type) {
    case 'paragraph': {
      if (!node.content?.length) return null;
      const allEmpty = node.content.every(n => n.type === 'text' && !n.text?.trim());
      if (allEmpty) return null;
      return (
        <p key={key} className="text-gray-700 text-[1.08rem] leading-[1.85] tracking-[0.008em]">
          {renderInlineChildren(node.content, key)}
        </p>
      );
    }
    case 'heading': {
      const level = (node.attrs?.level as number) ?? 2;
      const safeLevel = Math.min(Math.max(level, 1), 6) as 1|2|3|4|5|6;
      const Tag = headingMap[safeLevel];
      return <Tag key={key} className={HEADING_CLASS[safeLevel]}>{renderInlineChildren(node.content ?? [], key)}</Tag>;
    }
    case 'bulletList':
      return (
        <ul key={key} className="space-y-2 mt-1 mb-1 ml-5 list-disc">
          {(node.content ?? []).map((item, i) => (
            <li key={`${key}-li${i}`} className="flex items-start gap-3 group">
              <span className="mt-[9px] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-[#C41E3A] opacity-75 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="flex-1 text-gray-600 text-[0.94rem] leading-[1.75]">
                {renderListItemContent(item.content ?? [], `${key}-li${i}`)}
              </div>
            </li>
          ))}
        </ul>
      );
    case 'orderedList': {
      const start = (node.attrs?.start as number) ?? 1;
      return (
        <ol key={key} className="space-y-2 mt-1 mb-1">
          {(node.content ?? []).map((item, i) => (
            <li key={`${key}-oli${i}`} className="flex items-start gap-3 group">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#C41E3A]/10 text-[#C41E3A] text-[0.68rem] font-bold flex items-center justify-center">
                {start + i}
              </span>
              <div className="flex-1 text-gray-600 text-[0.94rem] leading-[1.75]">
                {renderListItemContent(item.content ?? [], `${key}-oli${i}`)}
              </div>
            </li>
          ))}
        </ol>
      );
    }
    case 'image': {
      const src = node.attrs?.src as string;
      const alt = (node.attrs?.alt as string) || 'Blog image';
      if (!src || src.trim() === '') return null;
      return (
        <div key={key} className="my-6">
          <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[400px]">
            <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 800px" className="object-contain" />
          </div>
        </div>
      );
    }
    case 'blockquote':
      return (
        <blockquote key={key} className="border-l-[3px] border-[#C41E3A]/40 pl-5 py-1 my-1 bg-red-50/40 rounded-r-xl">
          <div className="text-gray-600 text-[0.97rem] leading-[1.8] italic space-y-2">
            {(node.content ?? []).map((n, i) => renderBlockNode(n, `${key}-bq${i}`))}
          </div>
        </blockquote>
      );
    case 'codeBlock':
      return (
        <pre key={key} className="bg-gray-900 text-green-300 text-[0.82rem] font-mono leading-relaxed rounded-xl px-5 py-4 overflow-x-auto border border-gray-800 my-1">
          <code>{extractPlainText(node)}</code>
        </pre>
      );
    case 'horizontalRule':
      return <hr key={key} className="border-none border-t border-gray-200 my-2" />;
    case 'hardBreak':
      return <br key={key} />;
    default:
      return null;
  }
}

function TipTapRenderer({ nodes, className = '' }: { nodes: TipTapNode[]; className?: string }) {
  const elements = nodes.map((n, i) => renderBlockNode(n, `n${i}`)).filter(Boolean);
  return <div className={`space-y-5 ${className}`}>{elements}</div>;
}

// ─── Parsers ─────────────────────────────────────────────────────────────────

function isRawContentBlock(item: unknown): item is RawContentBlock {
  return (
    typeof item === 'object' && item !== null &&
    'heading' in item && 'content' in item &&
    typeof (item as RawContentBlock).content === 'object' &&
    (item as RawContentBlock).content?.type === 'doc'
  );
}

function isHtmlContentBlock(item: unknown): item is HtmlContentBlock {
  return (
    typeof item === 'object' && item !== null &&
    'heading' in item && 'content' in item &&
    typeof (item as HtmlContentBlock).content === 'string'
  );
}

function parseRawContent(raw: unknown): RawContentBlock[] | ContentSection[] | HtmlContentBlock[] {
  let parsed: unknown = raw;
  if (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch { return []; }
  }
  if (!Array.isArray(parsed) || parsed.length === 0) return [];
  if (isRawContentBlock(parsed[0])) return parsed as RawContentBlock[];
  if (isHtmlContentBlock(parsed[0])) return parsed as HtmlContentBlock[];
  return parsed as ContentSection[];
}

function parseFaqs(raw: FAQItem[] | string | null | undefined): FAQItem[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw); } catch { return []; }
}

function formatDate(d: string) {
  try { return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); }
  catch { return d; }
}

function formatViews(v: number) {
  return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v);
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

// ─── Shared UI ───────────────────────────────────────────────────────────────

function AccentLine() {
  return (
    <div className="flex items-center gap-1.5 mt-1.5 mb-4">
      <div className="w-7 h-[3px] rounded-full bg-[#C41E3A]" />
      <div className="w-2 h-[3px] rounded-full bg-[#C41E3A]/25" />
    </div>
  );
}

function MetaPill({ icon, label, accent = false }: { icon: React.ReactNode; label: string; accent?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full font-medium border ${
      accent ? 'text-[#C41E3A] bg-red-50 border-red-100' : 'text-gray-500 bg-gray-50 border-gray-100'
    }`}>
      <span className="flex-shrink-0">{icon}</span>
      {label}
    </span>
  );
}

// ─── Mid-content CTA ─────────────────────────────────────────────────────────

function MidContentCTA() {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 px-7 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#C41E3A]/10 pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-[#C41E3A]/10 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-white font-bold text-lg leading-snug">Need the Right Part?</p>
          <p className="text-white/65 text-sm mt-1">Get a free, no-obligation quote from AutoKing specialists.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-[#a01830] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors duration-200 shadow-sm"
        >
          Get a Free Quote
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <div className="relative z-10 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
              <QuoteForm onClose={() => setOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Common Questions
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}
                className={`bg-white rounded-xl border-2 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md
                  ${isOpen ? 'border-red-400 shadow-md shadow-red-100' : 'border-gray-100'}`}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 text-left hover:bg-gray-50/50 transition-colors duration-150 group"
                >
                  <span className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 transition-all duration-300
                    ${isOpen ? 'bg-red-600 text-white scale-110' : 'bg-red-50 text-red-600 group-hover:bg-red-100'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`flex-1 font-semibold text-sm sm:text-base lg:text-lg leading-snug pr-2 transition-colors
                    ${isOpen ? 'text-red-700' : 'text-gray-800'}`}>
                    {faq.question}
                  </span>
                  <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                    ${isOpen ? 'bg-red-600 text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-red-50 group-hover:text-red-500'}`}>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ease-in-out
                  ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-5">
                      <div className="bg-gradient-to-r from-gray-50 to-red-50/30 rounded-xl border-l-4 border-red-500 p-4 sm:p-5">
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl px-5 sm:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className="text-white font-bold text-lg sm:text-xl mb-1">Still have questions?</p>
              <p className="text-gray-400 text-sm sm:text-base">Our specialists are ready to help — no bots, no scripts.</p>
            </div>
            <a href="tel:+18664865915"
              className="inline-flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-bold px-6 sm:px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/30 whitespace-nowrap shrink-0">
              <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5" />
              Call +1 (866) 486-5915
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Recently Added Sidebar ───────────────────────────────────────────────────

interface RecentPost {
  title: string;
  slug: string;
  created_at: string;
  categories: string[];
  read_time: string;
  cover_image?: string;
}

function RecentlyAddedSidebar({ currentSlug }: { currentSlug: string }) {
  const [posts, setPosts] = useState<RecentPost[]>([]);

  useEffect(() => {
    fetch('/api/blog?limit=7&published=true')
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (!json) return;
        const list: RecentPost[] = Array.isArray(json.data) ? json.data : [];
        setPosts(list.filter(p => p.slug !== currentSlug).slice(0, 6));
      })
      .catch(() => {});
  }, [currentSlug]);

  function formatShortDate(d: string) {
    try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
    catch { return d; }
  }

  return (
    <aside className="sticky top-16 self-start bg-white border-l border-gray-100 max-h-[calc(100vh-64px)] overflow-y-auto">
      <div className="px-5 pt-6 pb-4 border-b border-gray-100">
        <h3 className="text-gray-900 font-bold text-[0.95rem] tracking-tight">Recently Added</h3>
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="w-6 h-[3px] rounded-full bg-[#C41E3A]" />
          <div className="w-2 h-[3px] rounded-full bg-[#C41E3A]/30" />
        </div>
      </div>
      <div className="p-4 space-y-4">
        {posts.length === 0
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-16 h-16 bg-gray-100 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))
          : posts.map(post => (
              <a key={post.slug} href={`/blogs/${post.slug}`}
                className="group flex gap-3 p-3 border border-gray-100 rounded-xl hover:shadow-sm hover:border-[#C41E3A]/20 transition-all duration-200">
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  {post.cover_image
                    ? <Image src={post.cover_image} alt={post.title} width={64} height={64} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                    : <div className="w-full h-full bg-gray-200" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 mb-1">{formatShortDate(post.created_at)}</p>
                  <p className="text-[13px] font-semibold text-gray-900 leading-snug group-hover:text-[#C41E3A] transition-colors duration-150 line-clamp-2">
                    {post.title}
                  </p>
                  {post.categories?.[0] && (
                    <span className="inline-block mt-1 text-[9.5px] font-semibold uppercase tracking-widest text-[#C41E3A]">
                      {post.categories[0]}
                    </span>
                  )}
                </div>
              </a>
            ))}
      </div>
    </aside>
  );
}

// ─── Section renderers ────────────────────────────────────────────────────────

function RichSection({ block }: { block: RawContentBlock }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-gray-900 font-bold text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.25] tracking-[-0.025em]">
          {block.heading}
        </h2>
        <AccentLine />
      </div>
      <TipTapRenderer nodes={block.content?.content ?? []} />
    </section>
  );
}

function ParagraphsComponent({ body }: { body: string[] }) {
  return (
    <div className="space-y-3.5">
      {body.flatMap((block, i) =>
        block.split(/\n+/).filter(Boolean).map((para, j) => (
          <p key={`${i}-${j}`} className="text-gray-600 text-[0.97rem] leading-[1.8] tracking-[0.008em]">{para}</p>
        ))
      )}
    </div>
  );
}

function BulletListComponent({ items }: { items: { id?: string; heading: string; description?: string }[] }) {
  return (
    <ul className="space-y-2.5 mt-1">
      {items.map((item, i) => (
        <li key={item.id || i} className="flex items-start gap-3">
          <span className="mt-[9px] w-[5px] h-[5px] rounded-full bg-[#C41E3A]" />
          <div>
            <span className="text-gray-900 text-[0.94rem] font-semibold">{item.heading}</span>
            {item.description && <p className="text-gray-500 text-[0.85rem] mt-0.5">{item.description}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

function CardGridComponent({ items }: { items: { id?: string; heading: string; description?: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-2">
      {items.map((item, i) => (
        <div key={item.id || i} className="border border-gray-200 rounded-xl p-4 bg-white hover:border-[#C41E3A]/25 transition">
          <p className="text-gray-900 text-sm font-semibold">{item.heading}</p>
          {item.description && <p className="text-gray-400 text-[0.8rem] mt-1">{item.description}</p>}
        </div>
      ))}
    </div>
  );
}

function LegacySection({ section }: { section: ContentSection }) {
  const hasListItems = (section.listItems?.length ?? 0) > 0;
  const hasBody = (section.body?.length ?? 0) > 0;
  const isCostSection =
    section.heading.toLowerCase().includes('cost') ||
    section.heading.toLowerCase().includes('how much') ||
    section.heading.toLowerCase().includes('price') ||
    section.heading.toLowerCase().includes('pricing');

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-gray-900 font-bold text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.25] tracking-[-0.025em]">
          {section.heading}
        </h2>
        <AccentLine />
      </div>
      {hasBody && <ParagraphsComponent body={section.body} />}
      {hasListItems && (isCostSection
        ? <CardGridComponent items={section.listItems} />
        : <BulletListComponent items={section.listItems} />
      )}
    </section>
  );
}

function HtmlSection({ block }: { block: HtmlContentBlock }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-gray-900 font-bold text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.25] tracking-[-0.025em]">
          {block.heading}
        </h2>
        <AccentLine />
      </div>
      <div
        className="prose prose-sm max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-gray-700 prose-p:text-gray-700 prose-p:text-[1.08rem] prose-p:leading-[1.85] prose-a:text-[#C41E3A] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:max-w-full prose-img:h-auto prose-img:my-6 prose-li:text-gray-600"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AutoKingBlogDetailPage({ blog }: BlogDetailPageProps) {
  const hasRichContent = !!blog.rich_content;
  const parsedContent  = hasRichContent ? [] : parseRawContent(blog.content);
  const isNewFormat    = !hasRichContent && parsedContent.length > 0 && isRawContentBlock(parsedContent[0]);
  const isHtmlFormat   = !hasRichContent && parsedContent.length > 0 && isHtmlContentBlock(parsedContent[0]);
  const rawBlocks      = isNewFormat  ? (parsedContent as RawContentBlock[]) : [];
  const legacySections = (!isNewFormat && !isHtmlFormat) ? (parsedContent as ContentSection[]) : [];
  const htmlBlocks     = isHtmlFormat ? (parsedContent as HtmlContentBlock[]) : [];
  const faqs           = parseFaqs(blog.faqs);

  const hasContent = hasRichContent
    || rawBlocks.length > 0
    || htmlBlocks.length > 0
    || legacySections.length > 0;

  return (
    <div className="bg-white text-gray-900 antialiased">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      {/*
        FIX: Hero is now a simple flex row.
        - Cover image gets flex-1 so it fills available space (dominant visual).
        - Form sidebar gets a fixed width and is sticky.
        - items-start prevents the form from stretching to match image height.
        - On mobile: stacks vertically (flex-col), image on top, form below.
      */}
      <section className="w-full flex flex-col lg:flex-row items-start gap-0">

        {/* ── Cover image ── */}
        <div className="w-full lg:flex-1 lg:min-w-0">
          <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[500px] xl:h-[580px] bg-gray-900">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
          </div>

          {/* Mobile only: show title + excerpt below image, above form */}
          <div className="lg:hidden px-5 pt-5 pb-4 border-b border-gray-100">
            <div className="flex flex-wrap gap-2 mb-3">
              {(blog.categories ?? []).map(cat => (
                <span key={cat} className="text-[10px] font-bold uppercase tracking-widest text-[#C41E3A] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-gray-900 text-xl font-bold leading-snug tracking-tight">{blog.title}</h1>
            <p className="mt-2 text-gray-500 text-sm leading-relaxed">{blog.excerpt}</p>
          </div>
        </div>

        {/* ── Quote form sidebar ── */}
        {/*
          FIX: Fixed width sidebar. Never grows. Sticky so it follows
          the reader. max-h + overflow-y-auto means if the form is
          taller than the viewport it scrolls INSIDE itself — the page
          never gets taller because of the form.
        */}
        <div className="
          w-full lg:w-[400px] xl:w-[440px] flex-shrink-0
          bg-[#111111] border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10
          lg:sticky lg:top-16 lg:self-start
          lg:max-h-[calc(100vh-64px)] lg:overflow-y-auto
        ">
          <QuoteFormWrapper  />
        </div>
      </section>

      {/* ── AUTHOR / META BAR ────────────────────────────────────────────── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {blog.author_name && (
            <div className="flex items-center gap-3">
              {blog.author_avatar && (
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm border border-gray-100 flex-shrink-0">
                  <img src={blog.author_avatar} alt={blog.author_name} className="w-full h-full object-contain" />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-none">{blog.author_name}</p>
                <p className="text-[11px] text-[#C41E3A] mt-0.5 font-medium">{blog.author_role}</p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2 items-center">
            <MetaPill icon={<CalendarIcon />} label={formatDate(blog.created_at)} />
            {blog.read_time && <MetaPill icon={<ClockIcon />} label={blog.read_time} />}
            {blog.rating    && <MetaPill icon={<StarIcon />}  label={String(blog.rating)} accent />}
            <MetaPill icon={<EyeIcon />} label={formatViews(blog.views ?? 0)} />
          </div>
        </div>
      </div>

      {/* ── CONTENT + SIDEBAR ────────────────────────────────────────────── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] items-start">
        <main className="border-r border-gray-100 bg-white min-h-screen">

          {/* Back button + date bar */}
          <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between gap-4">
            <a
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-[#C41E3A] transition-colors duration-150 group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:-translate-x-0.5 transition-transform duration-150">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Blog
            </a>
            <span className="text-[12px] text-gray-400">
              <span className="font-semibold text-gray-600">Posted</span>{' '}
              {formatDate(blog.created_at)}
              {blog.updated_at && (
                <>&nbsp;·&nbsp;Updated {formatDate(blog.updated_at)}</>
              )}
            </span>
          </div>

          <div className="px-6 sm:px-10 py-10">
            {/* Desktop title */}
            <div className="hidden lg:block mb-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {(blog.categories ?? []).map(cat => (
                  <span key={cat} className="text-[10px] font-bold uppercase tracking-widest text-[#C41E3A] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-gray-900 text-[clamp(1.8rem,3vw,2.5rem)] font-black leading-tight tracking-tight">
                {blog.title}
              </h1>
              <p className="mt-3 text-gray-500 text-base leading-relaxed">{blog.excerpt}</p>
            </div>

            {!hasContent ? (
              <p className="text-gray-400 text-sm italic text-center py-16">No content available for this article.</p>
            ) : (
              <div className="space-y-14 sm:space-y-16">
                {hasRichContent && (
                  <article
                    className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-[#C41E3A] prose-strong:text-gray-800 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: blog.rich_content! }}
                  />
                )}
                {isNewFormat  && rawBlocks.map((block, idx) => <RichSection key={idx} block={block} />)}
                {isHtmlFormat && htmlBlocks.map((block, idx) => <HtmlSection key={idx} block={block} />)}
                {(!isNewFormat && !isHtmlFormat && !hasRichContent) && legacySections.map((section, idx) => <LegacySection key={idx} section={section} />)}
              </div>
            )}
          </div>
        </main>

        {/* Sidebar — sticky below navbar, scrollable */}
        <RecentlyAddedSidebar currentSlug={blog.slug} />
      </div>

      <MidContentCTA />

      {faqs.length > 0 && <FAQSection faqs={faqs} />}
    </div>
  );
}