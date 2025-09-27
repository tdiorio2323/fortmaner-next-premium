import { CollectionRoute } from '@/components/CollectionRoute';

const ShopAll = () => (
  <CollectionRoute
    handle="shop-all"
    fallbackTitle="Shop All"
    fallbackDescription="Browse our complete collection of luxury streetwear."
    heroFallback="/fort-maner-luxury-cover.jpg"
    pageTitle="Shop All - Fort Maner"
    pageDescription="Browse Fort Maner's complete luxury streetwear collection: premium hoodies, tees, sneakers, hats, and accessories."
    emptyState={{
      title: 'Catalog loading shortly',
      description: 'We are syncing the full catalog. Refresh in a moment or explore highlighted capsules.',
      actionHref: '/capsules',
      actionLabel: 'View capsules',
    }}
  />
);

export default ShopAll;
