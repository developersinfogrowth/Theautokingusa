import { Truck, Shield, Clock, DollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ── Phone ─────────────────────────────────────────
export const PHONE     = '+1 (866) 486-5915';
export const PHONE_RAW = '+18664865915';

// ── Vehicle Makes ──────────────────────────────────
export const VEHICLE_MAKES = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'BMW',
  'Mercedes',
  'Nissan',
  'Dodge',
] as const;

// ── Feature Pills ──────────────────────────────────
export interface Feature {
  icon:  LucideIcon;
  label: string;
}

export const FEATURES: Feature[] = [
  { icon: Truck,       label: 'Free Shipping'        },
  { icon: Shield,      label: '1-Year Warranty'      },
  { icon: Clock,       label: 'Same Day Shipping'    },
  { icon: DollarSign,  label: 'Best Price Guarantee' },
];