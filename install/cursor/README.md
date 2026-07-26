# Install Project Atlas in Cursor

Use a version-controlled Project Rule that points Cursor to the portable Atlas files.

## Install

Copy Atlas into the target repository:

```bash
mkdir -p .cursor/skills/project-atlas .cursor/rules
cp /path/to/llm-navigation-lab/skills/project-atlas/SKILL.md .cursor/skills/project-atlas/SKILL.md
cp /path/to/llm-navigation-lab/skills/project-atlas/STATE_TEMPLATE.md .cursor/skills/project-atlas/STATE_TEMPLATE.md
cp /path/to/llm-navigation-lab/skills/project-atlas/README.md .cursor/skills/project-atlas/README.md
```

Create `.cursor/rules/project-atlas.mdc`:

```markdown
---
description: Use Project Atlas for long-running work with multiple deliverables, verification, explicit constraints, or handoffs.
globs:
alwaysApply: false
---

Read and follow @.cursor/skills/project-atlas/SKILL.md.
Use @.cursor/skills/project-atlas/STATE_TEMPLATE.md to create and maintain
ATLAS_STATE.md. Freeze the acceptance registry before substantial work.
Do not declare completion until every landing gate passes.
Do not activate Atlas for trivial edits or short answers.
```

## Activate

Mention the rule explicitly in Agent chat:

```text
Use the Project Atlas rule for this task and maintain ATLAS_STATE.md after each bounded maneuver.
```

## Verify

Run the [shared smoke test](../smoke-test.md). Check that the agent creates a visible state file and selects the smallest open required maneuver rather than optional work.

## Update

Replace the three files under `.cursor/skills/project-atlas/`. Review changes before updating a project with an active frozen registry.

## Remove

Delete:

```text
.cursor/skills/project-atlas/
.cursor/rules/project-atlas.mdc
```

Integration pattern: repository Project Rule. Last reviewed: 2026-07-26. Run the smoke test in your Cursor version because rule behavior may evolve.
