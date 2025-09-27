import { FEATURE_SHOPIFY, FEATURE_SHOPIFY_REQUESTED, HAS_SHOPIFY_CREDENTIALS } from './config';
import type { IDataSource } from '@/adapters/IDataSource';
import { LocalJsonDataSource } from '@/adapters/LocalJsonDataSource';
import { ShopifyDataSource } from '@/adapters/ShopifyDataSource';

let singleton: IDataSource | null = null;

export function getDataSource(): IDataSource {
  if (singleton) return singleton;

  if (FEATURE_SHOPIFY) {
    try {
      singleton = new ShopifyDataSource();
      return singleton;
    } catch (error) {
      console.warn('Failed to initialize Shopify data source, falling back to local fixtures.', error);
    }
  } else if (FEATURE_SHOPIFY_REQUESTED && !HAS_SHOPIFY_CREDENTIALS) {
    console.warn('Shopify feature flag enabled, but credentials are missing. Using local fixtures.');
  }

  singleton = new LocalJsonDataSource();
  return singleton;
}
