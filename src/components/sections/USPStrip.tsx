export function USPStrip() {
  const items = [
    { title: 'Free Shipping $75+', desc: 'Domestic orders', icon: '🚚' },
    { title: '30‑Day Returns', desc: 'Hassle‑free', icon: '↩️' },
    { title: 'Secure Checkout', desc: 'Apple Pay, GPay', icon: '🔒' },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-8 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="text-2xl" aria-hidden>{it.icon}</div>
            <div>
              <p className="text-sm font-semibold">{it.title}</p>
              <p className="text-sm text-neutral-600">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

