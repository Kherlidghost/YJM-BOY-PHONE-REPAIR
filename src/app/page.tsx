import { ContactBanner } from "@/components/ContactBanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PremiumHero } from "@/components/PremiumHero";
import { PremiumServices } from "@/components/PremiumServices";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <PremiumHero />
      <PremiumServices />
      <ShowcaseGrid type="accessories" />
      <ShowcaseGrid type="tools" />
      <Testimonials />
      <FAQAccordion />
      <ContactBanner />
    </main>
  );
}
