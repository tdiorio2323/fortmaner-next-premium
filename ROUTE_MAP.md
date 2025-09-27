# Route Map

All routes are defined in `src/App.tsx` with React Router v6. Each entry notes the page component, its primary data source, and current status after the launch hardening pass.

| Path | Component | Primary Data Source | Status |
| --- | --- | --- | --- |
| `/` | `src/pages/Index.tsx` | Local sections using JSON fixtures | ✅ Ready (meta refresh pending) |
| `/shop/fw` | `src/pages/ShopFW.tsx` | Catalog adapter (`fw` collection) | ✅ Adapter-backed |
| `/shop/ss` | `src/pages/ShopSS.tsx` | Catalog adapter (`ss` collection) | ✅ Adapter-backed |
| `/shop/capsules` | `src/pages/Capsules.tsx` | Static capsule cards + adapter todo | ⚠️ Needs adapter integration |
| `/shop/capsules/:capsule` | `src/pages/CapsuleDetail.tsx` | Catalog adapter fallback | ⚠️ Align to capsule config |
| `/shop-all` | `src/pages/ShopAll.tsx` | Catalog adapter (`shop-all` collection) | ✅ Adapter-backed |
| `/kids` | `src/pages/Kids.tsx` | Catalog adapter (`kids` collection) | ✅ Adapter-backed |
| `/men` | `src/pages/Men.tsx` | Catalog adapter (`men` collection) | ✅ Adapter-backed |
| `/ladies` | `src/pages/Ladies.tsx` | Catalog adapter (`women` collection) | ✅ Adapter-backed |
| `/hats` | `src/pages/Hats.tsx` | Catalog adapter (`hats` collection) | ✅ Adapter-backed |
| `/accessories` | `src/pages/Accessories.tsx` | Catalog adapter (`accessories` collection) | ✅ Adapter-backed |
| `/lookbook` | `src/pages/Lookbook.tsx` | Static | ⚠️ Verify assets |
| `/community` | `src/pages/Community.tsx` | `@/data/community.json` | ⚠️ Refresh content |
| `/about` | `src/pages/About.tsx` | Static | ✅ Ready |
| `/about-us` | `src/pages/AboutUs.tsx` | Static | ⚠️ Consolidate with `/about` |
| `/blog` | `src/pages/Blog.tsx` | `@/data/blog.json` | ⚠️ Needs pagination |
| `/product/:slug` | `src/pages/ProductDetail.tsx` | Catalog adapter (`fetchProductByHandle`) | ✅ Adapter-backed |
| `/cart` | `src/pages/Cart.tsx` | CartContext | ⚠️ Sync with adapter cart |
| `/checkout` | `src/pages/Checkout.tsx` | Static mock | ⚠️ Flesh out copy |
| `/checkout/success` | `src/pages/CheckoutSuccess.tsx` | Static mock | ⚠️ Needs celebratory copy |
| `/account` | `src/pages/Account.tsx` | Static placeholder | ⚠️ Pending design |
| `/contact` | `src/pages/Contact.tsx` | Static form | ✅ Ready |
| `/size-guide` | `src/pages/SizeGuide.tsx` | Static | ✅ Ready |
| `/shipping` | `src/pages/Shipping.tsx` | Static | ⚠️ Fill in legal text |
| `/returns` | `src/pages/Returns.tsx` | Static | ⚠️ Fill in legal text |
| `/privacy` | `src/pages/Privacy.tsx` | Static | ⚠️ Fill in legal text |
| `/search` | `src/pages/Search.tsx` | Catalog adapter search | ✅ Adapter-backed |
| `/demo` | `src/pages/Demo.tsx` | Static hub + adapter previews | ✅ Ready |
| `/500` | `src/pages/ServerError.tsx` | Static error screen | ✅ Ready |
| `*` | `src/pages/NotFound.tsx` | Static | ✅ Ready |

### Observations
- Header navigation now highlights active routes and covers `/men`, `/ladies`, `/kids`, `/accessories`, `/shop-all`, and `/shop/capsules` using the shared catalog adapter.
- Footer quick links now point to existing policy pages (`/shipping`, `/returns`, `/privacy`, `/size-guide`, `/contact`).
- Collection pages, including Men/Women/Kids and seasonal assortments, render via `CollectionRoute` for shared hero, grid, breadcrumb, skeleton, and empty-state behavior.
- PDP consumes the catalog adapter, displays breadcrumbs, and surfaces skeletons while loading.

### Link Adjustments
- Footer: `/policies/shipping` → `/shipping` (existing static page).
- Footer: `/policies/returns` → `/returns`.
- Footer: `/policies/privacy` → `/privacy`.
- Footer category links updated from `/footwear`, `/clothing`, `/new`, `/best-sellers`, `/sale` to `/men`, `/ladies`, `/kids`, `/accessories`, `/shop-all`, `/shop/capsules`.
- Header navigation refreshed to include `/kids`, `/shop-all`, and `/shop/capsules` with proper active-state highlighting.

Update this document whenever routes move, mocks become live integrations, or navigation changes require additional logging.
