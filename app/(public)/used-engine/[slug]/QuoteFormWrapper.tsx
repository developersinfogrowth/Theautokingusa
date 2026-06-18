"use client";

import QuoteForm from "@/app/components/home/hero/QuoteForm";

export default function QuoteFormWrapper() {
  // onClose is a no-op here — form is inline, not a modal
  return <QuoteForm onClose={() => {}} />;
}