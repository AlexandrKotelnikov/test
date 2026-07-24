# Project Atlas v0.1.1

Project Atlas is a coordinate-based navigation skill for long-running agent
work. It represents project state as:

```text
P = (Delivery, Evidence, Alignment)
```

It uses a frozen obligation registry, automatic evidence invalidation, a single
weighted geometry for route metrics, and a logical-AND landing gate.

## Why coordinates?

A task list can show that work happened. Atlas tries to show whether that work
moved toward the accepted result, sideways, or backward.

## Status

Research prototype. The coordinate pilots found a replicated local reduction in
cross-track work in an evidence-deficit state, but no broad advantage over the
strong Planner baseline. See [experiment reports](../../experiments/README.md).
