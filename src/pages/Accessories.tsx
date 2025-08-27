import CatalogHero from '@/components/CatalogHero';
import imgA from '@/assets/accessories-category.jpg';
import imgB from '@/assets/clothing-category.jpg';
import imgC from '@/assets/jaguar-tee-black.jpg';
import imgD from '@/assets/mountain-hoodie-black.jpg';

const items = [
    { id: "ac1", title: "Minimal Cap", price: 1999, img: imgA, tag: "New" },
    { id: "ac2", title: "Utility Tote", price: 3299, img: imgB },
    { id: "ac3", title: "Daily Socks (3-Pack)", price: 1499, img: imgC },
    { id: "ac4", title: "Logo Beanie", price: 2499, img: imgD },
    { id: "ac5", title: "Card Holder", price: 2199, img: imgB },
    { id: "ac6", title: "Sling Bag", price: 4499, img: imgA },
];

const accHero = imgA;

export default function Accessories() {
    return (
        <main className="text-black">
            <div className="mx-auto w-full max-w-6xl px-6 py-8 md:py-10">
                <CatalogHero
                    title="Accessories Collection"
                    subtitle="Complete your look with caps, bags, and everyday essentials."
                    bg={accHero}
                />
            </div>
            <section className="mx-auto w-full max-w-6xl px-6 pb-24">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(it => (
                        <a key={it.id} href="#" className="group block overflow-hidden rounded-2xl border border-neutral-200/70 bg-white hover:shadow-lg transition-shadow">
                            <div className="relative aspect-[4/5] w-full">
                                <img src={it.img} alt={it.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
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
