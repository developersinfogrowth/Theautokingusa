import FAQAccordion from "@/app/components/shared/FAQAccordion";
import { USED_ENGINE_FAQS } from "../lib/faqData";

export default function FAQSection() {
  return (
    <FAQAccordion
      faqs={USED_ENGINE_FAQS}
      title="FAQs About Buying Used Engines in California"
      subtitle="Everything you need to know before purchasing a used engine or transmission"
      showCTA={true}
      ctaText="Still have questions?"
      ctaSubtext="Our specialists are ready to help — no bots, no scripts."
      phoneNumber="+18664865915"
      phoneDisplay="+1 (866) 486-5915"
    />
  );
}