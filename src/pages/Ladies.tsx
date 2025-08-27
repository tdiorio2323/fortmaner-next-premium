import CatalogHero from '@/components/CatalogHero';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import imgA from '@/assets/clothing-category.jpg';
import imgB from '@/assets/instagram-post-1.jpg';
import imgC from '@/assets/instagram-post-2.jpg';
import imgD from '@/assets/instagram-post-3.jpg';

const ladiesHero = imgA;

const ladiesProducts: Product[] = [
  { id: 'w1', slug: 'cropped-hoodie', title: 'Cropped Hoodie', price: 6299, compareAtPrice: null, images: [imgA], badges: ['New'], brand: 'Fort Maner', inStock: true, variants: [], collections: ['ladies'], tags: [], season: 'SS', ageRange: 'adult' },
  { id: 'w2', slug: 'ribbed-tank', title: 'Ribbed Tank', price: 1999, compareAtPrice: null, images: [imgB], badges: [], brand: 'Fort Maner', inStock: true, variants: [], collections: ['ladies'], tags: [], season: 'SS', ageRange: 'adult' },
  { id: 'w3', slug: 'high-rise-joggers', title: 'High-Rise Joggers', price: 6499, compareAtPrice: null, images: [imgC], badges: [], brand: 'Fort Maner', inStock: true, variants: [], collections: ['ladies'], tags: [], season: 'FW', ageRange: 'adult' },
  { id: 'w4', slug: 'overshirt-jacket', title: 'Overshirt Jacket', price: 10499, compareAtPrice: null, images: [imgD], badges: [], brand: 'Fort Maner', inStock: true, variants: [], collections: ['ladies'], tags: [], season: 'FW', ageRange: 'adult' },
  { id: 'w5', slug: 'everyday-tote', title: 'Everyday Tote', price: 3199, compareAtPrice: null, images: [imgB], badges: [], brand: 'Fort Maner', inStock: true, variants: [], collections: ['ladies'], tags: [], season: 'SS', ageRange: 'adult' },
  { id: 'w6', slug: 'low-top-sneaker', title: 'Low-Top Sneaker', price: 11999, compareAtPrice: null, images: [imgC], badges: [], brand: 'Fort Maner', inStock: true, variants: [], collections: ['ladies'], tags: [], season: 'SS', ageRange: 'adult' },
  { id: 'w7', slug: 'beanie', title: 'Beanie', price: 1699, compareAtPrice: null, images: [imgD], badges: [], brand: 'Fort Maner', inStock: true, variants: [], collections: ['ladies'], tags: [], season: 'FW', ageRange: 'adult' },
  { id: 'w8', slug: 'minimal-tee-dress', title: 'Minimal Tee Dress', price: 4899, compareAtPrice: null, images: [imgA], badges: [], brand: 'Fort Maner', inStock: true, variants: [], collections: ['ladies'], tags: [], season: 'SS', ageRange: 'adult' },
];

export default function Ladies() {
  return (
    <main className="text-black">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 md:py-10">
        <CatalogHero
          title="Ladies’ Collection"
          subtitle="Luxury streetwear for the modern woman. Premium hoodies, tees, and accessories."
          bg={ladiesHero}
        />

        <section className="mt-8 md:mt-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">Featured</h2>
            <a className="text-sm text-neutral-600 hover:text-black" href="/shop-all">Shop All</a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ladiesProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
