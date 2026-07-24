# Coordinate consistency review

The internal review identified six main risks:

1. mixing weighted distance with unweighted route metrics;
2. hiding Alignment loss behind Delivery growth;
3. retaining stale Evidence after relevant product changes;
4. manipulating weights, denominators, or obligation fragmentation;
5. landing with a missing low-weight mandatory requirement;
6. unsupported numerical precision and optimistic initial Alignment.

Project Atlas v0.1.1 addresses these with a single weighted geometry, hard non-compensable gates, a frozen registry, evidence dependency invalidation, anti-fragmentation rules, logical-AND landing, and `UNKNOWN` alignment status.
