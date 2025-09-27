import { getDataSource } from '@/lib/datasource';
import { LocalJsonDataSource } from '@/adapters/LocalJsonDataSource';
import type { CollectionSummary, IDataSource } from '@/adapters/IDataSource';
import type { Product } from '@/lib/types';

const fallbackSource = new LocalJsonDataSource();

async function withFallback<T>(fn: (source: IDataSource) => Promise<T>): Promise<T> {
  try {
    return await fn(getDataSource());
  } catch (error) {
    console.error('Catalog adapter fell back to local fixtures', error);
    return fn(fallbackSource);
  }
}

export async function fetchCollections(): Promise<CollectionSummary[]> {
  return withFallback((source) => source.getCollections());
}

export async function fetchCollection(handle: string): Promise<CollectionSummary | null> {
  return withFallback((source) => source.getCollectionByHandle(handle));
}

export async function fetchProducts(): Promise<Product[]> {
  return withFallback((source) => source.getProducts());
}

export async function fetchProductsByCollection(handle: string): Promise<Product[]> {
  return withFallback((source) => source.getProductsByCollection(handle));
}

export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  return withFallback((source) => source.getProductByHandle(handle));
}

export async function searchProducts(query: string): Promise<Product[]> {
  return withFallback((source) => source.searchProducts(query));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const [collections, products] = await Promise.all([fetchCollections(), fetchProducts()]);
  const featured = collections.find((collection) => collection.handle === 'featured');
  if (featured) {
    const handles = new Set(featured.productHandles);
    const filtered = products.filter((product) => handles.has(product.handle ?? product.slug));
    if (filtered.length) return filtered;
  }

  // Fallback to union of the first eight handles from metadata (if present)
  const metadata: { featuredHandles?: string[] } = (await import('@/data/collections.json')).default as any;
  const handles = new Set(metadata.featuredHandles ?? []);
  if (handles.size) {
    return products.filter((product) => handles.has(product.handle ?? product.slug));
  }
  return products.slice(0, 8);
}
