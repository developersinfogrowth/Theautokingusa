import HeroSection from "@/app/components/sections/HeroSection";
import FeaturesSection from "@/app/components/sections/FeaturesSection";
import QuoteForm from "@/app/components/home/hero/QuoteForm";
import RichTextRenderer from "@/app/components/cms/rich-text/RichTextRenderer";

export function renderSection(section: any) {
  switch (section.section_type) {
    case "hero":
      return <HeroSection data={section.content} />;

    case "features":
      return <FeaturesSection data={section.content} />;

    case "quote_form":
      return (
        <QuoteForm
          data={section.content}
          onClose={() => {}}
        />
      );

    case "rich_text":
      return <RichTextRenderer content={section.content} />;

    default:
      return null;
  }
}