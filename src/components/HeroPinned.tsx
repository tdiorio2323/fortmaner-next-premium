import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const el = document.getElementById('fm-hero-video') as HTMLVideoElement | null;
    if (!el) return;
    el.muted = true;
    // ensure inline playback on iOS
    (el as any).playsInline = true;
    el.setAttribute('playsinline', '');

    let attempts = 0;
    const maxAttempts = 24; // ~6s total
    const tryPlay = () => {
      const p = el.play();
      if (p && typeof (p as any).then === 'function') {
        (p as Promise<void>).catch(() => {
          if (attempts++ < maxAttempts) setTimeout(tryPlay, 250);
        });
      }
    };
    const onTouch = () => tryPlay();
    const onClick = () => tryPlay();
    const onVis = () => tryPlay();
    const onLoaded = () => tryPlay();
    const t = setTimeout(tryPlay, 0);
    document.addEventListener('touchstart', onTouch, { passive: true } as any);
    document.addEventListener('click', onClick, { passive: true } as any);
    document.addEventListener('visibilitychange', onVis);
    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('canplaythrough', onLoaded as any);
    return () => {
      clearTimeout(t);
      document.removeEventListener('touchstart', onTouch as any);
      document.removeEventListener('click', onClick as any);
      document.removeEventListener('visibilitychange', onVis);
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('canplaythrough', onLoaded as any);
    };
  }, []);

  return (
    // Provide scroll room while the inner hero stays stuck
    <section ref={ref} className="relative h-[100svh] md:h-[110svh]">
      <motion.div
        style={{ opacity: fade, scale, y }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Attempt video on all devices with autoplay; keep video element and retry on interaction */}
        <video
          id="fm-hero-video"
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: 'none' }}
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
