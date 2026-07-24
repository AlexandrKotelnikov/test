# Research overview

## Question

Can a portable text-only skill help a long-running AI agent preserve the user's accepted destination, distinguish progress from activity, recover after drift, and stop after verified completion?

## Two mechanisms

### Astrolabe / Orbit Trap

Represents the project as required obligations plus evidence debt. It classifies file churn as zero movement unless a registered obligation or proof improves.

### Project Atlas

Represents the project as coordinates:

```text
P = (Delivery, Evidence, Alignment)
```

It adds bearing, weighted route length, cross-track movement, orbit ratio, terrain annotations, and evidence invalidation.

## Research standard

The project deliberately preserves null, mixed, and invalid findings. A navigation skill is not considered better merely because its vocabulary is more expressive. It must change observable behavior under matched conditions.

## Current evidence

- Astrolabe showed a replicated one-action recovery advantage in one controlled proxy-progress experiment.
- That advantage disappeared in matched-state recovery.
- Atlas showed a replicated local reduction in cross-track work under an Evidence deficit.
- Atlas did not show a broad advantage under Alignment repair or explicit route selection.

The strongest current conclusion is that a well-designed Planner already covers many navigation behaviors, while Atlas may provide additional auditability and route analysis in evidence-sensitive work.
