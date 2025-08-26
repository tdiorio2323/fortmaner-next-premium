
import CatalogHero from "@/components/CatalogHero";
import ProductCard, { Product } from "@/components/ProductCard";

const menHero =
  "https://images.unsplash.com/photo-1516826957135-700dedea6988?q=80&w=1600&auto=format&fit=crop";

const menProducts: Product[] = [
  { id: "m1", title: "City Hoodie", price: 5999, tag: "New", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" },
  { id: "m2", title: "Minimal Tee", price: 2499, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop" },
  { id: "m3", title: "Tapered Joggers", price: 6499, image: "https://images.unsplash.com/photo-1553808373-94cb4c2b9b32?q=80&w=1200&auto=format&fit=crop" },
  { id: "m4", title: "Layered Jacket", price: 10999, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" },
  { id: "m5", title: "Everyday Cap", price: 1999, image: "https://images.unsplash.com/photo-1519340333755-5063a9c7c08b?q=80&w=1200&auto=format&fit=crop" },
  { id: "m6", title: "Utility Tote", price: 3299, image: "https://images.unsplash.com/photo-1591561582301-7a31a5d2b2f5?q=80&w=1200&auto=format&fit=crop" },
  { id: "m7", title: "Trail Sneaker", price: 12999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" },
  { id: "m8", title: "Waffle Beanie", price: 1799, image: "https://images.unsplash.com/photo-1470317596697-cbdeda56f999?q=80&w=1200&auto=format&fit=crop" },
];

export default function Men() {
  return (
    <main className="bg-white text-black">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 md:py-10">
        <CatalogHero
          title="Men’s Collection"
          subtitle="Premium streetwear essentials built for everyday city life."
          bg={menHero}
        />

        <section className="mt-8 md:mt-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">Featured</h2>
            <a className="text-sm text-neutral-600 hover:text-black" href="/shop-all">Shop All</a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {menProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}