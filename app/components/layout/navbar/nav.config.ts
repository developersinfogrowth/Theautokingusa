export interface NavSubItem {
  name: string;
  href: string;
}

export interface NavItem {
  name: string;
  href: string;
  children?: NavSubItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home',           href: '/' },
  { name: 'Used Engine',   href: '/used-engine' },
  { name: 'Transmission',  href: '/used-transmission' },
  { name: 'Commercial',     href: '/commercial-vehicles' },
  {
    name: 'Policies',
    href: '/policies',
    children: [
      { name: 'Privacy Policy',         href: '/policies/privacy-policy' },
      { name: 'Shipping Policy',        href: '/policies/shipping-policy' },
      { name: 'Warranty Policy',        href: '/policies/warranty-policy' },
      { name: 'Terms & Conditions',      href: '/policies/terms-and-conditions' },
      { name: 'Return & Refund Policy',  href: '/policies/return-refund-policy' },
    ],
  },
  { name: 'Blogs',    href: '/blogs' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact',  href: '/contact-us' },
];