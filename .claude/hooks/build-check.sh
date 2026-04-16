#!/usr/bin/env bash
# Stop hook: run `npm run build` after Claude finishes.
# If the build fails, block Claude and feed the error output back so it fixes things.
#
# Safeguards:
#   - stop_hook_active → exit 0 to prevent infinite fix/build loops
#   - git diff --quiet HEAD → no changes, skip the build

set -u

payload=$(cat)

# Prevent infinite loop when a previous Stop hook already blocked this turn.
if [ "$(echo "$payload" | jq -r '.stop_hook_active // false')" = "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$PWD}" || exit 0

# Skip build unless at least one TypeScript file has changed vs HEAD.
# Covers both unstaged (diff) and staged (diff --cached) changes.
changed=$( { git diff --name-only HEAD 2>/dev/null; git diff --cached --name-only 2>/dev/null; } | grep -E '\.(ts|tsx)$' )
if [ -z "$changed" ]; then
  exit 0
fi

output=$(npm run build 2>&1)
status=$?

if [ $status -eq 0 ]; then
  exit 0
fi

jq -n --arg r "npm run build failed — fix the errors below and re-run the verification:

$output" '{decision: "block", reason: $r}'
