import type { Cart, CartLineInput, CollectionSummary, IDataSource } from './IDataSource';
import rawProductsPrimary from '@/data/products.json';
import rawProductsExtended from '@/data/products-complete.json';
import collectionsFile from '@/data/collections.json';
import { normalizeProduct } from '@/lib/normalize';
import type { Product, ProductVariant } from '@/lib/types';

const carts = new Map<string, Cart>();
const rid = () => Math.random().toString(36).slice(2);

type CollectionsFile = {
  collections: Array<CollectionSummary & { filters?: CollectionSummary['filters'] }>;
  featuredHandles?: string[];
};

const collectionsData = collectionsFile as CollectionsFile;

export class LocalJsonDataSource implements IDataSource {
  private products: Product[];
  private collections: CollectionSummary[];
  private featuredHandles: string[];

  constructor() {
    const deduped = new Map<string, Product>();
    const ingest = (input: any) => {
      const normalized = enrichProduct(normalizeProduct(input), input);
      const key = normalized.handle ?? normalized.slug;
      deduped.set(key, normalized);
    };

    [...(rawProductsPrimary as any[]), ...(rawProductsExtended as any[])].forEach(ingest);

    this.products = Array.from(deduped.values());

    const byHandle = new Map(this.products.map((product) => [product.handle ?? product.slug, product]));

    this.collections = (collectionsData.collections ?? []).map((collection) => {
      const handles = collection.productHandles?.length
        ? collection.productHandles
        : this.products.map((product) => product.handle ?? product.slug);

      handles.forEach((handle) => {
        const product = byHandle.get(handle);
        if (product) {
          product.collections = Array.from(new Set([...(product.collections ?? []), collection.handle]));
        }
      });

      return {
        handle: collection.handle,
        title: collection.title,
        description: collection.description,
        heroImage: collection.heroImage,
        filters: collection.filters,
        productHandles: handles,
      } satisfies CollectionSummary;
    });

    this.featuredHandles = collectionsData.featuredHandles ?? [];

    if (this.featuredHandles.length) {
      this.collections.push({
        handle: 'featured',
        title: 'Featured',
        description: 'Curated highlights from the Fort Maner catalog.',
        heroImage: undefined,
        filters: undefined,
        productHandles: this.featuredHandles,
      });
    }
  }

  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  async getCollections(): Promise<CollectionSummary[]> {
    return this.collections;
  }

  async getCollectionByHandle(handle: string): Promise<CollectionSummary | null> {
    return this.collections.find((collection) => collection.handle === handle) ?? null;
  }

  async getProductsByCollection(handle: string): Promise<Product[]> {
    const collection = await this.getCollectionByHandle(handle);
    if (!collection) return [];
    const handles = new Set(collection.productHandles);
    return this.products.filter((product) => handles.has(product.handle ?? product.slug));
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    return this.products.find((product) => (product.handle ?? product.slug) === handle) ?? null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const needle = query.trim().toLowerCase();
    if (!needle) return this.products;
    return this.products.filter((product) =>
      product.title.toLowerCase().includes(needle) ||
      product.tags.some((tag) => tag.toLowerCase().includes(needle)) ||
      (product.description ?? '').toLowerCase().includes(needle)
    );
  }

  async createCart(): Promise<Cart> {
    const id = `cart_${rid()}`;
    const cart: Cart = { id, lines: [] };
    carts.set(id, cart);
    return cart;
  }

  async addLines(cartId: string, lines: CartLineInput[]): Promise<Cart> {
    const cart = carts.get(cartId);
    if (!cart) throw new Error('Cart not found');
    for (const line of lines) {
      cart.lines.push({
        id: `line_${rid()}`,
        productId: line.productId,
        variantId: line.variantId,
        quantity: line.quantity,
      });
    }
    return cart;
  }

  async getCheckoutUrl(cartId: string): Promise<string> {
    return `/checkout?cartId=${encodeURIComponent(cartId)}`;
  }
}

function enrichProduct(product: Product, raw: any): Product {
  const handle = product.handle ?? product.slug;
  const sizeOptions = Array.isArray(raw?.sizes) ? raw.sizes : product.options?.size ?? [];
  const colorOptions = Array.isArray(raw?.colors) ? raw.colors : product.options?.color ?? [];

  const variants: ProductVariant[] = product.variants?.length
    ? product.variants
    : buildVariants(handle, sizeOptions, colorOptions);

  return {
    ...product,
    handle,
    slug: product.slug ?? handle,
    brand: product.brand ?? raw?.brand ?? 'Fort Maner',
    price: Number(product.price ?? raw?.price ?? 0),
    compareAtPrice:
      raw?.compareAtPrice != null
        ? Number(raw.compareAtPrice)
        : product.compareAtPrice ?? null,
    images: product.images.length ? product.images : ['/placeholder.svg'],
    badges: product.badges ?? (Array.isArray(raw?.badges) ? raw.badges : []),
    collections: Array.isArray(product.collections) ? product.collections : [],
    options: {
      color: colorOptions,
      size: sizeOptions,
    },
    variants,
    inStock: product.inStock ?? variants.some((variant) => variant.stock > 0),
    tags: Array.isArray(product.tags) && product.tags.length
      ? product.tags
      : Array.isArray(raw?.tags)
        ? raw.tags
        : [],
    description: product.description ?? raw?.description ?? '',
    season: product.season ?? null,
    ageRange: product.ageRange ?? null,
  };
}

function buildVariants(handle: string, sizes: any[], colors: any[]): ProductVariant[] {
  if (Array.isArray(sizes) && sizes.length) {
    return sizes.map((size: any, index: number) => ({
      id: `${handle}-${String(size).toLowerCase()}-${index}`,
      sku: `${handle}-${String(size).toUpperCase()}`,
      size: String(size),
      color: Array.isArray(colors) && colors.length ? String(colors[0]) : undefined,
      stock: 10,
    }));
  }

  return [
    {
      id: `${handle}-default`,
      sku: `${handle}-OS`,
      size: 'OS',
      color: Array.isArray(colors) && colors.length ? String(colors[0]) : undefined,
      stock: 20,
    },
  ];
}
