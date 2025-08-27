import { useEffect } from 'react';
import HeroPinned from "@/components/HeroPinned";
import AlternatingShowcase from "@/components/AlternatingShowcase";
import FullWidthCollections from "@/components/FullWidthCollections";
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
      <div className="px-6 md:px-10 lg:px-12 py-8 md:py-12">
        <AlternatingShowcase />
      </div>
      {/* Full-width 2x2 grid section (image/text then reversed) */}
      <FullWidthCollections />
    </main>
  );
}
