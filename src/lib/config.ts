export const FEATURE_SHOPIFY = (import.meta.env.VITE_FEATURE_SHOPIFY ?? 'false') === 'true';
export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined;
export const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined;