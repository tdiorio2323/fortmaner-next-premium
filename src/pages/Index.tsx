import { useEffect } from 'react';
import Hero from '@/components/Hero';
import AnnouncementBar from '@/components/AnnouncementBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryCard from '@/components/CategoryCard';
import Banner from '@/components/Banner';
import InstagramGrid from '@/components/InstagramGrid';
import LandingHero from "@/components/LandingHero";

const tiles = [
  { title: "Men", href: "/men" },
  { title: "Women", href: "/ladies" },
  { title: "Shop All", href: "/shop-all" },
];

export default function Index() {
  return (
    <main className="bg-white text-black">
      <LandingHero />

      {/* Category tiles */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">Shop by Category</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tiles.map((t) => (
            <a
              key={t.title}
              href={t.href}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white"
            >
              <img
                src="/src/assets/white-brick-wall.jpg"
                alt=""
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0" />
              <div className="absolute inset-0 flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  <span className="mt-1 inline-block rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                    Shop {t.title}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}