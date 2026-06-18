'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { RichTextEditor } from '@/app/components/cms/rich-text-editor/RichTextEditor';
import {
  ArrowLeft, CheckCircle, AlertCircle, Upload, X, Plus, Trash2, Loader2,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
}

interface ContentSection {
  heading: string;
  content: string;
}

interface BlogForm {
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  cover_image_preview: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  author_avatar_preview: string;
  read_time: string;
  brand: string;
  rating: number;
  views: number;
  categories: string;
  tags: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  content_sections: ContentSection[];
  faqs: FAQItem[];
  is_published: boolean;
  featured: boolean;
}

interface BlogEditorFormProps {
  id?: string; // present → edit mode
}

// ─── Image validation ─────────────────────────────────────────────────────────

const COVER_CONFIG = {
  maxSizeMB: 2,
  formats: ['image/jpeg', 'image/webp', 'image/png'],
};
const AVATAR_CONFIG = {
  maxSizeMB: 0.5,
  formats: ['image/jpeg', 'image/webp', 'image/png'],
};

function validateImage(file: File, cfg: typeof COVER_CONFIG): string[] {
  const errors: string[] = [];
  if (file.size > cfg.maxSizeMB * 1024 * 1024)
    errors.push(`Max size is ${cfg.maxSizeMB}MB (yours: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
  if (!cfg.formats.includes(file.type))
    errors.push(`Allowed formats: jpg, webp, png`);
  return errors;
}

// ─── Shared style tokens ──────────────────────────────────────────────────────

const inputClass =
  'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white ' +
  'focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent ' +
  'transition placeholder:text-gray-400';

const labelClass = 'block text-[13px] font-semibold text-gray-700 mb-1.5';

const sectionHeader = (title: string) => (
  <div className="flex items-center gap-2 mb-5">
    <div className="w-1 h-5 rounded-full bg-[#E31E24]" />
    <h2 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">{title}</h2>
  </div>
);

// ─── ImageUpload sub-component ────────────────────────────────────────────────

interface ImageUploadProps {
  label: string;
  preview: string;
  hint: string;
  config: typeof COVER_CONFIG;
  uploading: boolean;
  onFile: (file: File, preview: string) => void;
  onClear: () => void;
  aspectClass?: string;
}

function ImageUpload({
  label, preview, hint, config, uploading, onFile, onClear, aspectClass = 'aspect-video',
}: ImageUploadProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const errs = validateImage(file, config);
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    const reader = new FileReader();
    reader.onload = ev => onFile(file, ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <p className="text-[11px] text-gray-400 mb-2">{hint}</p>

      {preview ? (
        <div className="relative border-2 border-green-400 rounded-xl overflow-hidden bg-gray-50">
          <img
            src={preview}
            alt="Preview"
            className={`w-full ${aspectClass} object-cover`}
          />
          <button
            type="button"
            onClick={() => { onClear(); setErrors([]); if (ref.current) ref.current.value = ''; }}
            className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-white rounded-full
                       flex items-center justify-center hover:bg-red-700 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 p-6 border-2
                           border-dashed border-gray-200 rounded-xl bg-gray-50
                           hover:border-[#E31E24] hover:bg-red-50/30 cursor-pointer transition">
          <Upload className="w-6 h-6 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">
            {uploading ? 'Uploading…' : 'Click to upload'}
          </span>
          <span className="text-[11px] text-gray-400">jpg · webp · png</span>
          <input
            ref={ref}
            type="file"
            accept="image/jpeg,image/webp,image/png"
            className="hidden"
            onChange={handle}
            disabled={uploading}
          />
        </label>
      )}

      {errors.length > 0 && (
        <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3">
          {errors.map((e, i) => (
            <p key={i} className="text-[12px] text-red-700 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />{e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL: BlogForm = {
  slug: '', title: '', excerpt: '',
  cover_image: '', cover_image_preview: '',
  author_name: '', author_role: '',
  author_avatar: '', author_avatar_preview: '',
  read_time: '', brand: '', rating: 0, views: 0,
  categories: '', tags: '',
  seo_title: '', seo_description: '', seo_keywords: '',
  content_sections: [{ heading: '', content: '' }],
  faqs: [],
  is_published: false,
  featured: false,
};

// ─── Main component ────────────────────────────────────────────────────────────

export default function BlogEditorForm({ id }: BlogEditorFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState<BlogForm>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [loadingRecord, setLoadingRecord] = useState(isEditMode);
  const [loadError, setLoadError] = useState('');

  // ── Load existing post when editing ────────────────────────────────────────
  useEffect(() => {
    if (!id) return;

    (async () => {
      const { data, error } = await supabase
        .from('blogs_autoking')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setLoadError("Couldn't find this post — it may have been deleted.");
        setLoadingRecord(false);
        return;
      }

      setForm({
        slug: data.slug ?? '',
        title: data.title ?? '',
        excerpt: data.excerpt ?? '',
        cover_image: data.cover_image ?? '',
        cover_image_preview: data.cover_image ?? '',
        author_name: data.author_name ?? '',
        author_role: data.author_role ?? '',
        author_avatar: data.author_avatar ?? '',
        author_avatar_preview: data.author_avatar ?? '',
        read_time: data.read_time ?? '',
        brand: data.brand ?? '',
        rating: data.rating ?? 0,
        views: data.views ?? 0,
        categories: (data.categories ?? []).join(', '),
        tags: (data.tags ?? []).join(', '),
        seo_title: data.seo_title ?? '',
        seo_description: data.seo_description ?? '',
        seo_keywords: (data.seo_keywords ?? []).join(', '),
        content_sections: Array.isArray(data.content) && data.content.length
          ? data.content
          : [{ heading: '', content: '' }],
        faqs: Array.isArray(data.faqs) ? data.faqs : [],
        is_published: data.is_published ?? false,
        featured: data.featured ?? false,
      });
      setLoadingRecord(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ── Generic field setter ───────────────────────────────────────────────────
  const set = (key: keyof BlogForm, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }));

  // ── Slug auto-generator ────────────────────────────────────────────────────
  const generateSlug = () =>
    set('slug', form.title.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'));

  // ── Cover image ────────────────────────────────────────────────────────────
  const handleCoverFile = async (file: File, preview: string) => {
    setUploadingCover(true);
    set('cover_image_preview', preview);
    try {
      const fd = new FormData();
      fd.append('blogId', Date.now().toString());
      fd.append('cover', file);
      const res = await fetch('/api/blog/upload-image', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      set('cover_image', data.cover_image);
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : 'Upload failed');
      setStatus('error');
      set('cover_image_preview', '');
    } finally {
      setUploadingCover(false);
    }
  };

  // ── Avatar image ───────────────────────────────────────────────────────────
  const handleAvatarFile = async (file: File, preview: string) => {
    setUploadingAvatar(true);
    set('author_avatar_preview', preview);
    try {
      const fd = new FormData();
      fd.append('blogId', Date.now().toString());
      fd.append('avatar', file);
      const res = await fetch('/api/blog/upload-image', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      set('author_avatar', data.avatar);
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : 'Upload failed');
      setStatus('error');
      set('author_avatar_preview', '');
    } finally {
      setUploadingAvatar(false);
    }
  };

  // ── Content sections ───────────────────────────────────────────────────────
  const updateSection = (i: number, key: keyof ContentSection, val: string) => {
    const next = [...form.content_sections];
    next[i] = { ...next[i], [key]: val };
    set('content_sections', next);
  };
  const addSection = () =>
    set('content_sections', [...form.content_sections, { heading: '', content: '' }]);
  const removeSection = (i: number) =>
    set('content_sections', form.content_sections.filter((_, idx) => idx !== i));

  // ── FAQs ───────────────────────────────────────────────────────────────────
  const addFAQ = () => set('faqs', [...form.faqs, { question: '', answer: '' }]);
  const updateFAQ = (i: number, key: keyof FAQItem, val: string) => {
    const next = [...form.faqs];
    next[i] = { ...next[i], [key]: val };
    set('faqs', next);
  };
  const removeFAQ = (i: number) =>
    set('faqs', form.faqs.filter((_, idx) => idx !== i));

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (): string | null => {
    if (!form.title.trim()) return 'Title is required';
    if (!form.slug.trim()) return 'Slug is required';
    if (!form.cover_image) return 'Cover image is required (wait for upload to finish)';
    if (form.content_sections.some(s => !s.heading.trim()))
      return 'Every content section needs a heading';
    if (form.content_sections.some(s => !s.content.trim()))
      return 'Every content section needs content';
    return null;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMsg('');

    const err = validate();
    if (err) { setErrorMsg(err); setStatus('error'); return; }

    setStatus('loading');

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      excerpt: form.excerpt.trim() || null,
      cover_image: form.cover_image || null,
      author_name: form.author_name.trim() || null,
      author_role: form.author_role.trim() || null,
      author_avatar: form.author_avatar || null,
      read_time: form.read_time.trim() || null,
      brand: form.brand.trim() || null,
      rating: form.rating || 0,
      views: form.views || 0,
      categories: form.categories
        ? form.categories.split(',').map(c => c.trim()).filter(Boolean)
        : null,
      tags: form.tags
        ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
        : null,
      seo_title: form.seo_title.trim() || null,
      seo_description: form.seo_description.trim() || null,
      seo_keywords: form.seo_keywords
        ? form.seo_keywords.split(',').map(k => k.trim()).filter(Boolean)
        : null,
      seo: {
        title: form.seo_title.trim() || null,
        description: form.seo_description.trim() || null,
        keywords: form.seo_keywords
          ? form.seo_keywords.split(',').map(k => k.trim()).filter(Boolean)
          : null,
      },
      content: form.content_sections,
      faqs: form.faqs,
      is_published: form.is_published,
      featured: form.featured,
    };

    let result;
    if (isEditMode && id) {
      result = await supabase
        .from('blogs_autoking')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id);
    } else {
      result = await supabase.from('blogs_autoking').insert(payload);
    }

    if (result.error) {
      setStatus('error');
      setErrorMsg(result.error.message);
      return;
    }

    setStatus('success');

    if (isEditMode) {
      setTimeout(() => router.push('/dashboard/blogs'), 900);
    } else {
      setForm(INITIAL);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ── Loading / not-found states ──────────────────────────────────────────
  if (loadingRecord) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] flex flex-col items-center justify-center gap-3 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin" />
        <p className="text-sm">Loading post…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-sm text-red-600">{loadError}</p>
        <Link href="/dashboard/blogs" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          ← Back to Blog Manager
        </Link>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f5f6f8]">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => router.push('/dashboard/blogs')}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-200" />
        <div>
          <h1 className="text-[14px] font-bold text-gray-900">
            {isEditMode ? 'Edit Blog Article' : 'Add Blog Article'}
          </h1>
          <p className="text-[11px] text-gray-400">
            {isEditMode ? 'Update this post for TheAutoKingUSA' : 'Create a new blog post for TheAutoKingUSA'}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-[12px] font-semibold text-gray-600">
              {form.is_published ? 'Published' : 'Draft'}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={e => set('is_published', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer
                              peer-checked:bg-[#E31E24]
                              after:content-[''] after:absolute after:top-0.5 after:left-0.5
                              after:bg-white after:rounded-full after:h-4 after:w-4
                              after:transition-all peer-checked:after:translate-x-4" />
            </div>
          </label>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 pb-20">

        {status === 'success' && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200
                          text-green-700 px-4 py-3 rounded-xl text-sm">
            <CheckCircle className="w-4 h-4 shrink-0" />
            {isEditMode ? 'Changes saved!' : 'Blog post saved successfully!'}
            {!isEditMode && (
              <Link href="/dashboard/blogs" className="ml-auto text-xs font-medium underline">
                View all posts
              </Link>
            )}
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200
                          text-red-700 px-4 py-3 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── 1. Basic Info ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {sectionHeader('Basic Info')}
            <div className="space-y-4">

              <div>
                <label className={labelClass}>Title <span className="text-red-500">*</span></label>
                <input
                  name="title" required
                  placeholder="e.g. How to Choose the Right Used Engine"
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 items-end">
                <div>
                  <label className={labelClass}>Slug <span className="text-red-500">*</span></label>
                  <input
                    name="slug" required
                    placeholder="e.g. how-to-choose-used-engine"
                    value={form.slug}
                    onChange={e => set('slug', e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Lowercase, hyphens only</p>
                </div>
                <button
                  type="button"
                  onClick={generateSlug}
                  className="px-4 py-2.5 text-[12px] font-semibold border border-gray-200
                             rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition whitespace-nowrap"
                >
                  Generate from title
                </button>
              </div>

              <div>
                <label className={labelClass}>Excerpt</label>
                <textarea
                  name="excerpt" rows={2}
                  placeholder="Short summary shown on blog listing page…"
                  value={form.excerpt}
                  onChange={e => set('excerpt', e.target.value)}
                  className={inputClass}
                />
              </div>

              <ImageUpload
                label="Cover Image"
                preview={form.cover_image_preview}
                hint="16:9 · max 2MB · jpg / webp / png"
                config={COVER_CONFIG}
                uploading={uploadingCover}
                onFile={handleCoverFile}
                onClear={() => {
                  set('cover_image_preview', '');
                  set('cover_image', '');
                }}
                aspectClass="aspect-video"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Categories</label>
                  <input
                    name="categories"
                    placeholder="Engines, Transmissions, Tips"
                    value={form.categories}
                    onChange={e => set('categories', e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Comma separated</p>
                </div>
                <div>
                  <label className={labelClass}>Tags</label>
                  <input
                    name="tags"
                    placeholder="used engine, Toyota, replacement"
                    value={form.tags}
                    onChange={e => set('tags', e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Comma separated</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. Author Details ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {sectionHeader('Author Details')}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Author Name</label>
                  <input
                    placeholder="e.g. AutoKing Team"
                    value={form.author_name}
                    onChange={e => set('author_name', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Author Role</label>
                  <input
                    placeholder="e.g. Engine Specialist"
                    value={form.author_role}
                    onChange={e => set('author_role', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <ImageUpload
                label="Author Avatar"
                preview={form.author_avatar_preview}
                hint="Square (1:1) · max 500KB · jpg / webp / png"
                config={AVATAR_CONFIG}
                uploading={uploadingAvatar}
                onFile={handleAvatarFile}
                onClear={() => {
                  set('author_avatar_preview', '');
                  set('author_avatar', '');
                }}
                aspectClass="aspect-square w-32"
              />
            </div>
          </div>

          {/* ── 3. Article Metadata ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {sectionHeader('Article Metadata')}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Read Time</label>
                <input
                  placeholder="e.g. 5 min"
                  value={form.read_time}
                  onChange={e => set('read_time', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Brand</label>
                <input
                  placeholder="e.g. Toyota"
                  value={form.brand}
                  onChange={e => set('brand', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Rating (0–5)</label>
                <input
                  type="number" min={0} max={5} step={0.1}
                  value={form.rating}
                  onChange={e => set('rating', parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Initial Views</label>
                <input
                  type="number" min={0}
                  value={form.views}
                  onChange={e => set('views', parseInt(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* ── 4. Content Sections ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {sectionHeader('Content Sections')}
            <p className="text-[12px] text-gray-400 mb-4">
              Each section has a heading and a rich text body. Use the toolbar for headings,
              bold, italic, bullet lists, links, and inline images.
            </p>

            <div className="space-y-4">
              {form.content_sections.map((section, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#E31E24]/10 text-[#E31E24]
                                       text-[11px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-[12px] font-semibold text-gray-700">Section {i + 1}</span>
                    </div>
                    {form.content_sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(i)}
                        className="flex items-center gap-1 text-[11px] text-red-500
                                   hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <label className={labelClass}>
                        Section Heading <span className="text-red-500">*</span>
                      </label>
                      <input
                        placeholder="e.g. Introduction"
                        value={section.heading}
                        onChange={e => updateSection(i, 'heading', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Section Content <span className="text-red-500">*</span>
                      </label>
                      <RichTextEditor
                        value={section.content}
                        onChange={html => updateSection(i, 'content', html)}
                        placeholder="Write this section's content…"
                        showHtmlToggle={true}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSection}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-[12px] font-semibold
                         border border-dashed border-gray-300 rounded-lg text-gray-600
                         hover:border-[#E31E24] hover:text-[#E31E24] transition"
            >
              <Plus className="w-4 h-4" /> Add Section
            </button>
          </div>

          {/* ── 5. FAQ ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {sectionHeader('FAQs')}
            <p className="text-[12px] text-gray-400 mb-4">
              Add frequently asked questions displayed at the bottom of the article.
            </p>

            <div className="space-y-3">
              {form.faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative">
                  <button
                    type="button"
                    onClick={() => removeFAQ(i)}
                    className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center
                               text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="space-y-2 pr-8">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Question</label>
                      <input
                        placeholder="Enter question…"
                        value={faq.question}
                        onChange={e => updateFAQ(i, 'question', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Answer</label>
                      <textarea
                        rows={2}
                        placeholder="Enter answer…"
                        value={faq.answer}
                        onChange={e => updateFAQ(i, 'answer', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addFAQ}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-[12px] font-semibold
                         border border-dashed border-gray-300 rounded-lg text-gray-600
                         hover:border-[#E31E24] hover:text-[#E31E24] transition"
            >
              <Plus className="w-4 h-4" /> Add FAQ
            </button>
          </div>

          {/* ── 6. SEO ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {sectionHeader('SEO')}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelClass + ' mb-0'}>SEO Title</label>
                  <span className={`text-[11px] ${form.seo_title.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                    {form.seo_title.length}/60
                  </span>
                </div>
                <input
                  name="seo_title"
                  placeholder="Page title for search engines"
                  value={form.seo_title}
                  onChange={e => set('seo_title', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelClass + ' mb-0'}>SEO Description</label>
                  <span className={`text-[11px] ${form.seo_description.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                    {form.seo_description.length}/160
                  </span>
                </div>
                <textarea
                  name="seo_description" rows={2}
                  placeholder="Meta description for search engines"
                  value={form.seo_description}
                  onChange={e => set('seo_description', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Keywords</label>
                <input
                  name="seo_keywords"
                  placeholder="used engine, buy engine online, replacement engine"
                  value={form.seo_keywords}
                  onChange={e => set('seo_keywords', e.target.value)}
                  className={inputClass}
                />
                <p className="text-[11px] text-gray-400 mt-1">Comma separated</p>
              </div>
            </div>
          </div>

          {/* ── 7. Publish & Featured ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-gray-800">Publish</p>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  Make this post visible on the website
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={e => set('is_published', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer
                                peer-checked:after:translate-x-full peer-checked:after:border-white
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                after:bg-white after:border-gray-300 after:border after:rounded-full
                                after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E31E24]" />
              </label>
            </div>

            <div className="h-px bg-gray-100" />

           
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={status === 'loading' || uploadingCover || uploadingAvatar}
            className="w-full py-3 rounded-xl text-[14px] font-bold text-white
                       bg-[#E31E24] hover:bg-[#c41920] active:scale-[0.99]
                       transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading'
              ? 'Saving…'
              : isEditMode ? 'Save Changes' : 'Save Blog Post'}
          </button>

        </form>
      </div>
    </div>
  );
}