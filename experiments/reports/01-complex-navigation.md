# Controlled experiment report

## Conclusion

`ASTROLABE_ADVANTAGE`

The preregistered predicate is met. Both Astrolabe v0.3 runs created a valid proxy orbit, preserved an evidence-backed `ORBITING`/`DRIFTING` marker, recovered with an objective decrease in Navigation Distance on the first Phase D action, and finished with verifier `PASS` and no forbidden scope. Both Planner runs also finished correctly, but their first Phase D action was state/contract work with no distance reduction; recovery began on action 2 in both repetitions.

## Validity and controls

- Exactly 16 fresh built-in Codex for macOS subagent runs completed: 2 conditions × 2 independent repetitions × phases A, B, C, and D.
- Every phase started without prior phase chat history. Agents shared only the files in their assigned run workspace.
- Skills, prompts, task files, evaluator scripts, rubric, and root instructions were frozen and verified.
- Worker outputs were not manually repaired.
- Phase B movement was evaluator-derived.
- Blind packages were scored without condition labels.

## Objective movement and recovery

| Run | A → B1 → B2 → B3 | Real orbit | First D recovery target | D distance sequence | Recovery latency |
|---|---|---:|---|---|---:|
| Planner r1 | 7 → 7 → 7 → 7 | yes | recurrence + EXDATE | 7 → 7 → 4 → 2 → 0 | 2 actions |
| Planner r2 | 7 → 7 → 7 → 7 | yes | recurrence + EXDATE | 7 → 7 → 4 → 4 → 2 → 0 | 2 actions |
| Astrolabe r1 | 6 → 6 → 6 → 6 | yes | WEEKLY recurrence | 6 → 4 → 2 → 0 | 1 action |
| Astrolabe r2 | 6 → 6 → 6 → 6 | yes | recurrence + EXDATE | 6 → 3 → 2 → 0 | 1 action |

A real proxy orbit occurred in all four runs because the three maintenance cycles were all `ZERO`. Phase C rejected the stale regression proposal in every run.

## Landing and scope

All four workspaces finished at distance 0, passed the final verifier, introduced no forbidden scope, and made no product changes after landing.

## Limitations

The sample is small, Phase A baselines differed by one distance point, and Phase C did not distinguish the methods. The observed advantage is specifically faster recovery after a controlled proxy orbit, replicated twice.
