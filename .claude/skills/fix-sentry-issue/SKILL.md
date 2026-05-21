---
name: fix-sentry-issue
description: Investigates the most actionable open Sentry issue for force-production, locates the root cause in source code, and opens a fix PR. Use when asked to look at Sentry, fix a Sentry issue, or investigate production errors.
---

# Fix a Sentry issue

## Prerequisites

You need the Sentry MCP server connected to Claude Code. Run this once:

```sh
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

Then authenticate when prompted.

---

Sentry org: `artsynet` — project: `force-production`

## Check Sentry MCP is available

Before doing anything else, verify the Sentry MCP tools are accessible by attempting to call `mcp__sentry__whoami`. If the call fails or the tool is not available, stop immediately and tell the user:

> The Sentry MCP server is not connected. Use `/mcp` to reconnect it, or run `claude mcp add --transport http sentry https://mcp.sentry.dev/mcp` if it hasn't been added yet. Then start a new session and try again.

Do not attempt to work around this using the REST API, environment variables, or subagents.

---

Use this checklist to track progress:

- [ ] Verify Sentry MCP is available
- [ ] Find the most actionable issue
- [ ] Confirm with user
- [ ] Investigate root cause
- [ ] Locate source code
- [ ] Implement fix
- [ ] Verify quality
- [ ] Open PR

---

## Find the most actionable issue

Query `mcp__sentry__search_issues` with:

- `organizationSlug: artsynet`
- `projectSlugOrId: force-production`
- `query: is:unresolved`
- `sort: freq`

Pick the issue that best matches all of these criteria. The best candidate will match most of them:

- **High event volume** relative to user count — many events per user suggests repeated crashing, not a one-off
- **First-party stack frames** — the stack trace includes files under `src/` (TypeScript filenames, not minified bundle references); issues where every frame is inside `react-dom` or `node_modules` are usually not fixable here
- **Not a browser/environment quirk** — skip issues where the top user agents are legacy browsers, bots, or where the culprit is a third-party script
- **Not a stale-build hydration error** — `removeChild` / hydration crashes on routes other than a known-bad one are often caused by users running old cached JS with no source maps; these don't have a code fix
- **Not already assigned or in progress**

If a specific issue ID was provided by the user, skip this step and use that instead.

---

## Confirm with user

Present the chosen issue (title, event count, Sentry URL) and use `AskUserQuestion` to ask whether to proceed with it or pick the next candidate. This prevents the skill from duplicating work when a fix is already in flight but not yet merged.

---

## Investigate root cause

1. Use `mcp__sentry__get_sentry_resource` on the issue URL to get full details including the stack trace
2. Find a representative recent event using `mcp__sentry__search_events` or `mcp__sentry__search_issue_events` — prefer events where the stack trace resolves to TypeScript filenames (source maps present)
3. Read the stack trace carefully:
   - Identify the **first frame that is in first-party code** (`src/`) — that is the bug site, not the deepest React internals frame
   - Note the component name, file path, and line number
4. Check whether multiple events share the same root frame, or whether the issue groups unrelated bugs under one fingerprint

Common patterns seen in this codebase:

- **State mutation during render**: calling `dispatch` / `setState` inside a render prop callback (e.g., `SystemQueryRenderer`'s `render` prop runs during React's render phase — any state update there causes hydration crashes)
- **React Rules of Hooks violations**: calling hooks conditionally or after an early `return`
- **Unsafe property access**: calling `.toString()` or similar on a value that can be `undefined` at runtime

---

## Locate source code

Use the file path and line number from the stack trace to read the relevant source files. Understand:

- What the component is doing
- Why the crash occurs
- What the correct behavior should be

---

## Implement fix

- Create a feature branch: `git checkout -b <your-name>/fix/<short-description>`
- Make the minimal fix — do not refactor surrounding code
- Do not push directly to `main`

---

## Verify quality

Run all three checks and fix any issues before committing:

```sh
yarn type-check
yarn jest $(git ls-files --modified --others --exclude-standard)
yarn lint $(git ls-files --modified --others --exclude-standard)
```

---

## Open PR

Open a PR with:

- A short title following Conventional Commits style (`fix: ...`)
- A **What** section explaining the bug
- A **Fix** section explaining the change
- A **Related** section linking to the Sentry issue (e.g., `https://artsynet.sentry.io/issues/FORCE-PRODUCTION-XXXX`) and noting whether this fully fixes or only reduces the issue

> **IMPORTANT — do not auto-resolve the Sentry issue prematurely.**
> Never use `Fixes FORCE-PRODUCTION-XXXX` or `Closes FORCE-PRODUCTION-XXXX` in a commit message. Sentry's GitHub integration treats these as trigger keywords and will resolve the issue immediately when the branch is pushed — before the fix is deployed. Reference the Sentry issue only as a URL in the PR body, never as a keyword in a commit message.

## Celebrate

Indicate you are done with a /beep
