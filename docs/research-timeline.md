# Research timeline

## Astrolabe v0.1–v0.2

Early versions established persistent goal state, observable drift, research circuit breakers, and correction maneuvers. Initial experiments showed overhead and then parity with a strong Planner baseline.

## Astrolabe v0.3

Added evidence-backed movement, evidence debt, proxy-progress classification, stale handoff revalidation, and zero-write landing.

A complex navigation test produced the first replicated advantage: recovery latency of one action versus two. Later matched-state testing found parity.

## Project Atlas v0.1

Introduced Delivery, Evidence, and Alignment coordinates, bearing, weighted route geometry, terrain, and orbit ratio.

An internal consistency review identified evaluator-manipulation and geometry risks. The portfolio edition v0.1.1 freezes registries, invalidates stale evidence, uses one weighted metric, and treats landing as a logical AND gate.

## Coordinate pilots

Atlas removed one cross-track step in both repetitions of an Evidence-deficit state, but tied Planner and Astrolabe in an Alignment-repair state. In a later route-choice pilot, all methods selected the same lower-damage route.

## Current direction

Future work should test hidden dependency consequences, conflicting evidence, and multi-agent concurrent modification rather than repeating obvious route choices.
