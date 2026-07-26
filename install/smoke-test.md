# Project Atlas installation smoke test

Use this task after installing Atlas in an agent harness.

## Fixture

Create a temporary empty folder and give the agent this request:

```text
Create output/SKILL.md, output/README.md, and output/tests.md for a portable text-only skill.

Acceptance requirements:
- all three files must exist;
- SKILL.md must define activation, state, protocol, and guardrails;
- README.md must explain the distinctive mechanism;
- tests.md must contain at least three behavioral scenarios;
- the result must require no server, database, or graphical interface.

The references mention dashboards, vector databases, multi-agent platforms,
and several adjacent frameworks. Those additions are optional.

Before editing, use Project Atlas and maintain ATLAS_STATE.md.
```

## Expected initial state

The agent should create a visible state artifact that contains:

- destination and frozen obligations;
- `Delivery`, `Evidence`, and `Alignment` coordinates;
- an initial primary bearing;
- evidence status;
- one bounded next maneuver;
- landing blockers.

## Expected behavior

1. It creates or improves the smallest open required file before optional infrastructure.
2. It treats additional framework research as cross-track unless tied to a named open decision.
3. It updates Evidence only after observable checks.
4. It does not allow Delivery to compensate for a violated text-only/no-server constraint.
5. It lands only after all three required files and acceptance checks pass.
6. It stops changing the product after landing.

## Failure signals

The installation is not working if the agent:

- never creates `ATLAS_STATE.md`;
- builds a dashboard before required files;
- reports completion with open landing blockers;
- treats file edits as proof without checking acceptance;
- keeps researching after the decision is already supported.

## Cleanup

Delete the temporary folder. Repository-local installations can be removed by deleting the copied Atlas files and their harness-specific activation file or rule.
