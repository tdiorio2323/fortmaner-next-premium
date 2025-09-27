import { CollectionRoute } from '@/components/CollectionRoute';

const Hats = () => (
  <CollectionRoute
    handle="hats"
    fallbackTitle="Hats Collection"
    fallbackDescription="Caps and beanies with signature Fort Maner lettering."
    heroFallback="/fort-maner-logo-main.jpg"
    pageTitle="Hats - Fort Maner"
    pageDescription="Discover Fort Maner hats, caps, and beanies with premium construction and signature typography."
    emptyState={{
      title: 'Headwear restocking soon',
      description: 'Our hat bar rotates often. Check back shortly for new colors and limited editions.',
      actionHref: '/accessories',
      actionLabel: 'See accessories',
    }}
  />
);

export default Hats;
