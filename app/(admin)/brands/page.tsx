"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft, Plus, Search, Pencil, Trash2, Loader2,
  Boxes, Wrench, Settings2, Truck, MapPin, CheckCircle2, Clock3, ImageOff, X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────

interface SeoPageRow {
  id: string;
  slug: string;
  type: string;
  title: string;
  status: string | null;
  image: string | null;
  updated_at: string | null;
}

const TYPE_LABELS: Record<string, string> = {
  engine: "Engine",
  transmission: "Transmission",
  commercial: "Commercial",
  location: "Location",
};

const TYPE_BADGE: Record<string, string> = {
  engine: "bg-blue-50 text-blue-700 border-blue-200",
  transmission: "bg-purple-50 text-purple-700 border-purple-200",
  commercial: "bg-orange-50 text-orange-700 border-orange-200",
  location: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const TYPE_ICON: Record<string, ReactNode> = {
  engine: <Wrench className="w-4 h-4" />,
  transmission: <Settings2 className="w-4 h-4" />,
  commercial: <Truck className="w-4 h-4" />,
  location: <MapPin className="w-4 h-4" />,
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function routeFor(type: string, slug: string) {
  const base =
    type === "engine" ? "used-engines" :
    type === "transmission" ? "used-transmissions" : type;
  return `/${base}/${slug}`;
}

// ─── Main component ─────────────────────────────────────────────────────

export default function BrandsManager() {
  const supabase = createClient();
  const router = useRouter();

  const [rows, setRows] = useState<SeoPageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteTarget, setDeleteTarget] = useState<SeoPageRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch ────────────────────────────────────────────────────────────
  const loadRows = async () => {
    setLoading(true);
    setErrorMsg("");
    const { data, error } = await supabase
      .from("autoking_brands")
      .select("id, slug, type, title, status, image, updated_at")
      .order("updated_at", { ascending: false });

    if (error) setErrorMsg(error.message);
    else setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Stats ────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const byType: Record<string, number> = {};
    let published = 0;
    let draft = 0;
    for (const r of rows) {
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      if (r.status === "published") published++; else draft++;
    }
    return { total: rows.length, byType, published, draft };
  }, [rows]);

  // ── Filtering ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return rows.filter(r => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!r.title.toLowerCase().includes(q) && !r.slug.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [rows, search, typeFilter, statusFilter]);

  // ── Delete ───────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase.from("autoking_brands").delete().eq("id", deleteTarget.id);
    setDeleting(false);

    if (error) {
      setErrorMsg(error.message);
      setDeleteTarget(null);
      return;
    }

    setRows(prev => prev.filter(r => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F6FA] py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500
                     hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Brands Manager</h1>
            <p className="text-sm text-gray-500 mt-1">
              Engine, transmission, commercial &amp; location pages
            </p>
          </div>
          <Link
            href="/brandpage"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5
                       rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New
          </Link>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3
                          rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <StatCard icon={<Boxes className="w-4 h-4" />} label="Total" value={stats.total} />
          <StatCard icon={<Wrench className="w-4 h-4" />} label="Engines" value={stats.byType.engine ?? 0} />
          <StatCard icon={<Settings2 className="w-4 h-4" />} label="Transmissions" value={stats.byType.transmission ?? 0} />
          <StatCard icon={<Truck className="w-4 h-4" />} label="Commercial" value={stats.byType.commercial ?? 0} />
          <StatCard icon={<CheckCircle2 className="w-4 h-4" />} label="Published" value={stats.published} accent="text-green-600" />
          <StatCard icon={<Clock3 className="w-4 h-4" />} label="Draft" value={stats.draft} accent="text-amber-600" />
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or slug…"
              className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm
                         text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E31E24]
                         focus:border-transparent placeholder-gray-400"
            />
          </div>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
          >
            <option value="all">All types</option>
            <option value="engine">Engine</option>
            <option value="transmission">Transmission</option>
            <option value="commercial">Commercial</option>
            <option value="location">Location</option>
          </select>
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

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-400 py-16 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading brand pages…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-sm text-gray-400">
              {rows.length === 0
                ? <>No brand pages yet — click <span className="font-medium text-gray-600">Add New</span> to create one.</>
                : "No pages match your filters."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-gray-500">
                    <th className="px-4 py-3 font-medium">Page</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Status</th>
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
                            {row.image
                              ? <img src={row.image} alt="" className="w-full h-full object-cover" />
                              : <ImageOff className="w-4 h-4 text-gray-300" />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{row.title}</p>
                            <p className="text-xs text-gray-400 truncate">{routeFor(row.type, row.slug)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs
                                          font-medium border ${TYPE_BADGE[row.type] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                          {TYPE_ICON[row.type]}
                          {TYPE_LABELS[row.type] ?? row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          row.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {row.status === "published" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(row.updated_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/brandpage/${row.id}`}
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

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Delete this page?</h3>
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

// ─── Stat card ───────────────────────────────────────────────────────────

function StatCard({
  icon, label, value, accent,
}: { icon: ReactNode; label: string; value: number; accent?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5">
      <div className={`flex items-center gap-1.5 text-gray-400 mb-1.5 ${accent ?? ""}`}>
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}