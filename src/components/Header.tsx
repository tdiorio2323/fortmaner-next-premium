import { Link } from "react-router-dom";
import { Search, Instagram, Facebook, Phone } from "lucide-react";
import logo from "@/assets/fort-maner-logo-main.jpg";

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
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-black text-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Fort Maner" className="h-7 w-auto rounded-[6px] object-contain" />
        </Link>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navigation.map((n) => (
            <Link key={n.href} to={n.href} className="hover:text-white/80">{n.label}</Link>
          ))}
        </nav>

        {/* Right: Search + Social + Phone */}
        <div className="flex items-center gap-3">
          <Link to="/search" aria-label="Search" className="p-2 rounded-md hover:bg-white/10">
            <Search size={18} className="text-white" />
          </Link>
          <a href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-md hover:bg-white/10">
            <Instagram size={18} className="text-white" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-md hover:bg-white/10">
            <Facebook size={18} className="text-white" />
          </a>
          {/* Put your real number in the tel: link */}
          <a href="tel:+13125550123" aria-label="Call Fort Maner" className="p-2 rounded-md hover:bg-white/10">
            <Phone size={18} className="text-white" />
          </a>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-white/10">
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 text-[13px]">
          {navigation.map((n) => (
            <Link key={n.href} to={n.href} className="text-white/90">{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}