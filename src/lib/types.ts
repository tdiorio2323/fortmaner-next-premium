// Fort Maner Storefront Types
export interface Product {
  id: string;
  handle: string;
  slug: string;
  title: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  badges: string[];
  inStock: boolean;
  description?: string;
  options?: {
    color: string[];
    size: string[];
  };
  variants?: ProductVariant[];
  collections?: string[];
  tags?: string[];
  season?: 'FW' | 'SS' | null;
  capsule?: string | null;
  ageRange?: 'kids' | 'adult' | null;
  seo?: {
    title: string;
    description: string;
  };
}

export interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  size: string;
  stock: number;
  price?: number; // variant-specific pricing
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export interface UGCPost {
  id: string;
  mediaUrl: string;
  platform: 'ig' | 'fb';
  caption: string;
  productIds: string[];
  author?: string;
  approved: boolean;
}

export interface CommunityItem {
  id: string;
  kind: 'event' | 'post' | 'video';
  title: string;
  date: string; // ISO string
  mediaUrl?: string;
  excerpt?: string;
  tags: string[];
  location?: string;
  author?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product; variant: ProductVariant; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; variantId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

export interface StripeSession {
  id: string;
  url: string;
  customer_email?: string;
  payment_status: string;
  amount_total: number;
  currency: string;
}