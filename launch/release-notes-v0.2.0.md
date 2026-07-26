# v0.2.0 — Interactive Navigation Demo

LLM Navigation Lab now includes a zero-dependency interactive Project Atlas simulator and repository-local installation guides for major agent harnesses.

## Added

- interactive simulator with four educational scenarios;
- Delivery, Evidence, and Alignment coordinate tracking;
- weighted distance, path length, net progress, and orbit ratio;
- movement classification and visible landing blockers;
- GitHub Pages deployment workflow;
- installation guides for Codex, Claude Code, Cursor, Gemini CLI, and generic file-aware agents;
- shared installation smoke test;
- worked Atlas state example;
- public launch kit and social assets.

## Research status

The published experiments still do not support a universal superiority claim.

- Atlas showed a replicated local reduction in cross-track work in one Evidence-deficit state.
- Strong Planner baselines tied Astrolabe and Atlas in several other scenarios.
- One experiment remains published as `MEASUREMENT_INVALID` after evaluator defects were discovered.

## Try it

Live simulator:
https://alexandrkotelnikov.github.io/llm-navigation-lab/

Installation:
https://github.com/AlexandrKotelnikov/llm-navigation-lab/tree/main/install

Evidence:
https://github.com/AlexandrKotelnikov/llm-navigation-lab/tree/main/experiments

## Compatibility note

The core skills remain portable Markdown packages. Harness-specific guides are repository-local integration patterns and should be verified with the supplied smoke test in the installed harness version.
