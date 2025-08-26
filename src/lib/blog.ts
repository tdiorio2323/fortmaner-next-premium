import rawProducts from '@/data/products-complete.json';
import rawUGC from '@/data/ugc.json';
import rawCommunity from '@/data/community.json';
import type { BlogPost } from './types';

type Season = 'FW' | 'SS' | null;

const asSeason = (v: any): Season => {
  const s = String(v || '').toUpperCase();
  return s.startsWith('FW') ? 'FW' : s.startsWith('SS') ? 'SS' : null;
};

const PRODUCTS = (rawProducts as any[]).map(p => ({
  id: String(p.id ?? p.slug ?? p.handle),
  slug: String(p.slug ?? p.handle ?? p.id),
  title: String(p.title ?? 'Untitled'),
  images: Array.isArray(p.images) ? p.images : [],
  season: asSeason(p.season),
  collections: Array.isArray(p.collections) ? p.collections : [],
}));

const UGC = (rawUGC as any[]).filter(u => u.approved);

const COMMUNITY = (rawCommunity as any[]);

export function getBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  // Community → blog
  for (const c of COMMUNITY) {
    posts.push({
      id: `community-${c.id}`,
      kind: 'community',
      title: c.title,
      date: c.date,
      excerpt: c.excerpt || '',
      image: c.mediaUrl || c.media_url,
      href: `/community#${c.id}`,
      tags: c.tags || [],
    });
  }

  // People Wearing (UGC) → blog
  for (const u of UGC) {
    const pid = (u.productIds || u.product_ids || [])[0];
    const p = PRODUCTS.find(x => x.id === pid || x.slug === pid);
    posts.push({
      id: `people-${u.id}`,
      kind: 'people',
      title: p ? `People Wearing • ${p.title}` : 'People Wearing',
      date: new Date().toISOString(),
      excerpt: u.caption || '',
      image: u.mediaUrl || u.media_url,
      href: p ? `/product/${p.slug}` : '/lookbook',
      tags: ['people', 'lookbook'],
    });
  }

  // Seasonal highlights → blog
  const seasons: Season[] = ['FW', 'SS'];
  for (const s of seasons) {
    const list = PRODUCTS.filter(p => p.season === s);
    if (list.length) {
      posts.push({
        id: `season-${s}`,
        kind: s === 'FW' ? 'fw' : 'ss',
        title: s === 'FW' ? 'Fall/Winter Highlights' : 'Spring/Summer Highlights',
        date: new Date().toISOString(),
        excerpt: `Top picks from the ${s} collection.`,
        image: list[0].images?.[0],
        href: s === 'FW' ? '/shop/fw' : '/shop/ss',
        tags: [s],
      });
    }
  }

  // newest first
  return posts.sort((a,b) => +new Date(b.date) - +new Date(a.date));
}