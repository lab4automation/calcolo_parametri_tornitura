const MATERIALS = {
  acciaio: {
    label: "Acciaio",
    family: "acciaio",
    valueLabel: "Rm [MPa]",
    defaultValue: 700,
    v0Bands: [
      { min: 340, max: 500, values: { "P1": 280, "P2": 210, "P3-P4": 115, HSS: 65 } },
      { min: 500, max: 700, values: { "P1": 180, "P2": 120, "P3-P4": 75, HSS: 35 } },
      { min: 700, max: 900, values: { "P1": 120, "P2": 85, "P3-P4": 45, HSS: 25 } },
      { min: 900, max: 1100, values: { "P1": 90, "P2": 65, "P3-P4": 35 } },
      { min: 1100, max: 1250, values: { "P1": 75, "P2": 50, "P3-P4": 30 } },
    ],
  },
  ghisa: {
    label: "Ghisa",
    family: "ghisa",
    valueLabel: "HB",
    defaultValue: 200,
    v0Bands: [
      { min: 100, max: 150, values: { "K1": 200, HSS: 40 } },
      { min: 150, max: 200, values: { "K1": 130, HSS: 30 } },
      { min: 200, max: 250, values: { "K1": 80, HSS: 18 } },
      { min: 250, max: 300, values: { "K1": 45 } },
    ],
  },
  alluminio: {
    label: "Alluminio",
    family: "nonFerrosi",
    valueLabel: "HB",
    defaultValue: 80,
    v0Bands: [
      { min: 0, max: 50, values: { "N1": 650, HSS: 120 } },
      { min: 50, max: 80, values: { "N1": 500, HSS: 100 } },
      { min: 80, max: 100, values: { "N1": 450, HSS: 90 } },
    ],
  },
  rame: {
    label: "Rame",
    family: "nonFerrosi",
    valueLabel: "HB",
    defaultValue: 80,
    v0Bands: [{ min: 0, max: 200, values: { "N3": 300, HSS: 45 } }],
  },
  ottone: {
    label: "Ottone",
    family: "nonFerrosi",
    valueLabel: "HB",
    defaultValue: 100,
    v0Bands: [{ min: 0, max: 200, values: { "N3": 400, HSS: 100 } }],
  },
  bronzo: {
    label: "Bronzo",
    family: "nonFerrosi",
    valueLabel: "HB",
    defaultValue: 100,
    v0Bands: [{ min: 0, max: 200, values: { "N3": 400, HSS: 60 } }],
  },
};

const Z_BY_FAMILY = {
  acciaio: 0.28,
  ghisa: 0.2,
  nonFerrosi: 0.1,
};

const E_BY_TOOL_AND_MATERIAL = {
  HSS: { acciaio: 0.14, ghisa: 0.1, rame: 0.22, bronzo: 0.22, ottone: 0.3, alluminio: 0.31 },
  carburi: { acciaio: 0.14, ghisa: 0.1, rame: 0.1, bronzo: 0.1, ottone: 0.1, alluminio: 0.1 },
};

const Y_BY_INSERT_AND_MATERIAL = {
  "P1": { acciaio: 0.3 },
  "P2": { acciaio: 0.3 },
  "P3-P4": { acciaio: 0.167 },
  "K1": { ghisa: 0.25 },
  "K1": { ghisa: 0.25 },
  "N1": { alluminio: 0.41, bronzo: 0.25, ottone: 0.25 },
  "N1": { alluminio: 0.41, rame: 0.12, bronzo: 0.25, ottone: 0.25 },
  HSS: { acciaio: 0.15, ghisa: 0.25, rame: 0.12, alluminio: 0.41, bronzo: 0.22, ottone: 0.22 },
};

const LR_BY_TOOL_AND_LUBRICATION = {
  HSS: { secco: 1, media: 1.2, massima: 1.5 },
  carburi: { secco: 1, media: 1.1, massima: 1.3 },
};

const X_BY_FAMILY_AND_ANGLE = {
  acciaio: { 30: 1.25, 45: 1, 60: 0.8, 90: 0.66 },
  ghisa: { 30: 1.15, 45: 1, 60: 0.89, 90: 0.72 },
  nonFerrosi: { 30: 1.2, 45: 1, 60: 0.85, 90: 0.69 },
};

const R_BY_MATERIAL = {
  acciaio: 0.803,
  ghisa: 0.865,
  rame: 0.76,
  bronzo: 0.76,
  ottone: 0.84,
  alluminio: 0.76,
};

const H_BY_MATERIAL = {
  acciaio: 0.16,
  ghisa: 0.12,
  rame: 0.22,
  bronzo: 0.22,
  ottone: 0.3,
  alluminio: 0.31,
};

const K1_TABLES = {
  acciaio: {
    columns: [400, 450, 500, 600, 700, 800, 900, 1000, 1100, 1200],
    rows: {
      0: [2400, 2500, 2650, 2850, 3100, 3250, 3450, 3650, 3800, 3970],
      5: [2280, 2400, 2520, 2750, 2950, 3150, 3300, 3460, 3630, 3770],
      10: [2180, 2280, 2420, 2615, 2820, 3000, 3160, 3320, 3500, 3620],
      15: [2080, 2200, 2300, 2500, 2690, 2850, 3000, 3180, 3340, 3470],
      20: [1980, 2080, 2200, 2380, 2550, 2730, 2870, 3050, 3200, 3340],
    },
  },
  ghisa: {
    columns: [100, 120, 140, 160, 200, 240, 280, 320, 360, 400],
    rows: {
      0: [1050, 1140, 1200, 1280, 1390, 1500, 1600, 1680, 1760, 1840],
      5: [1000, 1080, 1150, 1210, 1340, 1420, 1520, 1600, 1680, 1750],
      10: [960, 1035, 1100, 1170, 1260, 1360, 1450, 1530, 1590, 1670],
      15: [910, 1000, 1050, 1110, 1210, 1300, 1390, 1470, 1530, 1585],
      20: [880, 940, 990, 1050, 1150, 1230, 1320, 1400, 1460, 1510],
    },
  },
  alluminio: {
    rows: {
      15: [null, 700, 800],
      20: [null, 650, 700],
      25: [560, 600, null],
      30: [530, null, null],
    },
  },
  bronzoOttone: {
    rows: {
      10: [640, 750, 1000],
      15: [600, 700, null],
    },
  },
};

const INSERT_OPTIONS = ["P1", "P2", "P3-P4", "K1", "N1", "N3", "HSS"];
const TOOL_OPTIONS = [
  { value: "carburi", label: "Carburi metallici" },
  { value: "HSS", label: "Acciaio super rapido" },
];
const LUBRICATION_OPTIONS = [
  { value: "secco", label: "A secco" },
  { value: "media", label: "Media portata" },
  { value: "massima", label: "Massima portata" },
];
const ANGLES = [30, 45, 60, 90];
const RAKE_ANGLES = [0, 5, 10, 15, 20, 25, 30];
const DEFAULT_SEGMENTS = [
  { name: "Tratto 1", diameter: 17, length: 24 },
  { name: "Tratto 2", diameter: 25, length: 21 },
  { name: "Tratto 3", diameter: 35, length: 20 },
  { name: "Tratto 4", diameter: 50, length: 50 },
];

const form = document.getElementById("turning-form");
const materialCategory = document.getElementById("materialCategory");
const materialValue = document.getElementById("materialValue");
const exportPdfButton = document.getElementById("exportPdfButton");
const roughToolMaterial = document.getElementById("roughToolMaterial");
const finishToolMaterial = document.getElementById("finishToolMaterial");
const roughInsertCode = document.getElementById("roughInsertCode");
const finishInsertCode = document.getElementById("finishInsertCode");
const lubrication = document.getElementById("lubrication");
const approachAngle = document.getElementById("approachAngle");
const rakeAngle = document.getElementById("rakeAngle");
const segmentsBody = document.getElementById("segments-body");
const resultsGrid = document.getElementById("results-grid");
const coefficientsBody = document.getElementById("coefficients-body");
const segmentResultsBody = document.getElementById("segment-results-body");
const roughPassDetailsBody = document.getElementById("rough-pass-details-body");
const finishPassDetailsBody = document.getElementById("finish-pass-details-body");
const messages = document.getElementById("messages");

bootstrap();

