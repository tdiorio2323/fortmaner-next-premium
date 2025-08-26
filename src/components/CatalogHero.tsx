import React from "react";

export default function CatalogHero({
  title,
  subtitle,
  bg,
}: {
  title: string;
  subtitle: string;
  bg: string;
}) {
  return (
    <section className="relative h-56 md:h-72 w-full overflow-hidden rounded-2xl">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => ((e.currentTarget.src = "/src/assets/white-brick-wall.jpg"))}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-white/85">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
