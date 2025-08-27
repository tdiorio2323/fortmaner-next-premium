import { useEffect } from 'react';
import HeroPinned from "@/components/HeroPinned";
import AlternatingShowcase from "@/components/AlternatingShowcase";
import FullBleedDualImageRows from "@/components/FullBleedDualImageRows";
import SocialFeed from "@/components/SocialFeed";

const tiles = [
  { title: "Men", href: "/men" },
  { title: "Women", href: "/ladies" },
  { title: "Shop All", href: "/shop-all" },
];

export default function Index() {
  return (
    <main className="bg-white text-black">
      <HeroPinned />
      <AlternatingShowcase />
      <FullBleedDualImageRows />
      <SocialFeed />
    </main>
  );
}
