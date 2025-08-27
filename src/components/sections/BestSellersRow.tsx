import type { Product } from './NewArrivalsGrid';

export function BestSellersRow({ title = 'Best Sellers', items = [] as Product[] }) {
  // Remove "Cargo Slate" card and provide three defaults
  const data = (items.length ? items : [
    { id: 'a', title: 'Hoodie Noir', price: '$120', img: '/home-1.jpg' },
    { id: 'c', title: 'Runner Ghost', price: '$180', img: '/black-fort-set.png' },
    { id: 'd', title: 'Tee Script', price: '$45', img: '/home-2.jpg' },
  ]).filter(p => p.title !== 'Cargo Slate');
  return (
    <section className="bg-white relative z-10">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          <div className="text-sm text-neutral-600">Swipe →</div>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {data.map((p) => (
            <a key={p.id} href={p.href || '#'} className="snap-start shrink-0 basis-3/4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 md:basis-1/4">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-medium">{p.title}</span>
                <span className="text-neutral-600">{p.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
