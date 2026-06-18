export const NAV_ITEMS = [
  { name: 'Home',          href: '/' },
  { name: 'Used Engines',  href: '/used-engine' },
  { name: 'Transmissions', href: '/used-transmission' },
  { name: 'Commercial',    href: '/commercial-vehicles' },
  { name: 'Contact',       href: '/contact-us' },
  { name: 'About',         href: '/about' },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];