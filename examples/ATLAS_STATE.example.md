# Project Atlas State — worked example

Destination: Deliver a self-contained HTML dashboard that opens locally, matches the source totals, contains no external dependencies, and passes the final verifier.

Registry version: `demo-v1`

## Position

- Delivery: `0.82`
- Evidence: `0.25`
- Alignment: `1.00`
- Weighted distance: `0.4743`
- Primary bearing: `Evidence`

## Open obligations

| ID | Type | Status | Evidence |
|---|---|---|---|
| D1 | Delivery | PASS | `dashboard.html` exists |
| D2 | Delivery | PASS | summary cards, chart, and table present |
| A1 | Alignment | PASS | no external CDN or network dependency |
| E1 | Evidence | FAIL | browser-open check not recorded |
| E2 | Evidence | FAIL | source totals not reconciled |
| E3 | Evidence | FAIL | latest verifier receipt is stale |

## Last maneuver

- Target: `E2`
- Expected delta: `(0.00, +0.25, 0.00)`
- Official movement: `APPROACH`
- Proof: generated `evidence/totals-reconciliation.txt`

## Route

- Path length: `0.3162`
- Net progress: `0.3162`
- Orbit ratio: `1.00`
- Route state: `DIRECT`

## Evidence

- Fresh: `D1`, `D2`, `A1`, `E2`
- Stale: `E3`
- Missing: `E1`
- Invalidation trigger: final verifier predates the latest dashboard change

## Terrain

- Hazards: optional visual refactor could change the product before verification
- Fog: browser rendering has not been inspected
- Restricted zones: external libraries and remote assets

Next maneuver: open `dashboard.html` locally and record the rendering check for `E1`.

Landing blockers: `E1`, `E3`

## Why this state matters

The product is mostly delivered and still aligned with the user's constraints. The dominant deficit is Evidence. Adding new visual features would be cross-track work until the open checks are completed and the final receipt is refreshed.
