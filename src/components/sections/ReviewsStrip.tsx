export function ReviewsStrip() {
  const stars = '★★★★★';
  const items = [
    { q: 'Quality is insane. Fits perfect.', a: '— Marcus' },
    { q: 'Shipping was fast, love the joggers.', a: '— Tasha' },
    { q: 'Staple hoodie. Heavyweight.', a: '— Leo' },
  ];
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">What customers say</h2>
          <div className="text-yellow-400" aria-label="5 stars">{stars}</div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((t, i) => (
            <blockquote key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-relaxed">“{t.q}”</p>
              <footer className="mt-3 text-xs text-white/70">{t.a}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

