import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import rawProducts from '@/data/products-complete.json';
import collectionsData from '@/data/collections.json';
import { normalizeProduct } from '@/lib/normalize';
import { Product } from '@/lib/types';

const PRODUCTS = (rawProducts as any[]).map(normalizeProduct);

const Hats = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Set page title and meta description
    document.title = 'Hats Collection - Fort Maner | Premium Headwear';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shop Fort Maner\'s premium headwear collection. Dad hats, varsity caps, and beanies crafted with quality materials and urban style.');
    }

    // Filter products for hats collection
    const hatsProducts = PRODUCTS.filter(product => 
      collectionsData.hats.includes(product.handle || product.slug)
    );
    setProducts(hatsProducts);
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hats Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Complete your look with our premium headwear collection. From classic dad hats 
            to varsity caps and cozy beanies, each piece is crafted with quality and style.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found in the hats collection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hats;