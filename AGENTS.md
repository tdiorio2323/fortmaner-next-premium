# Repository Guidelines

## Project Structure & Module Organization
Keep route-level React components in `src/pages/` and shared UI in `src/components/` or `src/components/ui/` (shadcn primitives). Place reusable hooks and context under `src/hooks/` and `src/context/`, and isolate typed utilities in `src/lib/`. Store JSON catalogs in `src/data/`, Supabase clients and types in `src/integrations/supabase/`, and imported assets in `src/assets/` while static files live in `public/`. Supabase configuration and RLS migrations reside in `supabase/`.

## Build, Test, and Development Commands
Use `npm run dev` to launch the Vite dev server at http://localhost:8080. Build production bundles with `npm run build` or development-tuned artifacts via `npm run build:dev`. Preview the production output using `npm run preview`. Run linting with `npm run lint`, and execute the Vitest suite through `npm run test`.

## Coding Style & Naming Conventions
Code in TypeScript with React function components, using 2-space indentation, single quotes, and semicolons. Name components with PascalCase (`HeroBanner.tsx`), hooks with the `useThing.ts` pattern, and utilities in camelCase (`formatPrice.ts`). Reference modules with the `@` alias (e.g., `@/components/ui/button`). Style with Tailwind CSS utility classes, combining conditionals via the shared `cn()` helper when necessary.

## Testing Guidelines
Write Vitest + Testing Library specs colocated as `*.test.tsx` or `*.test.ts`. Maintain ≥80% coverage on new code paths. Mock Supabase or network boundaries, and run `npm run test` before sending changes for review.

## Commit & Pull Request Guidelines
Compose short, imperative commits (e.g., `header: add sticky nav`). For pull requests, include a concise summary, reference related issues, attach screenshots or GIFs for UI adjustments, and note any performance or accessibility impacts. Ensure `npm run lint`, `npm run build`, and `npm run preview` succeed locally prior to requesting review.

## Security & Configuration Tips
Populate `.env` with `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and `VITE_SUPABASE_PROJECT_ID` before local development. Never commit private keys. Review Supabase migrations in `supabase/migrations/` when altering user or order logic to confirm RLS remains correct.
