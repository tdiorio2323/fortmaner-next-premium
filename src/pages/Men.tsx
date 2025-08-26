
import CatalogHero from "@/components/CatalogHero";
import ProductCard, { Product } from "@/components/ProductCard";

const menHero =
  "https://images.unsplash.com/photo-1516826957135-700dedea6988?q=80&w=1600&auto=format&fit=crop";

const menProducts: Product[] = [
  { id: "m1", slug: "city-hoodie", title: "City Hoodie", price: 5999, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"], badges: ["New"], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: null, ageRange: "adult" },
  { id: "m2", slug: "minimal-tee", title: "Minimal Tee", price: 2499, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: null, ageRange: "adult" },
  { id: "m3", slug: "tapered-joggers", title: "Tapered Joggers", price: 6499, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1553808373-94cb4c2b9b32?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: null, ageRange: "adult" },
  { id: "m4", slug: "layered-jacket", title: "Layered Jacket", price: 10999, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: null, ageRange: "adult" },
  { id: "m5", slug: "everyday-cap", title: "Everyday Cap", price: 1999, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1519340333755-5063a9c7c08b?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: null, ageRange: "adult" },
  { id: "m6", slug: "utility-tote", title: "Utility Tote", price: 3299, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1591561582301-7a31a5d2b2f5?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: null, ageRange: "adult" },
  { id: "m7", slug: "trail-sneaker", title: "Trail Sneaker", price: 12999, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: null, ageRange: "adult" },
  { id: "m8", slug: "waffle-beanie", title: "Waffle Beanie", price: 1799, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1470317596697-cbdeda56f999?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: null, ageRange: "adult" },
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
            {menProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}