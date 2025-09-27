import { useFeaturedProducts } from '@/hooks/useCatalog';
import ProductCard from '@/components/ProductCard';
import { CatalogEmptyState } from '@/components/CatalogEmptyState';

const FeaturedProducts = () => {
  const { data: products = [], isLoading, isError } = useFeaturedProducts();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a curated selection from the Fort Maner catalog, refreshed for the season.
          </p>
        </div>

        {isLoading && <p className="text-muted-foreground text-center">Loading featured items…</p>}

        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <CatalogEmptyState
            title="Featured items are rotating"
            description={isError ? 'We could not load featured products. Browse the full catalog instead.' : 'Featured picks are updating. Check back soon for refreshed arrivals.'}
            actionHref="/shop-all"
            actionLabel="View all products"
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
