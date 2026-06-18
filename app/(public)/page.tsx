import Hero             from '@/app/components/home/hero/Hero';
import ShopCategories   from '@/app/components/home/hero/ShopCategories';
import { TopSelling }   from '@/app/components/home/hero/TopSelling';
import { HowItWorks }   from '@/app/components/home/hero/HowItWorks';
import { WhyChooseUs }  from '@/app/components/home/hero/WhyChooseUs';
import Testimonials     from '@/app/components/home/hero/Testimonials';
import { FAQAccordion } from '@/app/components/home/hero/FAQAccordion';

export default function HomePage() {
  return (
    <main className="text-gray-800 bg-white">
      <Hero />
      <ShopCategories />
      <TopSelling />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQAccordion />
    </main>
  );
}

export const metadata = {
  title: 'Reliable Used Engines & Transmissions with Top-Notch Quality',
  description: 'Shop reliable used engines and used transmissions for cars, trucks, and SUVs at affordable prices. Quality-tested auto parts with warranty options & expert support.',
  keywords: [
    'used engines',
    'used transmissions',
    'used motors for sale',
    'used auto parts',
    'replacement engines',
    'replacement transmissions',
    'low mileage engines',
    'tested used transmissions',
    'affordable used engines',
    'used car engines',
    'used truck engines',
    'transmission for sale',
  ],
  alternates: {
    canonical: '/',
  },
};