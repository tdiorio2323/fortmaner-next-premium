import { useEffect } from 'react';
import HeroPinned from "@/components/HeroPinned";
import AlternatingShowcase from "@/components/AlternatingShowcase";

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
    </main>
  );
}
