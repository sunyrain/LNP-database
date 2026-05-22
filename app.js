"use strict";

const DATA_FILES = {
  summary: "data/summary.json",
  sourceInventory: "data/source_inventory.json",
  activityMetrics: "data/activity_metrics.json",
  componentSummary: "data/component_summary.json",
  overlap: "data/overlap.json",
  supplementQueue: "data/supplement_queue.json",
  recordsPreview: "data/records_preview.json",
  contextSummary: "data/context_summary.json",
  usageAnalysis: "data/usage_analysis.json",
  deepLearningAnalysis: "data/deep_learning_analysis.json"
};

const LANG = document.documentElement.lang.toLowerCase().startsWith("zh") ? "zh" : "en";
const nf = new Intl.NumberFormat(LANG === "zh" ? "zh-CN" : "en-US");

const state = {
  data: {},
  sources: { search: "", collection: "", sortKey: "records", sortAsc: false },
  activity: { search: "", sortKey: "numeric_rows", sortAsc: false },
  overlap: { search: "", risk: "", sortKey: "shared_smiles", sortAsc: false },
  queue: { search: "", priority: "" },
  records: { search: "", collection: "", page: 1, perPage: 100 }
};

const I18N = {
  en: {
    activityMetric: "Activity Metric",
    activityValue: "Activity Value",
    activityValues: "activity values",
    allRows: "all rows",
    cellContext: "Cell Context",
    collection: "Collection",
    componentRows: "component rows",
    coreHigh: "{core} core, {high} high-throughput",
    coreOpen: "Core open",
    dataAssetsError: "Unable to load static data assets. Serve this directory over HTTP and retry. Details: {message}",
    datasetDoi: "Dataset DOI",
    deliveryTarget: "Delivery Target",
    detailTitle: "{collection} / {source}",
    generated: "generated {time}",
    high: "High",
    highThroughput: "High-throughput",
    low: "Low",
    medium: "Medium",
    metricGroups: "{count} metric groups",
    noData: "No data",
    pageInfo: "Page {page} of {total}",
    pairs: "{count} pairs",
    payload: "Payload",
    previewId: "Preview ID",
    previewRows: "{count} preview rows",
    publicationDoi: "Publication DOI",
    readiness: "readiness",
    records: "records",
    role: "Role",
    rows: "{count} rows",
    source: "Source",
    sourceRecordId: "Source Record ID",
    sources: "sources",
    usageBlocks: "usage blocks",
    useFraction: "{value}% of integrated rows",
    withActivity: "activity",
    withContext: "context",
    withPayload: "payload",
    withRatio: "ratio",
    withSmiles: "SMILES",
    samples: "samples",
    coverage: "coverage"
  },
  zh: {
    activityMetric: "活性指标",
    activityValue: "活性值",
    activityValues: "活性数值",
    allRows: "全量记录",
    cellContext: "细胞/实验背景",
    collection: "数据层",
    componentRows: "组分记录",
    coreHigh: "{core} 条核心开源，{high} 条高通量",
    coreOpen: "核心开源",
    dataAssetsError: "无法加载静态数据资产。请通过 HTTP 服务打开本目录后重试。错误详情：{message}",
    datasetDoi: "数据集 DOI",
    deliveryTarget: "递送靶向",
    detailTitle: "{collection} / {source}",
    generated: "生成时间 {time}",
    high: "高",
    highThroughput: "高通量",
    low: "低",
    medium: "中",
    metricGroups: "{count} 个指标分组",
    noData: "暂无数据",
    pageInfo: "第 {page} / {total} 页",
    pairs: "{count} 对",
    payload: "载荷",
    previewId: "预览编号",
    previewRows: "{count} 条预览记录",
    publicationDoi: "论文 DOI",
    readiness: "准备度",
    records: "条记录",
    role: "角色",
    rows: "{count} 行",
    source: "来源",
    sourceRecordId: "来源记录 ID",
    sources: "来源",
    usageBlocks: "用途分块",
    useFraction: "占整合记录 {value}%",
    withActivity: "活性",
    withContext: "语境",
    withPayload: "载荷",
    withRatio: "比例",
    withSmiles: "SMILES",
    samples: "样本",
    coverage: "覆盖率"
  }
};

