import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import rawProducts from '@/data/products-complete.json';
import collectionsData from '@/data/collections.json';
import { normalizeProduct } from '@/lib/normalize';
import { Product } from '@/lib/types';

const PRODUCTS = (rawProducts as any[]).map(normalizeProduct);

const Ladies = () => {
  const ladiesHero =
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1600&auto=format&fit=crop";

  const ladiesProducts: Product[] = [
    { id: "w1", slug: "cropped-hoodie", title: "Cropped Hoodie", price: 6299, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"], badges: ["New"], brand: "Fort Maner", inStock: true, variants: [], collections: ["ladies"], tags: [], season: null, ageRange: "adult" },
    { id: "w2", slug: "ribbed-tank", title: "Ribbed Tank", price: 1999, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1519741491041-40b3a7a52d4a?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["ladies"], tags: [], season: null, ageRange: "adult" },
    { id: "w3", slug: "high-rise-joggers", title: "High-Rise Joggers", price: 6499, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["ladies"], tags: [], season: null, ageRange: "adult" },
    { id: "w4", slug: "overshirt-jacket", title: "Overshirt Jacket", price: 10499, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1455156218388-5e61b5268182?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["ladies"], tags: [], season: null, ageRange: "adult" },
    { id: "w5", slug: "everyday-tote", title: "Everyday Tote", price: 3199, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["ladies"], tags: [], season: null, ageRange: "adult" },
    { id: "w6", slug: "low-top-sneaker", title: "Low-Top Sneaker", price: 11999, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["ladies"], tags: [], season: null, ageRange: "adult" },
    { id: "w7", slug: "beanie", title: "Beanie", price: 1699, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1484327973588-c31f829103fe?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["ladies"], tags: [], season: null, ageRange: "adult" },
    { id: "w8", slug: "minimal-tee-dress", title: "Minimal Tee Dress", price: 4899, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"], badges: [], brand: "Fort Maner", inStock: true, variants: [], collections: ["ladies"], tags: [], season: null, ageRange: "adult" },
  ];

  useEffect(() => {
    // Set page title and meta description
    document.title = 'Ladies Collection - Fort Maner | Luxury Streetwear';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shop Fort Maner\'s ladies collection of luxury streetwear. Premium hoodies, tees, and accessories designed for the modern urban woman.');
    }

    // Filter products for ladies collection
    setProducts(ladiesProducts);
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Ladies Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our ladies luxury streetwear collection featuring premium hoodies,
            tees, and accessories designed for the modern urban woman.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ladiesProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found in the ladies collection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ladies;