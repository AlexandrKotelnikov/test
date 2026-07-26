# Use Project Atlas with any file-aware agent

This is the fallback integration for agents that can read project files but do not have a native skill or rule system.

## Install

Copy the complete Atlas folder into a stable project path:

```text
.agent-instructions/project-atlas/
├── SKILL.md
├── STATE_TEMPLATE.md
└── README.md
```

## Activate

Start a fresh session and provide the exact paths:

```text
Read and follow .agent-instructions/project-atlas/SKILL.md.
Use .agent-instructions/project-atlas/STATE_TEMPLATE.md to create ATLAS_STATE.md.
Use Project Atlas only for this long-running task.
Freeze the acceptance registry before substantial work.
After each bounded maneuver, update Delivery, Evidence, Alignment,
movement class, evidence freshness, route metrics, landing blockers,
and exactly one next maneuver.
Do not declare completion until every landing gate passes.
```

Repeat the activation after context compaction or handoff if the harness does not persist project instructions.

## Verify

Run the [shared smoke test](../smoke-test.md). The critical check is observable behavior: the agent must maintain `ATLAS_STATE.md` and use it to choose work.

## Update

Replace all three copied files together. Do not silently change a frozen skill during an active experiment.

## Remove

Delete `.agent-instructions/project-atlas/` and any bootstrap instruction that references it.

This mode is portable but depends on explicit activation. Last reviewed: 2026-07-26.
