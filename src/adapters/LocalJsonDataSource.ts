import type { Cart, CartLineInput, IDataSource, Product } from './IDataSource';
import productsJson from '@/data/products-complete.json';

// Simple in-memory cart store for dev
const carts = new Map<string, Cart>();
const rid = () => Math.random().toString(36).slice(2);

export class LocalJsonDataSource implements IDataSource {
  private products: Product[];
  constructor() {
    // Map existing JSON shape to our Product type
    this.products = (productsJson as any[]).map((p, i) => ({
      id: p.id ?? `local-${i}`,
      handle: p.handle ?? (p.slug || String(p.title || i)).toLowerCase().replace(/\s+/g, '-'),
      title: p.title ?? p.name ?? `Product ${i + 1}`,
      description: p.description ?? '',
      images: p.images ?? (p.image ? [p.image] : []),
      price: Number(p.price ?? p.mockPrice ?? 0),
      variants: (p.variants && p.variants.length
        ? p.variants
        : ['S', 'M', 'L', 'XL', '2XL', '3XL']
      ).map((size: any, idx: number) => ({
        id: `${p.id ?? `local-${i}`}-v-${idx}`,
        size: (typeof size === 'string' ? size : size?.size) ?? 'M',
        sku: (typeof size === 'object' ? size?.sku : undefined),
        inStock: (typeof size === 'object' ? size?.inStock ?? true : true),
        stockLevel: (typeof size === 'object' ? size?.stockLevel ?? 10 : 10),
        price: Number((typeof size === 'object' ? size?.price : undefined) ?? (p.price ?? 0)),
      })),
      tags: p.tags ?? [],
    }));
  }

  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    return this.products.find((p) => p.handle === handle) ?? null;
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
    for (const l of lines) {
      cart.lines.push({ id: `line_${rid()}`, productId: l.productId, variantId: l.variantId, quantity: l.quantity });
    }
    return cart;
  }

  async getCheckoutUrl(cartId: string): Promise<string> {
    // Placeholder
    return `/checkout?cartId=${encodeURIComponent(cartId)}`;
  }
}