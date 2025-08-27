export function PressMarquee() {
  const logos = [
    '/fort-maner-logo-white.png',
    '/fort-maner-logo-white.png',
    '/fort-maner-logo-white.png',
    '/fort-maner-logo-white.png',
  ];
  return (
    <section className="bg-white relative z-0">
      <div className="relative overflow-hidden border-y border-neutral-200 py-4 md:py-6">
        <div
          className="flex animate-marquee whitespace-nowrap [animation-duration:18s] hover:[animation-play-state:paused]"
          aria-label="Featured in"
        >
          {[...logos, ...logos].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Fort Maner logo"
              className="mx-14 h-10 md:h-12 w-auto opacity-70 invert"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
