'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Car } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
     { name: 'About', href: '/about' },
    { name: 'Used Engine', href: '/used-engine' },
    { name: 'Used Transmission', href: '/used-transmission' },
    { name: 'Commercial Vehicles', href: '/commercial-vehicles' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="section-padding">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Car className="h-10 w-10 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ROCK AUTO<span className="text-blue-600">CARE</span></h1>
              <p className="text-xs text-gray-600">Quality Auto Parts Since 2005</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="tel:+1-888-505-3697"
              className="btn-primary flex items-center space-x-2"
            >
              <Phone size={18} />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:+1-888-505-3697"
                className="block px-3 py-2 btn-primary text-center mt-4"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={18} />
                  <span>Call Now: +1-888-505-3697</span>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;