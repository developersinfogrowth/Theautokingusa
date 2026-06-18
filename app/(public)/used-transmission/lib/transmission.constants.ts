import { LucideIcon, Shield, Clock, DollarSign, CheckCircle, Truck, Award } from 'lucide-react';

export const PHONE_NUMBER = '+18664865915';
export const PHONE_DISPLAY = '+1 (866) 486-5915';

// Why Choose Used Transmission Features
export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WHY_FEATURES: FeatureCard[] = [
  {
    icon: DollarSign,
    title: 'Cost Savings',
    description:
      'Save 50-70% compared to new OEM transmissions while maintaining quality and reliability.',
  },
  {
    icon: CheckCircle,
    title: 'OEM Compatibility',
    description:
      'Factory-matched transmissions verified for your exact vehicle configuration and VIN.',
  },
  {
    icon: Clock,
    title: 'Faster Than Rebuild',
    description:
      'Get back on the road quickly with ready-to-install units, no weeks-long rebuild delays.',
  },
  {
    icon: Shield,
    title: 'Inspected Units',
    description:
      'Every transmission undergoes comprehensive multi-point inspection before shipment.',
  },
  {
    icon: Truck,
    title: 'Nationwide Shipping',
    description:
      'Fast delivery across all 50 states with complete tracking and professional handling.',
  },
  {
    icon: Award,
    title: 'Warranty Available',
    description:
      'Select units include warranty coverage for peace of mind after installation.',
  },
];

// Inspection Process Steps
export interface InspectionStep {
  step: number;
  title: string;
  description: string;
}

export const INSPECTION_STEPS: InspectionStep[] = [
  {
    step: 1,
    title: 'VIN Verification',
    description:
      'Comprehensive compatibility check using your vehicle identification number to ensure exact match.',
  },
  {
    step: 2,
    title: 'Mileage Verification',
    description:
      'Documented mileage validation from donor vehicle records for complete transparency.',
  },
  {
    step: 3,
    title: 'Fluid Inspection',
    description:
      'Transmission fluid analyzed for contamination, metal particles, and overall condition.',
  },
  {
    step: 4,
    title: 'Housing Inspection',
    description:
      'Thorough examination of casing for cracks, damage, or signs of previous failure.',
  },
  {
    step: 5,
    title: 'Gear Performance',
    description:
      'Internal gear engagement tested for smooth operation and proper synchronization.',
  },
  {
    step: 6,
    title: 'Electronic Compatibility',
    description:
      'Control module and sensor verification to ensure proper vehicle integration.',
  },
];

export interface BrandSection {
  id: string;
  brand: string;
  title: string;
  image: string;
  intro: string;
  mainContent: string;
  whyTitle?: string;
  whyContent?: string;
  models: string[];
  benefits: string[];
}

