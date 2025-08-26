import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import productsData from '@/data/products-complete.json';

const ShopFW = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    document.title = 'Fall/Winter Collection - Fort Maner | Premium Streetwear';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore Fort Maner\'s Fall/Winter streetwear collection. Premium hoodies, joggers, and cold-weather essentials.');
    }

    // Filter products for F/W season
    const fwProducts = productsData.filter(product => 
      product.season === 'FW' || product.collections.includes('fw')
    );
    setProducts(fwProducts);
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Fall/Winter 2024</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Premium streetwear essentials for the colder months. Heavyweight hoodies, 
            joggers, and accessories crafted for style and warmth.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No F/W products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopFW;