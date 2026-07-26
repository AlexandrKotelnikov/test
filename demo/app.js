(() => {
  "use strict";

  const WEIGHTS = { d: 0.4, e: 0.4, a: 0.2 };
  const GOAL = { d: 1, e: 1, a: 1 };
  const EPS = 1e-9;

  const els = {
    scenario: document.querySelector("#scenario"),
    reset: document.querySelector("#reset"),
    tag: document.querySelector("#scenario-tag"),
    title: document.querySelector("#scenario-title"),
    description: document.querySelector("#scenario-description"),
    bearing: document.querySelector("#primary-bearing"),
    routeState: document.querySelector("#route-state"),
    coordinateGrid: document.querySelector("#coordinate-grid"),
    distance: document.querySelector("#distance"),
    pathLength: document.querySelector("#path-length"),
    netProgress: document.querySelector("#net-progress"),
    orbitRatio: document.querySelector("#orbit-ratio"),
    routeMap: document.querySelector("#route-map"),
    obligations: document.querySelector("#obligations"),
    maneuvers: document.querySelector("#maneuvers"),
    movementClass: document.querySelector("#movement-class"),
    movementExplanation: document.querySelector("#movement-explanation"),
    delta: document.querySelector("#delta"),
    landing: document.querySelector("#landing"),
    trajectory: document.querySelector("#trajectory-list"),
    copyPrompt: document.querySelector("#copy-prompt")
  };

  let scenario;
  let state;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function clamp(value) {
    return Math.max(0, Math.min(1, value));
  }

  function distance(position) {
    return Math.sqrt(
      WEIGHTS.d * (GOAL.d - position.d) ** 2 +
      WEIGHTS.e * (GOAL.e - position.e) ** 2 +
      WEIGHTS.a * (GOAL.a - position.a) ** 2
    );
  }

  function segmentLength(before, after) {
    return Math.sqrt(
      WEIGHTS.d * (after.d - before.d) ** 2 +
      WEIGHTS.e * (after.e - before.e) ** 2 +
      WEIGHTS.a * (after.a - before.a) ** 2
    );
  }

  function primaryBearing(position) {
    const deficits = {
      Delivery: WEIGHTS.d * (1 - position.d),
      Evidence: WEIGHTS.e * (1 - position.e),
      Alignment: WEIGHTS.a * (1 - position.a)
    };
    const entries = Object.entries(deficits).sort((a, b) => b[1] - a[1]);
    if (entries[0][1] < 0.005) return "Landing checks";
    if (Math.abs(entries[0][1] - entries[1][1]) < 0.015) return "Balanced";
    return entries[0][0];
  }

  function allObligationsPass() {
    return state.obligations.every(item => item.status === "pass");
  }

  function isLanding() {
    return state.position.d >= 0.99 && state.position.e >= 0.99 && state.position.a >= 0.99 && allObligationsPass();
  }

  function movementClass(before, after, beforeBearing) {
    const beforeDistance = distance(before);
    const afterDistance = distance(after);
    const delta = {
      d: after.d - before.d,
      e: after.e - before.e,
      a: after.a - before.a
    };

    if (isLanding()) return ["LANDING", "Every mandatory coordinate and obligation now passes. Stop changing the product."];
    if (delta.a > EPS && before.a < 0.99) return ["ALIGNMENT_RECOVERY", "The maneuver repairs a user constraint or forbidden approach. Alignment recovery cannot be replaced by extra Delivery."];
    if (delta.e > EPS && beforeBearing === "Evidence") return ["EVIDENCE", "The maneuver follows the dominant Evidence bearing and refreshes observable proof."];
    if (afterDistance < beforeDistance - 0.002) return ["APPROACH", "Weighted distance to the accepted result decreased."];
    if (afterDistance > beforeDistance + 0.002) return ["RETREAT", "Weighted distance increased; the project moved away from acceptance."];
    return ["CROSS_TRACK", "The maneuver created activity without material progress on the current bearing."];
  }

  function routeState() {
    if (isLanding()) return "LANDED";
    if (state.lastClass === "RETREAT") return "RETREAT";
    if (state.zeroMoves >= 3) return "ORBITING";
    const progress = state.initialDistance - distance(state.position);
    const ratio = progress > EPS ? state.pathLength / progress : Infinity;
    if (ratio > 2.2) return "WINDING";
    return scenario.routeState || "DIRECT";
  }

  function applyManeuver(maneuver) {
    if (isLanding()) return;

    const before = clone(state.position);
    const beforeBearing = primaryBearing(before);
    const beforeDistance = distance(before);

    state.position = {
      d: clamp(before.d + maneuver.delta.d),
      e: clamp(before.e + maneuver.delta.e),
      a: clamp(before.a + maneuver.delta.a)
    };

    Object.entries(maneuver.effects || {}).forEach(([id, status]) => {
      const obligation = state.obligations.find(item => item.id === id);
      if (obligation) obligation.status = status;
    });

    const stepLength = segmentLength(before, state.position);
    state.pathLength += stepLength;
    const [classification, explanation] = movementClass(before, state.position, beforeBearing);
    const afterDistance = distance(state.position);

    if (Math.abs(beforeDistance - afterDistance) < 0.002) state.zeroMoves += 1;
    else state.zeroMoves = 0;

    state.lastClass = classification;
    state.lastExplanation = explanation;
    state.lastDelta = {
      d: state.position.d - before.d,
      e: state.position.e - before.e,
      a: state.position.a - before.a
    };
    state.points.push(clone(state.position));
    state.history.push({
      title: maneuver.title,
      classification,
      position: clone(state.position)
    });

    render();
  }

  function resetScenario() {
    scenario = window.ATLAS_SCENARIOS.find(item => item.id === els.scenario.value) || window.ATLAS_SCENARIOS[0];
    state = {
      position: clone(scenario.start),
      obligations: clone(scenario.obligations),
      pathLength: 0,
      initialDistance: distance(scenario.start),
      points: [clone(scenario.start)],
      history: [],
      zeroMoves: scenario.routeState === "ORBITING" ? 3 : 0,
      lastClass: "READY",
      lastExplanation: "Select one bounded maneuver. Atlas will classify the observable movement.",
      lastDelta: { d: 0, e: 0, a: 0 }
    };
    render();
  }

  function renderCoordinates() {
    const labels = [
      ["Delivery", "d", "Required output"],
      ["Evidence", "e", "Fresh proof"],
      ["Alignment", "a", "Intent and constraints"]
    ];
    els.coordinateGrid.innerHTML = labels.map(([label, key, description]) => {
      const value = state.position[key];
      return `<div class="coordinate-card">
        <header><span>${label}</span><strong>${value.toFixed(2)}</strong></header>
        <small>${description}</small>
        <div class="bar"><span style="width:${value * 100}%"></span></div>
      </div>`;
    }).join("");
  }

  function renderObligations() {
    els.obligations.innerHTML = state.obligations.map(item => `<div class="obligation">
      <span class="id">${item.id}</span>
      <p>${item.text}</p>
      <span class="state ${item.status}">${item.status.toUpperCase()}</span>
    </div>`).join("");
  }

  function renderManeuvers() {
    els.maneuvers.innerHTML = "";
    scenario.maneuvers.forEach(maneuver => {
      const button = document.createElement("button");
      button.className = "maneuver";
      button.disabled = isLanding();
      button.innerHTML = `<strong>${maneuver.title}</strong><span>${maneuver.detail}</span>`;
      button.addEventListener("click", () => applyManeuver(maneuver));
      els.maneuvers.appendChild(button);
    });
  }

  function projectPoint(point) {
    const x = 58 + point.d * 592;
    const y = 214 - ((point.e * 0.64 + point.a * 0.36) * 174);
    return [x, y];
  }

  function renderMap() {
    const points = state.points.map(projectPoint);
    const polyline = points.map(point => point.join(",")).join(" ");
    const circles = points.map((point, index) => `<circle cx="${point[0]}" cy="${point[1]}" r="${index === points.length - 1 ? 7 : 4}" fill="${index === 0 ? "#ff7f8e" : index === points.length - 1 ? "#7bf0b5" : "#59d8ff"}" />`).join("");
    const goal = projectPoint(GOAL);
    els.routeMap.innerHTML = `
      <defs><linearGradient id="route-gradient"><stop stop-color="#59d8ff"/><stop offset="1" stop-color="#7bf0b5"/></linearGradient></defs>
      <g stroke="#25465b" stroke-width="1" opacity=".8">
        <path d="M58 40V214H650" fill="none"/>
        <path d="M58 156H650M58 98H650M206 40V214M354 40V214M502 40V214"/>
      </g>
      <polyline points="${polyline}" fill="none" stroke="url(#route-gradient)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      ${circles}
      <circle cx="${goal[0]}" cy="${goal[1]}" r="11" fill="none" stroke="#f4cb72" stroke-width="3" />
      <text x="${goal[0] - 72}" y="${goal[1] - 16}" fill="#f4cb72" font-size="13">accepted result</text>
      <text x="58" y="235" fill="#9cb5c7" font-size="12">Delivery →</text>
      <text x="66" y="54" fill="#9cb5c7" font-size="12">Evidence + Alignment ↑</text>`;
  }

  function renderTrajectory() {
    if (!state.history.length) {
      els.trajectory.innerHTML = "<li><strong>Start</strong> — no maneuver selected yet.</li>";
      return;
    }
    els.trajectory.innerHTML = state.history.map((step, index) => `<li><strong>${index + 1}. ${step.classification}</strong> — ${step.title} · P=(${step.position.d.toFixed(2)}, ${step.position.e.toFixed(2)}, ${step.position.a.toFixed(2)})</li>`).join("");
  }

  function render() {
    const currentDistance = distance(state.position);
    const netProgress = state.initialDistance - currentDistance;
    const orbitRatio = netProgress > EPS ? state.pathLength / netProgress : Infinity;
    const bearing = primaryBearing(state.position);

    els.tag.textContent = scenario.id.replaceAll("-", " ");
    els.title.textContent = scenario.title;
    els.description.textContent = scenario.description;
    els.bearing.textContent = bearing;
    els.routeState.textContent = routeState();
    els.distance.textContent = currentDistance.toFixed(3);
    els.pathLength.textContent = state.pathLength.toFixed(3);
    els.netProgress.textContent = Math.max(0, netProgress).toFixed(3);
    els.orbitRatio.textContent = Number.isFinite(orbitRatio) ? orbitRatio.toFixed(2) : "—";
    els.movementClass.textContent = state.lastClass;
    els.movementExplanation.textContent = state.lastExplanation;
    els.delta.textContent = `Δ = (${formatDelta(state.lastDelta.d)}, ${formatDelta(state.lastDelta.e)}, ${formatDelta(state.lastDelta.a)})`;

    const blockers = state.obligations.filter(item => item.status !== "pass").map(item => item.id);
    els.landing.textContent = isLanding()
      ? "Landing gates: PASS. The accepted result is verified. Zero further product changes."
      : `Landing blockers: ${blockers.length ? blockers.join(", ") : "coordinate thresholds"}`;

    renderCoordinates();
    renderObligations();
    renderManeuvers();
    renderMap();
    renderTrajectory();
  }

  function formatDelta(value) {
    if (Math.abs(value) < EPS) return "0.00";
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}`;
  }

  async function copyPrompt() {
    const prompt = `Use Project Atlas from skills/project-atlas/SKILL.md.\nMaintain ATLAS_STATE.md with Delivery, Evidence, Alignment, movement class, evidence freshness, route metrics, and the next bounded maneuver.\nDo not declare completion until every landing gate passes.`;
    try {
      await navigator.clipboard.writeText(prompt);
      els.copyPrompt.textContent = "Prompt copied";
    } catch (_) {
      window.prompt("Copy this prompt:", prompt);
    }
    window.setTimeout(() => { els.copyPrompt.textContent = "Copy Atlas prompt"; }, 1800);
  }

  window.ATLAS_SCENARIOS.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.title;
    els.scenario.appendChild(option);
  });

  els.scenario.addEventListener("change", resetScenario);
  els.reset.addEventListener("click", resetScenario);
  els.copyPrompt.addEventListener("click", copyPrompt);
  resetScenario();
})();
