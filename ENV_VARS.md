# Environment Variables

Vite loads variables prefixed with `VITE_` from `.env` files. Copy `.env.example` to `.env` and set values as needed.

## Required for Supabase features
- `VITE_SUPABASE_URL`: Your Supabase project URL (e.g., https://xyz.supabase.co)
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Supabase anon/publishable key

If unset, Supabase-powered features are disabled; the app still builds and core pages work.

## Optional integrations
- `VITE_FACEBOOK_PIXEL_ID`: Meta Pixel ID for analytics (string)
- `VITE_SUPABASE_PROJECT_ID`: Project ID (informational; not required by code)

## Tips
- Never commit secrets. Only publishable/anon keys belong in client code.
- For local dev, restart `npm run dev` after changing env files.

