# Astrolabe / Orbit Trap v0.3

Astrolabe is an evidence-backed navigation protocol for long-running agent work. It distinguishes productive movement from file churn, detects proxy progress, revalidates stale handoff state, and redirects the agent to the nearest open obligation.

## Core idea

> A file change is not movement. Progress exists only when a required obligation or its evidence improves.

## Best fit

- multi-phase coding tasks;
- work that spans several agents or context resets;
- tasks with explicit deliverables and acceptance checks;
- environments where refactoring, research, or architecture can become proxy progress.

See [SKILL.md](SKILL.md) for the complete portable protocol.
