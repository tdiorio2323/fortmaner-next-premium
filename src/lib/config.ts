export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined;
export const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined;
const featureFlag = (import.meta.env.VITE_FEATURE_SHOPIFY ?? 'false') === 'true';
export const HAS_SHOPIFY_CREDENTIALS = Boolean(SHOPIFY_DOMAIN && SHOPIFY_TOKEN);
export const FEATURE_SHOPIFY = featureFlag && HAS_SHOPIFY_CREDENTIALS;
export const FEATURE_SHOPIFY_REQUESTED = featureFlag;