const METRIC_FAMILY_LABELS = {
  delivery_expression: { en: "Delivery / expression", zh: "递送/表达" },
  safety_tolerability: { en: "Safety / tolerability", zh: "安全性/耐受性" },
  particle_quality: { en: "Particle quality", zh: "颗粒质量" },
  tropism_biodistribution: { en: "Tropism / biodistribution", zh: "趋向性/生物分布" },
  other_activity: { en: "Other activity", zh: "其他活性" }
};

function $(id) {
  return document.getElementById(id);
}

function t(key, values = {}) {
  let template = I18N[LANG][key] || I18N.en[key] || key;
  for (const [name, value] of Object.entries(values)) {
    template = template.replaceAll(`{${name}}`, value);
  }
  return template;
}

function label(row, field) {
  return row[`${field}_${LANG}`] || row[`${field}_en`] || row[field] || "";
}

function text(value, fallback = "-") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function number(value, digits = null) {
  if (value === null || value === undefined || value === "") return "-";
  const n = Number(value);
  if (!Number.isFinite(n)) return text(value);
  return digits === null ? nf.format(n) : n.toFixed(digits);
}

function pct(value, digits = 1) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return `${(n * 100).toFixed(digits)}%`;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}

function normalize(value) {
  return text(value, "").toLowerCase();
}

function rowContains(row, query, fields) {
  if (!query) return true;
  const q = normalize(query);
  return fields.some((field) => normalize(row[field]).includes(q));
}

function compareRows(a, b, key, asc) {
  const av = a[key];
  const bv = b[key];
  const an = Number(av);
  const bn = Number(bv);
  let result;
  if (Number.isFinite(an) && Number.isFinite(bn)) {
    result = an - bn;
  } else {
    result = text(av, "").localeCompare(text(bv, ""), undefined, { numeric: true, sensitivity: "base" });
  }
  return asc ? result : -result;
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  return response.json();
}

