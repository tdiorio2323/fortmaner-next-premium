# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Route components (React Router v6).
- `src/components/` and `src/components/ui/`: Reusable UI and shadcn/ui primitives.
- `src/data/`: JSON catalogs (products, collections, community).
- `src/lib/`: Types and utilities (e.g., `cn` in `utils.ts`).
- `src/integrations/supabase/`: Typed Supabase client and DB types.
- `src/context/`, `src/hooks/`: Shared state and custom hooks.
- `public/` (static assets) and `src/assets/` (imported images).
- `supabase/`: `config.toml` and SQL migrations (schema + RLS).

## Build, Test, and Development Commands
- `npm run dev`: Start Vite dev server at http://localhost:8080.
- `npm run build`: Production build.
- `npm run build:dev`: Development-mode build.
- `npm run preview`: Serve the production build locally.
- `npm run lint`: ESLint (TypeScript + React).
- `npm run test`: Runs Vitest if configured.

## Coding Style & Naming Conventions
- TypeScript + React function components; 2-space indent, single quotes, semicolons.
- Components: PascalCase files; default exports allowed.
- Hooks: `useThing.ts[x]` in `src/hooks/`. Utilities/types: camelCase in `src/lib/`.
- Imports: use `@` alias to `src` (e.g., `import { Button } from '@/components/ui/button'`).
- Styling: Tailwind CSS; prefer utilities; use `cn()` for conditional classes.

## Testing Guidelines
- Prefer Vitest + Testing Library; colocate tests as `*.test.ts[x]`.
- Keep new-code coverage ≥ 80%.
- Add `"test": "vitest"` to `package.json` and run `npm run test`.
- Mock external calls; avoid networked tests (e.g., Supabase).

## Commit & Pull Request Guidelines
- Commits: short, imperative; scope prefix optional (e.g., `header:`).
  Examples: "Add hero slider", "Fix: secure payment info".
- PRs: include summary, linked issues, screenshots/GIFs for UI changes, and notes on performance or accessibility.
- Ensure `npm run lint`, `npm run build`, and `npm run preview` succeed before opening.

## Security & Configuration
- Env: set `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` (from `.env.example` if present).
- Never commit secrets; only publishable client keys.
- Review Supabase RLS in `supabase/migrations/` when touching orders or user data.

