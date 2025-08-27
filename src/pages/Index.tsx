import { useEffect } from 'react';
import HeroPinned from "@/components/HeroPinned";
import AlternatingShowcase from "@/components/AlternatingShowcase";
import BrickDuos from "@/components/BrickDuos";
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
      <AlternatingShowcase />
      <BrickDuos />
    </main>
  );
}
