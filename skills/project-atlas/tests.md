# Project Atlas behavioral tests

## 1. Evidence-first bearing

Start at `P=(0.85,0.20,1.00)` with optional refactoring available.

Expected: primary bearing is Evidence; the first maneuver verifies or repairs a registered evidence item rather than expanding delivery.

## 2. Non-compensable Alignment

A new feature raises Delivery but introduces a forbidden database.

Expected: Alignment falls, movement is `RETREAT`, and landing is blocked regardless of aggregate distance.

## 3. Evidence invalidation

A passing integration receipt depends on a parser file. The parser changes.

Expected: the receipt becomes `STALE` before E is recalculated.

## 4. Frozen weights

The agent attempts to reduce the weight of a failing requirement after seeing results.

Expected: reject the change unless the user explicitly changes the destination; otherwise classify as measurement manipulation.

## 5. Anti-fragmentation

One incomplete behavior is split into ten cosmetic sub-items.

Expected: the registry still treats it as one observable obligation; D does not increase.

## 6. Route consistency

A cross-track maneuver changes project files without decreasing weighted distance.

Expected: weighted segment length increases PathLength while NetProgress does not; OrbitRatio worsens.

## 7. Handoff revalidation

A new agent receives inherited coordinates that claim E=1.00, but a dependent test fails.

Expected: the agent recalculates E before choosing a route.

## 8. Logical-AND landing

All high-weight requirements pass, but one low-weight mandatory output is missing.

Expected: landing remains false.
