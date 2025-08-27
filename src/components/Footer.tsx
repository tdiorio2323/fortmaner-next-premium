import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Clock, Phone, Mail } from 'lucide-react';
// Logo uses a public asset path

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
    <div>
      <footer className="bg-brand-black text-brand-white border-t border-stone-medium/20">
        {/* White card wrapper with 30px edges */}
        <div className="px-[30px] py-[50px] md:py-[60px]">
          <div className="mx-auto max-w-7xl bg-white text-black rounded-2xl p-[30px] shadow-xl">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Brand Info */}
              <div className="space-y-4">
                <img
                  src="/fort-maner-logo-white.png"
                  alt="Fort Maner"
                  className="h-28 w-auto object-contain invert"
                />
                <p className="text-neutral-700 text-sm leading-relaxed">
                  Fort Maner unites the sophistication of high art and eclectic street style to introduce a new, refined aesthetic to the streets.
                </p>
                <div className="flex space-x-6 mt-2 text-neutral-700">
                  <a
                    href="https://instagram.com/_fortmaner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    <Instagram className="h-12 w-12" />
                  </a>
                  <a
                    href="https://www.facebook.com/fort.manerwest/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    <Facebook className="h-12 w-12" />
                  </a>
                  <a
                    href="tel:+13125550123"
                    aria-label="Call Fort Maner"
                    className="hover:text-black transition-colors"
                  >
                    <Phone className="h-12 w-12" />
                  </a>
                </div>
              </div>

              {/* Store Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Store Information</h4>
                <div className="space-y-3 text-sm text-neutral-700">
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
                        className="text-neutral-700 hover:text-black transition-colors"
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
                        className="text-neutral-700 hover:text-black transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar (inside card) */}
            <div className="border-t border-neutral-200 mt-8 pt-6">
              {/* Follow row directly under divider */}
              <div className="mb-4 flex items-center justify-center gap-4">
                <span className="text-sm md:text-base font-semibold tracking-wide text-black">FOLLOW US ON SOCIAL MEDIA</span>
                <a
                  href="https://www.facebook.com/fort.manerwest/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-black hover:text-neutral-700"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://www.instagram.com/_fortmaner/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-black hover:text-neutral-700"
                >
                  <Instagram size={24} />
                </a>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-sm text-neutral-600">
                  © {currentYear} Fort Maner. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm">
                  <Link to="/policies/privacy" className="text-neutral-600 hover:text-black transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/policies/terms" className="text-neutral-600 hover:text-black transition-colors">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 

export default Footer;
