# Install Project Atlas

Project Atlas is a portable instruction-only skill. Choose the integration that matches your agent harness.

| Harness | Recommended integration | Guide |
|---|---|---|
| Codex app, CLI, or IDE extension | Native repository skill in `.agents/skills` | [Codex](codex/README.md) |
| Claude Code | Project `CLAUDE.md` imports | [Claude Code](claude-code/README.md) |
| Cursor | Version-controlled Project Rule | [Cursor](cursor/README.md) |
| Gemini CLI | Project `GEMINI.md` imports | [Gemini CLI](gemini-cli/README.md) |
| Other agents | Explicit file-path invocation | [Generic](generic/README.md) |

## Files to preserve

Copy the complete folder rather than only the main prompt:

```text
skills/project-atlas/
├── SKILL.md
├── STATE_TEMPLATE.md
└── README.md
```

`SKILL.md` defines the protocol. `STATE_TEMPLATE.md` defines the visible handoff and audit state.

## Common activation prompt

```text
Use Project Atlas for this task.
Maintain ATLAS_STATE.md using the supplied state template.
After each bounded maneuver, record Delivery, Evidence, Alignment,
the official movement class, evidence freshness, route metrics,
landing blockers, and exactly one next maneuver.
Do not declare completion until every landing gate passes.
```

## Smoke test

Use [the shared smoke-test task](smoke-test.md). A valid installation must create `ATLAS_STATE.md`, identify `Evidence` as the initial bearing, refuse optional cross-track work, refresh the missing checks, and stop after verified landing.

## Scope

These are repository-local installation patterns. They do not publish Atlas to a marketplace and do not modify the portable core skill.

Last reviewed: 2026-07-26.
