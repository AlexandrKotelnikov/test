# Install Project Atlas in Gemini CLI

Use the repository `GEMINI.md` context file to load Project Atlas for long-running tasks.

## Install

Copy Atlas into the target repository:

```bash
mkdir -p .gemini/project-atlas
cp /path/to/llm-navigation-lab/skills/project-atlas/SKILL.md .gemini/project-atlas/SKILL.md
cp /path/to/llm-navigation-lab/skills/project-atlas/STATE_TEMPLATE.md .gemini/project-atlas/STATE_TEMPLATE.md
cp /path/to/llm-navigation-lab/skills/project-atlas/README.md .gemini/project-atlas/README.md
```

Add this section to the root `GEMINI.md`:

```markdown
## Project Atlas

For long-running tasks with multiple deliverables, acceptance checks, explicit
constraints, or handoffs, load and follow:

@.gemini/project-atlas/SKILL.md
@.gemini/project-atlas/STATE_TEMPLATE.md

Create and maintain `ATLAS_STATE.md`. Freeze the acceptance registry before
substantial work and do not declare completion until all landing gates pass.
Do not activate Atlas for trivial edits or short answers.
```

Merge this section into an existing `GEMINI.md`; do not replace unrelated repository instructions.

## Activate

```text
Use Project Atlas for this task. Keep the state and evidence trail visible in ATLAS_STATE.md.
```

## Verify

Run the [shared smoke test](../smoke-test.md). Confirm that Gemini CLI follows the imported protocol and records observable state rather than only producing a plan.

## Update

Replace the files under `.gemini/project-atlas/`. Re-run the smoke test after updating.

## Remove

Delete `.gemini/project-atlas/` and remove only the Project Atlas section from `GEMINI.md`.

Integration pattern: repository context file with local imports. Last reviewed: 2026-07-26. Confirm import behavior in your installed Gemini CLI version.
