import { CollectionRoute } from '@/components/CollectionRoute';

const Accessories = () => (
  <CollectionRoute
    handle="accessories"
    fallbackTitle="Accessories Collection"
    fallbackDescription="Complete your look with caps, bags, and everyday essentials."
    heroFallback="/fort-maner-collection.png"
    pageTitle="Accessories - Fort Maner"
    pageDescription="Complete your Fort Maner look with headwear, bags, and everyday accessories built for the city."
    emptyState={{
      title: 'Accessories restocking soon',
      description: 'Our accessories drop is cycling out. Explore the latest apparel while we refresh the gear wall.',
      actionHref: '/shop-all',
      actionLabel: 'Shop apparel',
    }}
  />
);

export default Accessories;
