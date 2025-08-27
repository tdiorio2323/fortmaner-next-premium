export function InstagramGrid() {
  const imgs = ['/home-1.jpg', '/home-2.jpg', '/blog-skateboards.png', '/black-fort-set.png', '/fort-maner-collection.png', '/fort-maner-luxury-cover.jpg'];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">@_fortmaner</h2>
          <a className="text-sm text-neutral-600 hover:text-black" href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer">Follow →</a>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {imgs.map((src, i) => (
            <a key={i} href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer" className="group">
              <img src={src} alt="Fort Maner Instagram" className="aspect-square w-full rounded-xl object-cover group-hover:opacity-90" loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

