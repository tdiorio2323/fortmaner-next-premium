export interface SfProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: { nodes: Array<{ url: string }> };
  variants: { nodes: Array<{ id: string; title: string; availableForSale: boolean; sku?: string; price: { amount: string } }> };
}

export interface SfCart {
  id: string;
  checkoutUrl: string;
  lines: { edges: Array<{ node: { id: string } }> };
}