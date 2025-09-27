import { CollectionRoute } from '@/components/CollectionRoute';

const FALLBACK_DESCRIPTION = 'Premium streetwear essentials built for everyday city life.';

const Men = () => (
  <CollectionRoute
    handle="men"
    fallbackTitle="Men's Collection"
    fallbackDescription={FALLBACK_DESCRIPTION}
    heroFallback="/home-1.jpg"
    pageTitle="Men's Collection - Fort Maner"
    pageDescription="Discover men's streetwear from Fort Maner. Layered knits, premium footwear, and everyday essentials."
    emptyState={{
      title: 'Nothing in stock for men yet',
      description: 'We are preparing the next Fort Maner menswear drop. Browse featured products while we restock.',
      actionHref: '/shop-all',
      actionLabel: 'Browse everything',
    }}
  />
);

export default Men;
