# Reddit discussion post

## Suggested title

We built a coordinate system for long-running AI agents — and a strong planner often matched it

## Post

I have been working on a small open research project about a specific agent failure mode: lots of activity without measurable movement toward what the user will accept.

The repository contains two portable text-only skills:

- Astrolabe: required obligations + evidence debt;
- Project Atlas: Delivery × Evidence × Alignment coordinates, movement classes, route metrics, and landing gates.

We ran isolated matched-state experiments against a strong Planner baseline. The results were mixed:

- Atlas avoided one cross-track step in both Evidence-deficit repetitions;
- Planner, Astrolabe, and Atlas tied in straightforward Alignment repair and explicit route choice;
- one micro-recovery experiment was rejected as `MEASUREMENT_INVALID` after we found evaluator leakage and counting defects.

I preserved the null results and the invalid experiment instead of removing them.

There is now a zero-dependency interactive simulator where you can choose maneuvers and watch the coordinates, evidence freshness, route state, and landing blockers change:

https://alexandrkotelnikov.github.io/llm-navigation-lab/

Repository and reports:

https://github.com/AlexandrKotelnikov/llm-navigation-lab

I would appreciate criticism of the state model and benchmark design, especially examples where Delivery, Evidence, and Alignment are not enough to describe meaningful drift.

## Posting note

Adapt the opening paragraph to the community. Do not cross-post identical text rapidly and do not ask for stars or votes.