function bootstrap() {
  populateSelect(materialCategory, Object.entries(MATERIALS).map(([value, entry]) => ({ value, label: entry.label })));
  populateSelect(roughToolMaterial, TOOL_OPTIONS);
  populateSelect(finishToolMaterial, TOOL_OPTIONS);
  populateSelect(roughInsertCode, INSERT_OPTIONS.map((value) => ({ value, label: value })));
  populateSelect(finishInsertCode, INSERT_OPTIONS.map((value) => ({ value, label: value })));
  populateSelect(lubrication, LUBRICATION_OPTIONS);
  populateSelect(approachAngle, ANGLES.map((value) => ({ value: String(value), label: `${value}°` })));
  populateSelect(rakeAngle, RAKE_ANGLES.map((value) => ({ value: String(value), label: `${value}°` })));
  segmentsBody.innerHTML = DEFAULT_SEGMENTS.map(renderSegmentRow).join("");

  roughToolMaterial.value = "carburi";
  finishToolMaterial.value = "carburi";
  roughInsertCode.value = "P2";
  finishInsertCode.value = "P2";
  lubrication.value = "media";
  approachAngle.value = "45";
  rakeAngle.value = "10";

  materialCategory.addEventListener("change", syncMaterialInputs);
  form.addEventListener("submit", onSubmit);
  exportPdfButton.addEventListener("click", exportToPdf);

  syncMaterialInputs();
}

function populateSelect(select, options) {
  select.innerHTML = options
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");
}

function renderSegmentRow(segment, index) {
  return `
    <tr>
      <td>${segment.name}</td>
      <td><input type="number" name="segmentDiameter${index}" min="0.1" step="0.1" value="${segment.diameter}" /></td>
      <td><input type="number" name="segmentLength${index}" min="0.1" step="0.1" value="${segment.length}" /></td>
    </tr>
  `;
}

function syncMaterialInputs() {
  const material = MATERIALS[materialCategory.value];
  materialValue.value = material.defaultValue;
  materialValue.previousElementSibling.textContent = `Resistenza / durezza materiale ${material.valueLabel}`;
  calculateAndRender();
}

function onSubmit(event) {
  event.preventDefault();
  calculateAndRender();
}

async function exportToPdf() {
  const originalLabel = exportPdfButton.textContent;
  exportPdfButton.disabled = true;
  exportPdfButton.textContent = "Apro stampa...";

  try {
    if (window.MathJax?.typesetPromise) {
      await window.MathJax.typesetPromise();
    }
    window.print();
  } catch (error) {
    window.alert("Non sono riuscito ad aprire la stampa. Riprova dal browser.");
  } finally {
    exportPdfButton.disabled = false;
    exportPdfButton.textContent = originalLabel;
  }
}

function calculateAndRender() {
  const data = readFormData();
  const validation = validateData(data);

  if (!validation.valid) {
    renderMessages(validation.messages);
    resultsGrid.innerHTML = "";
    coefficientsBody.innerHTML = "";
    segmentResultsBody.innerHTML = "";
    roughPassDetailsBody.innerHTML = "";
    finishPassDetailsBody.innerHTML = "";
    return;
  }

  const rough = computeOperation("Sgrossatura", data, data.roughing);
  const finish = computeOperation("Finitura", data, data.finishing);
  const geometry = computeGeometry(data);

  renderMessages(buildMessages(data, rough, finish));
  renderCards(data, rough, finish, geometry);
  renderCoefficientTable(rough, finish);
  renderSegmentTable(rough.segmentPasses, finish.segmentPasses);
  renderPassDetailsTable(rough, finish);
}

function readFormData() {
  const formData = new FormData(form);
  const materialKey = formData.get("materialCategory");

  return {
    materialKey,
    material: MATERIALS[materialKey],
    toolType: formData.get("toolType").trim(),
    materialValue: number(formData.get("materialValue")),
    density: number(formData.get("density")),
    lubrication: formData.get("lubrication"),
    approachAngle: number(formData.get("approachAngle")),
    rakeAngle: number(formData.get("rakeAngle")),
    machinePower: number(formData.get("machinePower")),
    lotSize: number(formData.get("lotSize")),
    approachExtra: number(formData.get("approachExtra")),
    stockDiameter: number(formData.get("stockDiameter")),
    finishAllowance: number(formData.get("finishAllowance")),
    segments: DEFAULT_SEGMENTS.map((segment, index) => ({
      name: segment.name,
      diameter: number(formData.get(`segmentDiameter${index}`)),
      length: number(formData.get(`segmentLength${index}`)),
    })),
    roughing: {
      toolMaterial: formData.get("roughToolMaterial"),
      insertCode: formData.get("roughInsertCode"),
      depth: number(formData.get("roughDepth")),
      feed: number(formData.get("roughFeed")),
      toolLife: number(formData.get("roughToolLife")),
    },
    finishing: {
      toolMaterial: formData.get("finishToolMaterial"),
      insertCode: formData.get("finishInsertCode"),
      depth: number(formData.get("finishDepth")),
      feed: number(formData.get("finishFeed")),
      toolLife: number(formData.get("finishToolLife")),
    },
  };
}

