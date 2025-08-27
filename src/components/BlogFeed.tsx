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
              className="w-full h-[320px] object-cover"
            />
          </div>
        )}
        <div className="p-8">
          <div className="text-base text-muted-foreground mb-2">
            {dateLabel && <time dateTime={p.date}>{dateLabel}</time>}
          </div>
          <h2 className="font-bold text-2xl mb-4">{p.title}</h2>
          {p.excerpt && <p className="text-lg text-muted-foreground mb-2">{p.excerpt}</p>}
          {p.body && (
            <div className="prose prose-lg max-w-none mt-6 text-black">
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
