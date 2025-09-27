import { useQuery } from '@tanstack/react-query';
import { fetchCollection, fetchCollections, fetchProductByHandle, fetchProductsByCollection, getFeaturedProducts, searchProducts } from '@/lib/catalog';
import type { CollectionSummary } from '@/adapters/IDataSource';
import type { Product } from '@/lib/types';

export function useCollections() {
  return useQuery<CollectionSummary[]>({
    queryKey: ['collections'],
    queryFn: async () => {
      try {
        return await fetchCollections();
      } catch (error) {
        console.error('Failed to load collections', error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useCollection(handle: string) {
  return useQuery<{ collection: CollectionSummary | null; products: Product[] }>({
    queryKey: ['collection', handle],
    queryFn: async () => {
      try {
        const [collection, products] = await Promise.all([
          fetchCollection(handle),
          fetchProductsByCollection(handle),
        ]);
        return { collection, products };
      } catch (error) {
        console.error('Failed to load collection', error);
        return { collection: null, products: [] };
      }
    },
    enabled: Boolean(handle),
  });
}

export function useProduct(handle: string | undefined) {
  return useQuery<Product | null>({
    queryKey: ['product', handle],
    queryFn: async () => {
      if (!handle) return null;
      try {
        return await fetchProductByHandle(handle);
      } catch (error) {
        console.error('Failed to load product', error);
        return null;
      }
    },
    enabled: Boolean(handle),
  });
}

export function useSearch(query: string) {
  return useQuery<Product[]>({
    queryKey: ['search', query],
    queryFn: async () => {
      try {
        return await searchProducts(query);
      } catch (error) {
        console.error('Search failed', error);
        return [];
      }
    },
    enabled: true,
  });
}

export function useFeaturedProducts() {
  return useQuery<Product[]>({
    queryKey: ['featured-products'],
    queryFn: async () => {
      try {
        return await getFeaturedProducts();
      } catch (error) {
        console.error('Failed to load featured products', error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}
