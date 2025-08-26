// Fort Maner Storefront Types
export type Season = 'FW' | 'SS' | null;
export type AgeRange = 'kids' | 'adult' | null;

export type ProductVariant = {
  id: string; 
  sku: string; 
  color?: string; 
  size?: string; 
  stock: number;
};

export type Product = {
  id: string;
  handle?: string;
  slug: string;
  title: string;
  brand?: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  badges: string[];
  inStock: boolean;
  description?: string;
  options?: { color?: string[]; size?: string[] };
  variants: ProductVariant[];
  collections: string[];
  tags: string[];
  season: Season;
  capsule?: string | null;
  ageRange: AgeRange;
  seo?: { title?: string; desc?: string };
};

export type UGCPost = {
  id: string;
  mediaUrl: string;
  platform: 'ig' | 'fb';
  caption?: string;
  productIds: string[];
  author?: string;
  approved: boolean;
};

export type CommunityItem = {
  id: string;
  kind: 'event' | 'post' | 'video';
  title: string;
  date: string;
  mediaUrl?: string;
  excerpt?: string;
  tags?: string[];
  location?: string;
  author?: string;
};

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
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

export type BlogPost = {
  id: string;
  title: string;
  date: string;       // ISO
  excerpt?: string;
  image?: string;
  href: string;       // internal link
  tags?: string[];
};