function validateData(data) {
  const messages = [];

  if (data.segments.some((segment) => segment.diameter <= 0 || segment.length <= 0)) {
    messages.push("Ogni tratto deve avere diametro e lunghezza maggiori di zero.");
  }

  if (data.segments.some((segment) => segment.diameter > data.stockDiameter)) {
    messages.push("Il diametro finale di un tratto non puo superare il diametro grezzo iniziale.");
  }

  if ([data.materialValue, data.density, data.machinePower, data.lotSize, data.approachExtra].some((value) => value <= 0)) {
    messages.push("Materiale, densita, potenza macchina, lotto ed extra corsa devono essere maggiori di zero.");
  }

  ["roughing", "finishing"].forEach((key) => {
    const operation = data[key];
    if (operation.depth <= 0 || operation.feed <= 0 || operation.toolLife <= 0) {
      messages.push(`I parametri della ${key === "roughing" ? "sgrossatura" : "finitura"} devono essere maggiori di zero.`);
    }
  });

  if (data.finishing.depth > data.finishAllowance) {
    messages.push(
      `Attenzione: la profondita di passata finitura (${formatNumber(data.finishing.depth, 3)} mm) non puo superare il sovrametallo radiale per finitura (${formatNumber(data.finishAllowance, 3)} mm).`
    );
  } else if (data.finishing.depth > 0 && data.finishAllowance > 0) {
    const ratio = data.finishAllowance / data.finishing.depth;
    if (Math.abs(ratio - Math.round(ratio)) > 1e-9) {
      const validValues = [];
      for (let n = 1; n <= 10; n++) {
        const candidate = data.finishAllowance / n;
        if (candidate >= 0.01) validValues.push(formatNumber(candidate, 3));
      }
      messages.push(
        `Attenzione: la profondita di passata finitura (${formatNumber(data.finishing.depth, 3)} mm) deve essere una frazione intera del sovrametallo (${formatNumber(data.finishAllowance, 3)} mm). Valori ammessi: ${validValues.join(" mm, ")} mm.`
      );
    }
  }

  return { valid: messages.length === 0, messages };
}

function computeOperation(label, data, operation) {
  const familyKey = data.material.family;
  const q = operation.depth * operation.feed;
  const z = Z_BY_FAMILY[familyKey];
  const e = lookupE(data.materialKey, operation.toolMaterial);
  const y = lookupY(data.materialKey, operation.insertCode, operation.toolMaterial);
  const lr = lookupLr(operation.toolMaterial, data.lubrication);
  const x = lookupX(familyKey, data.approachAngle);
  const v0 = lookupV0(data.materialKey, data.materialValue, operation.insertCode, operation.toolMaterial);
  const k1 = lookupK1(data.materialKey, data.materialValue, data.rakeAngle);
  const r = R_BY_MATERIAL[data.materialKey];
  const h = H_BY_MATERIAL[data.materialKey];

  const cuttingSpeed = (v0 / Math.pow(q, z)) * Math.pow(operation.depth / (5 * operation.feed), e) / Math.pow(operation.toolLife / 60, y) * lr * x;
  const cuttingForce = k1 * Math.pow(q, r) * Math.pow(operation.depth / (5 * operation.feed), h);
  const cuttingPower = (cuttingForce * cuttingSpeed) / 60000;
  const segmentPasses = computeSegmentPasses(label, data, operation, cuttingSpeed);
  const totalTimePerPiece = segmentPasses.reduce((sum, segment) => sum + segment.timeMin, 0);

  segmentPasses.forEach((segment) => {
    segment.passDetails.forEach((pass) => {
      const passQ = pass.passDepth * operation.feed;
      pass.cuttingForce = k1 * Math.pow(passQ, r) * Math.pow(pass.passDepth / (5 * operation.feed), h);
      pass.cuttingPower = (pass.cuttingForce * cuttingSpeed) / 60000;
    });
  });

  return {
    label,
    q,
    z,
    e,
    y,
    lr,
    x,
    v0,
    k1,
    r,
    h,
    cuttingSpeed,
    cuttingForce,
    cuttingPower,
    totalTimePerPiece,
    totalTimeLot: totalTimePerPiece * data.lotSize,
    segmentPasses,
  };
}

