import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';

interface Product {
  id: string;
  handle: string;
  title: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  badges: string[];
  inStock: boolean;
}

const ShopAll = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Set page title and meta description
    document.title = 'Shop All - Fort Maner | Complete Luxury Streetwear Collection';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse Fort Maner\'s complete luxury streetwear collection. Premium hoodies, tees, sneakers, hats, and accessories all in one place.');
    }

    // Show all products
    setProducts(productsData);
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Shop All</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Browse our complete collection of luxury streetwear. From premium footwear 
            to essential accessories, discover everything Fort Maner has to offer.
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
            <p className="text-muted-foreground text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopAll;