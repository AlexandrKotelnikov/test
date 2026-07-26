#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = [
    "README.md",
    "README.ru.md",
    "LICENSE",
    "skills/astrolabe/SKILL.md",
    "skills/project-atlas/SKILL.md",
    "experiments/README.md",
    "docs/methodology.md",
    "demo/index.html",
    "demo/styles.css",
    "demo/scenarios.js",
    "demo/app.js",
    "demo/README.md",
    "install/README.md",
    "install/smoke-test.md",
    "install/codex/README.md",
    "install/claude-code/README.md",
    "install/cursor/README.md",
    "install/gemini-cli/README.md",
    "install/generic/README.md",
    "launch/README.md",
    "launch/release-notes-v0.2.0.md",
    "launch/launch-checklist.md",
    "assets/hero.svg",
    "assets/social-preview.svg",
]

REPORTS = [
    "01-complex-navigation.md",
    "02-deep-navigation-stress.md",
    "03-micro-recovery.md",
    "04-matched-state-recovery.md",
    "05-coordinate-navigation-pilot.md",
    "06-route-choice-pilot.md",
]


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def check_required() -> None:
    missing = [p for p in REQUIRED if not (ROOT / p).is_file()]
    if missing:
        fail("missing required files: " + ", ".join(missing))


def check_reports() -> None:
    base = ROOT / "experiments" / "reports"
    missing = [name for name in REPORTS if not (base / name).is_file()]
    if missing:
        fail("missing experiment reports: " + ", ".join(missing))


def check_skill_invariants() -> None:
    astrolabe = (ROOT / "skills/astrolabe/SKILL.md").read_text(encoding="utf-8")
    atlas = (ROOT / "skills/project-atlas/SKILL.md").read_text(encoding="utf-8")

    for phrase in ["File change is not movement", "Evidence debt", "zero"]:
        if phrase.lower() not in astrolabe.lower():
            fail(f"Astrolabe invariant missing: {phrase}")

    for phrase in [
        "Delivery",
        "Evidence",
        "Alignment",
        "Evidence invalidation",
        "logical AND gate",
        "Do not mix weighted distance with unweighted route metrics",
    ]:
        if phrase.lower() not in atlas.lower():
            fail(f"Atlas invariant missing: {phrase}")


def check_demo() -> None:
    html = (ROOT / "demo/index.html").read_text(encoding="utf-8")
    scenarios = (ROOT / "demo/scenarios.js").read_text(encoding="utf-8")

    for local_asset in ["styles.css", "scenarios.js", "app.js"]:
        if local_asset not in html:
            fail(f"demo entry point does not reference {local_asset}")

    if re.search(r'<(?:script|link)[^>]+(?:src|href)=["\']https?://', html, re.IGNORECASE):
        fail("demo must not load external scripts or styles")

    scenario_ids = re.findall(r'id:\s*["\']([a-z0-9-]+)["\']', scenarios)
    expected = {"evidence-deficit", "alignment-breach", "orbit-trap", "route-choice"}
    if not expected.issubset(set(scenario_ids)):
        fail("demo scenarios are incomplete")


def check_install_guides() -> None:
    index = (ROOT / "install/README.md").read_text(encoding="utf-8")
    smoke = (ROOT / "install/smoke-test.md").read_text(encoding="utf-8")

    for harness in ["Codex", "Claude Code", "Cursor", "Gemini CLI", "Generic"]:
        if harness.lower() not in index.lower():
            fail(f"install index missing harness: {harness}")

    for phrase in ["ATLAS_STATE.md", "smallest open required", "landing"]:
        if phrase.lower() not in smoke.lower():
            fail(f"installation smoke test missing invariant: {phrase}")


def check_launch_integrity() -> None:
    release = (ROOT / "launch/release-notes-v0.2.0.md").read_text(encoding="utf-8")
    launch_index = (ROOT / "launch/README.md").read_text(encoding="utf-8")

    for phrase in ["no universal superiority claim", "MEASUREMENT_INVALID", "interactive"]:
        if phrase.lower() not in (release + launch_index).lower():
            fail(f"launch materials missing research qualification: {phrase}")


def check_relative_links() -> None:
    pattern = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
    problems = []
    for md in ROOT.rglob("*.md"):
        text = md.read_text(encoding="utf-8", errors="replace")
        for target in pattern.findall(text):
            target = target.split("#", 1)[0].strip()
            if not target or "://" in target or target.startswith("mailto:"):
                continue
            decoded = target.replace("%20", " ")
            if not (md.parent / decoded).resolve().exists():
                problems.append(f"{md.relative_to(ROOT)} -> {target}")
    if problems:
        fail("broken relative links:\n" + "\n".join(problems))


def check_large_files() -> None:
    large = []
    for path in ROOT.rglob("*"):
        if path.is_file() and ".git" not in path.parts and path.stat().st_size > 10 * 1024 * 1024:
            large.append(str(path.relative_to(ROOT)))
    if large:
        fail("files larger than 10 MB: " + ", ".join(large))


def main() -> None:
    check_required()
    check_reports()
    check_skill_invariants()
    check_demo()
    check_install_guides()
    check_launch_integrity()
    check_relative_links()
    check_large_files()
    print("Repository validation passed.")


if __name__ == "__main__":
    main()
