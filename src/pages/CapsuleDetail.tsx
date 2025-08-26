import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import productsData from '@/data/products.json';

const CapsuleDetail = () => {
  const { capsule } = useParams<{ capsule: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [capsuleInfo, setCapsuleInfo] = useState<{ name: string; description: string } | null>(null);

  useEffect(() => {
    if (!capsule) return;

    // Filter products for specific capsule
    const capsuleProducts = productsData.filter(product => product.capsule === capsule);
    setProducts(capsuleProducts);

    // Set capsule info based on slug
    const capsuleInfoMap: Record<string, { name: string; description: string }> = {
      'jogging-suit': {
        name: 'Jogging Suit Collection',
        description: 'Premium matching sets combining comfort and style. Heavyweight cotton construction with signature Fort Maner detailing.'
      },
      'skull-head': {
        name: 'Skull Head Collection',
        description: 'Bold graphic designs featuring our signature skull artwork. Statement pieces for the fearless streetwear enthusiast.'
      },
      'triangle': {
        name: 'Triangle Collection',
        description: 'Geometric minimalism meets street culture. Clean lines and architectural shapes define this modern collection.'
      },
      'logo': {
        name: 'Logo Collection',
        description: 'Classic Fort Maner branding in timeless designs. Essential pieces that showcase our heritage and craftsmanship.'
      },
      'signature': {
        name: 'Signature Collection',
        description: 'Refined pieces featuring signature embroidered details. Elevated streetwear for the discerning fashion enthusiast.'
      }
    };

    const info = capsuleInfoMap[capsule];
    setCapsuleInfo(info);

    document.title = `${info?.name || 'Capsule Collection'} - Fort Maner`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && info) {
      metaDescription.setAttribute('content', `${info.description} Shop the ${info.name} at Fort Maner.`);
    }
  }, [capsule]);

  if (!capsuleInfo) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Collection Not Found</h1>
          <p className="text-muted-foreground">The requested capsule collection could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{capsuleInfo.name}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {capsuleInfo.description}
          </p>
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
              This collection is currently in development. Check back soon for new drops.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapsuleDetail;