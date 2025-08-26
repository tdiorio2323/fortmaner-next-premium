export default function Accessories() {
  type Item = { id: string; title: string; price: number; img: string; tag?: string };
  const items: Item[] = [
    { id: "ac1", title: "Minimal Cap", price: 1999, img: "https://images.unsplash.com/photo-1520975682031-7f61d4dc18c5?w=1200&q=80", tag: "New" },
    { id: "ac2", title: "Utility Tote", price: 3299, img: "https://images.unsplash.com/photo-1533636721434-0e2d61030955?w=1200&q=80" },
    { id: "ac3", title: "Daily Socks (3-Pack)", price: 1499, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d2d?w=1200&q=80" },
    { id: "ac4", title: "Logo Beanie", price: 2499, img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1200&q=80" },
    { id: "ac5", title: "Card Holder", price: 2199, img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80" },
    { id: "ac6", title: "Sling Bag", price: 4499, img: "https://images.unsplash.com/photo-1533681018184-68bd1d883546?w=1200&q=80" },
  ];

  return (
    <main className="bg-white text-black">
      <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">Accessories Collection</h1>
        <p className="mt-2 text-neutral-600">Complete your look with caps, bags, and everyday essentials.</p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(it => (
            <a key={it.id} href="#" className="group block overflow-hidden rounded-2xl border border-neutral-200/70 bg-white hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/5] w-full">
                <img src={it.img} alt={it.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                {it.tag && <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-medium text-white">{it.tag}</span>}
              </div>
              <div className="flex items-center justify-between p-4">
                <h3 className="line-clamp-1 text-sm font-medium">{it.title}</h3>
                <span className="text-sm tabular-nums">${(it.price / 100).toFixed(2)}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
