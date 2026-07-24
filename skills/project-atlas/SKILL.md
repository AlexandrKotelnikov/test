---
name: project-atlas
version: 0.1.1
description: Coordinate-based navigation for long-running agent work using Delivery, Evidence, and Alignment with frozen registries, evidence invalidation, route efficiency, and non-compensable landing gates.
---

# Project Atlas v0.1.1

Project Atlas treats a project as a position in a small coordinate space rather than as a list of completed tasks. After each bounded maneuver, the agent asks:

1. Where is the project now?
2. Which coordinate is the dominant deficit?
3. Did the last maneuver move toward the destination, sideways, or backward?
4. Is the route efficient, or is the agent circling the goal?

The skill is text-only and requires no server, database, API, graphical interface, or external service.

## 1. Activation

Activate Atlas when at least two conditions apply:

- multiple required deliverables;
- acceptance depends on tests, inspection, evidence, or review;
- explicit scope boundaries or forbidden approaches;
- several work cycles, agents, or context handoffs;
- attractive optional work can look productive without improving acceptance;
- changes can invalidate earlier evidence;
- the agent must choose between delivery, verification, and alignment repair.

Do not activate for a short answer, trivial edit, isolated calculation, or a single immediately observable deliverable.

## 2. Destination and frozen registry

Define the destination in plain language and freeze a registry before substantial work.

```text
G = (D=1.00, E=1.00, A=1.00)
```

The registry must contain:

- required delivery obligations and weights;
- required evidence items and weights;
- alignment constraints and weights;
- evidence dependencies and invalidation triggers;
- hard gates that block landing;
- the distance function and tolerances.

After work begins, weights, denominators, obligation boundaries, and dependency rules cannot change merely to improve the score. A user-authorized goal change creates a new registry version and invalidates affected evidence.

### Anti-fragmentation rule

Do not split one obligation into many easy sub-items to inflate a coordinate. Registry items must map to independently observable acceptance properties.

## 3. Coordinates

### Delivery — D

```text
D = sum(delivery_weight_i * delivery_value_i) / sum(delivery_weight_i)
```

Values:

```text
OPEN = 0.00
PARTIAL = 0.50
PASS = 1.00
```

Count only user-required or acceptance-required outputs and behavior. Optional architecture, polish, research, and refactoring do not increase D unless they close a registered obligation.

### Evidence — E

```text
E = sum(evidence_weight_i * freshness_i) / sum(evidence_weight_i)
```

A required evidence item contributes `1.00` only when it is current, relevant, and passing. Otherwise it contributes `0.00`.

Self-report, file churn, and a smoke test for the wrong property are not evidence.

#### Evidence invalidation

The registry maps product regions to evidence items. When a relevant file, interface, contract, fixture, or dependency changes, every dependent evidence item becomes `STALE` before the next position is calculated.

```text
product change -> dependency lookup -> stale evidence -> rerun proof
```

An agent cannot keep old E merely because the previous check once passed.

### Alignment — A

```text
A = sum(alignment_weight_i * alignment_value_i) / sum(alignment_weight_i)
```

Values:

```text
PASS = 1.00
UNKNOWN = 0.50
FAIL = 0.00
```

Never initialize Alignment optimistically. An uninspected constraint is `UNKNOWN`, not `PASS`.

A hard-constraint failure is non-compensable: growth in Delivery or Evidence cannot neutralize it, and landing remains blocked.

## 4. Consistent weighted geometry

Use one metric for distance, segment length, bearing projection, cross-track movement, net progress, and orbit ratio.

Default weights:

```text
wD = 1
wE = 1
wA = 2
```

Distance:

```text
Distance(P, G) = sqrt(
  wD*(1-D)^2 + wE*(1-E)^2 + wA*(1-A)^2
) / sqrt(wD+wE+wA)
```

Weighted segment length:

```text
Segment(P1, P2) = sqrt(
  wD*(D2-D1)^2 + wE*(E2-E1)^2 + wA*(A2-A1)^2
) / sqrt(wD+wE+wA)
```

Do not mix weighted distance with unweighted route metrics.

## 5. Bearing

```text
B = G - P
```

The primary bearing is the largest weighted deficit, except that an active hard alignment breach always takes precedence.

Example:

```text
P = (0.85, 0.25, 1.00)
Primary bearing = Evidence
```

The next maneuver should normally verify or repair existing delivery rather than expand the product.

## 6. Bounded maneuver

Before acting, record:

- one target coordinate;
- one registered obligation or evidence item;
- expected coordinate change;
- required proof;
- stop condition.

A maneuver may touch several files only when they are necessary for the same registered target. “While here” improvements are separate maneuvers.

## 7. Movement classification

Recalculate the registry, invalidate stale evidence, and compute `P_after`.

