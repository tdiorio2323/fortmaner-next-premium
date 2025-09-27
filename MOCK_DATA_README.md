# Mock Data & Catalog Adapter

## Overview
The storefront reads catalog data through `src/lib/catalog.ts`, which wraps the `LocalJsonDataSource` by default. When `VITE_FEATURE_SHOPIFY` is set to `true` **and** Shopify credentials are present, the adapter swaps to the `ShopifyDataSource`. Missing credentials automatically fall back to mocks, so launch demos do not require any `.env` secrets.

## Local Fixtures
- Products: `src/data/products.json` (footwear/apparel/accessories) and `src/data/products-complete.json` (extended PDP metadata). Handles/slugs must be unique.
- Collections: `src/data/collections.json` describes display metadata and product handles for each curated view (men, women, kids, accessories, capsules, seasonal, shop-all).

`LocalJsonDataSource` merges both product files, normalises variants/options, and injects each product into the collections that reference its handle. Collection pages and Search consume the adapter via hooks in `src/hooks/useCatalog.ts`.

## Adding Products
1. Append a record to `products.json` or `products-complete.json` with a unique `handle` and at least one image URL.
2. Reference the handle inside the relevant `productHandles` array in `src/data/collections.json`.
3. (Optional) Add badges/tags so search and PDP badges stay current.
4. Run `npm run typecheck && npm run test` to ensure the catalog normaliser accepts the new data.

## Enabling Shopify Later
Provide the following environment variables (see `.env.example`):
- `VITE_FEATURE_SHOPIFY=true`
- `VITE_SHOPIFY_STORE_DOMAIN`
- `VITE_SHOPIFY_STOREFRONT_TOKEN`

`ShopifyDataSource` currently maps product basics (title, images, variants). Extend it with collection queries before relying on remote merchandising.

