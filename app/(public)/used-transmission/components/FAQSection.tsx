import FAQAccordion from "@/app/components/shared/FAQAccordion";
import { USED_TRANSMISSION_FAQS } from "../lib/faqData";

export default function FAQSection() {
  return (
    <FAQAccordion
      faqs={USED_TRANSMISSION_FAQS}
      title="FAQs About Buying Used Transmissions in California"
      subtitle="Common questions answered about used transmission replacement"
      showCTA={true}
    />
  );
}