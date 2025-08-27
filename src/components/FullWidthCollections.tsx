import manerImg from '@/assets/clothing-category.jpg';

export default function FullWidthCollections() {
  return (
    <section className="w-full">
      {/* Row 1: Image left, text right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
        <div className="relative">
          <img src="/black-fort-set.png" alt="FORT MANER LADIES JOGGING SET" className="h-[60vh] w-full object-cover" />
        </div>
        <div className="flex items-center justify-center bg-white/90 backdrop-blur px-8 py-12 md:py-0 min-h-[60vh]">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold">FORT MANER LADIES JOGGING SET</h2>
            <p className="mt-3 text-black text-base md:text-lg">
              Available in black and white colorways.
            </p>
            <a href="/ladies" className="mt-6 inline-flex items-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90">
              Shop Ladies
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Row 2: Text left, Image right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
        <div className="flex items-center justify-center order-2 md:order-1 bg-white/90 backdrop-blur px-8 py-12 md:py-0 min-h-[60vh]">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold">Fort Maner Collection</h2>
            <p className="mt-3 text-black text-base md:text-lg">
              Core pieces and signature designs. Built for motion in the city with Chicago grit.
            </p>
            <a href="/shop-all" className="mt-6 inline-flex items-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90">
              Shop Fort Maner
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <img src={manerImg} alt="Fort Maner Collection" className="h-[60vh] w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
