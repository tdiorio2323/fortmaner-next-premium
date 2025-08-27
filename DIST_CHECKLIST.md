# Distribution Checklist (RC1)

Commands run and outputs:

- Lint: `npm run lint`
  - Result: warnings only, no errors
- Typecheck: `npm run typecheck`
  - Result: OK
- Build: `npm run build`
  - Result: OK, assets emitted to `dist/`

Artifacts:
- `dist/index.html`
- `dist/assets/*`

Docs updated:
- `README.md`, `ROUTE_MAP.md`, `ENV_VARS.md`, `CHANGELOG.md`, `FINISH_PLAN.md`

Next steps:
- Copy `.env.example` to `.env` and set keys
- Run `npm run preview` and smoke test routes
- Create PR: "Finish: RC1" and merge

