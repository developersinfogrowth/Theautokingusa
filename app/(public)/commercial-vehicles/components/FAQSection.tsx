import FAQAccordion from "@/app/components/shared/FAQAccordion";
import { COMMERCIAL_VEHICLES_FAQS } from "../lib/faqData";

export default function FAQSection() {
  return (
    <FAQAccordion
      faqs={COMMERCIAL_VEHICLES_FAQS}
      title="FAQs About Buying Used Transmissions in California"
      subtitle="Common questions answered about used transmission replacement"
      showCTA={true}
    />
  );
}