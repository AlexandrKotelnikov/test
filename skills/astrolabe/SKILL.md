---
name: orbit-trap
version: 0.3
description: Evidence-backed navigation for long-running multi-phase work. Counts progress only when a required obligation or its proof improves, detects proxy progress and stale state, and returns to the nearest open obligation.
---

# Orbit Trap v0.3 — Evidence-Backed Navigation

A planner proposes actions. Orbit Trap determines whether completed work actually moved the project closer to the user's accepted result.

## Core invariant

**File change is not movement.** An action counts as progress only when it improves a named required obligation and observable evidence supports the improvement.

## Step 0 — read-only landing gate

Before planning, research, implementation, or state writes:

1. Extract destination, deliverables, constraints, acceptance checks, and required proof.
2. Inspect existing artifacts and run the cheapest relevant checks.
3. Classify each obligation as `OPEN`, `PARTIAL`, `PASS`, or `BLOCKED`.
4. Compute delivery distance and evidence debt.

If all active obligations pass and navigation distance is zero, report `LANDED`, write nothing, and stop.

## State materialization

Keep state in context by default. Create `.orbit-trap.md` only for unfinished work likely to span more than five meaningful actions, a handoff, or context reset. Checkpoint writes are overhead, never project progress.

## Distance

```text
OPEN     = 1.0 × weight
PARTIAL  = 0.5 × weight
PASS     = 0
BLOCKED  = 1.0 × weight
REJECTED = 0 only after user-authorized goal change
```

- **Delivery distance**: remaining required artifacts and hard constraints.
- **Evidence debt**: required acceptance proof not yet demonstrated.
- **Navigation distance**: delivery distance + evidence debt.

## Evidence-backed movement

Every meaningful action must name the obligation and proof it improved.

- `APPROACH`: a required obligation improved and navigation distance decreased.
- `UNBLOCK`: a blocker was removed for a required obligation.
- `EVIDENCE`: acceptance proof improved and evidence debt decreased.
- `ZERO`: activity changed files, tests, notes, formatting, abstractions, or plans, but no required obligation or proof improved.
- `RETREAT`: distance increased, passed behavior regressed, or a hard constraint was breached.

Self-reported progress is provisional. Without observable proof, classify it as `ZERO`.

### Proxy-progress rule

Refactoring, typing, architecture, code cleanup, test reorganization, more documentation, and reusable abstractions are `ZERO` when the failing acceptance criteria remain unchanged.

## Bearing

Consider at most three next actions. Prefer the smallest feasible action that reduces navigation distance for the nearest open obligation. Optional improvements cannot outrank feasible required work.

## Research fuse

Research must specify a decision, obligation, stop condition, and maximum of two passes. A pass that changes no decision, blocker, required artifact, or proof is `ZERO`.

## Orbit and drift

Set `ORBITING` when three consecutive movements are `ZERO`, or two are `ZERO` and one is `RETREAT`, while feasible required work remains.

Set `DRIFTING` immediately for hard-constraint breach, deliverable substitution, optional infrastructure while required work remains, or regression of passed acceptance evidence.

## Correction maneuver

On `ORBITING` or `DRIFTING`:

1. freeze the optional branch;
2. restate the destination;
3. select the nearest open obligation;
4. make the smallest edit or check that can reduce its distance or evidence debt;
5. recalculate immediately.

Another plan or state rewrite is not recovery.

## Handoff revalidation

A new agent must not trust state blindly: inspect actual files, rerun cheap relevant checks, downgrade stale `PASS` claims, then choose bearing.

## Landing

Land only when all obligations pass, required proof exists, hard constraints hold, and navigation distance is zero. After proof, stop optional work.

## Guardrails

- Never count checkpoint writes or code churn as progress.
- Never let architecture quality substitute for acceptance.
- Never trust stale handoff claims without checks.
- Never add a server, database, API, external dependency, or extra product artifact unless required.
- Keep state concise and factual; do not expose private chain-of-thought.
