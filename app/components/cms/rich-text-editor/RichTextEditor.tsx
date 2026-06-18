"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Extension } from "@tiptap/core";
import * as TiptapUnderline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  LinkIcon,
  ImageIcon,
  Undo2,
  Redo2,
  Code,
  Pilcrow,
  Upload,
  Minus,
  Plus,
  X,
  Palette,
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface RichTextEditorProps {
  value?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  showHtmlToggle?: boolean;
  blogId?: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function generateTempId(): string {
  return `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ─────────────────────────────────────────────
// Toolbar atoms
// ─────────────────────────────────────────────
function ToolbarButton({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      disabled={disabled}
      className={`p-1.5 rounded transition-colors ${
        active
          ? "bg-gray-900 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-gray-200 mx-1" />;
}

// ─────────────────────────────────────────────
// FIX 1 — FontSizeExtension
// unsetFontSize now sets fontSize: null instead of
// calling unsetMark('textStyle') which would also
// destroy any color that was set on the same mark.
// ─────────────────────────────────────────────
const FONT_SIZES = [12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48, 72];

const FontSizeExtension = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ commands }: { commands: any }) => {
          // Only touch fontSize — color in the same mark is untouched ✅
          return commands.setMark("textStyle", { fontSize });
        },
      unsetFontSize:
        () =>
        ({ commands }: { commands: any }) => {
          // FIX: set fontSize to null instead of destroying the whole mark
          // Previously: commands.unsetMark('textStyle') ← also killed color
          return commands.setMark("textStyle", { fontSize: null });
        },
    };
  },
});

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  showHtmlToggle = false,
  blogId,
}: RichTextEditorProps) {
  const isInitialMount = useRef(true);
  const [effectiveBlogId] = useState(blogId || generateTempId());
  const [showHtmlMode, setShowHtmlMode] = useState(false);
  const [htmlValue, setHtmlValue] = useState(value || "");
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [currentFontSize, setCurrentFontSize] = useState<number>(16);
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // FIX 3 — current color tracked so the palette icon shows the active color
  const [currentColor, setCurrentColor] = useState<string>("#000000");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const fontSizeDropdownRef = useRef<HTMLDivElement>(null);

  // ─────────────────────────────────────────────
  // Editor setup
  // FIX 2 — StarterKit heading is extended with
  // HTMLAttributes so it preserves inline style.
  // Same applied to paragraph node.
  // ─────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          // FIX 2a — tell Tiptap to keep the `style` attribute on heading nodes.
          // Without this, pasted <h1 style="color:red"> silently drops the style.
          HTMLAttributes: {
            style: "",
          },
        },
        paragraph: {
          // FIX 2b — same for paragraph nodes
          HTMLAttributes: {
            style: "",
          },
        },
      }),

      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),

      Placeholder.configure({ placeholder }),

      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 no-underline",
        },
      }),

      TiptapUnderline.default,

      // ORDER MATTERS: TextStyle must come before Color
      // Color piggybacks on TextStyle's mark infrastructure
      TextStyle,
      Color,

      FontSizeExtension,
    ],

    content: value && value.trim() ? value : "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      updateActiveFormats(editor);
      updateFontSize(editor);
      updateColor(editor);
    },

    editorProps: {
      attributes: {
        // FIX 4 — added "tiptap-editor" class so our scoped CSS below can
        // override Tailwind prose color rules with correct specificity.
        class:
          "tiptap-editor prose prose-sm max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-gray-700 focus:outline-none min-h-[160px] px-4 py-3 text-gray-800",
      },
    },
    immediatelyRender: false,
  });

  // ─────────────────────────────────────────────
  // Format + color state updaters
  // ─────────────────────────────────────────────
  const updateActiveFormats = (editorInstance: typeof editor) => {
    if (!editorInstance) return;
    const formats = new Set<string>();
    if (editorInstance.isActive("bold")) formats.add("bold");
    if (editorInstance.isActive("italic")) formats.add("italic");
    if (editorInstance.isActive("underline")) formats.add("underline");
    if (editorInstance.isActive("heading", { level: 2 })) formats.add("h2");
    if (editorInstance.isActive("heading", { level: 3 })) formats.add("h3");
    if (editorInstance.isActive("bulletList")) formats.add("ul");
    if (editorInstance.isActive("orderedList")) formats.add("ol");
    if (editorInstance.isActive("link")) formats.add("link");
    if (editorInstance.isActive("paragraph") && !editorInstance.isActive("heading"))
      formats.add("p");
    setActiveFormats(formats);
  };

  const updateFontSize = (editorInstance: typeof editor) => {
    if (!editorInstance) return;
    const fontSize = editorInstance.getAttributes("textStyle").fontSize;
    if (fontSize) {
      const numericSize = parseInt(fontSize.replace("px", ""));
      setCurrentFontSize(numericSize);
    } else {
      setCurrentFontSize(16);
    }
  };

  // FIX 3 — read current color from textStyle mark so palette icon reflects it
  const updateColor = (editorInstance: typeof editor) => {
    if (!editorInstance) return;
    const color = editorInstance.getAttributes("textStyle").color;
    setCurrentColor(color || "#000000");
  };

  // ─────────────────────────────────────────────
  // Effects
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (editor) {
      updateActiveFormats(editor);
      updateFontSize(editor);
      updateColor(editor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fontSizeDropdownRef.current &&
        !fontSizeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFontSizeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!editor) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (value && value.trim()) {
        setTimeout(() => {
          editor.commands.setContent(value);
          updateActiveFormats(editor);
          updateFontSize(editor);
          updateColor(editor);
        }, 0);
      }
      return;
    }
    if (value && value.trim()) {
      const currentContent = editor.getHTML();
      if (currentContent !== value) {
        editor.commands.setContent(value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  // ─────────────────────────────────────────────
  // HTML mode handlers
  // ─────────────────────────────────────────────
  const handleHtmlChange = (newHtml: string) => {
    setHtmlValue(newHtml);
    onChange(newHtml);
    editor.commands.setContent(newHtml);
    setShowHtmlMode(false);
  };

  const toggleHtmlMode = () => {
    if (!showHtmlMode) {
      setHtmlValue(editor.getHTML());
    }
    setShowHtmlMode(!showHtmlMode);
  };

  // ─────────────────────────────────────────────
  // Font size handlers
  // ─────────────────────────────────────────────
  const increaseFontSize = () => {
    const currentIndex = FONT_SIZES.indexOf(currentFontSize);
    const nextIndex = Math.min(currentIndex + 1, FONT_SIZES.length - 1);
    const newSize = FONT_SIZES[nextIndex];
    (editor.chain().focus() as any).setFontSize(`${newSize}px`).run();
    setCurrentFontSize(newSize);
  };

  const decreaseFontSize = () => {
    const currentIndex = FONT_SIZES.indexOf(currentFontSize);
    const prevIndex = Math.max(currentIndex - 1, 0);
    const newSize = FONT_SIZES[prevIndex];
    (editor.chain().focus() as any).setFontSize(`${newSize}px`).run();
    setCurrentFontSize(newSize);
  };

  const setFontSize = (size: number) => {
    (editor.chain().focus() as any).setFontSize(`${size}px`).run();
    setCurrentFontSize(size);
    setShowFontSizeDropdown(false);
  };

  // ─────────────────────────────────────────────
  // FIX 3 — Color handler
  // Uses editor.chain().setColor() from the Color extension.
  // This sets color inside the textStyle mark WITHOUT touching fontSize.
  // ─────────────────────────────────────────────
  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    editor.chain().focus().setColor(color).run();
  };

  const handleColorReset = () => {
    setCurrentColor("#000000");
    editor.chain().focus().unsetColor().run();
  };

  // ─────────────────────────────────────────────
  // Image upload handlers (unchanged)
  // ─────────────────────────────────────────────
  const openImageUploadModal = () => {
    setShowImageUploadModal(true);
    setImageUploadError(null);
    setSelectedFile(null);
    setImagePreview(null);
  };

  const closeImageUploadModal = () => {
    setShowImageUploadModal(false);
    setImageUploadError(null);
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateImage = (file: File): string | null => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;
    if (!allowedTypes.includes(file.type))
      return "Invalid file type. Allowed: JPEG, PNG, WebP";
    if (file.size > maxSize) return "File too large. Max: 2MB";
    return null;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const error = validateImage(file);
    if (error) {
      setImageUploadError(error);
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }
    setImageUploadError(null);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setImagePreview(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !effectiveBlogId || !editor) return;
    setUploadingImage(true);
    setImageUploadError(null);
    try {
      const formData = new FormData();
      formData.append("blogId", effectiveBlogId);
      formData.append("image", selectedFile);
      const response = await fetch("/api/editor/upload-image", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");
      if (result.url) {
        editor.chain().focus().setImage({ src: result.url }).run();
        closeImageUploadModal();
      } else {
        setImageUploadError("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setImageUploadError(
        error instanceof Error ? error.message : "Upload failed. Please try again."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <>
      {/*
        FIX 4 — Scoped CSS that lives right next to the editor.
        Problem: Tailwind prose forces its own text color on headings/paragraphs,
        overriding any inline style="color:..." Tiptap writes into the DOM.
        Fix: target elements inside .tiptap-editor that carry a style attribute
        with "color" in it, and force the browser to respect the inline style.
        The "!important" here only applies inside our editor scope — it won't
        leak out to the rest of the page.
      */}
      <style>{`
        .tiptap-editor [style*="color"] {
          color: inherit !important;
        }
        .tiptap-editor h1[style],
        .tiptap-editor h2[style],
        .tiptap-editor h3[style],
        .tiptap-editor p[style],
        .tiptap-editor span[style] {
          color: unset;
        }
        .tiptap-editor h1[style*="color"],
        .tiptap-editor h2[style*="color"],
        .tiptap-editor h3[style*="color"],
        .tiptap-editor p[style*="color"],
        .tiptap-editor span[style*="color"] {
          color: var(--tw-prose-headings, currentColor) !important;
        }
        /* Let inline style always win over prose defaults */
        .tiptap-editor [style] {
          color: revert;
        }
        .tiptap-editor span[style*="color"],
        .tiptap-editor h1[style*="color"],
        .tiptap-editor h2[style*="color"],
        .tiptap-editor h3[style*="color"],
        .tiptap-editor p[style*="color"] {
          color: attr(style) !important;
        }
      `}</style>

      <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition bg-white">
        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50">

          {/* Bold / Italic / Underline */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold size={15} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic size={15} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon size={15} />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Paragraph / Headings */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            active={
              editor.isActive("paragraph") && !editor.isActive("heading")
            }
            title="Paragraph"
          >
            <Pilcrow size={15} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={15} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 size={15} />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Lists + indent */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={15} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Ordered List"
          >
            <ListOrdered size={15} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor?.chain().focus().sinkListItem("listItem").run()
            }
            title="Increase Indent"
          >
            <span className="text-xs font-bold">→</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor?.chain().focus().liftListItem("listItem").run()
            }
            title="Decrease Indent"
          >
            <span className="text-xs font-bold">←</span>
          </ToolbarButton>

          <ToolbarDivider />

          {/* Font size controls */}
          <div className="flex items-center gap-0.5" ref={fontSizeDropdownRef}>
            <ToolbarButton onClick={decreaseFontSize} title="Decrease Font Size">
              <Minus size={15} />
            </ToolbarButton>
            <button
              type="button"
              onClick={() => setShowFontSizeDropdown(!showFontSizeDropdown)}
              className="px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors min-w-[50px]"
              title="Font Size"
            >
              {currentFontSize}
            </button>
            <ToolbarButton onClick={increaseFontSize} title="Increase Font Size">
              <Plus size={15} />
            </ToolbarButton>

            {showFontSizeDropdown && (
              <div className="absolute z-50 mt-32 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      (editor.chain().focus() as any).unsetFontSize().run();
                      setCurrentFontSize(16);
                      setShowFontSizeDropdown(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100 text-gray-600"
                  >
                    Default
                  </button>
                  {FONT_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFontSize(size)}
                      className={`w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100 ${
                        currentFontSize === size
                          ? "bg-gray-100 text-blue-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ToolbarDivider />

          {/*
            FIX 3 — Color picker button
            How it works:
            - A hidden <input type="color"> does the actual color picking
            - The visible button (Palette icon) shows the current color as a
              small dot underneath the icon, so you can see what color is active
            - Clicking the button programmatically opens the color input
            - onChange fires editor.chain().setColor(hex) which sets color
              inside the textStyle mark WITHOUT touching fontSize
            - Right-clicking / the X button resets color to default
          */}
          <div className="relative flex items-center">
            <input
              ref={colorInputRef}
              type="color"
              value={currentColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="absolute opacity-0 w-0 h-0 pointer-events-none"
              tabIndex={-1}
              aria-hidden="true"
            />
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                colorInputRef.current?.click();
              }}
              title="Text Color"
              className="p-1.5 rounded transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex flex-col items-center gap-0.5"
            >
              <Palette size={15} />
              {/* Color indicator dot — shows currently active color */}
              <span
                className="block w-3.5 h-1 rounded-full border border-gray-300"
                style={{ backgroundColor: currentColor }}
              />
            </button>
            {/* Reset color button — only show when a non-black color is active */}
            {currentColor !== "#000000" && (
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleColorReset();
                }}
                title="Reset Color"
                className="p-0.5 rounded text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors"
              >
                <X size={10} />
              </button>
            )}
          </div>

          <ToolbarDivider />

          {/* Link / Image */}
          <ToolbarButton
            onClick={() => {
              const url = prompt("Enter URL:");
              if (url) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              }
            }}
            active={editor.isActive("link")}
            title="Insert Link"
          >
            <LinkIcon size={15} />
          </ToolbarButton>
          <ToolbarButton
            onClick={openImageUploadModal}
            title="Upload Image (16:9, Max 2MB)"
          >
            <ImageIcon size={15} />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Undo / Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Undo2 size={15} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Redo2 size={15} />
          </ToolbarButton>

          {/* Active format indicator */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-400">Active:</span>
            <div className="flex gap-1">
              {Array.from(activeFormats).map((format) => (
                <span
                  key={format}
                  className="bg-[#0B3D91] text-white px-2 py-0.5 rounded text-xs font-bold"
                >
                  {format}
                </span>
              ))}
              {activeFormats.size === 0 && (
                <span className="text-gray-400 text-xs">None</span>
              )}
            </div>
          </div>

          {/* HTML toggle */}
          {showHtmlToggle && (
            <button
              onClick={toggleHtmlMode}
              type="button"
              title="Toggle HTML view"
              className={`p-1.5 rounded hover:bg-gray-200 transition-colors ml-1 ${
                showHtmlMode ? "bg-gray-300 text-black" : "text-gray-500"
              }`}
            >
              <Code size={15} />
            </button>
          )}
        </div>

        {/* ── HTML mode ── */}
        {showHtmlMode ? (
          <div className="p-4">
            <textarea
              value={htmlValue}
              onChange={(e) => setHtmlValue(e.target.value)}
              className="w-full h-64 border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Paste or edit HTML here..."
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleHtmlChange(htmlValue)}
                className="flex-1 bg-black text-white px-3 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
              >
                Apply HTML
              </button>
              <button
                onClick={() => setShowHtmlMode(false)}
                className="flex-1 bg-gray-200 text-gray-900 px-3 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ── Editor content ── */
          <div className="max-h-[300px] overflow-y-auto">
            {editor && (
              <BubbleMenu editor={editor}>
                <div className="flex items-center gap-0.5 bg-gray-900 rounded-lg px-2 py-1.5 shadow-xl border border-gray-700">
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().toggleBold().run();
                    }}
                    className={`p-1 rounded text-xs ${
                      editor.isActive("bold")
                        ? "text-white bg-gray-600"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <Bold size={13} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().toggleItalic().run();
                    }}
                    className={`p-1 rounded text-xs ${
                      editor.isActive("italic")
                        ? "text-white bg-gray-600"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <Italic size={13} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().toggleUnderline().run();
                    }}
                    className={`p-1 rounded text-xs ${
                      editor.isActive("underline")
                        ? "text-white bg-gray-600"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <UnderlineIcon size={13} />
                  </button>
                  <div className="w-px h-4 bg-gray-600 mx-0.5" />
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const url = prompt("Enter URL:");
                      if (url)
                        editor
                          .chain()
                          .focus()
                          .extendMarkRange("link")
                          .setLink({ href: url })
                          .run();
                    }}
                    className={`p-1 rounded text-xs ${
                      editor.isActive("link")
                        ? "text-blue-400 bg-gray-600"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <LinkIcon size={13} />
                  </button>
                  {/* Color picker also in bubble menu for convenience */}
                  <div className="w-px h-4 bg-gray-600 mx-0.5" />
                  <div className="relative">
                    <input
                      type="color"
                      value={currentColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="absolute opacity-0 w-0 h-0 pointer-events-none"
                      id="bubble-color-input"
                      tabIndex={-1}
                    />
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        document
                          .getElementById("bubble-color-input")
                          ?.click();
                      }}
                      title="Text Color"
                      className="p-1 rounded text-gray-300 hover:text-white flex flex-col items-center gap-0.5"
                    >
                      <Palette size={13} />
                      <span
                        className="block w-3 h-0.5 rounded-full"
                        style={{ backgroundColor: currentColor }}
                      />
                    </button>
                  </div>
                </div>
              </BubbleMenu>
            )}
            <EditorContent editor={editor} />
          </div>
        )}

        {/* ── Image Upload Modal (unchanged) ── */}
        {showImageUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Upload Image
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Aspect Ratio: 16:9 • Recommended: 1200×675px • Max: 2MB •
                    jpg | webp | png
                  </p>
                </div>
                <button
                  onClick={closeImageUploadModal}
                  className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                  type="button"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              <div className="p-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  {imagePreview ? (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg object-contain"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setImagePreview(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        type="button"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm font-medium">
                        Click to select an image
                      </p>
                      <p className="text-xs mt-1">or drag and drop</p>
                    </div>
                  )}
                </div>

                {imageUploadError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{imageUploadError}</p>
                  </div>
                )}

                {selectedFile && (
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{selectedFile.name}</span>
                    <span>
                      {((selectedFile.size || 0) / (1024 * 1024)).toFixed(2)}{" "}
                      MB
                    </span>
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={closeImageUploadModal}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImageUpload}
                    disabled={!selectedFile || uploadingImage}
                    className={`flex-1 px-4 py-2.5 text-white rounded-lg text-sm font-medium transition-colors ${
                      !selectedFile || uploadingImage
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#0B3D91] hover:bg-[#0a3580]"
                    }`}
                    type="button"
                  >
                    {uploadingImage ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      "Upload & Insert"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}