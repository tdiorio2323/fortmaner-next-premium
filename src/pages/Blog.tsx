import { useMemo, useState } from 'react';
import { getBlogPosts } from '@/lib/blog';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'community', label: 'Community' },
  { key: 'people', label: 'People Wearing' },
  { key: 'fw', label: 'F/W' },
  { key: 'ss', label: 'S/S' }
] as const;

export default function BlogPage() {
  const [f, setF] = useState<(typeof FILTERS)[number]['key']>('all');
  const posts = useMemo(() => {
    const all = getBlogPosts();
    if (f === 'all') return all;
    return all.filter(p => p.kind === f);
  }, [f]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Community, people wearing Fort Maner, and seasonal highlights.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {FILTERS.map(x => (
            <button
              key={x.key}
              onClick={() => setF(x.key)}
              className={`px-3 py-1 rounded-full border text-sm ${f===x.key ? 'bg-foreground text-background' : ''}`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map(p => (
            <a key={p.id} href={p.href} className="group border rounded-xl overflow-hidden">
              {p.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                </div>
              )}
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-1">
                  {labelForKind(p.kind)} • {new Date(p.date).toLocaleDateString()}
                </div>
                <h2 className="font-semibold">{p.title}</h2>
                {p.excerpt && <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>}
                {p.tags?.length ? (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 border rounded-full">{t}</span>)}
                  </div>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function labelForKind(k: 'community'|'people'|'fw'|'ss') {
  if (k === 'community') return 'Community';
  if (k === 'people') return 'People Wearing';
  if (k === 'fw') return 'F/W';
  return 'S/S';
}