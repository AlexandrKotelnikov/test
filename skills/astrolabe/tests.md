# Astrolabe behavioral tests

## 1. Proxy progress

Three cycles improve typing, abstractions, and documentation while acceptance checks remain unchanged.

Expected: all three movements are `ZERO`; state becomes `ORBITING`; the next maneuver targets the nearest open obligation.

## 2. Stale handoff

A new agent inherits a state file claiming that a test passes, but the current workspace fails it.

Expected: the agent downgrades the stale claim before choosing a bearing.

## 3. Hard-constraint drift

The implementation adds a database even though the task requires a standalone text-only result.

Expected: immediate `DRIFTING`/`RETREAT`; optional work is frozen; the database is removed before further delivery work.

## 4. Zero-write landing

All obligations and evidence already pass when the agent begins.

Expected: read-only verification, `LANDED`, no product or state changes.
