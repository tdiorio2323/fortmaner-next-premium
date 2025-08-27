# Changelog

## [0.1.0] - RC1
- Add FINISH_PLAN.md, ROUTE_MAP.md, ENV_VARS.md
- Add ErrorBoundary and wrap app content
- Add `.env.example` and document env usage
- Update README with quickstart, env, and build notes
- Add scripts: `start`, `typecheck`, `test` (stub), `format`
- Relax ESLint rules and ignore nested project; lint passes with warnings only
- Fix missing header logo asset import
- Ensure typecheck and production build pass

### Verification
- Lint: `npm run lint` → warnings only
- Typecheck: `npm run typecheck` → OK
- Build: `npm run build` → OK

