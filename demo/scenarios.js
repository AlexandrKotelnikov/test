window.ATLAS_SCENARIOS = [
  {
    id: "evidence-deficit",
    title: "The product exists, but the proof is stale",
    description: "Delivery and Alignment are strong. The last product change invalidated verification receipts, while an optional visual refactor looks attractive.",
    start: { d: 0.92, e: 0.28, a: 1.0 },
    obligations: [
      { id: "D1", text: "Required dashboard exists", status: "pass" },
      { id: "D2", text: "Required summary and table are present", status: "pass" },
      { id: "E1", text: "Browser rendering check", status: "fail" },
      { id: "E2", text: "Totals reconciliation receipt", status: "stale" },
      { id: "A1", text: "No external dependencies", status: "pass" }
    ],
    maneuvers: [
      { id: "verify-render", title: "Run the browser-open check", detail: "Refresh one missing Evidence obligation.", delta: { d: 0, e: 0.28, a: 0 }, effects: { E1: "pass" } },
      { id: "reconcile", title: "Reconcile source totals", detail: "Replace the stale receipt with evidence tied to the current product.", delta: { d: 0, e: 0.34, a: 0 }, effects: { E2: "pass" } },
      { id: "refactor", title: "Polish the visual design", detail: "Optional product work before verification; it invalidates current evidence.", delta: { d: 0.03, e: -0.12, a: 0 }, effects: { E2: "stale" } },
      { id: "research", title: "Research another chart library", detail: "Creates activity without improving an open obligation.", delta: { d: 0, e: 0, a: 0 } }
    ]
  },
  {
    id: "alignment-breach",
    title: "Functionality improved by violating a hard constraint",
    description: "The agent added a remote dependency even though the accepted result must work offline. Delivery looks complete, but Alignment cannot be compensated by more features.",
    start: { d: 1.0, e: 0.86, a: 0.42 },
    obligations: [
      { id: "D1", text: "Required interface and features exist", status: "pass" },
      { id: "E1", text: "Functional tests pass", status: "pass" },
      { id: "E2", text: "Final verifier receipt", status: "stale" },
      { id: "A1", text: "No CDN, network, or external runtime", status: "fail" }
    ],
    maneuvers: [
      { id: "remove-cdn", title: "Remove the CDN dependency", detail: "Repair Alignment first; verification becomes stale after the change.", delta: { d: -0.05, e: -0.18, a: 0.58 }, effects: { A1: "pass", E1: "stale", E2: "stale" } },
      { id: "add-feature", title: "Add another feature", detail: "Delivery rises slightly while the forbidden architecture remains.", delta: { d: 0, e: -0.04, a: 0 }, effects: {} },
      { id: "document-exception", title: "Document the constraint violation", detail: "Explaining a violation does not repair Alignment.", delta: { d: 0, e: 0.04, a: 0 }, effects: {} },
      { id: "refresh-tests", title: "Run tests without fixing architecture", detail: "Evidence improves, but the landing gate remains blocked by Alignment.", delta: { d: 0, e: 0.12, a: 0 }, effects: { E1: "pass" } }
    ]
  },
  {
    id: "orbit-trap",
    title: "The agent is researching instead of landing",
    description: "All required files are partially complete, but repeated framework comparisons and optional architecture work have produced three zero-movement cycles.",
    start: { d: 0.58, e: 0.44, a: 0.92 },
    routeState: "ORBITING",
    obligations: [
      { id: "D1", text: "Complete SKILL.md protocol", status: "fail" },
      { id: "D2", text: "Complete README.md explanation", status: "pass" },
      { id: "D3", text: "Add three behavioral tests", status: "fail" },
      { id: "E1", text: "Acceptance checks recorded", status: "fail" },
      { id: "A1", text: "Remain text-only with no service dependency", status: "pass" }
    ],
    maneuvers: [
      { id: "finish-skill", title: "Finish the smallest open required file", detail: "Improves Delivery on a named obligation.", delta: { d: 0.22, e: 0.04, a: 0 }, effects: { D1: "pass" } },
      { id: "write-tests", title: "Write the required behavioral tests", detail: "Closes Delivery and creates observable Evidence.", delta: { d: 0.20, e: 0.22, a: 0 }, effects: { D3: "pass", E1: "pass" } },
      { id: "compare-framework", title: "Compare one more planning framework", detail: "No registered decision depends on it.", delta: { d: 0, e: 0, a: 0 } },
      { id: "build-dashboard", title: "Build an experiment dashboard", detail: "Attractive optional artifact outside the acceptance contract.", delta: { d: 0.02, e: 0, a: -0.08 } }
    ]
  },
  {
    id: "route-choice",
    title: "Two compliant routes, different Evidence damage",
    description: "Both routes can remove a forbidden persistence layer. One preserves the module boundary; the other rewrites the core and invalidates more evidence.",
    start: { d: 1.0, e: 1.0, a: 0.57 },
    obligations: [
      { id: "D1", text: "Required behavior is complete", status: "pass" },
      { id: "E1", text: "Core behavior receipt", status: "pass" },
      { id: "E2", text: "Storage receipt", status: "pass" },
      { id: "E3", text: "Integration receipt", status: "pass" },
      { id: "A1", text: "Standard-library-only persistence", status: "fail" }
    ],
    maneuvers: [
      { id: "boundary-route", title: "Replace only the storage adapter", detail: "Preserves the core boundary; two Evidence receipts become stale.", delta: { d: 0, e: -0.42, a: 0.43 }, effects: { A1: "pass", E2: "stale", E3: "stale" } },
      { id: "core-rewrite", title: "Rewrite core and storage together", detail: "Also compliant, but all three Evidence receipts become stale.", delta: { d: -0.08, e: -0.62, a: 0.43 }, effects: { A1: "pass", E1: "stale", E2: "stale", E3: "stale" } },
      { id: "refresh-storage", title: "Refresh storage and integration evidence", detail: "Useful only after choosing a compliant route.", delta: { d: 0.03, e: 0.38, a: 0 }, effects: { E2: "pass", E3: "pass" } },
      { id: "refresh-all", title: "Run the complete verifier", detail: "Refresh all receipts for the current product state.", delta: { d: 0.05, e: 0.62, a: 0 }, effects: { E1: "pass", E2: "pass", E3: "pass" } }
    ]
  }
];
