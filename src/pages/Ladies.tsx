import { CollectionRoute } from '@/components/CollectionRoute';

const Ladies = () => (
  <CollectionRoute
    handle="women"
    fallbackTitle="Women's Collection"
    fallbackDescription="Luxury streetwear for the modern woman. Premium hoodies, tees, and accessories."
    heroFallback="/home-2.jpg"
    pageTitle="Women's Collection - Fort Maner"
    pageDescription="Luxury streetwear for the modern woman from Fort Maner. Layered sets, bold graphics, and polished accessories."
    emptyState={{
      title: 'Women\'s styles are coming soon',
      description: 'Our design team is adding finishing touches. Explore the rest of the catalog while we prepare the next drop.',
      actionHref: '/shop-all',
      actionLabel: 'Browse everything',
    }}
  />
);

export default Ladies;
