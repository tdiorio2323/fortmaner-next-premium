import { CollectionRoute } from '@/components/CollectionRoute';

const ShopSS = () => (
  <CollectionRoute
    handle="ss"
    fallbackTitle="Spring / Summer Collection"
    fallbackDescription="Breathable tees and warm-weather staples."
    heroFallback="/home-1.jpg"
    pageTitle="Spring/Summer Collection - Fort Maner"
    pageDescription="Browse Fort Maner spring/summer styles: breathable tees, lightweight layers, and seasonal footwear."
    emptyState={{
      title: 'Spring/Summer styles coming soon',
      description: 'Warm-weather gear is in progress. Explore current essentials and sign up for capsule alerts.',
      actionHref: '/shop-all',
      actionLabel: 'Shop essentials',
    }}
  />
);

export default ShopSS;
