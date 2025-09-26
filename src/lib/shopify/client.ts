const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined;

if (import.meta.env.VITE_FEATURE_SHOPIFY === 'true') {
  if (!DOMAIN || !TOKEN) {
    // Fail fast in dev when feature flag is on but creds missing
    console.warn('VITE_FEATURE_SHOPIFY=true, but domain or token is missing');
  }
}

export async function sfetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  if (!DOMAIN || !TOKEN) throw new Error('Shopify Storefront credentials missing');
  const res = await fetch(`https://${DOMAIN}/api/2024-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}