function computeSegmentPasses(label, data, operation, cuttingSpeed) {
  const isRoughing = label === "Sgrossatura";
  const roughDiameters = data.segments.map((segment) =>
    Math.min(data.stockDiameter, segment.diameter + 2 * data.finishAllowance)
  );

  return data.segments.map((segment, segmentIndex) => {
    let currentDiameter;
    let targetDiameter;

    if (isRoughing) {
      targetDiameter = roughDiameters[segmentIndex];
      currentDiameter =
        segmentIndex === data.segments.length - 1
          ? data.stockDiameter
          : data.segments[segmentIndex + 1].diameter;
    } else {
      targetDiameter = segment.diameter;
      currentDiameter = Math.min(data.stockDiameter, segment.diameter + 2 * data.finishAllowance);
    }

    const diametralRemoval = Math.max(0, currentDiameter - targetDiameter);
    const passCapacity = 2 * operation.depth;
    const passes = diametralRemoval === 0 ? 0 : Math.ceil(diametralRemoval / passCapacity);
    let timeMin = 0;
    let runningDiameter = currentDiameter;
    const passDetails = [];

    for (let index = 0; index < passes; index += 1) {
      const nextDiameter = Math.max(targetDiameter, runningDiameter - passCapacity);
      const effectiveDiameter = Math.max(segment.diameter, (runningDiameter + nextDiameter) / 2);
      const spindleSpeed = (1000 * cuttingSpeed) / (Math.PI * effectiveDiameter);
      const passDepth = index < passes - 1
        ? operation.depth
        : (diametralRemoval - (passes - 1) * 2 * operation.depth) / 2;
      timeMin += (segment.length + data.approachExtra) / (spindleSpeed * operation.feed);
      passDetails.push({ passDepth, spindleSpeed });
      runningDiameter = nextDiameter;
    }

    return {
      name: segment.name,
      passes,
      timeMin,
      passDepths: passDetails.map((d) => d.passDepth),
      passDetails,
    };
  });
}

function computeGeometry(data) {
  const stockVolume = data.segments.reduce(
    (sum, segment) => sum + cylinderVolume(data.stockDiameter, segment.length),
    0
  );
  const finalVolume = data.segments.reduce(
    (sum, segment) => sum + cylinderVolume(segment.diameter, segment.length),
    0
  );
  const removedVolumeMm3 = stockVolume - finalVolume;
  const removedMassKg = removedVolumeMm3 / 1000000 * data.density;

  return {
    stockLength: data.segments.reduce((sum, segment) => sum + segment.length, 0),
    removedVolumeMm3,
    removedVolumeCm3: removedVolumeMm3 / 1000,
    removedMassKg,
    removedMassLotKg: removedMassKg * data.lotSize,
  };
}

function buildMessages(data, rough, finish) {
  const list = [
    `Per la sgrossatura e stata usata la sezione del truciolo Q = p * a = ${formatNumber(rough.q, 3)} mm2.`,
    `Per la finitura e stata usata la sezione del truciolo Q = p * a = ${formatNumber(finish.q, 3)} mm2.`,
    `Tempi calcolati sommando le passate sui ${data.segments.length} tratti del pezzo.`,
  ];

  if (rough.cuttingPower > data.machinePower) {
    list.push(`Attenzione: la potenza di sgrossatura (${formatNumber(rough.cuttingPower)} kW) supera quella disponibile al mandrino.`);
  }

  if (finish.cuttingPower > data.machinePower) {
    list.push(`Attenzione: la potenza di finitura (${formatNumber(finish.cuttingPower)} kW) supera quella disponibile al mandrino.`);
  }

  if (data.materialKey !== "acciaio") {
    list.push("Per materiali non ferrosi o ghisa alcune tabelle erano parziali: l'app usa il valore tabellato disponibile piu vicino.");
  }

  return list;
}

