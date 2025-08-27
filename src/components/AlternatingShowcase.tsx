import hoodie from '@/assets/mountain-hoodie-black.jpg';
import tee from '@/assets/jaguar-tee-black.jpg';
import clothing from '@/assets/clothing-category.jpg';

type Row = {
  image: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  reverse?: boolean;
};

const rows: Row[] = [
  {
    image: hoodie,
    title: 'Shop S/S Collections',
    body: 'Lightweight drops for warmer days. Essentials for everyday wear.',
    cta: { label: 'Shop S/S', href: '/shop/ss' },
  },
  {
    image: tee,
    title: 'Shop F/W Collections',
    body: 'Premium layers for the cold. Heavyweight hoodies, joggers, and more.',
    cta: { label: 'Shop F/W', href: '/shop/fw' },
    reverse: true,
  },
  {
    image: clothing,
    title: 'Shop Fort Maner',
    body: 'Core pieces and signature designs. Built for motion in the city.',
    cta: { label: 'Shop All', href: '/shop-all' },
  },
];

export default function AlternatingShowcase() {
  return (
    <section className="mx-auto w-full max-w-6xl py-14 md:py-20">
      <div className="space-y-12 md:space-y-16">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch`}
          >
            {/* Image */}
            <div className={`${row.reverse ? 'md:order-2' : ''} h-full`}>
              <div className="relative h-full min-h-[360px] md:min-h-[420px] overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm">
                <img
                  src={row.image}
                  alt={row.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Text/CTA */}
            <div className={`${row.reverse ? 'md:order-1' : ''} h-full`}>
              <div className="h-full rounded-2xl border border-neutral-200/60 bg-white/90 backdrop-blur p-8 md:p-10 shadow-sm flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-semibold">{row.title}</h2>
                <p className="mt-3 text-black">{row.body}</p>
                <a
                  href={row.cta.href}
                  className="mt-6 inline-flex items-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90"
                >
                  {row.cta.label}
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
