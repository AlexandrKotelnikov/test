# Install Project Atlas in Claude Code

Use a project-level `CLAUDE.md` to load the portable Atlas files into the repository context.

## Install

Copy Atlas into the target repository:

```bash
mkdir -p .claude/project-atlas
cp /path/to/llm-navigation-lab/skills/project-atlas/SKILL.md .claude/project-atlas/SKILL.md
cp /path/to/llm-navigation-lab/skills/project-atlas/STATE_TEMPLATE.md .claude/project-atlas/STATE_TEMPLATE.md
cp /path/to/llm-navigation-lab/skills/project-atlas/README.md .claude/project-atlas/README.md
```

Add this section to the repository root `CLAUDE.md`:

```markdown
## Project Atlas

For long-running tasks with multiple deliverables, acceptance checks, explicit
constraints, or handoffs, read and follow:

@.claude/project-atlas/SKILL.md
@.claude/project-atlas/STATE_TEMPLATE.md

Create and maintain `ATLAS_STATE.md`. Do not declare completion until every
landing gate passes. For trivial edits or short answers, do not activate Atlas.
```

Do not overwrite an existing `CLAUDE.md`; merge the section into it.

## Activate

```text
Use Project Atlas for this task. Freeze the acceptance registry before substantial work and maintain ATLAS_STATE.md after each bounded maneuver.
```

## Verify

Run the [shared smoke test](../smoke-test.md). The response should visibly use the Delivery–Evidence–Alignment model rather than merely mention Atlas.

## Update

Replace the files under `.claude/project-atlas/`. Keep the activation section stable unless the skill interface changes.

## Remove

Delete `.claude/project-atlas/` and remove only the Project Atlas section from `CLAUDE.md`.

Integration pattern: project memory with local file imports. Last reviewed: 2026-07-26. Run the smoke test in your installed Claude Code version before relying on it for critical work.
