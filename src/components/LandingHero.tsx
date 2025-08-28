import HeroVideo from "./HeroVideo";

export default function LandingHero() {
  return (
    <section className="px-4 py-12">
      <HeroVideo />
      {/* CTA stack */}
      <div className="mx-auto max-w-3xl pt-8 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Fort Maner</h1>
        <p className="mt-3 text-base md:text-lg opacity-80">
          Chicago streetwear. Limited drops. Built for daily wear.
        </p>
      </div>
    </section>
  );
}