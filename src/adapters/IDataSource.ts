export type Size = 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';

export interface ProductVariant {
  id: string;
  size: Size;
  sku?: string;
  inStock: boolean;
  stockLevel?: number;
  price?: number;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description?: string;
  images: string[];
  price?: number;
  variants: ProductVariant[];
  tags?: string[];
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
  getProducts(): Promise<Product[]>;
  getProductByHandle(handle: string): Promise<Product | null>;
  createCart(): Promise<Cart>;
  addLines(cartId: string, lines: CartLineInput[]): Promise<Cart>;
  getCheckoutUrl(cartId: string): Promise<string>;
}