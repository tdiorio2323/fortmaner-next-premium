import logo from "@/assets/ftmaner-logo.png";
import img1 from "@/assets/ftm-1.jpg";
import img2 from "@/assets/ftm-2.jpg";
import img3 from "@/assets/ftm-3.jpg";

type Panel = {
    id: string;
    image: string;
    kicker: string;
    title: string;
    copy: string;
    cta?: { label: string; href: string };
};

const PANELS: Panel[] = [
    {
        id: "community",
        image: img1,
        kicker: "Community",
        title: "West End Skate Jam",
        copy: "Boards, water, stickers, tees. All love.",
        cta: { label: "See Photos", href: "/community" },
    },
    {
        id: "heritage",
        image: img2,
        kicker: "Heritage",
        title: "Built For Motion",
        copy: "Clean lines. Chicago grit. Everyday wear.",
        cta: { label: "Shop Core", href: "/shop" },
    },
    {
        id: "studio",
        image: img3,
        kicker: "Studio",
        title: "Cut + Sew",
        copy: "Small runs. Tight standards. No compromise.",
        cta: { label: "Book Studio", href: "/studio" },
    },
];

export default function FortManerFrame({ topOffset = 88 }: { topOffset?: number }) {
    return (
        <section className="relative" aria-label="Fort Maner stacked hero">
            {PANELS.map((p, i) => (
                <div key={p.id} className="h-[100dvh]">
                    {/* sticky panel that stacks as you scroll */}
                    <div className="sticky top-0 z-10" style={{ top: i * topOffset }}>
                        <div className="relative h-[100dvh] rounded-2xl overflow-hidden border border-border shadow-2xl">
                            {/* background image */}
                            <img
                                src={p.image}
                                alt={p.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            {/* vignette + marble sheen */}
                            <div
                                className="pointer-events-none absolute inset-0"
                                aria-hidden
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.15),transparent_35%)]" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />
                            </div>

                            {/* chrome top line */}
                            <div
                                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                aria-hidden
                            />

                            {/* logo */}
                            <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                                <img
                                    src={logo}
                                    alt="Fort Maner"
                                    className="h-8 sm:h-10 drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]"
                                />
                            </div>

                            {/* content */}
                            <div className="relative z-10 flex h-full items-end md:items-center">
                                <div className="m-6 sm:m-10 max-w-xl">
                                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
                                        <span className="h-2 w-2 rounded-full bg-white/60" />
                                        {p.kicker}
                                    </div>
                                    <h1 className="mt-3 text-3xl sm:text-5xl font-semibold text-white">
                                        {p.title}
                                    </h1>
                                    <p className="mt-3 text-sm sm:text-base text-white/80">
                                        {p.copy}
                                    </p>

                                    {p.cta && (
                                        <a
                                            href={p.cta.href}
                                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur hover:bg-white/20 transition"
                                        >
                                            {p.cta.label}
                                            <svg
                                                className="h-4 w-4"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
