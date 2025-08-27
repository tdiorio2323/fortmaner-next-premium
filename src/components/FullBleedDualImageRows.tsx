import left1 from '@/assets/footwear-category.jpg';
import right1 from '@/assets/clothing-category.jpg';
import left2 from '@/assets/instagram-post-2.jpg';
import right2 from '@/assets/instagram-post-3.jpg';

export default function FullBleedDualImageRows() {
  return (
    <section className="w-full">
      {/* Row 1: picture left, image right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative">
          <img src={left1} alt="Fort Maner Footwear" className="h-[70vh] w-full object-cover" />
        </div>
        <div className="relative">
          <img src={right1} alt="Fort Maner Apparel" className="h-[70vh] w-full object-cover" />
        </div>
      </div>

      {/* Row 2: picture right, image left */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative md:order-2">
          <img src={left2} alt="Fort Maner Lifestyle" className="h-[70vh] w-full object-cover" />
        </div>
        <div className="relative md:order-1">
          <img src={right2} alt="Fort Maner Social" className="h-[70vh] w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

