export type Product = { id: string; title: string; price: string; img: string; href?: string; tag?: string };

export function NewArrivalsGrid({ title = 'New Arrivals', items = [] as Product[] }) {
  const data = items.length ? items : [
    { id: '1', title: 'FM Tee Black', price: '$45', img: '/black-fort-set.png' },
    { id: '2', title: 'Joggers Sand', price: '$85', img: '/home-1.jpg' },
    { id: '3', title: 'Windbreaker', price: '$120', img: '/home-2.jpg' },
    { id: '4', title: 'Cap Monogram', price: '$35', img: '/blog-skateboards.png' },
  ];
  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          <a href="/shop-all" className="text-sm text-black/70 hover:text-black">Shop all →</a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {data.map((p) => (
            <a key={p.id} href={p.href || '#'} className="group rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
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

