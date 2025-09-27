import { CollectionRoute } from '@/components/CollectionRoute';

const ShopFW = () => (
  <CollectionRoute
    handle="fw"
    fallbackTitle="Fall / Winter Collection"
    fallbackDescription="Heavyweight knits, insulated outerwear, and cold-weather essentials."
    heroFallback="/fort-maner-luxury-cover.jpg"
    pageTitle="Fall/Winter Collection - Fort Maner"
    pageDescription="Explore Fort Maner fall/winter streetwear: heavyweight hoodies, joggers, and cold-weather accessories."
    emptyState={{
      title: 'Fall/Winter drop en route',
      description: 'Our FW collection is in production. Preview current best sellers while we finalize the release.',
      actionHref: '/shop-all',
      actionLabel: 'Shop all products',
    }}
  />
);

export default ShopFW;
