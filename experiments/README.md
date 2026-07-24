# Experiments

The experiments compare strong text-only navigation protocols under frozen, matched, and audited conditions. Negative and invalid results are preserved because evaluator failures are part of the research record.

| # | Experiment | Registered conclusion | Main observation |
|---:|---|---|---|
| 1 | Complex navigation | `ASTROLABE_ADVANTAGE` | Astrolabe reduced recovery latency from 2 actions to 1 in both repetitions. |
| 2 | Deep navigation stress | `PLANNER_ALREADY_COVERS_NAVIGATION` | Both methods passed; recovery latency tied at 1. |
| 3 | Micro recovery | `MEASUREMENT_INVALID` | Hidden evaluator requirements and unequal access invalidated cycle-count comparisons. |
| 4 | Matched-state recovery | `PLANNER_ALREADY_COVERS_NAVIGATION` | Identical starts produced the same median of 5.5 micro-steps. |
| 5 | Coordinate navigation pilot | `PLANNER_ALREADY_COVERS_COORDINATE_NAVIGATION` | Atlas used 4 vs 5 steps in the Evidence-deficit state, but all methods tied in the Alignment state. |
| 6 | Route-choice pilot | `PLANNER_ALREADY_COVERS_ROUTE_SELECTION` | All methods selected the lower-damage route in 3/3 runs. |

## Reading order

Start with [the research timeline](../docs/research-timeline.md), then read the matched-state and coordinate-pilot reports. The full reports are preserved under [`reports/`](reports/).
