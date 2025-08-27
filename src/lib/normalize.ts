import type { Product, UGCPost, CommunityItem, Season, AgeRange } from './types';

const normSeason = (v: any): Season => {
  if (!v) return null;
  const s = String(v).toUpperCase();
  if (s.startsWith('FW')) return 'FW';
  if (s.startsWith('SS')) return 'SS';
  return null;
};

const normAge = (v: any): AgeRange => {
  if (!v) return null;
  const s = String(v).toLowerCase();
  if (s === 'kids' || s === 'youth' || s === 'child') return 'kids';
  return 'adult';
};

export function normalizeProduct(raw: any): Product {
  return {
    id: String(raw.id ?? raw.slug ?? raw.handle),
    handle: raw.handle ?? raw.slug,
    slug: raw.slug ?? raw.handle ?? String(raw.id),
    title: String(raw.title ?? 'Untitled'),
    brand: raw.brand ?? 'Fort Maner',
    price: Number(raw.price ?? 0),
    compareAtPrice: raw.compareAtPrice != null ? Number(raw.compareAtPrice) : null,
    images: Array.isArray(raw.images) ? raw.images : [],
    badges: Array.isArray(raw.badges) ? raw.badges : [],
    inStock: Boolean(raw.inStock ?? (Array.isArray(raw.variants) && raw.variants.some((v: any)=> Number(v?.stock)>0))),
    description: raw.description ?? '',
    options: raw.options ?? {},
    variants: Array.isArray(raw.variants) ? raw.variants.map((v: any)=>({
      id: String(v.id ?? `${raw.slug}-${v.size ?? ''}-${v.color ?? ''}`),
      sku: String(v.sku ?? ''),
      color: v.color, size: v.size,
      stock: Number(v.stock ?? 0),
    })) : [],
    collections: Array.isArray(raw.collections) ? raw.collections : [],
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    season: normSeason(raw.season),
    capsule: raw.capsule ?? null,
    ageRange: normAge(raw.ageRange ?? null),
    seo: raw.seo ?? {},
  };
}

export function normalizeUGC(raw: any): UGCPost {
  const p = String((raw.platform ?? '').toLowerCase());
  const platform: 'ig'|'fb' = p === 'fb' || p === 'facebook' ? 'fb' : 'ig';
  return {
    id: String(raw.id ?? cryptoRandom()),
    mediaUrl: String(raw.mediaUrl ?? raw.media_url ?? ''),
    platform,
    caption: raw.caption ?? '',
    productIds: Array.isArray(raw.productIds ?? raw.product_ids) ? (raw.productIds ?? raw.product_ids) : [],
    author: raw.author ?? '',
    approved: Boolean(raw.approved ?? false),
  };
}

export function normalizeCommunity(raw: any): CommunityItem {
  const k = String((raw.kind ?? '').toLowerCase());
  const kind: 'event'|'post'|'video' = k === 'event' ? 'event' : k === 'video' ? 'video' : 'post';
  return {
    id: String(raw.id ?? cryptoRandom()),
    kind,
    title: String(raw.title ?? ''),
    date: String(raw.date ?? new Date().toISOString()),
    mediaUrl: String(raw.mediaUrl ?? raw.media_url ?? ''),
    excerpt: raw.excerpt ?? '',
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    location: raw.location ?? '',
    author: raw.author ?? '',
  };
}

function cryptoRandom() {
  return Math.random().toString(36).slice(2);
}