import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import collectionsData from '@/data/collections.json';

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

const Men = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Set page title and meta description
    document.title = 'Men\'s Collection - Fort Maner | Luxury Streetwear';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shop Fort Maner\'s men\'s collection of luxury streetwear. Premium hoodies, tees, sneakers, and accessories designed for the modern urban lifestyle.');
    }

    // Filter products for men's collection
    const menProducts = productsData.filter(product => 
      collectionsData.men.includes(product.handle)
    );
    setProducts(menProducts);
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Men's Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover our men's luxury streetwear collection featuring premium hoodies, 
            tees, sneakers, and accessories crafted for the modern urban lifestyle.
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
            <p className="text-muted-foreground text-lg">No products found in the men's collection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Men;