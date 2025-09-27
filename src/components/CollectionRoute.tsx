import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import CatalogHero from '@/components/CatalogHero';
import ProductCard from '@/components/ProductCard';
import { CatalogEmptyState } from '@/components/CatalogEmptyState';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useCollection } from '@/hooks/useCatalog';
import { useToast } from '@/hooks/use-toast';

interface CollectionRouteProps {
  handle: string;
  fallbackTitle: string;
  fallbackDescription: string;
  heroFallback: string;
  pageTitle?: string;
  pageDescription?: string;
  emptyState?: {
    title: string;
    description: string;
    actionHref?: string;
    actionLabel?: string;
  };
  children?: ReactNode;
}

export const CollectionRoute = ({
  handle,
  fallbackTitle,
  fallbackDescription,
  heroFallback,
  pageTitle = `${fallbackTitle} - Fort Maner`,
  pageDescription = fallbackDescription,
  emptyState,
  children,
}: CollectionRouteProps) => {
  const { data, isLoading, isError } = useCollection(handle);
  const { toast } = useToast();

  useEffect(() => {
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }
  }, [pageDescription, pageTitle]);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Unable to load products',
        description: 'Displaying fallback catalog data while we fix the issue.',
        variant: 'destructive',
      });
    }
  }, [isError, toast]);

  const products = data?.products ?? [];
  const collection = data?.collection;
  const heroImage = collection?.heroImage ?? heroFallback;
  const title = collection?.title ?? fallbackTitle;
  const description = collection?.description ?? fallbackDescription;

  const empty = emptyState ?? {
    title: 'Nothing available right now',
    description: 'This collection is updating. Explore the rest of the Fort Maner catalog while we restock.',
    actionHref: '/shop-all',
    actionLabel: 'Shop all products',
  };

  return (
    <main className="text-black">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 md:py-10">
        <Breadcrumb className="text-sm text-muted-foreground">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <CatalogHero title={title} subtitle={description} bg={heroImage} />

        {children && <div className="mt-8">{children}</div>}

        <section className="mt-10">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : products.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <CatalogEmptyState
              title={empty.title}
              description={empty.description}
              actionHref={empty.actionHref}
              actionLabel={empty.actionLabel}
            />
          )}
        </section>
      </div>
    </main>
  );
};
