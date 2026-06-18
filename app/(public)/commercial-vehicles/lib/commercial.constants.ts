import { LucideIcon, Package, DollarSign, Shield, Truck, Clock, Award } from 'lucide-react';

export const PHONE_NUMBER = '+18664865915';
export const PHONE_DISPLAY = '+1 (866) 486-5915';

// Why California Businesses Choose Us
export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const CALIFORNIA_FEATURES: FeatureCard[] = [
  {
    icon: Package,
    title: 'Large Inventory',
    description:
      'Extensive selection of used commercial vehicle engines & transmissions for all major truck brands.',
  },
  {
    icon: Shield,
    title: 'Quality-Tested Parts',
    description:
      'Every engine and transmission inspected for dependable commercial performance.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description:
      'Budget-friendly repairs that help control maintenance expenses for fleets and owner-operators.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description:
      'Quick delivery across California and nationwide to minimize costly downtime.',
  },
  {
    icon: Clock,
    title: 'Fleet Support',
    description:
      'Dedicated service for fleets, owner-operators, and commercial repair shops.',
  },
  {
    icon: Award,
    title: 'Warranty Options',
    description:
      'Warranty coverage available on select units for added peace of mind.',
  },
];

// Truck Brand Groups (Combined into 2 sections to use only 2 images)
export interface TruckBrandGroup {
  id: string;
  title: string;
  brands: string[];
  image: string;
  engineDescription: string;
  transmissionDescription: string;
  highlights: string[];
}

export const TRUCK_BRAND_GROUPS: TruckBrandGroup[] = [
  {
    id: 'freightliner-mack',
    title: 'Freightliner & Mack',
    brands: ['Freightliner', 'Mack'],
    image: '/images/freightliner‑mack‑trucks.jpg',
    engineDescription:
      'Keep your truck working hard with dependable used Freightliner and Mack engines built for heavy-duty hauling and long-distance performance. Trusted across California industries from logistics to construction, our tested used engines help restore power and efficiency at a fraction of new replacement costs.',
    transmissionDescription:
      'We carry used Freightliner and Mack transmissions inspected for smooth shifting and reliable drivetrain operation. Whether you run local routes or interstate loads, quality used transmissions help reduce downtime and extend vehicle life.',
    highlights: [
      'Heavy-duty hauling capability',
      'Long-distance performance tested',
      'Smooth shifting verified',
      'California logistics trusted',
      'Cost-effective replacements',
    ],
  },
  {
    id: 'peterbilt-volvo-international',
    title: 'Peterbilt, Volvo & International',
    brands: ['Peterbilt', 'Volvo', 'International'],
    image: '/images/peterbilt-volvo-international.jpg',
    engineDescription:
      'Peterbilt, Volvo, and International trucks are built for serious workloads and long-haul reliability. Our used engines offer practical solutions for restoring performance while controlling maintenance expenses. Each engine is inspected to deliver reliable power and better operating value for California businesses.',
    transmissionDescription:
      'We stock used Peterbilt, Volvo, and International transmissions quality-tested for strength, smooth operation, and long-term reliability. Ideal for owner-operators and fleet vehicles needing dependable replacement parts that lower repair costs and minimize downtime.',
    highlights: [
      'Serious workload capacity',
      'Long-haul reliability tested',
      'Advanced engineering standards',
      'Owner-operator trusted',
      'Fleet-ready performance',
    ],
  },
];

// Why Choose Us Features
export interface WhyChooseFeature {
  title: string;
  description: string;
}

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    title: 'Built for Commercial Vehicle Needs',
    description:
      'We understand that every hour off the road costs money. That\'s why we focus on dependable parts, fast delivery, and service that helps businesses stay operational.',
  },
  {
    title: 'Cost-Effective Repairs',
    description:
      'Save money compared to new replacements while maintaining heavy-duty performance and reliability.',
  },
  {
    title: 'Reliable Quality',
    description:
      'Each engine and transmission is thoroughly inspected for dependable commercial use and long service life.',
  },
  {
    title: 'Wide Inventory',
    description:
      'Parts available for many truck brands, fleet vehicles, and commercial applications across all major manufacturers.',
  },
  {
    title: 'Fast California Shipping',
    description:
      'Quick delivery across California and nationwide to reduce downtime and keep your fleet moving.',
  },
];
