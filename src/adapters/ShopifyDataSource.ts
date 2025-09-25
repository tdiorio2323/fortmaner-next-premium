import type { Cart, CartLineInput, IDataSource, Product, ProductVariant } from './IDataSource';
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

  async getProductByHandle(handle: string): Promise<Product | null> {
    const data = await sfetch<{ product: SfProduct | null }>(SF_PRODUCT_BY_HANDLE, { handle });
    return data.product ? mapSfProduct(data.product) : null;
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
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    images: p.images?.nodes?.map((n) => n.url) ?? [],
    price: Number(p.variants?.nodes?.[0]?.price?.amount ?? 0),
    variants: (p.variants?.nodes ?? []).map((v) => ({
      id: v.id,
      size: sizeFromTitle(v.title),
      sku: v.sku,
      inStock: v.availableForSale,
      stockLevel: undefined,
      price: Number(v.price?.amount ?? 0),
    })),
    tags: [],
  };
}