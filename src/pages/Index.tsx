import { useEffect } from 'react';
import HeroPinned from "@/components/HeroPinned";
import FortManerFrame from "@/components/FortManerFrame";

const tiles = [
  { title: "Men", href: "/men" },
  { title: "Women", href: "/ladies" },
  { title: "Shop All", href: "/shop-all" },
];

export default function Index() {
  return (
    <main className="bg-white text-black">
      <HeroPinned />

      {/* Stacked sticky frames that overlap on scroll */}
      <FortManerFrame topOffset={0} />
    </main>
  );
}
