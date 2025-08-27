import hoodie from '@/assets/mountain-hoodie-black.jpg';
import tee from '@/assets/jaguar-tee-black.jpg';
import clothing from '@/assets/clothing-category.jpg';
// Using user-provided public images for the 3x2 section

type Row = {
  image: string;
  thumb: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
};

const rows: Row[] = [
  {
    image: '/home-1.jpg',
    thumb: '/home-1.jpg',
    title: 'Shop S/S Collections',
    body: 'Lightweight drops for warmer days. Essentials for everyday wear.',
    cta: { label: 'Shop S/S', href: '/shop/ss' },
  },
  {
    image: '/home-2.jpg',
    thumb: '/home-2.jpg',
    title: 'Shop F/W Collections',
    body: 'Premium layers for the cold. Heavyweight hoodies, joggers, and more.',
    cta: { label: 'Shop F/W', href: '/shop/fw' },
  },
  {
    image: '/blog-skateboards.png',
    thumb: '/blog-skateboards.png',
    title: 'Shop Fort Maner',
    body: 'Core pieces and signature designs. Built for motion in the city.',
    cta: { label: 'Shop All', href: '/shop-all' },
  },
];

export default function AlternatingShowcase() {
  return (
    <section className="mx-auto w-full max-w-6xl pt-6 md:pt-8 pb-14 md:pb-20">
      <div className="space-y-12 md:space-y-16">
        {rows.map((row, i) => (
          <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch`}>
            {/* Image */}
            <div className={`h-full`}>
              <div className={`relative h-full ${i === 1 ? 'min-h-[400px] md:min-h-[560px]' : 'min-h-[360px] md:min-h-[420px]'} overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm`}>
                <img
                  src={row.image}
                  alt={row.title}
                  className={`${i === 1 ? 'object-contain p-4' : 'object-cover'} absolute inset-0 h-full w-full`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Text/CTA */}
            <div className={`h-full`}>
              <div className="h-full rounded-2xl border border-neutral-200/60 bg-white/90 backdrop-blur p-8 md:p-10 shadow-sm flex flex-col justify-center">
                {/* Top block inside the card (brick background + overlaid logo) */}
                <div className="mb-5">
                  <div className="relative w-full h-48 md:h-64 rounded-xl border border-neutral-200/60 overflow-hidden">
                    <img
                      src="/brick-bg.jpg"
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src="/luxury-logo.png"
                        alt="Fort Maner logo"
                        className="h-40 md:h-60 w-auto"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
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
