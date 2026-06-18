import React from "react";

import HeroSection from "@/app/components/sections/HeroSection";
import FeaturesSection from "@/app/components/sections/FeaturesSection";
import QuoteFormSection from "@/app/components/sections/QuoteFormSection";
import RichTextRenderer from "@/app/components/cms/rich-text/RichTextRenderer";

export interface PageSection {
  id?: string;
  page_slug: string;
  section_type: string;
  position: number;
  content: any;
}

export function renderSection(section: PageSection) {
  const { section_type, content, id } = section;

  switch (section_type) {
    case "hero":
      return (
        <HeroSection
          key={id}
          data={content}
        />
      );

    case "features":
      return (
        <FeaturesSection
          key={id}
          data={content}
        />
      );

    case "quote_form":
      return (
        <QuoteFormSection
          key={id}
          data={content}
        />
      );

    case "rich_text":
      return (
        <RichTextRenderer
          key={id}
          content={content?.html || ""}
        />
      );

    default:
      return null;
  }
}