async function loadData() {
  try {
    const entries = await Promise.all(
      Object.entries(DATA_FILES).map(async ([key, path]) => [key, await fetchJson(path)])
    );
    state.data = Object.fromEntries(entries);
    if ($("loadingPanel")) $("loadingPanel").hidden = true;
    if ($("mainContent")) $("mainContent").hidden = false;
    bindEvents();
    renderAll();
  } catch (error) {
    if ($("loadingPanel")) $("loadingPanel").hidden = true;
    if ($("errorPanel")) {
      $("errorPanel").hidden = false;
      $("errorPanel").textContent = t("dataAssetsError", { message: error.message });
    }
  }
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => setTab(button.dataset.tab));
  });

  bindClick("downloadSummaryBtn", () => downloadJson("lnp_pages_summary.json", state.data.summary));

  bindInput("sourceSearch", (value) => { state.sources.search = value; renderSources(); });
  bindChange("sourceCollectionFilter", (value) => { state.sources.collection = value; renderSources(); });
  bindClick("clearSourceFilters", () => {
    state.sources.search = "";
    state.sources.collection = "";
    if ($("sourceSearch")) $("sourceSearch").value = "";
    if ($("sourceCollectionFilter")) $("sourceCollectionFilter").value = "";
    renderSources();
  });
  bindClick("downloadSourcesBtn", () => downloadCsv("lnp_source_inventory_filtered.csv", filteredSources()));
  document.querySelectorAll("[data-source-sort]").forEach((th) => {
    th.addEventListener("click", () => updateSort(state.sources, th.dataset.sourceSort, renderSources));
  });

  bindInput("activitySearch", (value) => { state.activity.search = value; renderActivity(); });
  bindClick("clearActivityFilters", () => {
    state.activity.search = "";
    if ($("activitySearch")) $("activitySearch").value = "";
    renderActivity();
  });
  bindClick("downloadActivityBtn", () => downloadCsv("lnp_activity_metrics_filtered.csv", filteredActivity()));
  document.querySelectorAll("[data-activity-sort]").forEach((th) => {
    th.addEventListener("click", () => updateSort(state.activity, th.dataset.activitySort, renderActivity));
  });

  bindInput("overlapSearch", (value) => { state.overlap.search = value; renderOverlap(); });
  bindChange("overlapRiskFilter", (value) => { state.overlap.risk = value; renderOverlap(); });
  bindClick("clearOverlapFilters", () => {
    state.overlap.search = "";
    state.overlap.risk = "";
    if ($("overlapSearch")) $("overlapSearch").value = "";
    if ($("overlapRiskFilter")) $("overlapRiskFilter").value = "";
    renderOverlap();
  });
  bindClick("downloadOverlapBtn", () => downloadCsv("lnp_overlap_filtered.csv", filteredOverlap()));
  document.querySelectorAll("[data-overlap-sort]").forEach((th) => {
    th.addEventListener("click", () => updateSort(state.overlap, th.dataset.overlapSort, renderOverlap));
  });

  bindInput("queueSearch", (value) => { state.queue.search = value; renderQueue(); });
  bindChange("queuePriorityFilter", (value) => { state.queue.priority = value; renderQueue(); });
  bindClick("clearQueueFilters", () => {
    state.queue.search = "";
    state.queue.priority = "";
    if ($("queueSearch")) $("queueSearch").value = "";
    if ($("queuePriorityFilter")) $("queuePriorityFilter").value = "";
    renderQueue();
  });
  bindClick("downloadQueueBtn", () => downloadCsv("lnp_literature_queue_filtered.csv", filteredQueue()));

  bindInput("recordSearch", (value) => {
    state.records.search = value;
    state.records.page = 1;
    renderRecords();
  });
  bindChange("recordCollectionFilter", (value) => {
    state.records.collection = value;
    state.records.page = 1;
    renderRecords();
  });
  bindClick("clearRecordFilters", () => {
    state.records.search = "";
    state.records.collection = "";
    state.records.page = 1;
    if ($("recordSearch")) $("recordSearch").value = "";
    if ($("recordCollectionFilter")) $("recordCollectionFilter").value = "";
    renderRecords();
  });
  bindClick("downloadRecordsBtn", () => downloadCsv("lnp_records_preview_filtered.csv", filteredRecords()));
  bindClick("recordPrevBtn", () => {
    state.records.page = Math.max(1, state.records.page - 1);
    renderRecords();
  });
  bindClick("recordNextBtn", () => {
    const totalPages = Math.max(1, Math.ceil(filteredRecords().length / state.records.perPage));
    state.records.page = Math.min(totalPages, state.records.page + 1);
    renderRecords();
  });

  bindClick("closeDetailBtn", closeDetail);
  const modal = $("detailModal");
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeDetail();
    });
  }
}

function bindInput(id, fn) {
  const el = $(id);
  if (el) el.addEventListener("input", (event) => fn(event.target.value));
}

function bindChange(id, fn) {
  const el = $(id);
  if (el) el.addEventListener("change", (event) => fn(event.target.value));
}

function bindClick(id, fn) {
  const el = $(id);
  if (el) el.addEventListener("click", fn);
}

function updateSort(sortState, key, renderFn) {
  if (sortState.sortKey === key) {
    sortState.sortAsc = !sortState.sortAsc;
  } else {
    sortState.sortKey = key;
    sortState.sortAsc = false;
  }
  renderFn();
}

