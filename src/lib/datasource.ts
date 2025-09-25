import { FEATURE_SHOPIFY } from './config';
import type { IDataSource } from '@/adapters/IDataSource';
import { LocalJsonDataSource } from '@/adapters/LocalJsonDataSource';
import { ShopifyDataSource } from '@/adapters/ShopifyDataSource';

let singleton: IDataSource | null = null;

export function getDataSource(): IDataSource {
  if (singleton) return singleton;
  singleton = FEATURE_SHOPIFY ? new ShopifyDataSource() : new LocalJsonDataSource();
  return singleton;
}