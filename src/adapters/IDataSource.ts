import type { Product } from '@/lib/types';

export interface CollectionSummary {
  handle: string;
  title: string;
  description?: string;
  heroImage?: string;
  filters?: {
    sizes?: string[];
    colors?: string[];
    tags?: string[];
  };
  productHandles: string[];
}

export interface CartLineInput {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Cart {
  id: string;
  lines: Array<{ id: string; productId: string; variantId?: string; quantity: number }>;
  checkoutUrl?: string;
}

export interface IDataSource {
  getCollections(): Promise<CollectionSummary[]>;
  getCollectionByHandle(handle: string): Promise<CollectionSummary | null>;
  getProducts(): Promise<Product[]>;
  getProductsByCollection(handle: string): Promise<Product[]>;
  getProductByHandle(handle: string): Promise<Product | null>;
  searchProducts(query: string): Promise<Product[]>;
  createCart(): Promise<Cart>;
  addLines(cartId: string, lines: CartLineInput[]): Promise<Cart>;
  getCheckoutUrl(cartId: string): Promise<string>;
}
