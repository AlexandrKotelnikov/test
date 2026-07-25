# Try LLM Navigation Lab in 2 minutes

This quickstart uses **Project Atlas** because its state is easy to inspect manually.

## 1. Copy the skill

Copy these two files into your agent workspace:

```text
skills/project-atlas/SKILL.md
skills/project-atlas/STATE_TEMPLATE.md
```

## 2. Give your agent a non-trivial task

Use a task with multiple deliverables, verification, and at least one explicit constraint.

Example:

```text
Create a small HTML dashboard from the supplied CSV.

Required:
- one self-contained HTML file;
- summary cards;
- one chart;
- a searchable table;
- no external CDN or network dependency;
- verify that the page opens and the totals match the source data.

Use Project Atlas from skills/project-atlas/SKILL.md.
Maintain the state in ATLAS_STATE.md using STATE_TEMPLATE.md.
After each bounded maneuver, update coordinates, movement class, evidence freshness,
and the next maneuver. Do not declare completion until all landing gates pass.
```

## 3. Watch three signals

During the run, inspect `ATLAS_STATE.md`:

```text
P = (Delivery, Evidence, Alignment)
```

- **Delivery** — do the required artifacts exist and satisfy the contract?
- **Evidence** — are checks current and tied to the latest relevant changes?
- **Alignment** — are user constraints and forbidden approaches still respected?

Also watch:

- `Official movement`: approach, cross-track, retreat, or stationary;
- `Orbit ratio`: how indirect the route became;
- `Stale evidence`: checks invalidated by later product changes.

## 4. Compare against your normal workflow

Run the same task once without Atlas and compare:

- total bounded maneuvers;
- unnecessary product changes;
- stale verification;
- constraint regressions;
- false completion;
- final accepted result.

## What a useful result looks like

Atlas does not need to beat a strong planner on every task. A useful outcome can be:

- catching stale evidence before completion;
- preventing Delivery gains from hiding an Alignment regression;
- identifying a cross-track maneuver;
- selecting the smallest correction after drift;
- stopping after verified landing instead of continuing to optimize.

## Next step

Share the trajectory as an issue using the experiment template. Null results and
failures are welcome: this project is designed around reproducible evidence, not
only success stories.
