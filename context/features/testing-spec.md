# Testing Strategy for DevStash

## Context

DevStash has zero testing infrastructure — no test framework, no test files, no CI. The app is early-stage (dashboard UI with mock data, Prisma 7 + Neon schema in place, no server actions yet). This plan sets up comprehensive, modern testing that scales as features are built.

## Recommended Stack

| Layer | Tool | Why |
|---|---|---|
| Unit / Integration | **Vitest** | Native ESM (Prisma 7 generated client uses `import.meta`), Vite transforms handle TS/JSX/path aliases without babel config, fast worker threads |
| Component | **React Testing Library** | Standard, works with Vitest, tests behavior not implementation |
| E2E | **Playwright** | Tests actual SSR output (server components), built-in visual regression screenshots, multi-browser, async/await syntax |
| Visual Regression | **Playwright screenshots** | `toHaveScreenshot()` built-in — no Storybook/Chromatic overhead for ~8 components |
| CI | **GitHub Actions** | Standard for this stack |

## Phase 1: Infrastructure Setup (implement now)

### 1. Install dependencies

```
devDependencies:
  vitest, @vitejs/plugin-react, vite-tsconfig-paths, jsdom
  @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
  @playwright/test
```

### 2. Create config files

**`vitest.workspace.ts`** — two projects:
- `unit`: jsdom environment, `src/**/*.test.{ts,tsx}`, excludes `*.integration.test.ts`
- `integration`: node environment, `src/**/*.integration.test.ts`, pool `forks`, 15s timeout (Neon cold starts)

**`playwright.config.ts`** — webServer starts `npm run dev`, baseURL `http://localhost:3000`, Chromium only initially

### 3. Create test helpers

| File | Purpose |
|---|---|
| `src/test/setup.ts` | Import `@testing-library/jest-dom` matchers |
| `src/test/helpers/render.tsx` | Custom render wrapping `SidebarProvider` (from `dashboard/layout.tsx`) |
| `src/test/helpers/db.ts` | Test Prisma client with Neon adapter + `cleanDatabase()` function |
| `src/test/helpers/factories.ts` | `createTestUser()`, `createTestItem()`, `createTestItemType()`, etc. |

The custom render must wrap with `SidebarProvider` — confirmed from `src/app/dashboard/layout.tsx:1`.

The `cleanDatabase()` function deletes in dependency order: ItemTag → ItemCollection → Item → Tag → Collection → ItemType → Session → Account → VerificationToken → User.

### 4. Add npm scripts

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

### 5. Write initial tests

**Unit tests (colocated next to source):**
- `src/lib/utils.test.ts` — `cn()` merges classes, resolves Tailwind conflicts
- `src/lib/icon-map.test.ts` — all system type icons mapped
- `src/components/dashboard/StatsCards.test.tsx` — renders 4 cards, computes total (85 from mock `itemTypeCounts`)

**E2E tests:**
- `e2e/dashboard.spec.ts` — loads `/dashboard`, verifies stat cards, sidebar item types, pinned items, responsive sidebar collapse

### 6. Update .gitignore

```
/playwright-report/
/test-results/
```

## Phase 2: Database Integration Tests (when server actions are built)

- Create a Neon `test` branch from `dev`
- Add `TEST_DATABASE_URL` / `TEST_DATABASE_POOL_URL` to `.env`
- Write integration tests for CRUD operations, cascade deletes, unique constraints
- Test server actions: Zod validation (unit), Prisma operations (integration)
- Pattern: `beforeEach → cleanDatabase()`, factory functions for test data

## Phase 3: Auth Tests (when NextAuth is added)

- Playwright auth fixtures for login/signup flows
- Protected route redirect tests
- Session persistence tests

## Phase 4: AI / Stripe Tests (when those features land)

- Mock OpenAI responses with `vi.fn()` (add `msw` when needed)
- Stripe webhook handler tests with mock events
- Free-tier limit enforcement tests

## Phase 5: CI/CD

**`.github/workflows/ci.yml`** — runs on PR + push to main:
1. `lint-typecheck` job: lint + `tsc --noEmit`
2. `unit-tests` job: `vitest run --project unit` + coverage
3. `integration-tests` job: `vitest run --project integration` (needs `TEST_DATABASE_URL` secret)
4. `e2e-tests` job: Playwright (depends on unit + integration passing)
5. `build` job: `npm run build`

## Files to Create/Modify

| File | Action |
|---|---|
| `vitest.workspace.ts` | Create — unit + integration project config |
| `playwright.config.ts` | Create — E2E config |
| `src/test/setup.ts` | Create — jest-dom matchers |
| `src/test/helpers/render.tsx` | Create — custom render with providers |
| `src/test/helpers/db.ts` | Create — test Prisma client + cleanup |
| `src/test/helpers/factories.ts` | Create — data factories |
| `src/lib/utils.test.ts` | Create — cn() tests |
| `src/lib/icon-map.test.ts` | Create — icon mapping tests |
| `src/components/dashboard/StatsCards.test.tsx` | Create — stat cards tests |
| `e2e/dashboard.spec.ts` | Create — dashboard E2E |
| `package.json` | Modify — add devDependencies + test scripts |
| `.gitignore` | Modify — add playwright artifacts |

## Key Decisions

- **Test files colocated** next to source (`StatsCards.test.tsx` beside `StatsCards.tsx`) — matches flat file organization
- **Neon branch for test DB** (not Docker) — tests the same Neon driver adapter code path as production
- **No Storybook** — Playwright screenshots handle visual regression; revisit at 30+ components
- **No msw yet** — `vi.fn()` is sufficient until OpenAI/Stripe integrations exist
- **No mocking shadcn/ui components** — they're tested upstream, only test custom behavior

## Verification

1. `npm test` — all unit tests pass
2. `npm run test:e2e` — Playwright loads dashboard, verifies elements
3. `npm run build` — build still passes
4. All new config files resolve `@/*` path alias correctly
