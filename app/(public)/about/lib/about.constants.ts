import { LucideIcon, Shield, Users, Eye, Award, Clock, DollarSign } from 'lucide-react';

export const PHONE_NUMBER = '+18664865915';
export const PHONE_DISPLAY = '+1 (866) 486-5915';

// Core Values
export interface CoreValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const CORE_VALUES: CoreValue[] = [
  {
    icon: Shield,
    title: 'Quality First',
    description:
      'Every used engine and transmission is carefully inspected and tested for dependable performance.',
  },
  {
    icon: Users,
    title: 'Customer Satisfaction',
    description:
      'Your satisfaction matters. We offer responsive support and warranty options on eligible parts.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'Clear product details, straightforward pricing, and no hidden surprises.',
  },
  {
    icon: Award,
    title: 'Reliability',
    description:
      'Trusted by customers nationwide for dependable used auto parts solutions.',
  },
  {
    icon: Clock,
    title: 'Fast Service',
    description:
      'Quick order processing and efficient nationwide shipping.',
  },
  {
    icon: DollarSign,
    title: 'Fair Pricing',
    description:
      'Competitive prices on quality parts without compromising value.',
  },
];

// Our Advantages
export interface Advantage {
  title: string;
  description: string;
}

export const ADVANTAGES: Advantage[] = [
  {
    title: 'Great Deals While They Last',
    description:
      'Save more on quality automotive parts without paying dealership prices. TheAutoKingUSA offers affordable used engines, used transmissions, and replacement parts that help you repair your vehicle while staying within budget.',
  },
  {
    title: 'Reliable Nationwide Delivery',
    description:
      'We provide fast, secure, and dependable shipping across the United States. Your required engine, transmission, or auto part is packed carefully and delivered safely to your preferred location.',
  },
  {
    title: 'Benefits of Purchasing With Us',
    description:
      'Every purchase is designed to deliver value. We focus on OEM and high-quality replacement parts that offer strong compatibility, long service life, and dependable performance.',
  },
];

// Brands We Carry
export const BRANDS = [
  'Chevrolet',
  'Ford',
  'Toyota',
  'Honda',
  'BMW',
  'Audi',
  'Nissan',
  'Jeep',
  'Volkswagen',
  'Lexus',
  'Mercedes-Benz',
  'Dodge',
  'GMC',
  'Chrysler',
];

// Stats
export const STATS = [
  { value: '2018', label: 'Founded' },
  { value: '50+', label: 'States Served' },
  { value: '10,000+', label: 'Parts Delivered' },
  { value: '98%', label: 'Customer Satisfaction' },
];