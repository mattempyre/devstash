# Current Feature

<!-- Feature Name -->

Dashboard UI Phase 3

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- The main area to the right
- Recent collections
- Pinned Items
- 10 Recent items
- 4 stats cards at the top for number of items, collections, favorite items and favorite collections

## Notes

<!-- Any extra notes -->

- Refer to @context/features/dashboard-phase-3-spec.md for full spec
- Screenshots: @context/screenshots/dashboard-ui-main.png
- Mock data: @src/lib/mock-data.ts

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Completed Dashboard UI Phase 1
- Started Dashboard UI Phase 2
- Implemented collapsible sidebar using shadcn sidebar component (icon rail mode)
- Added item types with colored icons and links to /items/TYPE
- Added favorite collections and all collections sections
- Added user avatar area in sidebar footer
- Added "Navigation" heading with collapse toggle in sidebar header
- Moved logo/branding to TopBar (always visible)
- Sidebar collapses to icon-only rail on desktop, collections hidden when collapsed
- Added mobile drawer with hamburger trigger in TopBar
- Keyboard shortcut Cmd+B to toggle sidebar
- Tooltips on hover when sidebar is collapsed
- Switched font from Geist to Roboto
- Increased overall UI sizing (icons, text, row heights)
- Added scrollbar-none utility, hidden scrollbar in sidebar
- Fixed Roboto font not applying on mobile (theme variable resolved at build time)
- Completed Dashboard UI Phase 2
- Started Dashboard UI Phase 3
