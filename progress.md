# Testing Infrastructure Setup — Progress

Based on: `context/features/testing-spec.md`

## Phase 1: Infrastructure Setup

### Config Files
- [x] `vitest.config.ts` — unit + integration project config (vitest 4 uses `test.projects` instead of deprecated `defineWorkspace`)
- [x] `playwright.config.ts` — E2E config (Chromium, webServer starts dev)

### Test Helpers
- [x] `src/test/setup.ts` — jest-dom matchers + matchMedia mock + cleanup + next/link mock
- [x] `src/test/helpers/render.tsx` — custom render with SidebarProvider wrapper
- [x] `src/test/helpers/db.ts` — test Prisma client + cleanDatabase() (for Phase 2)
- [x] `src/test/helpers/factories.ts` — createTestUser, createTestItem, createTestItemType, createTestCollection, createTestTag

### Unit Tests — Lib
- [x] `src/lib/utils.test.ts` — 8 tests: cn() merges classes, resolves Tailwind conflicts, handles edge cases
- [x] `src/lib/icon-map.test.ts` — 4 tests: all system type icons mapped, unknown keys, component validation

### Unit Tests — Dashboard Components
- [x] `src/components/dashboard/StatsCards.test.tsx` — 5 tests: renders 4 cards, verifies computed stats
- [x] `src/components/dashboard/CollectionsGrid.test.tsx` — 4 tests: renders 6 collections, item counts, descriptions, View all link
- [x] `src/components/dashboard/PinnedItems.test.tsx` — 5 tests: renders pinned items, descriptions, tags, dates
- [x] `src/components/dashboard/RecentItems.test.tsx` — 4 tests: renders 10 items, language badges, date sort order
- [x] `src/components/dashboard/Sidebar.test.tsx` — 5 tests: item types + counts, collections, user footer, links
- [x] `src/components/dashboard/TopBar.test.tsx` — 4 tests: branding, search input, keyboard hint, New Item button

### E2E Tests
- [x] `e2e/dashboard.spec.ts` — 5 tests: stat cards, sidebar item types, pinned items, sidebar collapse, recent items

### Project Config
- [x] `package.json` — added test, test:watch, test:coverage, test:e2e, test:e2e:ui scripts + @vitest/coverage-v8
- [x] `.gitignore` — added /playwright-report/ and /test-results/
- [x] `tsconfig.json` — excluded test files from Next.js build typecheck

### Verification
- [x] `npm test` — 39 unit tests pass (8 test files)
- [x] `npm run test:e2e` — 5 E2E tests pass
- [x] `npm run build` — build passes with no errors

### Coverage (custom code)
- Dashboard components: **100% lines**
- Lib (utils, icon-map): **100% lines**
- Overall (incl. shadcn/ui + server components): **70% lines**

## Implementation Notes

- **Vitest 4 migration**: `defineWorkspace` is deprecated; used `test.projects` in `vitest.config.ts` instead
- **Native tsconfig paths**: Vite now supports `resolve.tsconfigPaths: true` natively; removed `vite-tsconfig-paths` plugin from config
- **jsdom matchMedia**: Added `window.matchMedia` stub in setup since jsdom doesn't implement it (required by shadcn's `useIsMobile` hook)
- **Explicit cleanup**: React Testing Library requires explicit `cleanup()` in `afterEach` with Vitest 4
- **next/link mock**: Mocked as plain `<a>` tag in setup since Next.js router isn't available in jsdom
- **Test file exclusion**: Test files excluded from `tsconfig.json` to prevent Next.js build from type-checking test-only code

## Phase 2+ (Future)
- Database integration tests (when server actions are built)
- Auth tests (when NextAuth is added)
- AI/Stripe tests (when those features land)
- CI/CD pipeline (GitHub Actions)
