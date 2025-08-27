# Finish Plan: RC1

## Goals
- Clean build, typecheck, and lint pass.
- Core routes render with graceful error/loading states.
- Env sample and docs complete for local/deploy.
- Release docs and checklist ready; repo PR-ready.

## Tasks (Critical Path)
1) Audit repo and configs (done)
2) Author route and env docs (ROUTE_MAP.md, ENV_VARS.md)
3) DX scripts: add `test`, `typecheck`, `format` (eslint --fix)
4) App resiliency: add ErrorBoundary and wrap main content
5) Add `.env.example` with required keys
6) Update `README.md` (quickstart, env, build, deploy)
7) Verify: `npm run lint`, `npm run typecheck`, `npm run build`
8) Create `CHANGELOG.md` (RC1) and `DIST_CHECKLIST.md`
9) Commit changes and tag `rc1`

## Out of Scope / Notes
- No package installs due to offline constraints; tests are stubbed via `npm test`.
- Supabase/Stripe are gated by env; features no-op when unset.
- No schema changes; Supabase RLS left as-is.

## Verification
- Commands recorded in DIST_CHECKLIST.md outputs.
- Manual smoke: open preview, navigate core routes.

