import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // pin until section end
  });

  const fade = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    // 200svh gives scroll room while the inner hero stays stuck
    <section ref={ref} className="relative h-[200svh]">
      <motion.div
        style={{ opacity: fade, scale, y }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>
    </section>
  );
}
