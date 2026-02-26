import { Phone, Mail, MapPin, Clock, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              ROCK AUTO<span className="text-blue-400">CARE</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Providing quality used engines and transmissions since 2005. 
              Your trusted partner for auto parts.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-sm">1-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Free Shipping</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/used-engine" className="text-gray-400 hover:text-white transition">
                  Used Engines
                </Link>
              </li>
              <li>
                <Link href="/used-transmission" className="text-gray-400 hover:text-white transition">
                  Used Transmissions
                </Link>
              </li>
              <li>
                <Link href="/commercial-vehicles" className="text-gray-400 hover:text-white transition">
                  Commercial Vehicles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <div className="font-semibold">Call Us</div>
                  <a href="tel:+1-888-505-3697" className="text-gray-400 hover:text-white">
                    +1-888-505-3697
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:sales@rockautocare.com" className="text-gray-400 hover:text-white">
                    sales@rockautocare.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-gray-400">
                    123 Auto Parts Way, Detroit, MI 48201
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6">Business Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="font-semibold">Monday - Friday</div>
                  <div className="text-gray-400">6:00 AM - 9:00 PM PST</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="font-semibold">Saturday - Sunday</div>
                  <div className="text-gray-400">7:00 AM - 8:00 PM PST</div>
                </div>
              </div>
            </div>
            
            {/* Special Offer */}
            <div className="mt-8 p-4 bg-blue-800/30 rounded-lg">
              <div className="font-bold text-yellow-400 mb-1">SPECIAL OFFER</div>
              <div className="text-sm">Get 10% OFF on your first order!</div>
              <a 
                href="tel:+1-888-505-3697"
                className="btn-primary bg-green-600 hover:bg-green-700 w-full mt-3"
              >
                Call to Claim
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Rock AutoCare. All rights reserved.</p>
          <p className="mt-2 text-sm">Quality used engines and transmissions at unbeatable prices.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;