import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import productsData from '@/data/products.json';

const ShopSS = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    document.title = 'Spring/Summer Collection - Fort Maner | Lightweight Streetwear';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover Fort Maner\'s Spring/Summer streetwear collection. Lightweight tees, caps, and warm-weather essentials.');
    }

    // Filter products for S/S season
    const ssProducts = productsData.filter(product => 
      product.season === 'SS' || product.collections.includes('ss')
    );
    setProducts(ssProducts);
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Spring/Summer 2024</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Lightweight streetwear for warmer days. Essential tees, caps, 
            and accessories designed for comfort and style.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No S/S products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopSS;