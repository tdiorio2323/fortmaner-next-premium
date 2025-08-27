import { useEffect } from 'react';
import HeroPinned from "@/components/HeroPinned";
import AlternatingShowcase from "@/components/AlternatingShowcase";
import FullWidthCollections from "@/components/FullWidthCollections";
import { USPStrip } from "@/components/sections/USPStrip";
import { NewArrivalsGrid } from "@/components/sections/NewArrivalsGrid";
import { BestSellersRow } from "@/components/sections/BestSellersRow";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { EmailSignup } from "@/components/sections/EmailSignup";
import { FAQ } from "@/components/sections/FAQ";
import { PressMarquee } from "@/components/sections/PressMarquee";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
// Removed full-bleed and social feed per latest request

const tiles = [
  { title: "Men", href: "/men" },
  { title: "Women", href: "/ladies" },
  { title: "Shop All", href: "/shop-all" },
];

export default function Index() {
  return (
    <main className="text-black">
      <HeroPinned />
      <div className="px-6 md:px-10 lg:px-12 pt-2 md:pt-3 pb-12">
        <AlternatingShowcase />
      </div>
      {/* Full-width 2x2 grid section (image/text then reversed) */}
      <FullWidthCollections />
      <USPStrip />
      <NewArrivalsGrid />
      <BestSellersRow />
      <PressMarquee />
      <ReviewsStrip />
      <EmailSignup />
      <FAQ />
      <InstagramGrid />
    </main>
  );
}
