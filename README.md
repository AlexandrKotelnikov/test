# LLM Navigation Lab

**Portable navigation skills and reproducible benchmarks for keeping long-running AI agents aligned with accepted outcomes.**

## Why this repository exists

Long-running agents can change many files, run research, refactor architecture,
and still fail to get closer to the user's actual goal. This repository explores
text-only navigation protocols that distinguish **movement toward acceptance**
from **activity that only looks productive**.

The project contains two skill families:

| Skill | Navigation model | Core question |
|---|---|---|
| [Astrolabe / Orbit Trap v0.3](skills/astrolabe/) | Obligations + evidence debt | Did the last action improve a required outcome or its proof? |
| [Project Atlas v0.1.1](skills/project-atlas/) | Delivery–Evidence–Alignment coordinates | Where is the project, what is the bearing, and how direct is the route? |

## Key concepts

- evidence-backed movement;
- proxy-progress detection;
- stale handoff revalidation;
- frozen acceptance registries;
- evidence invalidation after relevant changes;
- Alignment as a non-compensable constraint;
- route length, net progress, cross-track movement, and orbit ratio;
- zero-write landing after verified completion.

## Findings so far

The experiments do **not** support a universal superiority claim.

- Astrolabe produced a replicated recovery-latency advantage in one complex proxy-progress experiment.
- Matched-state recovery found functional parity with a strong Planner baseline.
- Atlas removed one cross-track step in both Evidence-deficit repetitions.
- All methods tied under straightforward Alignment repair and explicit route choice.
- One micro-recovery experiment was formally rejected as `MEASUREMENT_INVALID` after evaluator defects were discovered.

See the [experiment index](experiments/README.md) and [research overview](docs/research-overview.md).

## Repository map

```text
skills/                 portable text-only skills
experiments/reports/    complete experimental reports
docs/                   methodology, timeline, limitations, case study
tools/                  repository validation
```

## Quick start

Use a skill by copying its `SKILL.md` into the instruction context of a coding or research agent.

```text
skills/astrolabe/SKILL.md
skills/project-atlas/SKILL.md
```

## Research stance

This is an experimental portfolio project. Null results, parity, evaluator failures, and limitations are intentionally preserved. The goal is to build credible agent-navigation mechanisms, not to manufacture a winning benchmark.

## Languages

- Main documentation: English
- [Russian overview](README.ru.md)
- Historical reports retain the language in which they were produced.

## License

MIT. See [LICENSE](LICENSE).
