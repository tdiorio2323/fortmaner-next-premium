import brick from '@/assets/white-brick-wall.jpg';

export default function BrickDuos() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Row 1: empty square + brick */}
        <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-100 h-64 md:h-80" />
        <div className="rounded-2xl overflow-hidden border border-neutral-200/60 bg-white">
          <img src={brick} alt="Brick" className="h-64 md:h-80 w-full object-cover" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Row 2: brick + empty square */}
        <div className="rounded-2xl overflow-hidden border border-neutral-200/60 bg-white">
          <img src={brick} alt="Brick" className="h-64 md:h-80 w-full object-cover" />
        </div>
        <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-100 h-64 md:h-80" />
      </div>
    </section>
  );
}

