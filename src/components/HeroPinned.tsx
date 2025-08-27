import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // pin until section end
  });

  // Keep the hero visible longer and shorten the pin to reduce blank gap
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [1, 0.985]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    // Provide scroll room while the inner hero stays stuck
    <section ref={ref} className="relative h-[110svh]">
      <motion.div
        style={{ opacity: fade, scale, y }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Centered logo overlay with fade-in on load */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.img
            src="/fort-maner-logo-white.png"
            alt="Fort Maner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="h-80 w-auto md:h-[28rem] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
