# Current Feature

<!-- Feature Name -->

Database Seed Script

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Create seed script (`prisma/seed.ts`) to populate the database with sample data
- Create demo user (demo@devstash.io, password: 12345678, hashed with bcryptjs 12 rounds)
- Seed 7 system item types (snippet, prompt, command, note, file, image, link) with Lucide icons and colors
- Seed 5 collections with mixed item types:
  - **React Patterns** — 3 TypeScript snippets (hooks, component patterns, utilities)
  - **AI Workflows** — 3 prompts (code review, docs generation, refactoring)
  - **DevOps** — 1 snippet, 1 command, 2 links (real URLs)
  - **Terminal Commands** — 4 commands (git, docker, process mgmt, package managers)
  - **Design Resources** — 4 links (real URLs for CSS/Tailwind, component libs, design systems, icons)
- Refer to @context/features/seed-spec.md for full spec

## Notes

<!-- Any extra notes -->

- Use bcryptjs with 12 rounds for password hashing
- Icons are Lucide React component names
- All system item types have `isSystem: true`
- Links should use real, working URLs
- Demo user: `isPro: false`, `emailVerified: current date`

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Completed Dashboard UI Phase 1
- Completed Dashboard UI Phase 2
- Completed Dashboard UI Phase 3
- Completed Prisma + Neon PostgreSQL Setup
- Started Database Seed Script