function setTab(tab) {
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${tab}`);
  });
}

function renderAll() {
  renderStats();
  renderUsageBlocks();
  renderDeepLearning();
  renderUseSourceMatrix();
  renderMetricFamilies();
  renderReadinessMatrix();
  renderOverviewBars();
  renderSources();
  renderActivity();
  renderComponents();
  renderOverlap();
  renderQueue();
  renderRecords();
}

function renderStats() {
  const counts = state.data.summary.counts;
  const usage = state.data.usageAnalysis.usage_blocks || [];
  const byKey = Object.fromEntries(usage.map((block) => [block.key, block]));
  setText("statCombined", number(counts.combined_records));
  setText("statCoreHigh", t("coreHigh", {
    core: number(counts.core_open_records),
    high: number(counts.high_throughput_records)
  }));
  setText("statMrna", number(byKey.mrna_delivery?.records || 0));
  setText("statMrnaSub", label(byKey.mrna_delivery || {}, "metric"));
  setText("statStructure", number(byKey.structure_activity?.records || 0));
  setText("statStructureSub", label(byKey.structure_activity || {}, "metric"));
  setText("statPhyschem", number(byKey.physicochemical?.records || 0));
  setText("statPhyschemSub", label(byKey.physicochemical || {}, "metric"));
  setText("footerUpdated", t("generated", { time: state.data.summary.generated_at }));
  setText("overviewGenerated", t("generated", { time: state.data.usageAnalysis.generated_at }));
}

function renderUsageBlocks() {
  const target = $("usageBlockGrid");
  if (!target) return;
  const blocks = state.data.usageAnalysis.usage_blocks || [];
  target.innerHTML = blocks.map((block) => `
    <article class="usage-card ${escapeHtml(block.key)}">
      <div class="usage-card-head">
        <span class="usage-key">${escapeHtml(usageKeyLabel(block.key))}</span>
        <span class="readiness-pill">${escapeHtml(t("readiness"))} ${pct(block.readiness, 0)}</span>
      </div>
      <h3>${escapeHtml(label(block, "label"))}</h3>
      <div class="usage-metric">
        <strong>${number(block.records)}</strong>
        <span>${escapeHtml(t("useFraction", { value: pct(block.fraction, 1).replace("%", "") }))}</span>
      </div>
      <div class="readiness-track"><span style="width:${Math.round(Number(block.readiness || 0) * 100)}%"></span></div>
      <p>${escapeHtml(label(block, "why"))}</p>
      <div class="next-line">${escapeHtml(label(block, "next"))}</div>
    </article>
  `).join("");
}

function usageKeyLabel(key) {
  const labels = {
    formulation_lookup: { en: "Lookup", zh: "配方检索" },
    structure_activity: { en: "Structure activity", zh: "结构-活性" },
    mrna_delivery: { en: "mRNA delivery", zh: "mRNA 递送" },
    physicochemical: { en: "Physicochemical", zh: "物化性质" },
    formulation_space: { en: "Formulation space", zh: "配方空间" },
    route_target: { en: "Route target", zh: "递送语境" }
  };
  return labels[key] ? labels[key][LANG] : key.replaceAll("_", " ");
}

function renderDeepLearning() {
  const analysis = state.data.deepLearningAnalysis || {};
  const tasks = analysis.tasks || [];
  const taskTarget = $("dlTaskGrid");
  if (taskTarget) {
    taskTarget.innerHTML = tasks.map((task) => `
      <article class="dl-task ${escapeHtml(task.key)}">
        <div class="dl-task-head">
          <h3>${escapeHtml(label(task, "label"))}</h3>
          <span>${pct(task.readiness, 0)}</span>
        </div>
        <div class="dl-task-meta">
          <strong>${number(task.samples)}</strong>
          <span>${escapeHtml(t("samples"))}</span>
        </div>
        <p>${escapeHtml(label(task, "model"))}</p>
        <p>${escapeHtml(label(task, "target"))}</p>
        <div class="dl-validation">${escapeHtml(label(task, "validation"))}</div>
        <div class="dl-risk">${escapeHtml(label(task, "risk"))}</div>
      </article>
    `).join("");
  }

  renderBars("dlFeatureBars", (analysis.feature_coverage || []).map((row) => ({
    label: label(row, "label"),
    value: row.covered,
    sub: `${pct(row.fraction, 0)} ${t("coverage")} / ${number(row.total)} ${t("records")}`
  })), t("records"));

  const riskTarget = $("dlRiskList");
  if (riskTarget) {
    riskTarget.innerHTML = (analysis.risks || []).map((risk) => `
      <div class="dl-risk-row">
        <span>${escapeHtml(label(risk, "level"))}</span>
        <strong>${escapeHtml(label(risk, "label"))}</strong>
        <p>${escapeHtml(label(risk, "detail"))}</p>
      </div>
    `).join("");
  }
}

function renderUseSourceMatrix() {
  const target = $("useSourceMatrix");
  if (!target) return;
  const blocks = state.data.usageAnalysis.usage_blocks || [];
  const sourceRows = state.data.usageAnalysis.source_by_use || [];
  target.innerHTML = blocks.map((block) => {
    const rows = sourceRows.filter((row) => row.use_key === block.key).slice(0, 6);
    return `
      <section class="matrix-card">
        <div class="matrix-card-head">
          <h3>${escapeHtml(label(block, "label"))}</h3>
          <span>${number(block.records)} ${escapeHtml(t("records"))}</span>
        </div>
        ${barRows(rows.map((row) => ({ label: row.source_dataset, value: row.records })), t("records"))}
      </section>
    `;
  }).join("");
}

function renderMetricFamilies() {
  const target = $("metricFamilyBars");
  if (!target) return;
  const rows = (state.data.usageAnalysis.metric_families || []).map((row) => ({
    label: familyLabel(row.metric_family),
    value: row.numeric_rows,
    sub: `${number(row.rows)} rows / ${number(row.source_datasets)} ${t("sources")}`
  }));
  target.innerHTML = barRows(rows, t("activityValues"));
}

function renderReadinessMatrix() {
  const target = $("readinessTable");
  if (!target) return;
  const rows = state.data.usageAnalysis.readiness_matrix || [];
  target.innerHTML = rows.map((row) => `
    <tr>
      <td>${escapeHtml(row.source_dataset)}</td>
      <td class="num">${number(row.records)}</td>
      ${coverageCell(row.with_ionizable_smiles, row.records, t("withSmiles"))}
      ${coverageCell(row.with_payload, row.records, t("withPayload"))}
      ${coverageCell(row.with_primary_activity, row.records, t("withActivity"))}
      ${coverageCell(row.with_lipid_ratio, row.records, t("withRatio"))}
      ${coverageCell(Number(row.with_cell_context || 0) + Number(row.with_route || 0) + Number(row.with_target || 0), row.records * 3, t("withContext"))}
    </tr>
  `).join("");
}

function coverageCell(value, total, title) {
  const fraction = total ? Math.min(1, Math.max(0, Number(value || 0) / Number(total))) : 0;
  return `
    <td class="coverage-cell" title="${escapeHtml(title)}">
      <span>${pct(fraction, 0)}</span>
      <i><b style="width:${Math.round(fraction * 100)}%"></b></i>
    </td>
  `;
}

function renderOverviewBars() {
  renderBars("payloadBars", (state.data.contextSummary.payload_type_counts || [])
    .filter((row) => row.payload_type !== "unknown")
    .slice(0, 10)
    .map((row) => ({ label: row.payload_type, value: row.records })), t("records"));
  renderBars("routeBars", (state.data.contextSummary.route_counts || [])
    .filter((row) => row.route_of_administration !== "unknown")
    .slice(0, 8)
    .map((row) => ({ label: row.route_of_administration, value: row.records })), t("records"));
  renderBars("targetBars", (state.data.contextSummary.delivery_target_counts || [])
    .filter((row) => row.delivery_target !== "unknown")
    .slice(0, 8)
    .map((row) => ({ label: row.delivery_target, value: row.records })), t("records"));
}

function renderBars(id, rows, valueLabel) {
  const target = $(id);
  if (!target) return;
  target.innerHTML = barRows(rows, valueLabel);
}

function barRows(rows, valueLabel) {
  if (!rows.length) return `<div class="bar-row"><span class="bar-label">${escapeHtml(t("noData"))}</span></div>`;
  const max = Math.max(...rows.map((row) => Number(row.value || 0)), 1);
  return rows.map((row) => {
    const width = Math.max(1, Math.round((Number(row.value || 0) / max) * 100));
    return `
      <div class="bar-row" title="${escapeHtml(row.label)}">
        <span class="bar-label">${escapeHtml(row.label)}</span>
        <span class="bar-track"><span class="bar-fill" style="width:${width}%"></span></span>
        <span class="bar-value">
          ${number(row.value)} ${escapeHtml(valueLabel)}
          ${row.sub ? `<span class="bar-sub">${escapeHtml(row.sub)}</span>` : ""}
        </span>
      </div>
    `;
  }).join("");
}

function familyLabel(key) {
  const item = METRIC_FAMILY_LABELS[key];
  return item ? item[LANG] : key.replaceAll("_", " ");
}

function filteredSources() {
  return (state.data.sourceInventory.items || [])
    .filter((row) => !state.sources.collection || row.collection === state.sources.collection)
    .filter((row) => rowContains(row, state.sources.search, ["collection", "source_key", "source_dataset", "record_role"]))
    .sort((a, b) => compareRows(a, b, state.sources.sortKey, state.sources.sortAsc));
}

function renderSources() {
  const target = $("sourceTable");
  if (!target) return;
  const items = filteredSources();
  setText("sourceInfo", t("rows", { count: number(items.length) }));
  target.innerHTML = items.map((row) => `
    <tr>
      <td><span class="pill ${escapeHtml(row.collection)}">${escapeHtml(labelCollection(row.collection))}</span></td>
      <td title="${escapeHtml(row.source_url)}">${escapeHtml(row.source_dataset)}</td>
      <td>${escapeHtml(text(row.record_role))}</td>
      <td class="num">${number(row.records)}</td>
      <td class="num">${number(row.unique_ionizable_smiles)}</td>
      <td class="num">${number(row.numeric_activity_values)}</td>
      <td class="num">${number(row.activity_metrics)}</td>
      <td class="num">${number(row.unique_component_smiles)}</td>
      <td class="num">${number(row.source_files)}</td>
    </tr>
  `).join("");
}

function filteredActivity() {
  return (state.data.activityMetrics.items || [])
    .filter((row) => rowContains(row, state.activity.search, ["source_key", "source_dataset", "record_role", "metric"]))
    .sort((a, b) => compareRows(a, b, state.activity.sortKey, state.activity.sortAsc));
}

function renderActivity() {
  const target = $("activityTable");
  if (!target) return;
  const items = filteredActivity();
  setText("activityInfo", t("metricGroups", { count: number(items.length) }));
  target.innerHTML = items.map((row) => `
    <tr>
      <td>${escapeHtml(row.source_dataset)}</td>
      <td>${escapeHtml(text(row.record_role))}</td>
      <td>${escapeHtml(row.metric)}</td>
      <td class="num">${number(row.rows)}</td>
      <td class="num">${number(row.numeric_rows)}</td>
      <td class="num">${number(row.avg_value, 4)}</td>
      <td class="num">${number(row.min_value, 4)}</td>
      <td class="num">${number(row.max_value, 4)}</td>
    </tr>
  `).join("");
}

function renderComponents() {
  const target = $("componentList");
  if (!target) return;
  const grouped = aggregateBy(
    state.data.componentSummary.items || [],
    (row) => `${row.source_dataset} / ${row.component_type}`,
    (row) => Number(row.unique_smiles || 0)
  ).slice(0, 20);
  target.innerHTML = grouped.map((row) => `
    <div class="component-row">
      <span title="${escapeHtml(row.label)}">${escapeHtml(row.label)}</span>
      <span class="num">${number(row.value)}</span>
      <span class="table-info">SMILES</span>
      <span></span>
    </div>
  `).join("");
}

function aggregateBy(items, labelFn, valueFn) {
  const map = new Map();
  for (const item of items) {
    const itemLabel = text(labelFn(item), "unknown");
    map.set(itemLabel, (map.get(itemLabel) || 0) + Number(valueFn(item) || 0));
  }
  return Array.from(map.entries())
    .map(([itemLabel, value]) => ({ label: itemLabel, value }))
    .sort((a, b) => b.value - a.value);
}

function filteredOverlap() {
  return (state.data.overlap.items || [])
    .filter((row) => !state.overlap.risk || row.risk_level === state.overlap.risk)
    .filter((row) => rowContains(row, state.overlap.search, [
      "left_source_key", "left_source_dataset", "right_source_key", "right_source_dataset", "risk_level"
    ]))
    .sort((a, b) => compareRows(a, b, state.overlap.sortKey, state.overlap.sortAsc));
}

function renderOverlap() {
  const target = $("overlapTable");
  if (!target) return;
  const items = filteredOverlap();
  setText("overlapInfo", t("pairs", { count: number(items.length) }));
  target.innerHTML = items.map((row) => `
    <tr>
      <td>${escapeHtml(row.left_source_dataset)}<br><span class="table-info">${number(row.left_unique_smiles)} SMILES</span></td>
      <td>${escapeHtml(row.right_source_dataset)}<br><span class="table-info">${number(row.right_unique_smiles)} SMILES</span></td>
      <td class="num">${number(row.shared_smiles)}</td>
      <td class="num">${pct(row.overlap_of_smaller)}</td>
      <td class="num">${pct(row.jaccard)}</td>
      <td><span class="pill ${escapeHtml(row.risk_level)}">${escapeHtml(formatRisk(row.risk_level))}</span></td>
    </tr>
  `).join("");
}

function filteredQueue() {
  return (state.data.supplementQueue.items || [])
    .filter((row) => !state.queue.priority || row.priority === state.queue.priority)
    .filter((row) => rowContains(row, state.queue.search, [
      "source_key", "title", "paper_doi", "dataset_doi", "source_url", "file_name", "reason", "extraction_status"
    ]));
}

function renderQueue() {
  const target = $("queueTable");
  if (!target) return;
  const items = filteredQueue();
  setText("queueInfo", t("rows", { count: number(items.length) }));
  target.innerHTML = items.map((row) => `
    <tr>
      <td><span class="pill ${escapeHtml(row.priority)}">${escapeHtml(labelPriority(row.priority))}</span></td>
      <td>${escapeHtml(row.source_key)}</td>
      <td>${linkOrText(row.source_url, row.title)}</td>
      <td class="mono">${doiLink(row.paper_doi)}</td>
      <td class="mono">${doiLink(row.dataset_doi)}</td>
      <td>${escapeHtml(text(row.extraction_status || row.status))}</td>
      <td>${escapeHtml(text(row.reason))}</td>
    </tr>
  `).join("");
}

function filteredRecords() {
  return (state.data.recordsPreview.items || [])
    .filter((row) => !state.records.collection || row.collection === state.records.collection)
    .filter((row) => rowContains(row, state.records.search, [
      "collection", "source_key", "source_dataset", "record_role", "publication_doi", "dataset_doi",
      "paper_title", "lipid_name", "ionizable_lipid_smiles", "helper_lipid_smiles", "sterol_lipid_smiles",
      "peg_lipid_smiles", "payload_type", "cell_context", "delivery_target", "activity_metric"
    ]));
}

function renderRecords() {
  const target = $("recordTable");
  if (!target) return;
  const items = filteredRecords();
  const totalPages = Math.max(1, Math.ceil(items.length / state.records.perPage));
  state.records.page = Math.min(state.records.page, totalPages);
  const start = (state.records.page - 1) * state.records.perPage;
  const pageItems = items.slice(start, start + state.records.perPage);
  setText("recordInfo", t("previewRows", { count: number(items.length) }));
  setText("recordPageInfo", t("pageInfo", { page: state.records.page, total: totalPages }));
  if ($("recordPrevBtn")) $("recordPrevBtn").disabled = state.records.page <= 1;
  if ($("recordNextBtn")) $("recordNextBtn").disabled = state.records.page >= totalPages;
  target.innerHTML = pageItems.map((row) => `
    <tr data-preview-id="${row.preview_id}">
      <td><span class="pill ${escapeHtml(row.collection)}">${escapeHtml(labelCollection(row.collection))}</span></td>
      <td>${escapeHtml(row.source_dataset)}</td>
      <td>${escapeHtml(text(row.record_role))}</td>
      <td class="mono">${doiLink(row.publication_doi || row.dataset_doi)}</td>
      <td>${escapeHtml(text(row.lipid_name))}</td>
      <td class="mono" title="${escapeHtml(text(row.ionizable_lipid_smiles))}">${escapeHtml(text(row.ionizable_lipid_smiles))}</td>
      <td>${escapeHtml(text(row.payload_type))}</td>
      <td>${escapeHtml(text(row.cell_context || row.delivery_target || row.route_of_administration))}</td>
      <td>${escapeHtml(text(row.activity_metric))}</td>
      <td class="num">${escapeHtml(text(row.activity_value ?? row.activity_value_text))}</td>
    </tr>
  `).join("");
  target.querySelectorAll("tr[data-preview-id]").forEach((tr) => {
    tr.addEventListener("click", () => {
      const row = pageItems.find((item) => String(item.preview_id) === tr.dataset.previewId);
      if (row) openDetail(row);
    });
  });
}

function openDetail(row) {
  if (!$("detailModal")) return;
  setText("detailTitle", t("detailTitle", {
    collection: labelCollection(row.collection),
    source: text(row.source_dataset)
  }));
  const fields = [
    [t("previewId"), row.preview_id],
    [t("collection"), labelCollection(row.collection)],
    [t("source"), row.source_dataset],
    [t("role"), row.record_role],
    [t("sourceRecordId"), row.source_record_id],
    [t("publicationDoi"), row.publication_doi],
    [t("datasetDoi"), row.dataset_doi],
    ["Ionizable SMILES", row.ionizable_lipid_smiles],
    [t("payload"), row.payload_type],
    [t("cellContext"), row.cell_context],
    [t("deliveryTarget"), row.delivery_target],
    [t("activityMetric"), row.activity_metric],
    [t("activityValue"), row.activity_value ?? row.activity_value_text]
  ];
  $("detailBody").innerHTML = `<dl class="detail-grid">${
    fields.map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(text(value))}</dd>`).join("")
  }</dl>`;
  $("detailModal").hidden = false;
}

