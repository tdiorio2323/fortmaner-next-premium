import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import productsData from '@/data/products-complete.json';

const Kids = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    document.title = 'Kids Collection - Fort Maner | Youth Streetwear';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Fort Maner kids streetwear collection. Premium youth clothing designed for young fashion enthusiasts. Ages 8-16.');
    }

    // Filter products for kids
    const kidsProducts = productsData.filter(product => 
      product.ageRange === 'kids' || product.collections.includes('kids')
    );
    setProducts(kidsProducts as Product[]);
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Kids Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Premium streetwear designed for the next generation. Quality construction 
            and age-appropriate sizing for young fashion enthusiasts ages 8-16.
          </p>
          <div className="mt-8 p-6 bg-muted/30 rounded-lg max-w-xl mx-auto">
            <h3 className="font-semibold mb-2">Size Guide for Kids</h3>
            <div className="text-sm text-muted-foreground">
              <p>XS: Ages 8-10 | S: Ages 10-12 | M: Ages 12-14 | L: Ages 14-16</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground text-lg">
              Our kids collection is expanding. Check back soon for new youth streetwear drops.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kids;