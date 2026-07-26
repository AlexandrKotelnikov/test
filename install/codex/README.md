# Install Project Atlas in Codex

Codex can discover repository-scoped skills from `.agents/skills`.

## Install

From the root of the target repository:

```bash
mkdir -p .agents/skills/project-atlas
cp /path/to/llm-navigation-lab/skills/project-atlas/SKILL.md .agents/skills/project-atlas/SKILL.md
cp /path/to/llm-navigation-lab/skills/project-atlas/STATE_TEMPLATE.md .agents/skills/project-atlas/STATE_TEMPLATE.md
cp /path/to/llm-navigation-lab/skills/project-atlas/README.md .agents/skills/project-atlas/README.md
```

Commit the folder when Atlas should be shared with everyone working in the repository.

## Activate

Start a fresh Codex session in the target repository and say:

```text
Use the project-atlas skill for this task.
Create and maintain ATLAS_STATE.md from the supplied state template.
Do not declare completion until every landing gate passes.
```

For a long task, include the accepted deliverables, checks, constraints, and forbidden approaches in the request.

## Verify

Run the [shared smoke test](../smoke-test.md). Confirm that Codex:

- recognizes Project Atlas;
- creates `ATLAS_STATE.md`;
- records the primary bearing and landing blockers;
- avoids optional infrastructure before required outputs;
- stops after verified landing.

## Update

Replace the three files under `.agents/skills/project-atlas/` with the newer repository version. Review the changelog before upgrading a frozen experiment.

## Remove

```bash
rm -rf .agents/skills/project-atlas
```

Delete any task-specific `ATLAS_STATE.md` only when its audit trail is no longer needed.

Tested pattern: repository-local Codex skill. Last reviewed: 2026-07-26.
