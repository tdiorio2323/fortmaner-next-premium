import type { BlogPost } from '@/lib/types';

export default function BlogFeed({ posts }: { posts: BlogPost[] }) {
  if (!posts?.length) {
    return (
      <div className="bg-red-600 text-white p-4 rounded-lg text-center">No posts yet.</div>
    );
  }

  // Edge-to-edge, single post, no categories/tags
  const p = posts[0];
  const dt = new Date(p.date);
  const dateLabel = isNaN(+dt) ? p.date : dt.toLocaleDateString();
  return (
    <div className="w-full">
      <article id={p.id} className="w-full rounded-xl overflow-hidden shadow-lg bg-white">
        {p.image && (
          <div className="w-full">
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="w-full h-[420px] object-cover"
            />
          </div>
        )}
        <div className="p-8">
          <div className="text-lg md:text-xl text-muted-foreground mb-3">
            {dateLabel && <time dateTime={p.date}>{dateLabel}</time>}
          </div>
          <h2 className="font-bold text-4xl md:text-5xl mb-5">{p.title}</h2>
          {p.excerpt && <p className="text-2xl text-neutral-700 mb-3">{p.excerpt}</p>}
          {p.body && (
            <div className="prose prose-xl max-w-none mt-6 text-black">
              {p.body.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
