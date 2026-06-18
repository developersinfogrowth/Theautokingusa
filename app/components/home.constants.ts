import {
  Shield, Award, Package, Truck, CheckCircle,
  Headphones,
} from 'lucide-react';

// ── Contact ────────────────────────────────────────────────────────
export const PHONE_RAW     = '+18664865915';
export const PHONE_DISPLAY = '(866) 486-5915';

// ── Trust Bar ──────────────────────────────────────────────────────
export const TRUST_ITEMS = [
  { icon: Award,        label: '20+ Years Experience'      },
  { icon: Package,      label: '10,000+ Parts Sold'        },
  { icon: Shield,       label: '1-Month Warranty'          },
  { icon: Truck,        label: 'Fast Nationwide Shipping'  },
  { icon: CheckCircle,  label: 'Verified & Tested Parts'   },
] as const;

// ── Shop Categories ────────────────────────────────────────────────
export interface Category {
  image: string;
  title: string;
  desc:  string;
  href:  string;
  count: string;
  color: string;
  icon:  string;
}
export const CATEGORIES = [
  {
    title: 'Used Engines',
    desc: 'OEM-Grade Engines for All Makes & Models. Every Unit Tested, Certified & Backed by Warranty.',
    href: '/used-engine',
    image: '/images/engine.png',
    color: 'bg-red-50',
    count: '2,500+ Available',
  },
  {
    title: 'Used Transmissions',
    desc: 'Every transmission ships with a complete inspection report. Auto & manual available.',
    href: '/used-transmission',
    image: '/images/transmission.png',
    color: 'bg-blue-50',
    count: '1,800+ Available',
  },
  {
    title: 'Commercial Vehicles',
    desc: 'Commercial Fleet Parts. Used Heavy-Duty Engines & Transmissions for Trucks & Vans Nationwide.',
    href: '/commercial-vehicles',
    image: '',
    icon: '🚛',
    color: 'bg-green-50',
    count: '800+ Available',
  },
];

// ── Top Selling Products ───────────────────────────────────────────
export interface Product {
  title:       string;
  description: string;
  warranty:    string;
}

export const TOP_SELLING_PRODUCTS: Product[] = [
  { title: 'Used Audi Engine',     description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
  { title: 'Used BMW Engine',      description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
  { title: 'Used Chevy Engine',    description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
  { title: 'Used Cadillac Engine', description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
  { title: 'Used Ford Engine',     description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
  { title: 'Used GMC Engine',      description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
  { title: 'Used Hyundai Engine',  description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
  { title: 'Used Honda Engine',    description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
  { title: 'Used Jeep Engine',     description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
  { title: 'Used Lexus Engine',    description: 'OEM tested, low mileage, complete inspection report included', warranty: '1-Month Warranty' },
];

// ─
export const WHY_US = [
  { icon: 'ti-shield-check',   title: 'Tested before it ships',  desc: '50-point inspection on every unit, no exceptions. You receive only parts that pass.'          },
  { icon: 'ti-award',          title: '1-month full warranty',   desc: 'Every engine and transmission covered. No fine print, no hidden clauses.'                      },
  { icon: 'ti-headset',        title: 'Real people, real answers', desc: 'Trained specialists handle every call and message — not scripts, not bots.'                  },
  { icon: 'ti-truck-delivery', title: 'Free shipping over $500', desc: 'No hidden fees. The price confirmed at checkout is the price you pay.'                         },
] as const

export const STEPS = [
  { n: '01', icon: 'ti-search',           title: 'Find your part',       desc: 'Browse our inventory and find exactly what your vehicle needs'    },
  { n: '02', icon: 'ti-phone-call',       title: 'Check availability',   desc: 'Call or message us to confirm the part is ready to ship'          },
  { n: '03', icon: 'ti-clipboard-check',  title: 'Close the order',      desc: 'Secured with complete warranty documentation'                     },
  { n: '04', icon: 'ti-truck-delivery',   title: 'Order ships',          desc: 'Parts at your door in 7–14 business days'                         },
] as const;
// ── Testimonials ───────────────────────────────────────────────────
export interface Testimonial {
  quote:    string;
  name:     string;
  location: string;
  stars:    number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:    'Got my Toyota Camry engine in 3 days. Runs perfectly — better than I expected for a used part. Will definitely order again.',
    name:     'Marcus T.',
    location: 'Dallas, TX',
    stars:    5,
  },
  {
    quote:    'The team helped me find the exact transmission for my Silverado. Great communication, fair price, and it came with a warranty.',
    name:     'Sandra R.',
    location: 'Phoenix, AZ',
    stars:    5,
  },
  {
    quote:    'Ordered an ABS pump — arrived well-packaged and exactly as described. Saved me $800 vs the dealership. Highly recommended.',
    name:     'James L.',
    location: 'Chicago, IL',
    stars:    5,
  },
];

// ── FAQs ───────────────────────────────────────────────────────────
export interface FAQ {
  question: string;
  answer:   string;
}

export const FAQS: FAQ[] = [
  {
    question: 'What are the top online marketplaces for used engines in the USA?',
    answer:   'Popular places to shop for used engines in the USA include trusted auto parts websites, salvage yard networks, online engine suppliers, eBay Motors, and local junkyard marketplaces. Always choose sellers that provide VIN matching, mileage details, inspection reports, and warranty coverage before purchasing.',
  },
  {
    question: 'How do I buy a tested second-hand engine with a warranty?',
    answer:   'Start by choosing a reputable USA-based seller that offers tested engines with documented compression checks or running-condition verification. Ask for warranty terms, return policy, mileage proof, and compatibility confirmation using your VIN number.',
  },
  {
    question: 'How can I check the quality of a used engine before buying?',
    answer:   'Review the engine mileage, maintenance history, leak condition, compression test results, and photos of the actual unit. It is also smart to confirm whether the engine was removed from a running vehicle and professionally inspected.',
  },
  {
    question: 'Is it better to buy a used engine or a rebuilt engine?',
    answer:   'A used engine usually costs less and is ideal for budget-friendly repairs. A rebuilt engine costs more but often includes replaced internal components, making it a better long-term option for drivers planning to keep the vehicle for years.',
  },
  {
    question: 'What is the cost difference between used and rebuilt engines in the USA?',
    answer:   'Used engines are commonly more affordable than rebuilt engines. Pricing depends on make, model, mileage, demand, and availability. Rebuilt engines generally cost more because of labor, new parts, and machine work.',
  },
];