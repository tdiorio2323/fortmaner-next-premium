import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Instagram, Facebook, Phone, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/ladies" },
  { label: "Kids", href: "/kids" },
  { label: "Accessories", href: "/accessories" },
  { label: "Shop All", href: "/shop-all" },
  { label: "Capsules", href: "/shop/capsules" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact", hash: "#form" },
];

export default function Header() {
  const location = useLocation();
  const [hideOnHero, setHideOnHero] = useState(false);

  const isRouteActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

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
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-black text-white safe-top">
      <div className="mx-auto h-20 md:h-36 max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-3 items-center h-full">
          {/* Left: Logo */}
          <div className="flex items-center justify-start">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/fort-maner-logo-white.png"
                alt="Fort Maner"
                width="160"
                height="40"
                className="h-20 md:h-28 w-auto rounded-[6px] object-contain"
              />
            </Link>
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex items-center justify-center gap-6 text-xl">
            {navigation.map((n) => {
              const target = n.hash ? `${n.href}${n.hash}` : n.href;
              const active = isRouteActive(n.href);
              return (
                <Link
                  key={n.href}
                  to={target}
                  className={`whitespace-nowrap transition-colors ${active ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Mobile menu + Search + Social + Phone */}
          <div className="flex items-center justify-end gap-2">
            {import.meta.env.DEV && (
              <Link to="/demo" className="hidden md:inline-block text-xs uppercase tracking-wide text-white/70 hover:text-white/90">
                Demo
              </Link>
            )}
            {/* Mobile hamburger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger aria-label="Open menu" className="p-2 rounded-md hover:bg-white/10">
                  <Menu size={28} className="text-white" />
                </SheetTrigger>
                <SheetContent side="left" className="bg-black text-white w-5/6 max-w-xs">
                  <div className="mt-10 space-y-4 pb-24">
                    {navigation.map((n) => {
                      const target = n.hash ? `${n.href}${n.hash}` : n.href;
                      const active = isRouteActive(n.href);
                      return (
                        <SheetClose asChild key={n.href}>
                          <Link
                            to={target}
                            className={`block px-2 py-2 text-lg transition-colors ${active ? 'text-white font-semibold' : 'hover:text-white/80'}`}
                            aria-current={active ? 'page' : undefined}
                          >
                            {n.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                    <div className="flex items-center gap-3 pt-2">
                      <a href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-md hover:bg-white/10">
                        <Instagram size={24} className="text-white" />
                      </a>
                      <a href="https://www.facebook.com/fort.manerwest/" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-md hover:bg-white/10">
                        <Facebook size={24} className="text-white" />
                      </a>
                      <a href="tel:+13125550123" aria-label="Call Fort Maner" className="p-2 rounded-md hover:bg-white/10">
                        <Phone size={24} className="text-white" />
                      </a>
                    </div>
                    <div className="pt-4">
                      <SheetClose asChild>
                        <Link to="/shop-all" className="inline-flex w-full items-center justify-center rounded-full bg-white text-black px-4 py-3 text-base font-medium hover:bg-white/90">
                          Shop All
                        </Link>
                      </SheetClose>
                      <div className="mt-2">
                        <SheetClose asChild>
                          <Link to="/contact" className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-4 py-3 text-base hover:bg-white/10">
                            Contact
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            {/* Top-right icons only on desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/search" aria-label="Search" className="p-2 rounded-md hover:bg-white/10">
                <Search size={30} className="text-white" />
              </Link>
              <a href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-md hover:bg-white/10">
                <Instagram size={30} className="text-white" />
              </a>
              <a href="https://www.facebook.com/fort.manerwest/" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-md hover:bg-white/10">
                <Facebook size={30} className="text-white" />
              </a>
              <a href="tel:+13125550123" aria-label="Call Fort Maner" className="p-2 rounded-md hover:bg-white/10">
                <Phone size={30} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile quick icons row (centered) */}
      <div className="md:hidden border-t border-white/10">
        <div className="flex items-center justify-center gap-6 py-2">
          <Link to="/search" aria-label="Search" className="p-2 rounded-md hover:bg-white/10">
            <Search size={22} className="text-white" />
          </Link>
          <a href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-md hover:bg-white/10">
            <Instagram size={22} className="text-white" />
          </a>
          <a href="https://www.facebook.com/fort.manerwest/" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-md hover:bg-white/10">
            <Facebook size={22} className="text-white" />
          </a>
          <a href="tel:+13125550123" aria-label="Call Fort Maner" className="p-2 rounded-md hover:bg-white/10">
            <Phone size={22} className="text-white" />
          </a>
        </div>
      </div>
    </header>
  );
}
