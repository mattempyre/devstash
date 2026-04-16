# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- **Dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build`
- **Production server**: `npm run start`
- **Lint**: `npm run lint`

## Database

- **ORM**: Prisma 7 with Neon PostgreSQL (serverless)
- **Schema**: `prisma/schema.prisma`
- **Config**: `prisma.config.ts` (Prisma 7 — URLs live here, not in schema)
- **Client**: `src/lib/prisma.ts` (singleton with Neon adapter)
- **Generated client**: `src/generated/prisma/` (gitignored, run `npx prisma generate` after cloning)

### Environment Variables

| Variable | Purpose | When to use |
|---|---|---|
| `DATABASE_URL` | Direct (unpooled) connection | Prisma CLI: migrations, generate, studio |
| `DATABASE_POOL_URL` | Pooled connection via PgBouncer | App queries at runtime (used by `src/lib/prisma.ts`) |
| `PRODUCTION_DATABASE_URL` | Production direct connection | Deploying migrations to prod |
| `PRODUCTION_DATABASE_POOL_URL` | Production pooled connection | Production app runtime |

### Common Commands

- **Generate client**: `npx prisma generate`
- **Create migration**: `npx prisma migrate dev --name <name>`
- **Deploy to production**: `DATABASE_URL="$PRODUCTION_DATABASE_URL" npx prisma migrate deploy`
- **Open Studio**: `npx prisma studio`
- **Check migration status**: `npx prisma migrate status`

### Rules

- **NEVER use `db push`** — always create migrations with `prisma migrate dev` so changes can be replicated in production and both databases stay in sync
- Run `prisma migrate status` before committing to verify migrations are in sync
- Production deployments must use `prisma migrate deploy`
- Use the direct (unpooled) URL for all Prisma CLI commands — pooler doesn't support DDL/advisory locks

## Testing

### Stack

- **Unit / Component**: Vitest 4 + React Testing Library (jsdom)
- **E2E**: Playwright (Chromium)
- **Config**: `vitest.config.ts` (unit + integration projects), `playwright.config.ts`
- **Setup**: `src/test/setup.ts` (jest-dom matchers, matchMedia mock, cleanup, next/link mock)

### Commands

- **Run all unit tests**: `npm test`
- **Watch mode**: `npm run test:watch`
- **Coverage**: `npm run test:coverage`
- **E2E tests**: `npm run test:e2e`
- **E2E with UI**: `npm run test:e2e:ui`

### Coverage Thresholds (MANDATORY)

Every feature must maintain these minimums:

| Metric | Minimum |
|---|---|
| Statements | 95% |
| Functions | 95% |
| Lines | 95% |
| Branches | 85% |

Run `npm run test:coverage` before committing and verify thresholds are met. If a new feature drops coverage below these thresholds, add tests before merging.

### Rules for Writing Tests

1. **Every feature gets tests** — unit tests for logic/components, E2E tests for user flows
2. **Test files colocated** next to source: `Component.test.tsx` beside `Component.tsx`
3. **Use the custom render helper** (`src/test/helpers/render.tsx`) for components that need `SidebarProvider` context (sidebar, topbar, any component using `useSidebar`)
4. **Use plain `render` from `@testing-library/react`** for standalone components that don't need sidebar context
5. **No mocking shadcn/ui components** — they're tested upstream; only test custom behavior built on top of them
6. **Integration tests** use the `integration` vitest project (`*.integration.test.ts`) with node environment, 15s timeout for Neon cold starts
7. **E2E tests** go in `e2e/` directory; use specific locators (`getByRole`, `getByTestId`, scoped with `page.getByRole("main")`) to avoid strict mode violations from duplicate text
8. **Mock `next/link`** is handled globally in setup — no per-test mocking needed
9. **Mock `next/font/google`** with `vi.mock` when testing root layout or components that use fonts
10. **Mock `prisma`** with `vi.mock` for unit tests; use real DB via `src/test/helpers/db.ts` for integration tests

### Test Helpers

| File | Purpose |
|---|---|
| `src/test/helpers/render.tsx` | Custom render wrapping `SidebarProvider` |
| `src/test/helpers/db.ts` | Test Prisma client + `cleanDatabase()` for integration tests |
| `src/test/helpers/factories.ts` | `createTestUser()`, `createTestItem()`, `createTestItemType()`, etc. |

### What to Test per Feature Type

- **New component**: Render test, verify key content, test interactive behavior (clicks, state changes)
- **Server action**: Unit test Zod validation, integration test Prisma operations with real DB
- **API route**: Test request/response cycle, error handling, auth checks
- **Utility function**: Pure unit tests with edge cases
- **Page/Layout**: Render test verifying composition of child components

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__Claude_in_Chrome__*` tools.

### Available Skills

- `/office-hours` - Office hours
- `/plan-ceo-review` - Plan CEO review
- `/plan-eng-review` - Plan engineering review
- `/plan-design-review` - Plan design review
- `/design-consultation` - Design consultation
- `/design-shotgun` - Design shotgun
- `/design-html` - Design HTML
- `/review` - Code review
- `/ship` - Ship code
- `/land-and-deploy` - Land and deploy
- `/canary` - Canary deployment
- `/benchmark` - Benchmark
- `/browse` - Web browsing
- `/connect-chrome` - Connect Chrome
- `/qa` - QA testing
- `/qa-only` - QA only
- `/design-review` - Design review
- `/setup-browser-cookies` - Setup browser cookies
- `/setup-deploy` - Setup deploy
- `/retro` - Retrospective
- `/investigate` - Investigate
- `/document-release` - Document release
- `/codex` - Codex
- `/cso` - CSO
- `/autoplan` - Auto plan
- `/plan-devex-review` - Plan DevEx review
- `/devex-review` - DevEx review
- `/careful` - Careful mode
- `/freeze` - Freeze
- `/guard` - Guard
- `/unfreeze` - Unfreeze
- `/gstack-upgrade` - Upgrade gstack
- `/learn` - Learn

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