function renderMessages(items) {
  messages.innerHTML = items
    .map((item) => {
      const type = item.startsWith("Attenzione") ? "warning" : "info";
      return `<div class="message ${type}">${item}</div>`;
    })
    .join("");
}

function renderCards(data, rough, finish, geometry) {
  const cards = [
    {
      title: "Bilancio lavorazione lotto",
      rows: [
        ["Pezzi", `${data.lotSize}`],
        ["Tempo sgrossatura / pezzo", `${formatNumber(rough.totalTimePerPiece)} min`],
        ["Tempo sgrossatura lotto", `${formatNumber(rough.totalTimeLot)} min`],
        ["Tempo finitura / pezzo", `${formatNumber(finish.totalTimePerPiece)} min`],
        ["Tempo finitura lotto", `${formatNumber(finish.totalTimeLot)} min`],
        ["Tempo totale per pezzo", `${formatNumber(rough.totalTimePerPiece + finish.totalTimePerPiece)} min`],
        ["Tempo totale lotto", `${formatNumber(rough.totalTimeLot + finish.totalTimeLot)} min`],
        ["Lunghezza totale pezzo", `${formatNumber(geometry.stockLength)} mm`],
        ["Materiale asportato", `${formatNumber(geometry.removedVolumeCm3)} cm3`],
        ["Peso asportato", `${formatNumber(geometry.removedMassKg)} kg/pezzo`],
        ["Peso totale asportato lotto", `${formatNumber(geometry.removedMassLotKg)} kg`],
      ],
    },
  ];

  resultsGrid.innerHTML = cards
    .map(
      (card, cardIndex) => {
        const isFull = cards.length === 1 || (cards.length % 2 !== 0 && cardIndex === cards.length - 1);
        const metricLines = card.rows
          .map(([label, value]) => `
            <div class="metric-line">
              <span class="metric-label">${label}</span>
              <span class="metric-value">${value}</span>
            </div>
          `)
          .join("");
        return `
          <article class="metric-card${isFull ? " full-width" : ""}">
            <h3>${card.title}</h3>
            <div class="metric-body">${metricLines}</div>
          </article>
        `;
      }
    )
    .join("");
}

function renderCoefficientTable(rough, finish) {
  const rows = [
    ["Q = p * a [mm2]", rough.q, finish.q],
    ["V0 [m/min]", rough.v0, finish.v0],
    ["z", rough.z, finish.z],
    ["e", rough.e, finish.e],
    ["y", rough.y, finish.y],
    ["Lr", rough.lr, finish.lr],
    ["X", rough.x, finish.x],
    ["K1 [N/mm2]", rough.k1, finish.k1],
    ["r", rough.r, finish.r],
    ["h", rough.h, finish.h],
  ];

  coefficientsBody.innerHTML = rows
    .map(
      ([label, left, right]) => `
      <tr>
        <td>${label}</td>
        <td>${formatNumber(left, 3)}</td>
        <td>${formatNumber(right, 3)}</td>
      </tr>
    `
    )
    .join("");
}

