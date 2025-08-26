import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import collectionsData from '@/data/collections.json';
import jaguarTee from '@/assets/jaguar-tee-black.jpg';
import mountainHoodie from '@/assets/mountain-hoodie-black.jpg';
// Placeholder image for footwear until asset exists
import stoneRunners from '@/assets/footwear-category.jpg';
import accessoriesImage from '@/assets/accessories-category.jpg';
import clothingImage from '@/assets/clothing-category.jpg';
import { Product } from '@/lib/types';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Create product data with proper imported images
    const productData: Product[] = [
      {
        id: "jaguar-tee",
        handle: "jaguar-tee",
        slug: "jaguar-tee",
        title: "JAGUAR Tee",
        brand: "Fort Maner",
        price: 55,
        compareAtPrice: null,
        images: [jaguarTee],
        badges: ["New"],
        inStock: true,
        variants: [],
        collections: [],
        tags: [],
        season: null,
        ageRange: null,
      },
      {
        id: "mountain-hoodie",
        handle: "mountain-hoodie",
        slug: "mountain-hoodie",
        title: "Mountain Peak Hoodie",
        brand: "Fort Maner",
        price: 120,
        compareAtPrice: 150,
        images: [mountainHoodie],
        badges: ["Best Seller"],
        inStock: true,
        variants: [],
        collections: [],
        tags: [],
        season: null,
        ageRange: null,
      },
      {
        id: "stone-runners",
        handle: "stone-runners",
        slug: "stone-runners",
        title: "Stone Runner Sneakers",
        brand: "Fort Maner",
        price: 200,
        compareAtPrice: null,
        images: [stoneRunners],
        badges: ["New"],
        inStock: true,
        variants: [],
        collections: [],
        tags: [],
        season: null,
        ageRange: null,
      },
      {
        id: "chicago-cap",
        handle: "chicago-cap",
        slug: "chicago-cap",
        title: "Chicago Fortress Cap",
        brand: "Fort Maner",
        price: 45,
        compareAtPrice: null,
        images: [accessoriesImage],
        badges: [],
        inStock: true,
        variants: [],
        collections: [],
        tags: [],
        season: null,
        ageRange: null,
      },
      {
        id: "fortress-shorts",
        handle: "fortress-shorts",
        slug: "fortress-shorts",
        title: "Fortress Training Shorts",
        brand: "Fort Maner",
        price: 75,
        compareAtPrice: null,
        images: [clothingImage],
        badges: [],
        inStock: true,
        variants: [],
        collections: [],
        tags: [],
        season: null,
        ageRange: null,
      },
      {
        id: "leather-wallet",
        handle: "leather-wallet",
        slug: "leather-wallet",
        title: "Premium Leather Wallet",
        brand: "Fort Maner",
        price: 85,
        compareAtPrice: null,
        images: [accessoriesImage],
        badges: [],
        inStock: true,
        variants: [],
        collections: [],
        tags: [],
        season: null,
        ageRange: null,
      },
      {
        id: "stone-backpack",
        handle: "stone-backpack",
        slug: "stone-backpack",
        title: "Stone Mountain Backpack",
        brand: "Fort Maner",
        price: 165,
        compareAtPrice: 200,
        images: [accessoriesImage],
        badges: ["Best Seller"],
        inStock: true,
        variants: [],
        collections: [],
        tags: [],
        season: null,
        ageRange: null,
      },
      {
        id: "fort-socks",
        handle: "fort-socks",
        slug: "fort-socks",
        title: "Fort Maner Premium Socks",
        brand: "Fort Maner",
        price: 25,
        compareAtPrice: null,
        images: [accessoriesImage],
        badges: [],
        inStock: true,
        variants: [],
        collections: [],
        tags: [],
        season: null,
        ageRange: null,
      },
    ];
    
    // Get featured product IDs from collections data
    const featuredIds = collectionsData.featured;
    
    // Filter products to get only featured ones
    const featuredProducts = productData.filter(product => 
      featuredIds.includes(product.id)
    );
    
    setProducts(featuredProducts.slice(0, 8)); // Show first 8 featured products
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked selection of premium streetwear pieces that define the Fort Maner aesthetic.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
