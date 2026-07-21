import {
  type LucideIcon,
  Package,
  DollarSign,
  Shield,
  Truck,
  Clock,
  Award,
} from 'lucide-react';

export const PHONE_NUMBER = '+18883182840';
export const PHONE_DISPLAY = '+1 (888) 318-2840';

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

// Commercial truck brand sections
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
    id: 'freightliner',
    title: 'Freightliner',
    brands: ['Freightliner'],
    image: '/images/freightliner.webp',
    engineDescription:
      'Freightliner trucks are trusted for long-haul transportation, logistics, and commercial fleet operations. Our quality-tested used Freightliner engines help restore dependable power while reducing replacement costs for owner-operators and businesses.',
    transmissionDescription:
      'Our used Freightliner transmissions are thoroughly inspected for smooth shifting, dependable drivetrain performance, and long-term commercial reliability. They provide an affordable solution for keeping Freightliner trucks operating efficiently.',
    highlights: [
      'Heavy-duty commercial performance',
      'Long-haul reliability',
      'Quality-tested engines',
      'Smooth-shifting transmissions',
      'Fast California & nationwide shipping',
    ],
  },

  {
    id: 'mack',
    title: 'Mack',
    brands: ['Mack'],
    image: '/images/mack.webp',
    engineDescription:
      'Mack trucks are engineered for construction, heavy hauling, and demanding commercial applications. Our inspected used Mack engines deliver dependable power while helping reduce maintenance costs for fleets and owner-operators.',
    transmissionDescription:
      'Our used Mack transmissions are inspected for reliable shifting, heavy-duty drivetrain strength, and long-term commercial performance. They provide a dependable replacement solution that minimizes downtime.',
    highlights: [
      'Heavy-haul capability',
      'Construction-ready performance',
      'Quality-tested powertrain',
      'Reliable drivetrain operation',
      'Fleet & owner-operator support',
    ],
  },

  {
    id: 'peterbilt',
    title: 'Peterbilt',
    brands: ['Peterbilt'],
    image: '/images/peterbilt.webp',
    engineDescription:
      'Peterbilt trucks are built for demanding workloads, long-haul transportation, and dependable commercial performance. Our quality-tested used Peterbilt engines provide a practical replacement solution for restoring power while helping fleets and owner-operators control repair costs.',
    transmissionDescription:
      'Our used Peterbilt transmissions are inspected for smooth shifting, dependable drivetrain operation, and reliable heavy-duty performance. They provide a cost-effective replacement option for commercial trucks operating across California and nationwide.',
    highlights: [
      'Long-haul performance',
      'Heavy-duty power delivery',
      'Quality-tested replacement engines',
      'Smooth transmission operation',
      'Fleet & owner-operator support',
    ],
  },

  {
    id: 'volvo',
    title: 'Volvo',
    brands: ['Volvo'],
    image: '/images/volvo.webp',
    engineDescription:
      'Volvo commercial trucks are known for efficient performance, advanced engineering, and dependable long-distance operation. Our used Volvo engines are inspected to help restore reliable power, fuel efficiency, and everyday productivity for commercial vehicles.',
    transmissionDescription:
      'We provide used Volvo transmissions tested for smooth shifting, dependable operation, and long-term commercial use. These replacement units help reduce repair expenses and get fleet vehicles back on the road with minimal downtime.',
    highlights: [
      'Efficient commercial performance',
      'Advanced engineering',
      'Reliable long-distance operation',
      'Quality-inspected components',
      'Cost-effective fleet repairs',
    ],
  },

  {
    id: 'international',
    title: 'International',
    brands: ['International'],
    image: '/images/international.webp',
    engineDescription:
      'International trucks support a wide range of commercial applications including freight, delivery, construction, and fleet operations. Our used International engines are inspected to provide dependable power and practical value for demanding business use.',
    transmissionDescription:
      'Our used International transmissions are quality-tested for reliable shifting, drivetrain strength, and consistent commercial operation. They offer an affordable replacement solution for businesses looking to reduce downtime and extend truck service life.',
    highlights: [
      'Commercial-grade reliability',
      'Fleet-ready performance',
      'Reliable drivetrain strength',
      'Quality-tested replacement parts',
      'Fast California & nationwide shipping',
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
      "We understand that every hour off the road costs money. That's why we focus on dependable parts, fast delivery, and service that helps businesses stay operational.",
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