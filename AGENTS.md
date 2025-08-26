# Repository Guidelines

## Project Structure & Modules
- `src/pages/`: Route components (React Router v6).
- `src/components/` and `src/components/ui/`: Reusable UI and shadcn/ui primitives.
- `src/data/`: JSON catalogs (products, collections, community, etc.).
- `src/lib/`: Types and utilities (e.g., `cn` in `utils.ts`).
- `src/integrations/supabase/`: Typed Supabase client and DB types.
- `src/context/`, `src/hooks/`: Shared state and custom hooks.
- `public/`: Static assets; `src/assets/`: imported image modules.
- `supabase/`: `config.toml` and SQL migrations for schema and RLS.

## Build, Test, and Development Commands
```bash
npm run dev       # Start Vite dev server (http://localhost:8080)
npm run build     # Production build
npm run build:dev # Development-mode build
npm run preview   # Preview the production build locally
npm run lint      # ESLint (TypeScript + React rules)
```

## Coding Style & Naming Conventions
- Language: TypeScript, React function components.
- Indentation: 2 spaces; strings use single quotes; keep semicolons.
- Components: PascalCase files (e.g., `Header.tsx`); default exports acceptable.
- Hooks: `useThing.ts[x]` in `src/hooks/`.
- Utilities/types: camelCase functions; colocate in `src/lib/`.
- Imports: use `@` alias to `src` (e.g., `import { Button } from '@/components/ui/button'`).
- Styling: Tailwind CSS; prefer utility classes and `cn()` for conditional classes.

## Testing Guidelines
- No test framework is configured yet. If adding tests, prefer Vitest + Testing Library.
- Name tests `*.test.ts[x]` colocated with components; keep new-code coverage ≥80%.
- Add `"test": "vitest"` in `package.json` and run via `npm run test`.

## Commit & Pull Request Guidelines
- Commits: short, imperative subject (e.g., "Add hero slider", "Fix: secure payment info").
- Prefer focused commits; reference scope when helpful (e.g., `header:`).
- PRs: include a summary, linked issue(s), screenshots/GIFs for UI changes, and notes on performance or accessibility.
- CI hygiene: ensure `npm run lint`, `npm run build`, and `npm run preview` succeed locally.
- Database: include `supabase/migrations/*.sql` for schema changes and describe RLS impacts.

## Security & Configuration
- Env: copy `.env` from `.env.example` (if present) or define Vite vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.
- Never commit secret keys; only publishable client keys belong in the repo.
- Review Supabase RLS policies in `supabase/migrations/` when touching orders or user data.