function closeDetail() {
  if ($("detailModal")) $("detailModal").hidden = true;
}

function labelCollection(value) {
  if (value === "core_open") return t("coreOpen");
  if (value === "high_throughput") return t("highThroughput");
  return text(value);
}

function formatRisk(value) {
  const labels = {
    duplicate_subset: { en: "duplicate subset", zh: "重复子集" },
    material_overlap: { en: "material overlap", zh: "实质重叠" },
    moderate_overlap: { en: "moderate overlap", zh: "中等重叠" },
    low_overlap: { en: "low overlap", zh: "低重叠" }
  };
  if (labels[value]) return labels[value][LANG];
  return text(value).replaceAll("_", " ");
}

function labelPriority(value) {
  if (value === "A_literature_supplement_extraction") {
    return LANG === "zh" ? "A：补充材料提取" : "A: supplement extraction";
  }
  if (value === "B_literature_supplement_extraction") {
    return LANG === "zh" ? "B：补充材料提取" : "B: supplement extraction";
  }
  if (value === "C_code_only_no_public_training_data") {
    return LANG === "zh" ? "C：仅代码，无公开训练数据" : "C: code only, no public training data";
  }
  if (value === "high") return t("high");
  if (value === "medium") return t("medium");
  if (value === "low") return t("low");
  return text(value);
}

function linkOrText(url, itemLabel) {
  const safeLabel = escapeHtml(text(itemLabel));
  if (!url) return safeLabel;
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${safeLabel}</a>`;
}

function doiLink(doi) {
  if (!doi) return "-";
  const clean = String(doi).replace(/^https?:\/\/doi.org\//i, "");
  return `<a href="https://doi.org/${escapeHtml(clean)}" target="_blank" rel="noreferrer">${escapeHtml(clean)}</a>`;
}

function downloadJson(filename, payload) {
  downloadBlob(filename, new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" }));
}

function downloadCsv(filename, rows) {
  const columns = [];
  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!columns.includes(key)) columns.push(key);
    });
  });
  const csv = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))
  ].join("\n");
  downloadBlob(filename, new Blob([csv], { type: "text/csv;charset=utf-8" }));
}

function csvCell(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", loadData);
