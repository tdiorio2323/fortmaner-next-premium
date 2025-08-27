export function FAQ() {
  const qa = [
    { q: 'What is your shipping time?', a: '2–5 business days domestic, 7–10 international.' },
    { q: 'What is your return policy?', a: '30‑day returns on unworn items with tags.' },
    { q: 'How do sizes fit?', a: 'True to size. Size up for oversized look.' },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {qa.map((item, i) => (
            <details key={i} className="group p-5 open:bg-neutral-50">
              <summary className="cursor-pointer list-none text-sm font-medium">
                <span className="mr-2">➕</span>{item.q}
              </summary>
              <p className="mt-2 text-sm text-neutral-700">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

