import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import hero from "@/assets/white-brick-wall.jpg"; // swap if you have a custom hero

export default function LandingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.22], [1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 0.22], [0, -20]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity: fade, scale, y }}
      className="relative h-screen w-full overflow-hidden text-white"
    >
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">FORT MANER</h1>
        <p className="mt-3 max-w-xl text-white/85">Shop smart. Look good. Keep it simple.</p>
        <div className="mt-7 flex gap-3">
          <a href="/men" className="rounded-xl bg-white text-black px-5 py-3 text-sm font-medium">Shop Men</a>
          <a href="/ladies" className="rounded-xl border border-white/40 px-5 py-3 text-sm">Shop Women</a>
          <a href="/shop-all" className="rounded-xl border border-white/40 px-5 py-3 text-sm hidden sm:inline">Shop All</a>
        </div>
      </div>
      {/* scroll cue */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <motion.div
          initial={{ y: 0, opacity: 0.8 }} animate={{ y: [0, 10, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="text-[11px] tracking-wide text-white/80"
        >
          Scroll
        </motion.div>
      </div>
    </motion.section>
  );
}
