# Current Feature

<!-- Feature Name -->

Prisma + Neon PostgreSQL Setup

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Set up Prisma ORM with Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Use Prisma 7 (read upgrade guide for breaking changes)
- Always use migrations (`prisma migrate dev`), never push directly unless specified
- Configure development and production database branches

## Notes

<!-- Any extra notes -->

- Refer to @context/features/database-spec.md for full spec
- Initial data models: @context/project-overview.md
- IMPORTANT: Use Prisma 7 which has breaking changes from v6

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Completed Dashboard UI Phase 1
- Completed Dashboard UI Phase 2
- Completed Dashboard UI Phase 3
- Started Prisma + Neon PostgreSQL Setup
