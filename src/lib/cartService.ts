// src/lib/cartService.ts
import { getDataSource } from '@/lib/datasource';

let cartId: string | null = null;

export async function addToCart(productId: string, variantId: string, qty = 1) {
  const ds = getDataSource();
  if (!cartId) cartId = (await ds.createCart()).id;
  const cart = await ds.addLines(cartId, [{ productId, variantId, quantity: qty }]);
  cartId = cart.id;
  return cart;
}

export async function getCheckoutUrl() {
  if (!cartId) return '/checkout';
  const ds = getDataSource();
  return ds.getCheckoutUrl(cartId);
}