function renderSegmentTable(roughSegments, finishSegments) {
  segmentResultsBody.innerHTML = roughSegments
    .map((segment, index) => {
      const finish = finishSegments[index];
      return `
        <tr>
          <td>${segment.name}</td>
          <td>${segment.passes}</td>
          <td>${segment.passDepths.length === 0 ? "-" : segment.passDepths.map((d) => formatNumber(d)).join("<br>")}</td>
          <td>${formatNumber(segment.timeMin)}</td>
          <td>${finish.passes}</td>
          <td>${formatNumber(finish.timeMin)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderPassDetailsTable(rough, finish) {
  roughPassDetailsBody.innerHTML = buildPassRows(rough.segmentPasses, rough.cuttingSpeed);
  finishPassDetailsBody.innerHTML = buildPassRows(finish.segmentPasses, finish.cuttingSpeed);
}

function buildPassRows(segments, cuttingSpeed) {
  return segments.flatMap((segment) => {
    if (segment.passDetails.length === 0) {
      return [`<tr><td>${segment.name}</td><td colspan="6">—</td></tr>`];
    }
    return segment.passDetails.map((pass, i) => `
      <tr>
        <td>${i === 0 ? segment.name : ""}</td>
        <td>${i + 1}</td>
        <td>${formatNumber(pass.passDepth)}</td>
        <td>${formatNumber(cuttingSpeed)}</td>
        <td>${formatNumber(pass.spindleSpeed, 0)}</td>
        <td>${formatNumber(pass.cuttingForce)}</td>
        <td>${formatNumber(pass.cuttingPower, 3)}</td>
      </tr>
    `);
  }).join("");
}

function lookupV0(materialKey, materialValue, insertCode, toolMaterial) {
  const material = MATERIALS[materialKey];
  const band = material.v0Bands.find((entry) => materialValue >= entry.min && materialValue < entry.max) ?? material.v0Bands.at(-1);
  const requestedKey = toolMaterial === "HSS" ? "HSS" : insertCode;
  return band.values[requestedKey] ?? nearestAvailableValue(band.values);
}

function lookupE(materialKey, toolMaterial) {
  return E_BY_TOOL_AND_MATERIAL[toolMaterial][materialKey];
}

function lookupY(materialKey, insertCode, toolMaterial) {
  if (Y_BY_INSERT_AND_MATERIAL[insertCode]?.[materialKey] !== undefined) {
    return Y_BY_INSERT_AND_MATERIAL[insertCode][materialKey];
  }
  return Y_BY_INSERT_AND_MATERIAL[toolMaterial]?.[materialKey] ?? nearestAvailableValue(Y_BY_INSERT_AND_MATERIAL[insertCode] ?? {});
}

function lookupLr(toolMaterial, lubricationKey) {
  return LR_BY_TOOL_AND_LUBRICATION[toolMaterial][lubricationKey];
}

function lookupX(materialFamily, angle) {
  return X_BY_FAMILY_AND_ANGLE[materialFamily][angle];
}

function lookupK1(materialKey, materialValue, rake) {
  if (materialKey === "acciaio" || materialKey === "ghisa") {
    const table = K1_TABLES[materialKey];
    const rowAngle = nearestKey(table.rows, rake);
    const columnIndex = nearestIndex(table.columns, materialValue);
    return table.rows[rowAngle][columnIndex];
  }

  if (materialKey === "alluminio") {
    const rowAngle = nearestKey(K1_TABLES.alluminio.rows, rake);
    const columnIndex = materialValue < 50 ? 0 : materialValue <= 80 ? 1 : 2;
    return nearestNonNullInRow(K1_TABLES.alluminio.rows[rowAngle], columnIndex);
  }

  const rowAngle = nearestKey(K1_TABLES.bronzoOttone.rows, rake);
  const columnIndex = materialValue < 80 ? 0 : materialValue <= 100 ? 1 : 2;
  return nearestNonNullInRow(K1_TABLES.bronzoOttone.rows[rowAngle], columnIndex);
}

function nearestKey(object, target) {
  return Number(
    Object.keys(object).reduce((best, current) =>
      Math.abs(Number(current) - target) < Math.abs(Number(best) - target) ? current : best
    )
  );
}

function nearestIndex(values, target) {
  return values.reduce(
    (bestIndex, currentValue, index) =>
      Math.abs(currentValue - target) < Math.abs(values[bestIndex] - target) ? index : bestIndex,
    0
  );
}

function nearestAvailableValue(object) {
  return Object.values(object).find((value) => value !== null && value !== undefined);
}

function nearestNonNullInRow(row, preferredIndex) {
  if (row[preferredIndex] !== null && row[preferredIndex] !== undefined) {
    return row[preferredIndex];
  }

  let offset = 1;
  while (offset < row.length) {
    const left = preferredIndex - offset;
    const right = preferredIndex + offset;

    if (left >= 0 && row[left] !== null && row[left] !== undefined) {
      return row[left];
    }

    if (right < row.length && row[right] !== null && row[right] !== undefined) {
      return row[right];
    }

    offset += 1;
  }

  return row.find((value) => value !== null && value !== undefined);
}

function cylinderVolume(diameterMm, lengthMm) {
  return Math.PI * Math.pow(diameterMm, 2) * lengthMm / 4;
}

function number(value) {
  return Number(value);
}

function formatNumber(value, digits = 2) {
  return new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}