- `ALIGNMENT_RECOVERY`: an active alignment failure is repaired.
- `APPROACH`: Delivery increases and no hard constraint regresses.
- `EVIDENCE`: Delivery is unchanged and fresh Evidence increases.
- `CROSS_TRACK`: project state changes, but weighted distance does not decrease beyond tolerance.
- `STATIONARY`: neither the registered state nor coordinates change.
- `RETREAT`: weighted distance increases, a passing obligation reopens, evidence debt grows without necessary alignment recovery, or a hard constraint is breached.

Priority:

```text
hard breach / regression -> RETREAT
alignment repair -> ALIGNMENT_RECOVERY
D increase -> APPROACH
E increase -> EVIDENCE
sideways change -> CROSS_TRACK
no change -> STATIONARY
```

## 8. Route metrics

```text
PathLength = sum(weighted Segment_i)
NetProgress = Distance(P_start,G) - Distance(P_now,G)
OrbitRatio = PathLength / max(NetProgress, EPSILON)
```

Use a rolling window of 3–5 meaningful maneuvers.

Default interpretation:

```text
OrbitRatio < 2.0       DIRECT
2.0 <= ratio < 4.0    WINDING
ratio >= 4.0           ORBITING
```

Also mark `ORBITING` after three consecutive `CROSS_TRACK` or `STATIONARY` maneuvers, repeated failed maneuvers without new evidence, or repeated map updates instead of product work.

## 9. Terrain

- **Waypoints:** observable intermediate states required by the route.
- **Hazards:** actions likely to reduce Alignment or reopen obligations.
- **Fog:** unresolved information that blocks a registered decision.
- **Swamps:** high-effort, low-forward-progress activity.
- **Restricted zones:** user-forbidden approaches; entering one is a `RETREAT`.

Research in fog must name a decision, evidence threshold, and stop condition. Two non-converting research passes trigger course correction.

## 10. Correction maneuver

On `ORBITING` or `RETREAT`:

1. freeze optional work;
2. revalidate the registry against actual files and checks;
3. identify the active hard breach or largest weighted deficit;
4. choose the smallest executable maneuver for one target;
5. predict the coordinate change;
6. execute and remeasure immediately.

Another plan or map rewrite is not recovery.

## 11. Handoff

A new agent must:

1. read the frozen registry and inherited position;
2. inspect actual files;
3. rerun cheap relevant checks;
4. apply evidence invalidation rules;
5. recalculate D, E, and A;
6. record discrepancies before choosing a bearing.

Stored coordinates are navigation hints, not ground truth.

## 12. Landing

Landing is a logical AND gate, not a weighted threshold.

```text
LANDING =
  every required delivery obligation PASS
  AND every required evidence item fresh and PASS
  AND every alignment constraint PASS
  AND every hard gate PASS
  AND final verifier PASS
```

A low-weight missing requirement cannot be hidden by high scores elsewhere. After the first confirmed landing, perform only read-only reporting checks and stop. Any product change invalidates landing and dependent evidence.

## 13. State format

Keep state concise, normally <= 3 KB.

```text
ATLAS
Destination: <plain-language result>
Registry version: <hash or version>
P: D=<0..1> E=<0..1> A=<0..1>
Distance: <weighted distance>
Bearing: <Delivery | Evidence | Alignment | balanced>
Last maneuver: <class> delta=(dD,dE,dA)
Route: path=<n> net=<n> orbit=<n> state=<DIRECT|WINDING|ORBITING|RETREAT>
Stale evidence: <IDs>
Hazards: <short list>
Next maneuver: <one bounded evidence-backed action>
Landing blockers: <IDs>
```

Do not store hidden reasoning, full chat history, source dumps, or large plans.

## 14. Required cycle

```text
1. LOCATE      Calculate P from the frozen registry.
2. ORIENT      Determine the primary weighted deficit or hard breach.
3. CHOOSE      Select one bounded maneuver and expected delta.
4. MOVE        Execute the maneuver.
5. INVALIDATE  Mark dependent evidence stale.
6. MEASURE     Recalculate D, E, A with current proof.
7. CLASSIFY    Label the movement.
8. CHECK ROUTE Update path, net progress, and orbit ratio.
9. CORRECT     Correct orbit or retreat immediately.
10. LAND       Stop only when the logical AND gate passes.
```

## 15. Guardrails

- Do not invent precision unsupported by observable checks.
- Do not change weights, denominators, or item boundaries after seeing results.
- Do not hide Alignment loss with Delivery growth.
- Do not retain stale Evidence after relevant changes.
- Do not let self-authored status text serve as independent proof.
- Do not count optional work as registered progress.
- Do not change the destination because the current route is difficult.
- User corrections override the old map and may invalidate evidence.
- A beautiful coordinate report without behavioral impact is not success.

## 16. Success criterion

Atlas succeeds only when it causes observable behavior such as:

- choosing verification when Delivery is high and Evidence is low;
- repairing a hard constraint before adding functionality;
- selecting a route with lower evidence damage;
- detecting repeated sideways work;
- recovering after a stale handoff;
- stopping after verified landing;
- producing a shorter or cleaner route to the same accepted result.
