import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
  type LucideIcon,
} from 'lucide-react';

export const FOOTER_PHONE_RAW = '+18664865915';
export const FOOTER_PHONE_DISPLAY = '+1 (866) 486-5915';

export const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Used Engines', href: '/used-engine' },
  { label: 'Used Transmissions', href: '/used-transmission' },
  { label: 'Commercial Vehicles', href: '/commercial-vehicles' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const FOOTER_BADGES: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Shield, label: '1-Month Warranty' },
  { icon: Truck, label: 'Free Shipping' },
];

export const CONTACT_ITEMS: Array<{
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}> = [
  {
    icon: Phone,
    label: 'Phone',
    value: FOOTER_PHONE_DISPLAY,
    href: `tel:${FOOTER_PHONE_RAW}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sales@theautokingsusa.com',
    href: 'mailto:sales@theautokingsusa.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '1031 N Tehama St, Willows, CA 95988',
    href: 'https://maps.google.com/?q=1031+N+Tehama+St,+Willows,+CA+95988',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon – Sun · 8:30 AM – 4:30 PM PST',
    href: null,
  },
];
