"use client";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // required for autoplay on mobile
    const id = requestAnimationFrame(() => v.play().catch(() => {}));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-2xl">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        // @ts-expect-error iOS hint
        webkit-playsinline="true"
        preload="metadata"
        poster="/video/hero-poster.jpg"
      >
        {/* prefer smaller first for mobile */}
        <source src="/video/hero-720.webm" type="video/webm" />
        <source src="/video/hero-720.mp4" type="video/mp4" />
        {/* desktop fallback */}
        <source src="/video/hero-1080.mp4" type="video/mp4" />
      </video>
      <style>{`
        @media (prefers-reduced-data: reduce) { video { display:none } }
        @media (prefers-reduced-motion: reduce) { video { animation:none } }
      `}</style>
    </div>
  );
}