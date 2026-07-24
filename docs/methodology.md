# Experimental methodology

## Principles

1. **Freeze before work.** Skills, tasks, evaluators, verifiers, prompts, and conclusion predicates are hashed before worker runs.
2. **Matched starts.** Compared methods receive byte-identical product workspaces whenever possible.
3. **Fresh agents.** Each phase or run starts without previous chat history.
4. **Objective movement.** Official movement is recomputed from adjacent score snapshots rather than accepted from worker self-report.
5. **Evidence freshness.** Product changes invalidate dependent proof.
6. **Blind final scoring.** Label-free packages are scored before condition mapping is created.
7. **Zero-write landing.** Product changes after verified landing are failures.
8. **Registered conclusions.** Reports select from conclusions defined before runs begin.

## Failure modes discovered

- hidden acceptance requirements;
- syntax-based test counting instead of executed tests;
- unequal access to evaluator internals;
- unmatched starting distances;
- oversized action units;
- overlapping movement definitions;
- optimistic coordinates and stale evidence.

These failures are retained in the repository as methodological evidence.
