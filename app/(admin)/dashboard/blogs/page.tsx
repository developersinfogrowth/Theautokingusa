"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft, Plus, Search, Pencil, Trash2, Loader2,
  Newspaper, CheckCircle2, Clock3, Eye, ImageOff, X,
} from "lucide-react";

interface BlogRow {
  id: string;
  slug: string;
  title: string;
  cover_image: string | null;
  author_name: string | null;
  is_published: boolean;
  views: number | null;
  rating: number | null;
  updated_at: string | null;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function BlogsManager() {
  const supabase = createClient();
  const router = useRouter();

  const [rows, setRows] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteTarget, setDeleteTarget] = useState<BlogRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadRows = async () => {
    setLoading(true);
    setErrorMsg("");
    const { data, error } = await supabase
      .from("blogs_autoking")
      .select("id, slug, title, cover_image, author_name, is_published, views, rating, updated_at")
      .order("updated_at", { ascending: false });

    if (error) setErrorMsg(error.message);
    else setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    let published = 0, draft = 0, totalViews = 0;
    for (const r of rows) {
      if (r.is_published) published++; else draft++;
      totalViews += r.views ?? 0;
    }
    return { total: rows.length, published, draft, totalViews };
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter(r => {
      if (statusFilter === "published" && !r.is_published) return false;
      if (statusFilter === "draft" && r.is_published) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.slug.toLowerCase().includes(q) &&
          !(r.author_name ?? "").toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [rows, search, statusFilter]);

  const togglePublish = async (row: BlogRow) => {
    const next = !row.is_published;
    setRows(prev => prev.map(r => (r.id === row.id ? { ...r, is_published: next } : r)));
    const { error } = await supabase
      .from("blogs_autoking")
      .update({ is_published: next, updated_at: new Date().toISOString() })
      .eq("id", row.id);
    if (error) {
      setRows(prev => prev.map(r => (r.id === row.id ? { ...r, is_published: row.is_published } : r)));
      setErrorMsg(error.message);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase.from("blogs_autoking").delete().eq("id", deleteTarget.id);
    setDeleting(false);
    if (error) {
      setErrorMsg(error.message);
      setDeleteTarget(null);
      return;
    }
    setRows(prev => prev.filter(r => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500
                     hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Blog Manager</h1>
            <p className="text-sm text-gray-500 mt-1">All articles published on TheAutoKingUSA</p>
          </div>
          <Link
            href="/dashboard/blogs/new"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5
                       rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>

        {errorMsg && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3
                          rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard icon={<Newspaper className="w-4 h-4" />} label="Total" value={stats.total} />
          <StatCard icon={<CheckCircle2 className="w-4 h-4" />} label="Published" value={stats.published} accent="text-green-600" />
          <StatCard icon={<Clock3 className="w-4 h-4" />} label="Draft" value={stats.draft} accent="text-amber-600" />
          <StatCard icon={<Eye className="w-4 h-4" />} label="Total Views" value={stats.totalViews} />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, slug, or author…"
              className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm
                         text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E31E24]
                         focus:border-transparent placeholder-gray-400"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-400 py-16 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading posts…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-sm text-gray-400">
              {rows.length === 0
                ? <>No blog posts yet — click <span className="font-medium text-gray-600">New Post</span> to write one.</>
                : "No posts match your filters."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-gray-500">
                    <th className="px-4 py-3 font-medium">Post</th>
                    <th className="px-4 py-3 font-medium">Author</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Views</th>
                    <th className="px-4 py-3 font-medium">Updated</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(row => (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/60">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-9 rounded-md overflow-hidden bg-gray-100 shrink-0
                                          flex items-center justify-center">
                            {row.cover_image
                              ? <img src={row.cover_image} alt="" className="w-full h-full object-cover" />
                              : <ImageOff className="w-4 h-4 text-gray-300" />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{row.title}</p>
                            <p className="text-xs text-gray-400 truncate">/blog/{row.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.author_name ?? "—"}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => togglePublish(row)}
                          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                            row.is_published
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          }`}
                        >
                          {row.is_published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{(row.views ?? 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(row.updated_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/blogs/${row.id}`}
                            className="w-8 h-8 flex items-center justify-center rounded-md
                                       border border-gray-200 text-gray-500 hover:text-gray-900
                                       hover:border-gray-300 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(row)}
                            className="w-8 h-8 flex items-center justify-center rounded-md
                                       border border-gray-200 text-gray-500 hover:text-red-600
                                       hover:border-red-200 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Delete this post?</h3>
              <button onClick={() => setDeleteTarget(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              <span className="font-medium text-gray-700">{deleteTarget.title}</span> will be permanently removed. This can&apos;t be undone.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2.5 text-sm
                           font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white rounded-lg py-2.5 text-sm font-medium
                           hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon, label, value, accent,
}: { icon: ReactNode; label: string; value: number; accent?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5">
      <div className={`flex items-center gap-1.5 text-gray-400 mb-1.5 ${accent ?? ""}`}>
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
    </div>
  );
}