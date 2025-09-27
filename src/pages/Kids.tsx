import { CollectionRoute } from '@/components/CollectionRoute';

const Kids = () => (
  <CollectionRoute
    handle="kids"
    fallbackTitle="Kids Collection"
    fallbackDescription="Premium streetwear sized for the next generation of Fort Maner fans."
    heroFallback="/fort-mock.png"
    pageTitle="Kids Collection - Fort Maner"
    pageDescription="Fort Maner kids streetwear collection. Premium youth clothing designed for active lifestyles ages 8-16."
    emptyState={{
      title: 'Kids styles are en route',
      description: 'Our youth line is restocking. In the meantime, explore accessories and graphic tees for the family.',
      actionHref: '/accessories',
      actionLabel: 'Shop accessories',
    }}
  >
    <div className="text-center">
      <h2 className="text-2xl font-semibold">Kids Size Guide</h2>
      <p className="mt-2 text-muted-foreground">
        XS: Ages 8-10 · S: Ages 10-12 · M: Ages 12-14 · L: Ages 14-16
      </p>
    </div>
  </CollectionRoute>
);

export default Kids;
