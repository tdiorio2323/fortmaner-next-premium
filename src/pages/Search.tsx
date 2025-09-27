import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { useSearch as useCatalogSearch } from '@/hooks/useCatalog';
import { CatalogEmptyState } from '@/components/CatalogEmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SearchPage = () => {
  const [params] = useSearchParams();
  const initialQuery = useMemo(() => params.get('q') ?? '', [params]);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const navigate = useNavigate();
  const { data: results = [], isLoading, isError } = useCatalogSearch(initialQuery);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Search - Fort Maner';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Search Fort Maner products including apparel, footwear, and accessories.');
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Search failed',
        description: 'We had trouble fetching results. Please try again.',
        variant: 'destructive',
      });
    }
  }, [isError, toast]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold">Search</h1>
        <p className="text-muted-foreground mt-1">
          Find products, capsules, and accessories across the Fort Maner catalog.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products, e.g., hoodie or sneakers"
            aria-label="Search products"
            className="sm:flex-1"
          />
          <Button type="submit" className="sm:w-auto">Search</Button>
        </form>
      </header>

      {isLoading ? (
        <p className="text-muted-foreground">Loading results…</p>
      ) : results.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <CatalogEmptyState
          title={initialQuery ? `No results for “${initialQuery}”` : 'Start a search'}
          description={isError ? 'Search is momentarily unavailable. Try reloading or browse the full catalog.' : initialQuery ? 'Try a different keyword or browse the full catalog.' : 'Type in the box above to search across categories.'}
          actionHref="/shop-all"
          actionLabel="View all products"
        />
      )}
    </main>
  );
};

export default SearchPage;
