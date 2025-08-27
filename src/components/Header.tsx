import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Instagram, Facebook, Phone } from "lucide-react";
// Using public asset path for the logo
import { Product } from '@/lib/types';

const navigation = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/men" },
  { label: "Ladies", href: "/ladies" },
  { label: "Accessories", href: "/accessories" },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const [hideOnHero, setHideOnHero] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setHideOnHero(false);
      return;
    }
    const onScroll = () => {
      const shouldHide = window.scrollY < window.innerHeight - 1;
      setHideOnHero(shouldHide);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener("scroll", onScroll as any);
  }, [location.pathname]);

  if (hideOnHero) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-black text-white">
      <div className="mx-auto flex h-36 max-w-6xl items-center justify-between px-4">
        {/* Logo and Nav in one line, spaced apart */}
        <div className="flex items-center w-full justify-between">
          {/* Logo aligned left with minimal gap */}
          <div className="flex items-center justify-start">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/fort-maner-logo-white.png"
                alt="Fort Maner"
                className="h-28 w-auto rounded-[6px] object-contain"
              />
            </Link>
          </div>
          <nav className="flex items-center gap-10 text-2xl">
            {navigation.map((n) => (
              <Link
                key={n.href}
                to={n.href}
                className="hover:text-white/80"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          {/* Right: Search + Social + Phone */}
          <div className="flex items-center gap-3">
            <Link
              to="/search"
              aria-label="Search"
              className="p-2 rounded-md hover:bg-white/10"
            >
              <Search size={36} className="text-white" />
            </Link>
            <a
              href="https://www.instagram.com/_fortmaner/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-md hover:bg-white/10"
            >
              <Instagram size={36} className="text-white" />
            </a>
            <a
              href="https://www.facebook.com/fort.manerwest/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-md hover:bg-white/10"
            >
              <Facebook size={36} className="text-white" />
            </a>
            {/* Put your real number in the tel: link */}
            <a
              href="tel:+13125550123"
              aria-label="Call Fort Maner"
              className="p-2 rounded-md hover:bg-white/10"
            >
              <Phone size={36} className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-white/10">
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 text-[13px]">
          {navigation.map((n) => (
            <Link
              key={n.href}
              to={n.href}
              className="text-white/90"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
