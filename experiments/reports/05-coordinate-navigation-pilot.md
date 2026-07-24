# Project Atlas Coordinate Navigation Pilot

## Outcome

Registered conclusion: **PLANNER_ALREADY_COVERS_COORDINATE_NAVIGATION**.

The experiment completed as a valid balanced pilot: 12 fresh isolated worker runs, 12 verified landings, intact frozen inputs, complete step/snapshot trails, and no post-landing product changes.

Atlas showed a replicated state-local reduction in `state_E` (4 rather than 5 steps, with 0 rather than 1 cross-track step), while all three conditions were exactly tied in `state_A`. The difference therefore did not replicate across both canonical states.

## Preflight

- exactly 12 run workspaces;
- matched product, task, fixture, and registry hashes within each state;
- two byte-identical scorer results per workspace;
- independent arithmetic cross-check for 12/12;
- frozen manifest created and later verified;
- root Atlas files unchanged.

Initial coordinates:

| State | D | E | A | Primary axis |
|---|---:|---:|---:|---|
| `state_E` | 1.00 | 0.25 | 1.00 | Evidence |
| `state_A` | 1.00 | 1.00 | 0.70 | Alignment |

## Route results

### Evidence-deficit state

| Condition | Pass | Mean steps | Mean cross-track |
|---|---:|---:|---:|
| Planner | 2/2 | 5.0 | 1.0 |
| Astrolabe v0.3 | 2/2 | 5.0 | 1.0 |
| Project Atlas | 2/2 | 4.0 | 0.0 |

Atlas refreshed the stale evidence receipt at step 4. Planner and Astrolabe performed one additional product-changing maneuver classified as cross-track, then refreshed evidence at step 5.

### Alignment-deficit state

All six runs followed the same route:

```text
ALIGNMENT_RECOVERY → EVIDENCE → LANDING
```

Each condition achieved 2/2 PASS, two steps, zero cross-track, and Alignment recovery latency 1.

## Aggregate

Each non-Atlas condition used 14 total micro-steps across both states; Atlas used 12. The two-step difference came entirely from `state_E`.

All 40 movement predictions matched the frozen official classifier. There were no stationary or retreat steps, false landings, or post-landing changes.

## Limitation

Only two repetitions per state and one compact implementation task were used. The pilot is a reproducibility check, not a broad capability estimate.
