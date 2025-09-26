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

    // Check if we're on a mobile device with limited data
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowData = 'connection' in navigator && (navigator as any).connection?.effectiveType === 'slow-2g';

    if (isMobile || isLowData) {
      // On mobile or slow connections, don't aggressively try to autoplay
      el.style.display = 'none';
      return;
    }

    el.muted = true;
    // ensure inline playback on iOS
    (el as any).playsInline = true;
    el.setAttribute('playsinline', '');

    let attempts = 0;
    const maxAttempts = 12; // Reduced attempts for better performance
    const tryPlay = () => {
      const p = el.play();
      if (p && typeof (p as any).then === 'function') {
        (p as Promise<void>).catch(() => {
          if (attempts++ < maxAttempts) setTimeout(tryPlay, 500); // Longer delay
        });
      }
    };

    const onUserInteraction = () => {
      el.style.display = 'block';
      tryPlay();
    };

    const onLoaded = () => {
      if (!isMobile) tryPlay();
    };

    const t = setTimeout(() => {
      if (!isMobile) tryPlay();
    }, 100);

    document.addEventListener('touchstart', onUserInteraction, { passive: true, once: true } as any);
    document.addEventListener('click', onUserInteraction, { passive: true, once: true } as any);
    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('canplaythrough', onLoaded as any);

    return () => {
      clearTimeout(t);
      document.removeEventListener('touchstart', onUserInteraction as any);
      document.removeEventListener('click', onUserInteraction as any);
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
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: 'none' }}
          poster="/fort-maner-luxury-cover.jpg"
        />

        {/* Mobile fallback background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: 'url(/fort-maner-luxury-cover.jpg)' }}
          aria-hidden="true"
        />

        {/* Centered logo overlay with fade-in on load */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <motion.img
            src="/fort-maner-logo-white.png"
            alt="Fort Maner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="h-64 w-auto sm:h-80 md:h-[28rem] max-w-full drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            loading="eager"
          />
        </div>
      </motion.div>
    </section>
  );
}
