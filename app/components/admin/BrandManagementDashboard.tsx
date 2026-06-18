"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit2, Plus, X } from "lucide-react";
import { RichTextEditor } from "@/app/components/cms/rich-text-editor/RichTextEditor";
import { getEditorContent, cleanHTML } from "@/lib/utils/contentConversion";

interface Brand {
  id: string;
  slug: string;
  type: string;
  title: string;
  description: string;
  warranty: string;
  badge: string;
  image: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: string | Record<string, unknown>;
  rich_content: string | null;
  created_at: string;
}

export function BrandManagementDashboard() {
  const [brands, setBrands]       = useState<Brand[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm]   = useState<Partial<Brand> | null>(null);
  const [filterType, setFilterType] = useState<string>("");

  useEffect(() => { fetchBrands(); }, []);

  const fetchBrands = async (type?: string) => {
    try {
      setLoading(true);
      const url = new URL("/api/parts", window.location.origin);
      if (type || filterType) url.searchParams.append("type", type || filterType);

      const res  = await fetch(url.toString());
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch brands");

      const brandsData = (data.data || []).map((brand: Brand) => ({
        ...brand,
        content:      brand.content      || '',
        rich_content: brand.rich_content || null,
      }));

      setBrands(brandsData);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (brand: Brand) => {
    setEditingId(brand.id);
    const editorContent = getEditorContent(brand);
    setEditForm({ ...brand, content: editorContent });
  };

  const handleSaveEdit = async () => {
    if (!editForm || !editingId) return;
    try {
      const res = await fetch("/api/parts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id:           editingId,
          slug:         editForm.slug,
          type:         editForm.type,
          title:        editForm.title,
          description:  editForm.description,
          warranty:     editForm.warranty,
          badge:        editForm.badge,
          image:        editForm.image,
          seo:          editForm.seo,
          rich_content: editForm.content && typeof editForm.content === 'string'
            ? cleanHTML(editForm.content) : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update brand");

      setBrands(brands.map(b => b.id === editingId ? data.data : b));
      setEditingId(null);
      setEditForm(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;
    try {
      const res  = await fetch(`/api/parts?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete brand");
      setBrands(brands.filter(b => b.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const filteredBrands = filterType ? brands.filter(b => b.type === filterType) : brands;
  const brandTypes     = Array.from(new Set(brands.map(b => b.type)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* Page heading */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="block w-5 h-0.5 rounded-full bg-[#C41E3A]" />
          <span className="text-[#C41E3A] text-[10px] font-black uppercase tracking-widest">
            Content Manager
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Brand Management</h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage engine, transmission, and other branded landing pages
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 flex justify-between items-center">
          <span className="text-sm">{error}</span>
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-1">Total</p>
          <p className="text-2xl font-black text-gray-900">{brands.length}</p>
        </div>
        {brandTypes.map(type => (
          <div key={type} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-1 capitalize">{type}</p>
            <p className="text-2xl font-black text-gray-900">
              {brands.filter(b => b.type === type).length}
            </p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="mb-5 flex gap-3 items-center">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Filter:</label>
        <select
          value={filterType}
          onChange={e => { setFilterType(e.target.value); fetchBrands(e.target.value); }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A] bg-white"
        >
          <option value="">All Types</option>
          {brandTypes.map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-[1.5px] border-gray-100" />
            <div className="absolute inset-0 rounded-full border-[1.5px] border-t-[#C41E3A] animate-spin" />
          </div>
          <p className="text-[#C41E3A]/50 text-[9px] font-bold uppercase tracking-[0.35em]">Loading brands</p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredBrands.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Title', 'Slug', 'Type', 'Warranty', 'Badge', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand, idx) => (
                  <tr key={brand.id}
                    className={`border-b border-gray-100 hover:bg-red-50/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">{brand.title}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-500 font-mono">{brand.slug}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-block bg-red-50 text-[#C41E3A] border border-red-100 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider capitalize">
                        {brand.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{brand.warranty || '—'}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{brand.badge || '—'}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleEdit(brand)}
                          className="p-2 rounded-xl hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(brand.id)}
                          className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-[#C41E3A] transition-colors"
                          title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredBrands.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
            <Plus size={22} className="text-[#C41E3A]" />
          </div>
          <p className="text-gray-500 text-sm mb-4">No brands found</p>
          <a href="/dashboard/brandpage"
            className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-[#a01830] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors">
            <Plus size={14} />
            Create First Brand
          </a>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && editForm && (
        <EditBrandModal
          brand={editForm}
          onClose={() => { setEditingId(null); setEditForm(null); }}
          onSave={handleSaveEdit}
          onChange={updates => setEditForm({ ...editForm, ...updates })}
        />
      )}
    </div>
  );
}

// ─── Edit Modal ───────────────────────────────────────────

interface EditBrandModalProps {
  brand: Partial<Brand>;
  onClose: () => void;
  onSave: () => void;
  onChange: (updates: Partial<Brand>) => void;
}

function EditBrandModal({ brand, onClose, onSave, onChange }: EditBrandModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'seo' | 'content'>('basic');

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  const handleSeoChange = (key: string, value: unknown) => {
    const currentSeo = brand.seo || { title: '', description: '', keywords: [] };
    onChange({ seo: { ...currentSeo, [key]: value } });
  };

  const tabs = [
    { id: 'basic',   label: 'Basic Info' },
    { id: 'seo',     label: 'SEO'        },
    { id: 'content', label: 'Content'    },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 rounded-full bg-[#C41E3A]" />
            <h2 className="text-base font-bold text-gray-900">Edit: {brand.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 bg-gray-50 flex">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'text-[#C41E3A] border-b-2 border-[#C41E3A] bg-white'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-white/60'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {/* ── Basic Info ── */}
          {activeTab === 'basic' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Title', key: 'title', required: true },
                  { label: 'Slug',  key: 'slug',  required: true },
                ].map(({ label, key, required }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      {label} {required && <span className="text-[#C41E3A]">*</span>}
                    </label>
                    <input
                      type="text"
                      value={(brand[key as keyof Brand] as string) || ''}
                      onChange={e => onChange({ [key]: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A]"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Type <span className="text-[#C41E3A]">*</span>
                  </label>
                  <select value={brand.type || ''} onChange={e => onChange({ type: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A]">
                    <option value="">Select type…</option>
                    <option value="engine">Engine</option>
                    <option value="transmission">Transmission</option>
                    <option value="commercial">Commercial</option>
                    <option value="location">Location</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Badge</label>
                  <select value={brand.badge || ''} onChange={e => onChange({ badge: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A]">
                    <option value="">No badge</option>
                    <option value="engine">Engine</option>
                    <option value="transmission">Transmission</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
                <textarea value={brand.description || ''} onChange={e => onChange({ description: e.target.value })}
                  rows={3} placeholder="Short description shown on the card"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A] resize-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Warranty</label>
                <input type="text" value={brand.warranty || ''} onChange={e => onChange({ warranty: e.target.value })}
                  placeholder="e.g. 3 Year Warranty"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Image URL</label>
                <input type="text" value={brand.image || ''} onChange={e => onChange({ image: e.target.value })}
                  placeholder="https://…"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A]" />
              </div>

              {brand.image && (
                <div className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Preview</p>
                  <img src={`/car-brands/${brand.image}.svg`} alt={brand.title}
                    className="max-w-full max-h-32 rounded"
                    onError={e => { e.currentTarget.style.display = 'none'; }} />
                </div>
              )}
            </>
          )}

          {/* ── SEO ── */}
          {activeTab === 'seo' && (
            <>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Title</label>
                  <span className={`text-[10px] font-semibold ${(brand.seo?.title?.length || 0) > 60 ? 'text-[#C41E3A]' : 'text-gray-400'}`}>
                    {brand.seo?.title?.length || 0}/60
                  </span>
                </div>
                <input type="text" value={brand.seo?.title || ''}
                  onChange={e => handleSeoChange('title', e.target.value)}
                  placeholder="Page title for search engines"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A]" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Description</label>
                  <span className={`text-[10px] font-semibold ${(brand.seo?.description?.length || 0) > 160 ? 'text-[#C41E3A]' : 'text-gray-400'}`}>
                    {brand.seo?.description?.length || 0}/160
                  </span>
                </div>
                <textarea value={brand.seo?.description || ''}
                  onChange={e => handleSeoChange('description', e.target.value)}
                  rows={3} placeholder="Meta description for search engines"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A] resize-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Keywords</label>
                <textarea
                  value={Array.isArray(brand.seo?.keywords) ? brand.seo.keywords.join(', ') : ''}
                  onChange={e => handleSeoChange('keywords', e.target.value.split(',').map(k => k.trim()).filter(Boolean))}
                  rows={2} placeholder="keyword1, keyword2, keyword3"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/30 focus:border-[#C41E3A] resize-none" />
                <p className="text-[10px] text-gray-400 mt-1">Comma separated</p>
              </div>
            </>
          )}

          {/* ── Content ── */}
          {activeTab === 'content' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Rich Text Content
                </label>
                <p className="text-[11px] text-gray-400 mb-3">
                  Use the toolbar to format content. Click the{' '}
                  <code className="bg-gray-100 text-[#C41E3A] px-1 rounded text-[10px]">&lt;/&gt;</code>{' '}
                  icon to edit raw HTML.
                  {brand.rich_content ? ' (Migrated to rich editor)' : ' (Converted from structured data)'}
                </p>
                <RichTextEditor
                  key={`editor-${brand.id || 'new'}`}
                  value={brand.content ? (typeof brand.content === 'string' ? brand.content : '') : ''}
                  onChange={html => onChange({ content: html })}
                  placeholder="Start writing your page content here…"
                  showHtmlToggle={true}
                />
              </div>

              {brand.content && (
                <div className="mt-6">
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">UI Preview</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">How your content appears on the website</p>
                  </div>

                  <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    {/* Browser chrome */}
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-[10px] text-gray-400 ml-2 font-mono">theautokingusa.com</span>
                    </div>

                    {/* Preview content */}
                    <div className="p-8 bg-white">
                      <div
                        className="prose prose-lg max-w-none
                          prose-headings:font-bold
                          prose-h2:text-3xl prose-h2:text-gray-900 prose-h2:mt-6 prose-h2:mb-3
                          prose-h3:text-2xl prose-h3:text-gray-800 prose-h3:mt-5 prose-h3:mb-2
                          prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-4
                          prose-strong:font-bold prose-strong:text-gray-900
                          prose-a:text-[#C41E3A] prose-a:underline hover:prose-a:text-[#a01830]
                          prose-ul:list-disc prose-ul:ml-6 prose-ul:my-4
                          prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-4
                          prose-li:text-gray-700 prose-li:leading-7 prose-li:mb-2
                          prose-img:rounded-xl prose-img:shadow-md prose-img:my-4
                          prose-code:bg-gray-100 prose-code:text-[#C41E3A] prose-code:px-2 prose-code:py-1 prose-code:rounded
                          prose-blockquote:border-l-4 prose-blockquote:border-[#C41E3A]/30 prose-blockquote:pl-4 prose-blockquote:text-gray-600"
                        dangerouslySetInnerHTML={{ __html: typeof brand.content === 'string' ? brand.content : '' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex gap-3 justify-end">
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-[#C41E3A] hover:bg-[#a01830] text-white text-sm font-bold transition-colors disabled:opacity-50 flex items-center gap-2">
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Saving…
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}