
import CatalogHero from "@/components/CatalogHero";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";
import imgA from "@/assets/mountain-hoodie-black.jpg";
import imgB from "@/assets/jaguar-tee-black.jpg";
import imgC from "@/assets/footwear-category.jpg";

const menHero = imgC;

const menProducts: Product[] = [
  { id: "m1", slug: "city-hoodie", title: "City Hoodie", price: 5999, compareAtPrice: null, images: [imgA], badges: ["New"], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: "FW", ageRange: "adult" },
  { id: "m2", slug: "minimal-tee", title: "Minimal Tee", price: 2499, compareAtPrice: null, images: [imgB], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: "SS", ageRange: "adult" },
  { id: "m3", slug: "tapered-joggers", title: "Tapered Joggers", price: 6499, compareAtPrice: null, images: [imgC], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: "FW", ageRange: "adult" },
  { id: "m4", slug: "layered-jacket", title: "Layered Jacket", price: 10999, compareAtPrice: null, images: [imgA], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: "FW", ageRange: "adult" },
  { id: "m5", slug: "everyday-cap", title: "Everyday Cap", price: 1999, compareAtPrice: null, images: [imgB], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: "SS", ageRange: "adult" },
  { id: "m6", slug: "utility-tote", title: "Utility Tote", price: 3299, compareAtPrice: null, images: [imgC], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: "SS", ageRange: "adult" },
  { id: "m7", slug: "trail-sneaker", title: "Trail Sneaker", price: 12999, compareAtPrice: null, images: [imgA], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: "FW", ageRange: "adult" },
  { id: "m8", slug: "waffle-beanie", title: "Waffle Beanie", price: 1799, compareAtPrice: null, images: [imgB], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["men"], tags: [], season: "SS", ageRange: "adult" },
];

export default function Men() {
  return (
    <main className="text-black">
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
