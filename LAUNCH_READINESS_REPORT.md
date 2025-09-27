# Launch Readiness Report

## Overview
- Catalog now routes through a unified adapter that falls back to local JSON when Shopify credentials are absent.
- Collections (*Men, Women, Kids, Accessories, FW, SS, Shop All*) render via a shared `CollectionRoute` with hero, breadcrumbs, skeletons, and empty states.
- PDP consumes the adapter, formats prices, guards variant selection, and exposes keyboard-accessible galleries.
- Navigation/footer links were audited; broken `/policies/*` targets were redirected to existing legal pages, and `/demo` showcases key routes.

## Testing & Automation
- `npm run typecheck`
- `npm run lint` (existing react-refresh warnings remain)
- `npm run test`
- `npm run build`
- `npm run check:links` → 17 internal routes from `/demo` verified

## Data & Mocking Notes
- Local fixtures live in `src/data/products.json` + `products-complete.json`; collections defined in `src/data/collections.json`.
- `src/lib/catalog.ts` orchestrates adapter fallback and exposes `fetch*` helpers used across pages.
- Shopify remains gated behind `VITE_FEATURE_SHOPIFY`; missing credentials default the app to mock data without errors.

## Remaining Risks
- Static content pages (`/shipping`, `/returns`, `/privacy`, `/community`, `/about-us`) still carry placeholder copy that should be refined.
- Capsules listing/detail pages rely on legacy static data; align them with the adapter before expanding.
- ESLint still emits `react-refresh/only-export-components` warnings from generated UI primitives.

