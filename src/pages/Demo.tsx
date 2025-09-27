import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCollection, useCollections } from '@/hooks/useCatalog';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const PRIMARY_ROUTES = [
  { label: 'Homepage', to: '/' },
  { label: 'Men', to: '/men' },
  { label: 'Women', to: '/ladies' },
  { label: 'Kids', to: '/kids' },
  { label: 'Accessories', to: '/accessories' },
  { label: 'Shop All', to: '/shop-all' },
  { label: 'Search (hoodie)', to: '/search?q=hoodie' },
  { label: 'Contact', to: '/contact' },
];

const collectionRoute = (handle: string) => {
  switch (handle) {
    case 'men':
      return '/men';
    case 'women':
      return '/ladies';
    case 'kids':
      return '/kids';
    case 'accessories':
      return '/accessories';
    case 'hats':
      return '/hats';
    case 'fw':
      return '/shop/fw';
    case 'ss':
      return '/shop/ss';
    case 'capsules':
      return '/shop/capsules';
    case 'shop-all':
      return '/shop-all';
    default:
      return `/collections/${handle}`;
  }
};

const DemoPage = () => {
  const { data: collections = [] } = useCollections();
  const { data: shopAll } = useCollection('shop-all');

  useEffect(() => {
    document.title = 'Demo Links - Fort Maner';
    const tag = document.createElement('meta');
    tag.name = 'robots';
    tag.content = 'noindex,nofollow';
    document.head.appendChild(tag);
    return () => {
      document.head.removeChild(tag);
    };
  }, []);

  const sampleProducts = useMemo(() => shopAll?.products.slice(0, 3) ?? [], [shopAll]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Demo Launcher</h1>
        <p className="text-muted-foreground max-w-2xl">
          Jump to core storefront flows. These links use the local mock catalog so they remain stable without Shopify credentials.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3">Primary Pages</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_ROUTES.map((route) => (
            <DemoLinkCard key={route.to} to={route.to} label={route.label} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Collections</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {collections
            .filter((collection) => collection.handle !== 'featured')
            .map((collection) => (
              <DemoLinkCard
                key={collection.handle}
                to={collectionRoute(collection.handle)}
                label={collection.title}
                helper={collection.description}
              />
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Product Detail Samples</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sampleProducts.map((product) => (
            <DemoLinkCard
              key={product.id}
              to={`/product/${product.slug}`}
              label={product.title}
              helper={product.brand ?? 'Fort Maner'}
            />
          ))}
          {!sampleProducts.length && (
            <p className="text-sm text-muted-foreground">
              No sample products available. Add items to `shop-all` collection to populate this list.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

interface DemoLinkCardProps {
  to: string;
  label: string;
  helper?: string | null;
}

const DemoLinkCard = ({ to, label, helper }: DemoLinkCardProps) => (
  <Card className="border border-muted p-4 transition hover:border-black/60 hover:shadow-sm">
    <Link to={to} className={cn('flex flex-col gap-1 text-left')}>
      <span className="font-semibold text-base text-foreground">{label}</span>
      {helper && <span className="text-sm text-muted-foreground line-clamp-2">{helper}</span>}
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{to}</span>
    </Link>
  </Card>
);

export default DemoPage;
