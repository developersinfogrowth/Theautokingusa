"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { RichTextEditor } from "@/app/components/cms/rich-text-editor/RichTextEditor";
import {
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";

const inputClass =
  "w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm text-gray-900 " +
  "focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent placeholder-gray-400";

const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const sectionClass = "bg-white border border-gray-200 rounded-lg p-6";

interface FormState {
  slug: string;
  type: string;
  title: string;
  description: string;
  warranty: string;
  badge: string;
  image: string;
  image_preview: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  rich_content: string;
  status: string;
}

const INITIAL: FormState = {
  slug: "",
  type: "engine",
  title: "",
  description: "",
  warranty: "",
  badge: "",
  image: "",
  image_preview: "",
  seoTitle: "",
  seoDescription: "",
  keywords: "",
  rich_content: "",
  status: "published",
};

interface BrandPageFormProps {
  id?: string;
}

/**
 * Location pages must store only the final slug segment.
 *
 * Examples:
 * california                  → california
 * /california/                → california
 * location/california         → california
 * /location/california/       → california
 *
 * Existing behavior for engine, transmission and commercial slugs
 * remains unchanged.
 */
function normalizeSlug(value: string, type: string) {
  const trimmedValue = value.trim();

  if (type !== "location") {
    return trimmedValue;
  }

  return trimmedValue
    .replace(/^\/+|\/+$/g, "")
    .replace(/^location\/+/i, "")
    .replace(/^\/+|\/+$/g, "");
}

export default function BrandPageForm({ id }: BrandPageFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = Boolean(id);

  const [form, setForm] = useState<FormState>(INITIAL);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [errorMsg, setErrorMsg] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageErrors, setImageErrors] = useState<string[]>([]);

  const [loadingRecord, setLoadingRecord] = useState(isEditMode);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!id) return;

    (async () => {
      const { data, error } = await supabase
        .from("autoking_brands")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setLoadError("Couldn't find this page — it may have been deleted.");
        setLoadingRecord(false);
        return;
      }

      setForm({
        slug: data.slug ?? "",
        type: data.type ?? "engine",
        title: data.title ?? "",
        description: data.description ?? "",
        warranty: "",
        badge: "",
        image: data.image ?? "",
        image_preview: data.image ?? "",
        seoTitle: data.seo_title ?? "",
        seoDescription: data.seo_description ?? "",
        keywords: (data.seo_keywords ?? []).join(", "),
        rich_content: data.rich_content ?? "",
        status: data.status ?? "draft",
      });

      setLoadingRecord(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    set(e.target.name as keyof FormState, e.target.value);
  };

  /*
   * Preview uses the same normalized location slug that will be saved
   * to the database.
   */
  const previewSlug = normalizeSlug(form.slug, form.type);

  const urlPreview =
    previewSlug && form.type
      ? `/${
          form.type === "engine"
            ? "used-engines"
            : form.type === "transmission"
              ? "used-transmissions"
              : form.type
        }/${previewSlug}`
      : null;

  const validateImage = (file: File): string[] => {
    const errors: string[] = [];

    if (file.size > 2 * 1024 * 1024) {
      errors.push("Max size is 2MB");
    }

    if (!["image/jpeg", "image/webp", "image/png"].includes(file.type)) {
      errors.push("Allowed formats: jpg, webp, png");
    }

    return errors;
  };

  const handleImageFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const errs = validateImage(file);

    if (errs.length) {
      setImageErrors(errs);
      return;
    }

    setImageErrors([]);

    const reader = new FileReader();

    reader.onload = (event) => {
      set("image_preview", event.target?.result as string);
    };

    reader.readAsDataURL(file);

    setUploadingImage(true);

    try {
      const fd = new FormData();

      fd.append("blogId", `brand-${Date.now()}`);
      fd.append("cover", file);

      const res = await fetch("/api/blog/upload-image", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      set("image", data.cover_image);
    } catch (err: unknown) {
      setImageErrors([
        err instanceof Error ? err.message : "Upload failed",
      ]);

      set("image_preview", "");
    } finally {
      setUploadingImage(false);
    }
  };

  const clearImage = () => {
    set("image", "");
    set("image_preview", "");
    setImageErrors([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitStatus("loading");
    setErrorMsg("");

    if (!form.title.trim() || !form.slug.trim()) {
      setErrorMsg("Title and slug are required");
      setSubmitStatus("error");
      return;
    }

    if (uploadingImage) {
      setErrorMsg("Please wait for image upload to finish");
      setSubmitStatus("error");
      return;
    }

    const normalizedSlug = normalizeSlug(form.slug, form.type);

    if (!normalizedSlug) {
      setErrorMsg("Please enter a valid slug");
      setSubmitStatus("error");
      return;
    }

    const payload = {
      slug: normalizedSlug,
      type: form.type,
      title: form.title.trim(),
      description: form.description.trim() || null,
      image: form.image || null,
      rich_content: form.rich_content || null,
      seo_title: form.seoTitle.trim() || null,
      seo_description: form.seoDescription.trim() || null,
      seo_keywords: form.keywords
        ? form.keywords
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean)
        : [],
      status: form.status,
    };

    let result;

    if (isEditMode && id) {
      result = await supabase
        .from("autoking_brands")
        .update(payload)
        .eq("id", id);
    } else {
      result = await supabase
        .from("autoking_brands")
        .insert(payload);
    }

    if (result.error) {
      setSubmitStatus("error");
      setErrorMsg(result.error.message);
      return;
    }

    setSubmitStatus("success");

    if (isEditMode) {
      setTimeout(() => {
        router.push("/brands");
      }, 900);
    } else {
      setForm(INITIAL);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (loadingRecord) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 flex flex-col items-center gap-3 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin" />

        <p className="text-sm">Loading page…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <p className="text-sm text-red-600 mb-4">{loadError}</p>

        <Link
          href="/brands"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          ← Back to Brands Manager
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-500
                   hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          {isEditMode
            ? "Edit Brand Page"
            : "Add Engine / Transmission Page"}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {isEditMode
            ? "Update the details below and save your changes."
            : "Fill in the details below to publish a new SEO page."}
        </p>
      </div>

      {submitStatus === "success" && (
        <div
          className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200
                     text-green-700 px-4 py-3 rounded-lg text-sm"
        >
          <CheckCircle className="w-4 h-4 shrink-0" />

          {isEditMode
            ? "Changes saved!"
            : "Page saved successfully!"}

          {urlPreview && (
            <code className="ml-1 font-mono text-green-600">
              {urlPreview}
            </code>
          )}

          {!isEditMode && (
            <Link
              href="/brands"
              className="ml-auto text-xs font-medium underline"
            >
              View all brands
            </Link>
          )}
        </div>
      )}

      {submitStatus === "error" && (
        <div
          className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200
                     text-red-700 px-4 py-3 rounded-lg text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className={sectionClass}>
          <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Basic Info
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Type <span className="text-red-500">*</span>
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="engine">Engine</option>
                <option value="transmission">Transmission</option>
                <option value="commercial">Commercial</option>
                <option value="location">Location</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Slug <span className="text-red-500">*</span>
              </label>

              <input
                name="slug"
                required
                placeholder={
                  form.type === "location"
                    ? "e.g. california"
                    : "e.g. toyota"
                }
                onChange={handleChange}
                value={form.slug}
                className={inputClass}
              />

              {form.type === "location" && (
                <p className="text-xs text-gray-500 mt-1.5">
                  Enter only the location slug, for example{" "}
                  <code className="font-mono text-gray-700">
                    california
                  </code>
                  . Do not include{" "}
                  <code className="font-mono text-gray-700">
                    location/
                  </code>
                  .
                </p>
              )}

              {urlPreview && (
                <p className="text-xs text-green-600 mt-1.5 font-mono bg-green-50 px-2 py-1 rounded">
                  → {urlPreview}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Card Title <span className="text-red-500">*</span>
              </label>

              <input
                name="title"
                required
                placeholder="e.g. Toyota Used Engine"
                onChange={handleChange}
                value={form.title}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Warranty</label>

              <input
                name="warranty"
                placeholder="e.g. 3 Year Warranty"
                onChange={handleChange}
                value={form.warranty}
                className={inputClass}
              />
            </div>

            <div className="col-span-2">
              <label className={labelClass}>
                Card Description
              </label>

              <input
                name="description"
                placeholder="Short description shown on the card"
                onChange={handleChange}
                value={form.description}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Badge (optional)
              </label>

              <select
                name="badge"
                value={form.badge}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">-- None --</option>
                <option value="engine">Engine</option>
                <option value="transmission">Transmission</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className={labelClass}>Image</label>

              <p className="text-[11px] text-gray-400 mb-2">
                Recommended 16:9 · max 2MB · jpg / webp / png
              </p>

              {form.image_preview ? (
                <div className="relative border-2 border-green-400 rounded-xl overflow-hidden bg-gray-50">
                  <img
                    src={form.image_preview}
                    alt="Preview"
                    className="w-full aspect-video object-cover"
                  />

                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="animate-spin w-6 h-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>

                        <p className="text-white text-xs font-semibold">
                          Uploading…
                        </p>
                      </div>
                    </div>
                  )}

                  {!uploadingImage && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-white
                                 rounded-full flex items-center justify-center
                                 hover:bg-red-700 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {form.image && !uploadingImage && (
                    <div
                      className="absolute bottom-2 left-2 bg-green-600 text-white
                                 text-[10px] font-bold px-2 py-1 rounded-md"
                    >
                      ✓ Uploaded
                    </div>
                  )}
                </div>
              ) : (
                <label
                  className="flex flex-col items-center justify-center gap-2 p-8
                             border-2 border-dashed border-gray-200 rounded-xl bg-gray-50
                             hover:border-[#E31E24] hover:bg-red-50/20
                             cursor-pointer transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-400" />

                  <span className="text-sm font-medium text-gray-600">
                    {uploadingImage
                      ? "Uploading…"
                      : "Click to upload"}
                  </span>

                  <span className="text-[11px] text-gray-400">
                    jpg · webp · png
                  </span>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/webp,image/png"
                    className="hidden"
                    onChange={handleImageFile}
                    disabled={uploadingImage}
                  />
                </label>
              )}

              {imageErrors.length > 0 && (
                <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3">
                  {imageErrors.map((err, index) => (
                    <p
                      key={index}
                      className="text-[12px] text-red-700 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {err}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            SEO
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={labelClass + " mb-0"}>
                  SEO Title
                </label>

                <span
                  className={`text-xs ${
                    form.seoTitle.length > 60
                      ? "text-red-500 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {form.seoTitle.length}/60
                </span>
              </div>

              <input
                name="seoTitle"
                placeholder="Page title for search engines"
                onChange={handleChange}
                value={form.seoTitle}
                className={inputClass}
              />

              <p className="text-xs text-gray-400 mt-1">
                Shown as the blue link title in Google search results
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={labelClass + " mb-0"}>
                  SEO Description
                </label>

                <span
                  className={`text-xs ${
                    form.seoDescription.length > 160
                      ? "text-red-500 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {form.seoDescription.length}/160
                </span>
              </div>

              <textarea
                name="seoDescription"
                rows={3}
                placeholder="Meta description for search engines"
                onChange={handleChange}
                value={form.seoDescription}
                className={inputClass}
              />

              <p className="text-xs text-gray-400 mt-1">
                Shown as the grey text under the title in Google search
                results
              </p>
            </div>

            <div>
              <label className={labelClass}>Keywords</label>

              <input
                name="keywords"
                placeholder="toyota engine, used engine, jdm engine"
                onChange={handleChange}
                value={form.keywords}
                className={inputClass}
              />

              <p className="text-xs text-gray-400 mt-1">
                Comma separated — e.g. toyota engine, used engine, jdm
              </p>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Page Content
          </h2>

          <label className={labelClass}>Rich Text Content</label>

          <p className="text-xs text-gray-400 mb-3">
            Add your page content with headings, lists, links, and
            images. Use the toolbar to format your content or click the{" "}
            <code className="bg-gray-100 px-1 rounded">
              &lt;/&gt;
            </code>{" "}
            icon to edit raw HTML.
          </p>

          <RichTextEditor
            value={form.rich_content}
            onChange={(html) => set("rich_content", html)}
            placeholder="Start writing your page content here..."
            showHtmlToggle={true}
          />
        </div>

        <button
          type="submit"
          disabled={
            submitStatus === "loading" || uploadingImage
          }
          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg text-sm font-semibold
                     hover:bg-gray-700 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitStatus === "loading"
            ? "Saving…"
            : isEditMode
              ? "Save Changes"
              : "Save & Publish"}
        </button>
      </form>
    </div>
  );
}