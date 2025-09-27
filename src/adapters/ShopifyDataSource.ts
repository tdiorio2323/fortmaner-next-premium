import type { Cart, CartLineInput, CollectionSummary, IDataSource } from './IDataSource';
import type { Product, ProductVariant } from '@/lib/types';
import { sfetch } from '@/lib/shopify/client';
import { SF_CART_CREATE, SF_CART_LINES_ADD, SF_PRODUCT_BY_HANDLE, SF_PRODUCTS } from '@/lib/shopify/queries';
import type { SfProduct, SfCart } from '@/lib/shopify/types';

const sizeFromTitle = (title: string): ProductVariant['size'] => {
  const t = title.toUpperCase();
  if (['S','M','L','XL','2XL','3XL'].includes(t)) return t as any;
  // Fallback parse like "Default Title" => 'M'
  return 'M';
};

export class ShopifyDataSource implements IDataSource {
  async getProducts(): Promise<Product[]> {
    const data = await sfetch<{ products: { nodes: SfProduct[] } }>(SF_PRODUCTS);
    return data.products.nodes.map(mapSfProduct);
  }

  async getCollections(): Promise<CollectionSummary[]> {
    // Collection queries are not implemented; return empty list so consumers fall back gracefully.
    return [];
  }

  async getCollectionByHandle(_handle: string): Promise<CollectionSummary | null> {
    return null;
  }

  async getProductsByCollection(_handle: string): Promise<Product[]> {
    // Without collection metadata, return all products for now.
    return this.getProducts();
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    const data = await sfetch<{ product: SfProduct | null }>(SF_PRODUCT_BY_HANDLE, { handle });
    return data.product ? mapSfProduct(data.product) : null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.getProducts();
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(q) || product.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  async createCart(): Promise<Cart> {
    const data = await sfetch<{ cartCreate: { cart: SfCart } }>(SF_CART_CREATE);
    return { id: data.cartCreate.cart.id, lines: [], checkoutUrl: data.cartCreate.cart.checkoutUrl };
  }

  async addLines(cartId: string, lines: CartLineInput[]): Promise<Cart> {
    const payload = lines.map((l) => ({
      merchandiseId: l.variantId, // requires variantId for Shopify
      quantity: l.quantity,
    }));
    const data = await sfetch<{ cartLinesAdd: { cart: SfCart; userErrors: any[] } }>(SF_CART_LINES_ADD, {
      cartId,
      lines: payload,
    });
    if (data.cartLinesAdd.userErrors?.length) {
      throw new Error(`Shopify userErrors: ${JSON.stringify(data.cartLinesAdd.userErrors)}`);
    }
    return { id: data.cartLinesAdd.cart.id, lines: [], checkoutUrl: data.cartLinesAdd.cart.checkoutUrl };
  }

  async getCheckoutUrl(cartId: string): Promise<string> {
    // We return the URL captured on create/add; fallback is the standard web checkout route
    return `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/cart/${encodeURIComponent(cartId)}`;
  }
}

function mapSfProduct(p: SfProduct): Product {
  const variants: ProductVariant[] = (p.variants?.nodes ?? []).map((v) => ({
    id: v.id,
    size: sizeFromTitle(v.title),
    sku: v.sku ?? '',
    color: undefined,
    stock: v.availableForSale ? Math.max(1, Number(v.quantityAvailable ?? 0)) : 0,
  }));

  return {
    id: p.id,
    handle: p.handle,
    slug: p.handle,
    title: p.title,
    brand: p.vendor ?? 'Fort Maner',
    price: Number(p.variants?.nodes?.[0]?.price?.amount ?? 0),
    compareAtPrice:
      p.variants?.nodes?.[0]?.compareAtPrice?.amount != null
        ? Number(p.variants.nodes[0].compareAtPrice.amount)
        : null,
    images: p.images?.nodes?.map((node) => node.url) ?? [],
    badges: [],
    inStock: variants.some((variant) => variant.stock > 0),
    description: p.description ?? '',
    options: {
      size: p.options?.find((option) => option.name.toLowerCase() === 'size')?.values ?? [],
      color: p.options?.find((option) => option.name.toLowerCase() === 'color')?.values ?? [],
    },
    variants,
    collections: p.collections?.nodes?.map((collection) => collection.handle) ?? [],
    tags: p.tags ?? [],
    season: null,
    capsule: null,
    ageRange: null,
    seo: {
      title: p.seo?.title ?? undefined,
      desc: p.seo?.description ?? undefined,
    },
  };
}
