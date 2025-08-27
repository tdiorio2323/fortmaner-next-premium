# Route Map

All routes are defined in `src/App.tsx` using React Router v6.

- `/` → `src/pages/Index.tsx`
- `/shop/fw` → `src/pages/ShopFW.tsx`
- `/shop/ss` → `src/pages/ShopSS.tsx`
- `/shop/capsules` → `src/pages/Capsules.tsx`
- `/shop/capsules/:capsule` → `src/pages/CapsuleDetail.tsx`
- `/kids` → `src/pages/Kids.tsx`
- `/men` → `src/pages/Men.tsx`
- `/ladies` → `src/pages/Ladies.tsx`
- `/hats` → `src/pages/Hats.tsx`
- `/lookbook` → `src/pages/Lookbook.tsx`
- `/community` → `src/pages/Community.tsx`
- `/accessories` → `src/pages/Accessories.tsx`
- `/about` → `src/pages/About.tsx`
- `/about-us` → `src/pages/AboutUs.tsx`
- `/blog` → `src/pages/Blog.tsx`
- `/product/:slug` → `src/pages/ProductDetail.tsx`
- `/cart` → `src/pages/Cart.tsx`
- `/checkout` → `src/pages/Checkout.tsx`
- `/checkout/success` → `src/pages/CheckoutSuccess.tsx`
- `/account` → `src/pages/Account.tsx`
- `*` (catch-all) → `src/pages/NotFound.tsx`

Notes
- API-like files under `src/pages/api/*` are placeholders for edge functions; not routed by Vite.
- Add new routes in `src/App.tsx` above the `*` catch-all comment.

