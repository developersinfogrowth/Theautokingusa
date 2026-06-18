"use client";

interface Props {
  content: string;
  className?: string;
}

export default function RichTextRenderer({ content, className = "" }: Props) {
  return (
    <div
      className={`prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}