export const BRAND_SECTIONS: BrandSection[] = [
  {
    id: 'audi',
    brand: 'Audi',
    title: 'Used Audi Transmission',
    image: '/images/used-transmission-audi.jpg',

    intro:
      "Audi vehicles are built for performance, precision, and long-distance comfort and California drivers know that better than anyone. From the tech corridor commutes along Highway 101 in Silicon Valley and the coastal cruising routes of Pacific Coast Highway to the stop-and-go grind of the 405 in Los Angeles and the mountain switchbacks heading up toward Lake Tahoe, California puts Audi transmissions through a genuinely demanding daily workout.",

    mainContent:
      "A quality used Audi transmission sourced from a verified supplier and thoroughly inspected for mechanical condition before shipping is the most practical and financially responsible solution for California Audi owners who want to restore their vehicle's performance without the sticker shock of a new unit. Every used Audi transmission in the available inventory is compatibility-verified using your vehicle's year, make, model, trim level, and VIN, ensuring the unit you receive is engineered for your exact Audi configuration, whether you drive an A4, A6, Q5, Q7, A8, or any other model in Audi's lineup.",

    whyTitle:
      "Why California Audi Owners Choose Used Transmission Replacements",

    whyContent:
      "California has one of the highest concentrations of Audi vehicles anywhere in the United States. Audi's combination of Quattro all-wheel-drive capability, German engineering precision, and refined interior comfort makes it one of the most popular choices among California drivers. But California's demanding driving conditions and relentless stop-and-go traffic place sustained stress on Audi's sophisticated transmission systems. For Audi owners whose vehicles are otherwise in excellent condition, a professionally sourced used Audi transmission delivers the most practical combination of cost savings, fast availability, and reliable performance.",

    models: ['A4', 'A6', 'Q5', 'Q7', 'A8', 'Q3', 'A3', 'A5'],

    benefits: [
      'Quattro all-wheel-drive compatibility verified',
      'DSG and S-Tronic dual-clutch systems available',
      'Tiptronic automatic transmissions in stock',
      'California emissions-compliant units',
      'Fast Bay Area and Southern California delivery',
    ],
  },

  {
    id: 'bmw',
    brand: 'BMW',
    title: 'Used BMW Transmission',
    image: '/images/Used-transmission-bmw.jpg',

    intro:
      "From the winding canyon roads of Malibu and the tech campus parking structures of Cupertino to the coastal highway stretches of Highway 1 near Big Sur and the busy urban grid of downtown San Francisco, BMW transmissions in California face a uniquely demanding combination of performance driving, urban stop-and-go cycling, and mountain pass challenges.",

    mainContent:
      "A quality used BMW transmission sourced through a verified supplier and thoroughly evaluated for mechanical condition before delivery gives California BMW owners a practical path back to the performance and refinement their vehicle was designed to deliver without the extraordinary cost of a new OEM unit.",

    whyTitle:
      "Why California BMW Owners Choose Used Transmission Replacements",

    whyContent:
      "California is home to one of the largest BMW owner communities in the country. BMW's reputation for dynamic driving performance and premium engineering makes it the preferred choice for drivers who expect more than basic transportation. A thoroughly inspected and compatibility-verified used BMW transmission provides the most financially intelligent path back to refined gear shifting, sport mode capability, and everyday reliability.",

    models: ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'X1', '4 Series', 'M Models'],

    benefits: [
      'ZF automatic transmissions available',
      'DCT dual-clutch systems in stock',
      'xDrive all-wheel-drive compatibility',
      'Sport mode calibration verified',
      'Premium California market servicing',
    ],
  },

  {
    id: 'chevy',
    brand: 'Chevrolet',
    title: 'Used Chevy Transmission',
    image: '/images/used-chevy-transmission.jpg',

    intro:
      "Chevrolet is one of the most widely driven vehicle brands across California, from the construction sites and agricultural operations of the Central Valley to the suburban family driveways of Southern California and the Bay Area commuter routes.",

    mainContent:
      "When a Chevy transmission begins slipping, shuddering under load, hesitating during acceleration, or fails entirely, a quality used Chevy transmission is the most practical, affordable, and time-efficient solution for getting your vehicle back on the road without the cost of a brand-new OEM replacement.",

    whyTitle:
      "Why California Chevy Owners Choose Used Transmission Replacements",

    whyContent:
      "Chevy trucks, SUVs, and sedans are heavily relied upon across California for towing, commuting, construction, agriculture, and family transportation. A professionally inspected used Chevy transmission helps owners restore reliability quickly while avoiding extended rebuild delays and excessive dealership repair costs.",

    models: [
      'Silverado',
      'Tahoe',
      'Suburban',
      'Equinox',
      'Malibu',
      'Colorado',
      'Traverse',
    ],

    benefits: [
      '4L60E and 4L80E heavy-duty units',
      '6-speed and 8-speed automatics available',
      'Towing-rated transmissions in stock',
      '2WD and 4WD configurations',
      'Central Valley and SoCal fast delivery',
    ],
  },
];

// Transmission Types
export interface TransmissionType {
  type: string;
  description: string;
  compatibility: string;
}

export const TRANSMISSION_TYPES: TransmissionType[] = [
  {
    type: 'Automatic',
    description:
      'Most common transmission type with smooth shifting and reliable performance for daily driving.',
    compatibility: 'Available for sedans, SUVs, trucks, and luxury vehicles',
  },
  {
    type: 'Manual',
    description:
      'Driver-controlled gear selection offering maximum control and fuel efficiency.',
    compatibility: 'Performance vehicles, sports cars, and economy models',
  },
  {
    type: 'CVT',
    description:
      'Continuously Variable Transmission providing seamless acceleration and optimal fuel economy.',
    compatibility: 'Modern sedans, hybrids, and compact vehicles',
  },
  {
    type: 'Dual-Clutch',
    description:
      'Performance-oriented transmission combining manual efficiency with automatic convenience.',
    compatibility: 'European luxury and performance vehicles',
  },
  {
    type: 'Heavy-Duty',
    description:
      'Reinforced transmissions built for towing, hauling, and commercial applications.',
    compatibility: 'Full-size trucks, commercial vehicles, and fleet operations',
  },
];

// California Benefits Stats
export const CALIFORNIA_STATS = [
  { value: '10M+', label: 'Vehicles Serviced' },
  { value: '98%', label: 'Success Rate' },
  { value: '24/7', label: 'Support Available' },
  { value: '50 States', label: 'Nationwide Shipping' },
];
