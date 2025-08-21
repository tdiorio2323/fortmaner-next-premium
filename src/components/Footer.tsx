import { Link } from 'react-router-dom';
import { Instagram, MapPin, Clock, Phone, Mail } from 'lucide-react';
import FortManerLogo from '@/assets/fort-maner-logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Shipping Info', href: '/policies/shipping' },
    { name: 'Returns', href: '/policies/returns' },
    { name: 'Privacy Policy', href: '/policies/privacy' },
  ];

  const categories = [
    { name: 'Footwear', href: '/footwear' },
    { name: 'Clothing', href: '/clothing' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'New Arrivals', href: '/new' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'Sale', href: '/sale' },
  ];

  return (
    <footer className="bg-brand-black text-brand-white border-t border-stone-medium/20">
      {/* Chicago Skyline Bar */}
      <div className="h-32 bg-gradient-to-r from-stone-dark via-stone-medium to-stone-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {/* Stylized Chicago skyline silhouette */}
          <div className="flex items-end justify-center h-full space-x-1">
            <div className="bg-brand-white/20 w-3 h-16"></div>
            <div className="bg-brand-white/30 w-2 h-12"></div>
            <div className="bg-brand-white/25 w-4 h-20"></div>
            <div className="bg-brand-white/35 w-3 h-24"></div>
            <div className="bg-brand-white/40 w-5 h-28"></div>
            <div className="bg-brand-white/30 w-2 h-14"></div>
            <div className="bg-brand-white/25 w-3 h-18"></div>
            <div className="bg-brand-white/20 w-4 h-16"></div>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-lg font-bold">Chicago Store</h3>
            <p className="text-brand-white/80 text-sm">Pickup Available</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <img 
              src={FortManerLogo} 
              alt="Fort Maner" 
              className="h-12 w-auto filter brightness-0 invert"
            />
            <p className="text-brand-white/80 text-sm leading-relaxed">
              Fort Maner unites the sophistication of high art and eclectic street style to introduce a new, refined aesthetic to the streets.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/_fortmaner" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-white/60 hover:text-brand-red transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Store Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Store Information</h4>
            <div className="space-y-3 text-sm text-brand-white/80">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>123 West Street</p>
                  <p>Chicago, IL 60606</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <div>
                  <p>Mon-Sat: 10AM-8PM</p>
                  <p>Sunday: 12PM-6PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <p>(312) 555-0123</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <p>info@fortmaner.shop</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-brand-white/80 hover:text-brand-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.href}
                    className="text-brand-white/80 hover:text-brand-red transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-medium/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-brand-white/60">
              © {currentYear} Fort Maner. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/policies/privacy" className="text-brand-white/60 hover:text-brand-red transition-colors">
                Privacy Policy
              </Link>
              <Link to="/policies/terms" className="text-brand-white/60 hover:text-brand-red transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;