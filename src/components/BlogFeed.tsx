import type { BlogPost } from '@/lib/types';

export default function BlogFeed({ posts }: { posts: BlogPost[] }) {
  if (!posts?.length) {
    return <p className="text-sm text-muted-foreground">No posts yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map((p) => {
        const dt = new Date(p.date);
        const dateLabel = isNaN(+dt) ? '' : dt.toLocaleDateString();
        return (
          <article id={p.id} key={p.id} className="border rounded-xl overflow-hidden">
            <a
              href={p.href}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              aria-label={p.title}
            >
              {p.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-1">
                  {dateLabel && <time dateTime={p.date}>{dateLabel}</time>}
                  {p.tags?.length ? ` • ${p.tags[0]}` : ''}
                </div>
                <h2 className="font-semibold">{p.title}</h2>
                {p.excerpt && <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>}
                {!!p.tags?.length && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 border rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          </article>
        );
      })}
    </div>
  );
}