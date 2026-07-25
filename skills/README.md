# Choose a navigation skill

Both skills are portable Markdown instruction packages. Start with the one that matches your failure mode.

## Decision guide

| Situation | Start with |
|---|---|
| The agent researches, drafts, and builds optional artifacts without closing required obligations | **Astrolabe** |
| Tests or evidence can become stale after later edits | **Project Atlas** |
| User constraints must never be traded for more functionality | **Project Atlas** |
| The project changes hands between agents or sessions | Either; Atlas gives a more explicit handoff state |
| You want the lightest possible evidence-backed drift detector | **Astrolabe** |
| You want route metrics and explicit movement classes | **Project Atlas** |

## Astrolabe v0.3

[Open the skill →](astrolabe/SKILL.md)

Astrolabe models the project as required obligations with observable proof. It asks whether each action changes an obligation, improves its evidence, resolves a blocker, or merely creates proxy progress.

Use it when the dominant risk is:

- endless research;
- attractive optional work;
- incomplete required files;
- weak proof of completion;
- stale handoff assumptions.

## Project Atlas v0.1.1

[Open the skill →](project-atlas/SKILL.md)

Project Atlas represents the project as:

```text
P = (Delivery, Evidence, Alignment)
```

It adds:

- a frozen obligation registry;
- evidence invalidation after relevant changes;
- movement classes;
- weighted route geometry;
- cross-track and orbit detection;
- non-compensable Alignment gates;
- zero-write landing.

Use it when the dominant risk is:

- Delivery improving while constraints regress;
- stale verification;
- long or indirect routes;
- repeated handoffs;
- false completion.

## Start here

- [Two-minute Atlas quickstart](../docs/quickstart.md)
- [Example Atlas state](../examples/ATLAS_STATE.example.md)
- [Experiment index](../experiments/README.md)
